import { ELECTION_QA_DB, ELECTION_QA_EXTRA, FALLBACK_RESPONSE, type QAPair } from "@/lib/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ALL_QA: QAPair[] = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];

export const runtime = "edge";

// Fallback Mock Engine Logic
function findAnswer(userMessage: string, explainLevel?: string): string {
  const lower = userMessage.toLowerCase().trim();
  const clean = lower.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ");
  const words = clean.split(" ").filter((w) => w.length > 2);

  let best: QAPair | null = null;
  let bestScore = 0;

  for (const qa of ALL_QA) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (clean.includes(kw)) { score += 10; continue; }
      const kwWords = kw.split(" ");
      const matches = kwWords.filter((k) => words.includes(k));
      score += matches.length * 3;
    }
    const qWords = qa.question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(" ").filter((w) => w.length > 3);
    const qMatches = qWords.filter((qw) => words.includes(qw));
    score += qMatches.length * 2;

    if (score > bestScore) { bestScore = score; best = qa; }
  }

  if (!best || bestScore < 3) return FALLBACK_RESPONSE;

  if (explainLevel === "child") return `**${best.question}**\n\n${best.eli18_answer}`;
  return `**${best.question}**\n\n${best.detailed_answer}`;
}

// Utility to stream local strings
function streamLocal(text: string): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  const words = text.split(" ");
  return new ReadableStream({
    async start(ctrl) {
      for (let i = 0; i < words.length; i++) {
        ctrl.enqueue(enc.encode((i === 0 ? "" : " ") + words[i]));
        await new Promise((r) => setTimeout(r, 20 + Math.random() * 20));
      }
      ctrl.close();
    },
  });
}

// System prompt for Gemini
const SYSTEM_PROMPT = `You are the Election Copilot, an AI assistant dedicated to helping Indian citizens understand their democratic processes, voter registration, polling procedures, and government structures.
Answer questions accurately, calmly, and neutrally. If asked about political parties or opinions, remain strictly objective and educational. 
Do not hallucinate rules; if unsure about a specific localized law, advise the user to check the official ECI website (voters.eci.gov.in) or call the Voter Helpline 1950.
Format your responses beautifully with markdown, bullet points, and emojis where appropriate.`;

export async function POST(req: Request) {
  try {
    const { messages, explainLevel } = await req.json();
    if (!Array.isArray(messages) || !messages.length) {
      return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1]?.content ?? "";

    // If Gemini API Key is present, try using Google Services
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
          systemInstruction: explainLevel === "child" 
            ? "Explain this civic/election concept simply, as if to a 10-year-old child."
            : SYSTEM_PROMPT,
        });

        const chat = model.startChat({
          history: messages.slice(0, -1).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }],
          })),
        });

        const result = await chat.sendMessageStream([{ text: lastMessage }]);

        // Stream the Gemini response
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                controller.enqueue(encoder.encode(chunkText));
              }
            } catch (err) {
              console.error("Gemini stream error:", err);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
        });
      } catch (geminiError) {
        // If Gemini API fails (e.g. 403, quota, disabled), log it and gracefully fallback
        console.warn("Gemini API failed, falling back to local database:", geminiError);
      }
    }

    // Fallback: Use the high-performance local keyword engine
    const answer = findAnswer(lastMessage, explainLevel);
    return new Response(streamLocal(answer), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
