import { NextResponse } from "next/server";
import { z } from "zod";
import { buildAssistantSystemPrompt } from "@/lib/pub-knowledge";
import {
  defaultAssistantFallback,
  ruleBasedPubAnswer,
} from "@/lib/pub-assistant-fallback";

const bodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(6000),
      }),
    )
    .max(24)
    .optional()
    .default([]),
});

type ChatMsg = { role: "user" | "assistant" | "system"; content: string };

async function openAiReply(
  history: { role: "user" | "assistant"; content: string }[],
  userMessage: string,
): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
  const system = buildAssistantSystemPrompt();

  const messages: ChatMsg[] = [
    { role: "system", content: system },
    ...history.slice(-14).map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user", content: userMessage },
  ];

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 600,
      temperature: 0.35,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[smeads-pub-ai] OpenAI error", res.status, err);
    return null;
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  return text || null;
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { message, history } = parsed.data;

  const llm = await openAiReply(history, message);
  if (llm) {
    return NextResponse.json({
      reply: llm,
      mode: "ai" as const,
    });
  }

  const rules = ruleBasedPubAnswer(message);
  if (rules) {
    return NextResponse.json({
      reply: rules,
      mode: "local" as const,
    });
  }

  return NextResponse.json({
    reply: defaultAssistantFallback(),
    mode: "local" as const,
  });
}
