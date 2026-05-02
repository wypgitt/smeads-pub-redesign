"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

type NavEntry =
  | { kind: "section"; id: string; label: string }
  | { kind: "route"; href: string; label: string };

const navEntries: NavEntry[] = [
  { kind: "section", id: "home", label: "Home" },
  { kind: "section", id: "about", label: "About" },
  { kind: "route", href: "/menu", label: "Menu" },
  { kind: "section", id: "specials", label: "Specials" },
  { kind: "route", href: "/events", label: "Events" },
  { kind: "section", id: "karaoke", label: "Karaoke" },
  { kind: "section", id: "gallery", label: "Gallery" },
  { kind: "section", id: "visit", label: "Visit" },
  { kind: "route", href: "/contact", label: "Contact" },
];

function sectionHref(pathname: string, id: string) {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          href={sectionHref(pathname, "home")}
          className="font-serif text-lg font-semibold tracking-tight text-[var(--text-primary)] sm:text-xl"
        >
          {site.name}
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
          <Link
            href="/order"
            className={`focus-ring rounded-md px-2.5 py-1.5 text-sm font-semibold transition-colors ${
              pathname === "/order"
                ? "text-[var(--accent)]"
                : "text-[var(--text-muted)] hover:text-[var(--accent)]"
            }`}
          >
            Order
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phoneTel}`}
            className="focus-ring hidden items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:flex"
          >
            <Phone className="size-4 shrink-0 text-[var(--accent)]" aria-hidden />
            <span className="tabular-nums">{site.phone}</span>
          </a>
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
                <span className="font-serif font-semibold">{site.name}</span>
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
                <Link
                  href="/order"
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-lg bg-[var(--accent)]/15 px-3 py-3 text-base font-semibold text-[var(--accent)]"
                >
                  Order takeout
                </Link>
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
