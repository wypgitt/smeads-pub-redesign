"use client";

import { Bot, MessageCircle } from "lucide-react";
import { useAskSmeads } from "@/components/providers/ask-smeads-provider";

export function AskSmeadsAiCta() {
  const { openAsk } = useAskSmeads();

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)] p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)]">
            <Bot className="size-7" aria-hidden />
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
              Ask Smeads AI
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-muted)]">
              Hours, kids breakfast, trivia night, takeout, directions, what&apos;s on tap
              (generally) — same assistant lives in the floating button site-wide. Open it
              anytime so we don&apos;t repeat ourselves here.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={openAsk}
          className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] shadow-lg transition hover:brightness-110 sm:self-center"
        >
          <MessageCircle className="size-5" aria-hidden />
          Open Ask AI
        </button>
      </div>
    </div>
  );
}
