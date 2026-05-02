"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { HeroMosaic } from "@/components/home/hero-mosaic";
import { TaskStrip } from "@/components/home/task-strip";
import { TonightPanel } from "@/components/home/tonight-panel";

const MOSAIC = site.gallery.slice(0, 4).map((g) => ({
  src: g.src,
  alt: g.alt,
  caption: g.caption,
}));

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--bg-deep)] pt-20 pb-12 sm:pt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(232, 184, 74, 0.15), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--copper)]"
            >
              {site.name} · {site.address.city}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-3 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-[3.15rem]"
            >
              {site.hero.headline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--text-muted)]"
            >
              {site.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                What do you need?
              </p>
              <TaskStrip />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {site.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-4 py-4"
                >
                  <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {item.detail}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
              className="mt-8 text-sm text-[var(--text-muted)]"
            >
              Want the full story?{" "}
              <Link href="#about" className="font-medium text-[var(--accent)] hover:underline">
                Scroll for history &amp; karaoke
              </Link>
              {" · "}
              <Link href="/contact" className="font-medium text-[var(--accent)] hover:underline">
                Visit &amp; contact
              </Link>
            </motion.p>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <HeroMosaic tiles={MOSAIC} />
            <TonightPanel />
          </div>
        </div>
      </div>
    </section>
  );
}
