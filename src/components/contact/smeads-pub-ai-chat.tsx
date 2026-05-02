"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, Bot, User } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Are you open right now?",
  "Kids allowed at breakfast?",
  "When’s trivia?",
  "Can I order takeout?",
];

type Props = { variant?: "page" | "drawer" };

export function SmeadsPubAIChat({ variant = "page" }: Props) {
  const isDrawer = variant === "drawer";
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey — I’m Smeads Pub AI. I only know what’s on this website: hours, food & drink basics, trivia, takeout, karaoke blurbs. Don’t trust me for tonight’s exact tap list — call the bar for that. What do you want to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [lastMode, setLastMode] = useState<"ai" | "local" | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const history = messages
        .filter((x) => x.role === "user" || x.role === "assistant")
        .map((x) => ({ role: x.role, content: x.content }));
      const res = await fetch("/api/pub-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: history.slice(-12),
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        mode?: "ai" | "local";
        error?: string;
      };
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              data.error ??
              "Something glitched. Try again, or call the number on this page.",
          },
        ]);
        return;
      }
      setLastMode(data.mode ?? null);
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "…" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Network hiccup. Check your connection or call the pub.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void send(input);
  }

  const chatBody = (
    <>
      {!isDrawer ? (
        <div className="border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)]/30 to-[var(--copper)]/20 text-[var(--accent)]">
                <Sparkles className="size-5" aria-hidden />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-[var(--text-primary)] sm:text-2xl">
                  Smeads Pub AI
                </h2>
                <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                  Answers from <strong className="font-medium text-[var(--text-primary)]">this</strong> site — not the whole internet.
                </p>
              </div>
            </div>
            <p className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-3 py-1 text-xs text-[var(--text-muted)]">
              {lastMode === "ai" ? (
                <span className="text-[var(--accent)]">Live AI</span>
              ) : lastMode === "local" ? (
                <span>Quick answers</span>
              ) : (
                <span>Smeads Pub AI</span>
              )}
            </p>
          </div>
        </div>
      ) : null}

      <div
        ref={listRef}
        className={`space-y-4 overflow-y-auto px-3 py-3 sm:px-4 ${
          isDrawer ? "max-h-[min(50vh,18rem)]" : "max-h-[min(55vh,22rem)] px-5 py-5 sm:px-6"
        }`}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={`${i}-${msg.role}-${msg.content.slice(0, 24)}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9 ${
                msg.role === "user"
                  ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                  : "bg-[var(--bg-card)] text-[var(--copper)]"
              }`}
            >
              {msg.role === "user" ? (
                <User className="size-3.5 sm:size-4" aria-hidden />
              ) : (
                <Bot className="size-3.5 sm:size-4" aria-hidden />
              )}
            </div>
            <div
              className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed sm:px-4 sm:py-3 ${
                msg.role === "user"
                  ? "bg-[var(--accent)]/15 text-[var(--text-primary)]"
                  : "bg-[var(--bg-card)] text-[var(--text-muted)]"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
        <AnimatePresence>
          {loading ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pl-10 text-sm text-[var(--text-muted)]"
            >
              Thinking…
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <div
        className={`border-t border-[var(--border-subtle)] px-3 py-2 sm:px-5 ${isDrawer ? "" : "sm:px-6"}`}
      >
        <p className="mb-2 text-xs text-[var(--text-muted)]">Try asking</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              disabled={loading}
              className="focus-ring rounded-full border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-3 py-1.5 text-left text-xs text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className={`border-t border-[var(--border-subtle)] p-3 sm:p-4 ${isDrawer ? "" : "sm:p-5"}`}
      >
        <div className="flex gap-2">
          <label htmlFor={isDrawer ? "smeads-ai-drawer-input" : "smeads-pub-ai-input"} className="sr-only">
            Your question for Smeads Pub AI
          </label>
          <input
            id={isDrawer ? "smeads-ai-drawer-input" : "smeads-pub-ai-input"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Hours, kids breakfast, trivia…"
            className="focus-ring min-w-0 flex-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] sm:px-4 sm:py-3"
            autoComplete="off"
            maxLength={2000}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="focus-ring flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110 disabled:opacity-50 sm:px-5 sm:py-3"
          >
            <Send className="size-4" aria-hidden />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
        {!isDrawer ? (
          <p className="mt-3 text-center text-xs text-[var(--text-muted)]">
            Facts come from your menu &amp; hours on this site. Optional OpenAI key on the server for chattier replies.
          </p>
        ) : null}
      </form>
    </>
  );

  if (isDrawer) {
    return (
      <div className="flex h-full min-h-0 flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)]">
        {chatBody}
      </div>
    );
  }

  return (
    <section
      aria-label="Smeads Pub AI"
      className="relative overflow-hidden rounded-2xl p-[1px] shadow-xl shadow-amber-950/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/40 via-[var(--copper)]/20 to-transparent" />
      <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
        {chatBody}
      </div>
    </section>
  );
}
