"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { site } from "@/data/site";

export function HoursStrip() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-card)] py-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3 text-[var(--text-primary)]">
          <Clock className="size-5 shrink-0 text-[var(--accent)]" aria-hidden />
          <span className="font-semibold">Hours</span>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {site.hours.map((h, i) => (
            <button
              key={h.label}
              type="button"
              onClick={() => setActive(i)}
              className={`focus-ring rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
                active === i
                  ? "bg-[var(--accent)] text-[var(--bg-deep)]"
                  : "border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-deep)]/50 p-4 sm:p-5">
          <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
            {site.hours[active]?.label}
          </p>
          <ul className="mt-2 space-y-1 text-[var(--text-muted)]">
            {site.hours[active]?.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
