import { ELECTION_QA_DB, FALLBACK_RESPONSE, type QAPair } from "@/lib/constants";

export const runtime = "edge";

function findAnswer(userMessage: string, explainLevel?: string): string {
  const lower = userMessage.toLowerCase();
  let best: QAPair | null = null;
  for (const qa of ELECTION_QA_DB) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      best = qa;
      break;
    }
  }
  if (!best) return FALLBACK_RESPONSE;
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
        await new Promise((r) => setTimeout(r, 28 + Math.random() * 18));
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
