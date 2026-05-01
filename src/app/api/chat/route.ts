import { MOCK_QA_DATABASE, FALLBACK_RESPONSE } from "@/lib/constants";

export const runtime = "edge";

function findAnswer(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  for (const qa of MOCK_QA_DATABASE) {
    if (qa.keywords.some((kw) => lowerMsg.includes(kw))) {
      return qa.answer;
    }
  }
  return FALLBACK_RESPONSE;
}

function createStreamingResponse(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const words = text.split(" ");

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const chunk = i === 0 ? words[i] : " " + words[i];
        controller.enqueue(encoder.encode(chunk));
        // Simulate natural typing speed: 20-50ms per word
        await new Promise((r) => setTimeout(r, 25 + Math.random() * 20));
      }
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid request payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const lastMessage = messages[messages.length - 1];
    const userText: string = lastMessage?.content || "";

    const answer = findAnswer(userText);
    const stream = createStreamingResponse(answer);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
