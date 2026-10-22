import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  if (!("role" in value) || !("content" in value)) return false;

  return (
    (value.role === "user" || value.role === "assistant") &&
    typeof value.content === "string" &&
    value.content.trim().length > 0 &&
    value.content.length <= MAX_MESSAGE_LENGTH
  );
}

function isCompletionResponse(
  value: unknown,
): value is { choices: { message: { content: string } }[] } {
  if (typeof value !== "object" || value === null || !("choices" in value)) {
    return false;
  }

  return (
    Array.isArray(value.choices) &&
    value.choices.length > 0 &&
    typeof value.choices[0] === "object" &&
    value.choices[0] !== null &&
    "message" in value.choices[0] &&
    typeof value.choices[0].message === "object" &&
    value.choices[0].message !== null &&
    "content" in value.choices[0].message &&
    typeof value.choices[0].message.content === "string"
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The travel assistant is not configured. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("messages" in body) ||
    !Array.isArray(body.messages) ||
    body.messages.length === 0 ||
    body.messages.length > MAX_MESSAGES ||
    !body.messages.every(isChatMessage) ||
    body.messages[body.messages.length - 1].role !== "user"
  ) {
    return NextResponse.json({ error: "Please send a valid message." }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are WorldExplore's friendly travel assistant. Help travelers discover destinations and plan trips with practical, concise advice. Ask a follow-up question when important preferences are missing. Do not claim to make bookings or verify live prices, opening hours, or travel restrictions.",
          },
          ...body.messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30_000),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return NextResponse.json(
      {
        error: timedOut
          ? "The travel assistant took too long to respond. Please try again."
          : "Could not connect to the travel assistant. Please try again.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "The travel assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }

  let completion: unknown;
  try {
    completion = await response.json();
  } catch {
    return NextResponse.json(
      { error: "The travel assistant returned an invalid response. Please try again." },
      { status: 502 },
    );
  }

  if (!isCompletionResponse(completion)) {
    return NextResponse.json(
      { error: "The travel assistant returned an invalid response. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply: completion.choices[0].message.content });
}
