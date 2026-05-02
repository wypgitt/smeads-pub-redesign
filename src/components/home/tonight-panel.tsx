"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarClock, Sparkles, Sun } from "lucide-react";
import { site } from "@/data/site";
import {
  getNextTriviaDisplay,
  getOpenNowHint,
  getTodaysHoursLine,
  getTodaysSpecialBlurb,
} from "@/lib/today-at-smeads";

type TodaySnapshot = {
  openNow: string;
  hours: string;
  special: string;
  next: string;
};

function readTodaySnapshot(): TodaySnapshot {
  return {
    openNow: getOpenNowHint(),
    hours: getTodaysHoursLine(),
    special: getTodaysSpecialBlurb(),
    next: getNextTriviaDisplay(),
  };
}

export function TonightPanel() {
  const [snapshot, setSnapshot] = useState<TodaySnapshot | null>(null);

  useEffect(() => {
    const refresh = () => setSnapshot(readTodaySnapshot());
    refresh();
    const id = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      id="tonight"
      className="scroll-mt-28 rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-elevated)] p-5 shadow-lg sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        Tonight at Smeads
      </p>
      <ul className="mt-4 space-y-4 text-sm text-[var(--text-muted)]">
        <li className="flex gap-3">
          <Sun className="mt-0.5 size-5 shrink-0 text-[var(--accent)]" aria-hidden />
          <div>
            <p className="font-medium text-[var(--text-primary)]">Open now?</p>
            <p className="mt-1 leading-relaxed">
              {snapshot?.openNow ?? "Checking posted hours…"}
            </p>
          </div>
        </li>
        <li className="flex gap-3 border-t border-[var(--border-subtle)] pt-4">
          <Sun className="mt-0.5 size-5 shrink-0 text-[var(--accent)]" aria-hidden />
          <div>
            <p className="font-medium text-[var(--text-primary)]">Hours (today)</p>
            <p className="mt-1 leading-relaxed">
              {snapshot?.hours ?? "Loading today’s hours…"}
            </p>
            <p className="mt-1 text-xs">{site.hoursDisclaimer}</p>
          </div>
        </li>
        <li className="flex gap-3">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-[var(--copper)]" aria-hidden />
          <div>
            <p className="font-medium text-[var(--text-primary)]">Today’s special energy</p>
            <p className="mt-1 leading-relaxed">
              {snapshot?.special ?? "Checking the weekly specials…"}
            </p>
            <Link
              href="/menu"
              className="mt-2 inline-block text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              Full menu →
            </Link>
          </div>
        </li>
        <li className="flex gap-3">
          <CalendarClock className="mt-0.5 size-5 shrink-0 text-[var(--accent)]" aria-hidden />
          <div>
            <p className="font-medium text-[var(--text-primary)]">Next up</p>
            <p className="mt-1 leading-relaxed">
              {snapshot?.next ?? site.trivia.schedule}
            </p>
            <Link
              href="/events"
              className="mt-2 inline-block text-xs font-semibold text-[var(--accent)] hover:underline"
            >
              All events →
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
