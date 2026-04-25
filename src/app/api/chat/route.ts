import { google } from "@ai-sdk/google";
import { streamText, StreamingTextResponse } from "ai";
import { MASTER_SYSTEM_PROMPT } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("Missing GEMINI_API_KEY environment variable");
      return new Response(JSON.stringify({ error: "Server configuration error. Please contact support." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await req.json();
    
    // Basic Input Validation
    if (!body || typeof body !== 'object') {
      return new Response(JSON.stringify({ error: "Invalid request payload" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const { messages, mode, persona, explainLevel } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages array is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Enforce message length limit for security
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.content && lastMessage.content.length > 2000) {
      return new Response(JSON.stringify({ error: "Message exceeds maximum length of 2000 characters." }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let contextPrompt = MASTER_SYSTEM_PROMPT;
    contextPrompt += `\n\nActive Mode: ${mode || 'Learn Mode'}`;
    contextPrompt += `\nUser Persona: ${persona || 'Beginner'}`;
    if (explainLevel === 'child') {
      contextPrompt += `\nComplexity Level: Explain like I'm 12 (use simple words and analogies).`;
    }

    const result = await streamText({
      model: google("gemini-1.5-pro"),
      system: contextPrompt,
      messages,
      maxRetries: 2, // Added for resilience
    });

    return new StreamingTextResponse(result.textStream);
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request." }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

