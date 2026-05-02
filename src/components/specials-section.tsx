"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

type SpecialId = (typeof site.specials)[number]["id"];

export function SpecialsSection() {
  const [tab, setTab] = useState<SpecialId>(site.specials[0]!.id);

  const current = site.specials.find((s) => s.id === tab) ?? site.specials[0];

  return (
    <section
      id="specials"
      className="scroll-mt-24 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Weekly deals" title="Daily specials">
          <p>{site.specialsIntro}</p>
        </SectionHeading>

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 scrollbar-thin sm:flex-wrap sm:overflow-visible">
          {site.specials.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setTab(s.id)}
              className={`focus-ring shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === s.id
                  ? "bg-[var(--accent)] text-[var(--bg-deep)]"
                  : "border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              <span className="mr-2 inline-block w-9 text-center tabular-nums opacity-80">
                {s.shortLabel}
              </span>
              {s.pill}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[12rem] rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
                {current?.title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-[var(--text-muted)]">
                {current?.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
