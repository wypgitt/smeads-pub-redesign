"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SmeadsPubAIChat } from "@/components/contact/smeads-pub-ai-chat";

type AskCtx = {
  open: boolean;
  openAsk: (prompt?: string) => void;
  closeAsk: () => void;
  toggleAsk: () => void;
};

const Ctx = createContext<AskCtx | null>(null);

export function useAskSmeads() {
  const v = useContext(Ctx);
  if (!v) {
    return {
      open: false,
      openAsk: () => {},
      closeAsk: () => {},
      toggleAsk: () => {},
    };
  }
  return v;
}

export function AskSmeadsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [starterPrompt, setStarterPrompt] = useState("");
  const pathname = usePathname();
  const liftForOrderCart = pathname === "/order";

  const openAsk = useCallback((prompt?: string) => {
    if (prompt) setStarterPrompt(prompt);
    setOpen(true);
  }, []);
  const closeAsk = useCallback(() => setOpen(false), []);
  const toggleAsk = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAsk();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAsk]);

  return (
    <Ctx.Provider value={{ open, openAsk, closeAsk, toggleAsk }}>
      {children}

      <button
        type="button"
        onClick={toggleAsk}
        className={`focus-ring fixed right-5 z-[90] flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--bg-deep)] shadow-lg shadow-black/40 transition hover:brightness-110 sm:bottom-6 sm:right-6 ${
          liftForOrderCart ? "bottom-24" : "bottom-5"
        }`}
        aria-expanded={open}
        aria-controls="ask-smeads-drawer"
        aria-label="Ask Smeads AI"
      >
        <MessageCircle className="size-5 shrink-0" aria-hidden />
        <span className="hidden sm:inline">Ask AI</span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[95] bg-black/65 backdrop-blur-[2px]"
              onClick={closeAsk}
            />
            <motion.div
              id="ask-smeads-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ask-smeads-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[96] flex w-[min(100vw-1rem,26rem)] flex-col border-l border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                <h2
                  id="ask-smeads-title"
                  className="font-serif text-lg font-semibold text-[var(--text-primary)]"
                >
                  Ask Smeads AI
                </h2>
                <button
                  type="button"
                  onClick={closeAsk}
                  className="focus-ring rounded-md px-2 py-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  Close
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-hidden px-2 pb-4 pt-2">
                <SmeadsPubAIChat
                  key={starterPrompt || "default"}
                  variant="drawer"
                  starterPrompt={starterPrompt}
                />
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
