"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ExternalLink,
  MapPin,
  Sparkles,
  X,
  UtensilsCrossed,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  eventsPageIntro,
  otherHappenings,
  triviaFlyer,
} from "@/data/events";
import { site } from "@/data/site";
import { upcomingThursdayIsos } from "@/lib/upcoming-thursdays";

const TRIVIA_DATES_SHOWN = 14;

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EventsPageView() {
  const [flyerOpen, setFlyerOpen] = useState(false);
  const thursdays = upcomingThursdayIsos(TRIVIA_DATES_SHOWN);

  const closeFlyer = useCallback(() => setFlyerOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFlyer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeFlyer]);

  useEffect(() => {
    document.body.style.overflow = flyerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [flyerOpen]);

  return (
    <div className="grain relative pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[var(--accent)]/12 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
          Events
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
          What&apos;s happening
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-[var(--text-muted)]">
          {eventsPageIntro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={site.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] hover:brightness-110"
          >
            Facebook — see pop‑up events
            <ExternalLink className="size-4" aria-hidden />
          </a>
          <Link
            href="/order"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
          >
            <UtensilsCrossed className="size-4 text-[var(--accent)]" aria-hidden />
            Order takeout
          </Link>
        </div>

        <section className="mt-16 border-t border-[var(--border-subtle)] pt-16">
          <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)] sm:text-3xl">
            Also on rotation
          </h2>
          <ul className="mt-6 max-w-2xl space-y-3 text-[var(--text-muted)]">
            {otherHappenings.map((line) => (
              <li key={line} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  aria-hidden
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Weekly anchor
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[var(--text-primary)]">
                {site.trivia.title}
              </h2>
              <p className="mt-2 text-lg text-[var(--accent)]">{site.trivia.schedule}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="space-y-6">
              <div className="flex gap-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
                  <Sparkles className="size-6" aria-hidden />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                    {triviaFlyer.headline}
                  </h3>
                  <p className="mt-2 text-[var(--text-muted)] leading-relaxed">
                    {triviaFlyer.longDescription}
                  </p>
                  <Link
                    href={triviaFlyer.foodSpecial.href}
                    className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/20"
                  >
                    {triviaFlyer.foodSpecial.title}
                    <UtensilsCrossed className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-sm text-[var(--text-muted)]">
                <MapPin className="size-5 shrink-0 text-[var(--accent)]" aria-hidden />
                <p>
                  {site.address.street}, {site.address.city}, {site.address.state}{" "}
                  {site.address.zip}
                </p>
              </div>
            </div>

            <figure className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
              <button
                type="button"
                onClick={() => setFlyerOpen(true)}
                className="focus-ring group relative block w-full text-left"
                aria-haspopup="dialog"
                aria-expanded={flyerOpen}
              >
                <Image
                  src={triviaFlyer.imageSrc}
                  alt={triviaFlyer.imageAlt}
                  width={1200}
                  height={1600}
                  className="w-full object-cover transition group-hover:brightness-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <figcaption className="border-t border-[var(--border-subtle)] px-4 py-3 text-center text-sm text-[var(--text-muted)]">
                  Tap to enlarge · same info as text above for accessibility
                </figcaption>
              </button>
            </figure>
          </div>

          <div className="mt-12 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[var(--text-primary)]">
              <CalendarDays className="size-5 text-[var(--accent)]" aria-hidden />
              <h3 className="font-serif text-xl font-semibold">
                Upcoming trivia nights
              </h3>
              <span className="text-sm text-[var(--text-muted)]">
                (auto‑listed Thursdays — confirm on busy nights)
              </span>
            </div>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {thursdays.map((iso) => (
                <li
                  key={iso}
                  className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-4 py-3 text-sm"
                >
                  <time dateTime={iso} className="text-[var(--text-primary)]">
                    {formatDate(iso)}
                  </time>
                  <span className="tabular-nums text-[var(--text-muted)]">
                    7–9 pm
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-16 text-center text-sm text-[var(--text-muted)]">
          <Link href="/" className="text-[var(--accent)] hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>

      <AnimatePresence>
        {flyerOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={triviaFlyer.headline}
            onClick={closeFlyer}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[95vh] max-w-4xl overflow-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-deep)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="focus-ring absolute right-3 top-3 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black/80"
                onClick={closeFlyer}
                aria-label="Close flyer"
              >
                <X className="size-5" />
              </button>
              <Image
                src={triviaFlyer.imageSrc}
                alt={triviaFlyer.imageAlt}
                width={1200}
                height={1600}
                className="h-auto w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
