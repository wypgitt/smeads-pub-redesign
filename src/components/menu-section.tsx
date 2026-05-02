import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

export function MenuSection() {
  return (
    <section
      id="menu-highlights"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeading eyebrow="Eat & drink" title="Menu highlights">
            <p>{site.specialsIntro}</p>
          </SectionHeading>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8">
            <ul className="space-y-4">
              {site.menuHighlights.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[var(--text-muted)]"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                  <span className="text-lg">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/order"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110"
              >
                <ShoppingBag className="size-4" aria-hidden />
                Order takeout
              </Link>
              <Link
                href="/menu"
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-deep)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--accent)]"
              >
                Full menu
              </Link>
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Prices and specials can change — ask your bartender or server what&apos;s
              on tonight.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
