"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section
      id="home"
      className="relative grain min-h-[min(100vh,52rem)] overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[24rem] w-[24rem] rounded-full bg-[var(--copper)]/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-deep)] via-transparent to-[var(--bg-deep)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]"
        >
          {site.tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl"
        >
          {site.hero.headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-[var(--text-muted)] sm:text-xl"
        >
          {site.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link
            href="/order"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110"
          >
            <ShoppingBag className="size-4" aria-hidden />
            Order takeout
          </Link>
          <a
            href={`tel:${site.phoneTel}`}
            className="focus-ring inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
          >
            Call {site.phone}
          </a>
          <Link
            href="#visit"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
          >
            <MapPin className="size-4 text-[var(--accent)]" aria-hidden />
            Directions
          </Link>
          <Link
            href="/menu"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            <UtensilsCrossed className="size-4" aria-hidden />
            View full menu
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-5 backdrop-blur-sm"
            >
              <dt className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                {item.title}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                {item.detail}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
