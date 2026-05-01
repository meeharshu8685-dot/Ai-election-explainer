import { ELECTION_QA_DB, ELECTION_QA_EXTRA, FALLBACK_RESPONSE, type QAPair } from "@/lib/constants";

const ALL_QA: QAPair[] = [...ELECTION_QA_DB, ...ELECTION_QA_EXTRA];

export const runtime = "edge";

function findAnswer(userMessage: string, explainLevel?: string): string {
  const lower = userMessage.toLowerCase().trim();
  // Remove punctuation for cleaner matching
  const clean = lower.replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ");
  const words = clean.split(" ").filter(w => w.length > 2);

  let best: QAPair | null = null;
  let bestScore = 0;

  for (const qa of ALL_QA) {
    let score = 0;
    for (const kw of qa.keywords) {
      // Full keyword phrase match — highest weight
      if (clean.includes(kw)) { score += 10; continue; }
      // Word-level match — each keyword word that appears in message
      const kwWords = kw.split(" ");
      const matches = kwWords.filter(kw => words.includes(kw));
      score += matches.length * 3;
    }
    // Also match words from the question itself
    const qWords = qa.question.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(" ").filter(w => w.length > 3);
    const qMatches = qWords.filter(qw => words.includes(qw));
    score += qMatches.length * 2;

    if (score > bestScore) { bestScore = score; best = qa; }
  }

  // Only use match if score is meaningful
  if (!best || bestScore < 3) return FALLBACK_RESPONSE;

  if (explainLevel === "child") return `**${best.question}**\n\n${best.eli18_answer}`;
  return `**${best.question}**\n\n${best.detailed_answer}`;
}

function stream(text: string): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  const words = text.split(" ");
  return new ReadableStream({
    async start(ctrl) {
      for (let i = 0; i < words.length; i++) {
        ctrl.enqueue(enc.encode((i === 0 ? "" : " ") + words[i]));
        await new Promise((r) => setTimeout(r, 25 + Math.random() * 20));
      }
      ctrl.close();
    },
  });
}

export async function POST(req: Request) {
  try {
    const { messages, explainLevel } = await req.json();
    if (!Array.isArray(messages) || !messages.length)
      return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
    const last = messages[messages.length - 1];
    const answer = findAnswer(last?.content ?? "", explainLevel);
    return new Response(stream(answer), {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Transfer-Encoding": "chunked" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
