"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";
import { upcomingThursdayIsos } from "@/lib/upcoming-thursdays";

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const PREVIEW_COUNT = 6;

export function EventsSection() {
  const dates = upcomingThursdayIsos(PREVIEW_COUNT);

  return (
    <section
      id="events"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="On the calendar" title="What’s happening">
          <p>
            Taco Tuesday, live music, charity nights, and more — follow{" "}
            <a
              href={site.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            >
              Facebook
            </a>
            . Full lineup & flyer on our{" "}
            <Link
              href="/events"
              className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
            >
              events page
            </Link>
            .
          </p>
        </SectionHeading>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
                <Sparkles className="size-6" aria-hidden />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
                  {site.trivia.title}
                </h3>
                <p className="mt-2 text-[var(--accent)]">{site.trivia.schedule}</p>
                <p className="mt-4 text-[var(--text-muted)] leading-relaxed">
                  {site.trivia.description}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <CalendarDays className="size-5 text-[var(--accent)]" aria-hidden />
              <span className="font-semibold">Upcoming trivia nights</span>
            </div>
            <ul className="mt-4 space-y-2">
              {dates.map((iso) => (
                <li
                  key={iso}
                  className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2 text-sm"
                >
                  <span className="text-[var(--text-primary)]">{formatDate(iso)}</span>
                  <span className="tabular-nums text-[var(--text-muted)]">7–9 pm</span>
                </li>
              ))}
            </ul>
            <Link
              href="/events"
              className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              All events &amp; flyer
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
