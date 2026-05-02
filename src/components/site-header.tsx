"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { site } from "@/data/site";
import { useAskSmeads } from "@/components/providers/ask-smeads-provider";

type NavEntry =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; href: string; label: string };

const navEntries: NavEntry[] = [
  { kind: "route", href: "/order", label: "Order" },
  { kind: "route", href: "/menu", label: "Menu" },
  { kind: "route", href: "/events", label: "Events" },
  { kind: "section", id: "visit", label: "Visit" },
];

function sectionHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openAsk } = useAskSmeads();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-[background,box-shadow] duration-300 ${
        scrolled
          ? "border-b border-[var(--border-subtle)] bg-[var(--bg-deep)]/85 shadow-lg shadow-black/20 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6">
        <Link
          href={pathname === "/" ? "#home" : "/"}
          className="focus-ring flex items-center gap-2.5 rounded-md py-1 font-serif text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:gap-3 sm:text-xl"
        >
          <BrandMark size="header" priority />
          <span>{site.name}</span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {navEntries.map((item) =>
            item.kind === "route" ? (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "font-semibold text-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.id}
                href={sectionHref(pathname, item.id)}
                className="focus-ring rounded-md px-2.5 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
              >
                {item.label}
              </Link>
            ),
          )}
          <button
            type="button"
            onClick={() => openAsk("What should I know before visiting Smeads today?")}
            className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--text-primary)]"
          >
            <Bot className="size-4" aria-hidden />
            Ask
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="focus-ring hidden items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex"
          >
            <Phone className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
            <span className="tabular-nums">{site.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => openAsk("What should I know before visiting Smeads today?")}
            className="focus-ring hidden items-center gap-1.5 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-2 text-sm font-semibold text-[var(--accent)] lg:hidden"
          >
            <Bot className="size-4" aria-hidden />
            Ask
          </button>
          <a
            href={`tel:${site.phoneTel}`}
            className="focus-ring flex rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2.5 text-[var(--accent)] sm:hidden"
            aria-label={`Call ${site.phone}`}
          >
            <Phone className="size-5" />
          </a>
          <button
            type="button"
            className="focus-ring flex rounded-md p-2 text-[var(--text-primary)] lg:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 lg:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] p-4">
                <span className="flex items-center gap-2.5 font-serif font-semibold">
                  <BrandMark size="drawer" />
                  {site.name}
                </span>
                <button
                  type="button"
                  className="focus-ring rounded-md p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navEntries.map((item) =>
                  item.kind === "route" ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`focus-ring rounded-lg px-3 py-3 text-base font-medium ${
                        pathname === item.href
                          ? "text-[var(--accent)]"
                          : "text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <Link
                      key={item.id}
                      href={sectionHref(pathname, item.id)}
                      onClick={() => setOpen(false)}
                      className="focus-ring rounded-lg px-3 py-3 text-base font-medium text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                    >
                      {item.label}
                    </Link>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => {
                    openAsk("What should I know before visiting Smeads today?");
                    setOpen(false);
                  }}
                  className="focus-ring flex items-center gap-2 rounded-lg bg-[var(--accent)]/15 px-3 py-3 text-base font-semibold text-[var(--accent)]"
                >
                  <Bot className="size-5" aria-hidden />
                  Ask Smeads AI
                </button>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="focus-ring mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--bg-deep)]"
                >
                  <Phone className="size-4" />
                  {site.phone}
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
