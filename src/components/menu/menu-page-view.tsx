"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import {
  menuCategories,
  menuLegal,
  menuTagline,
  type MenuCategory,
  type MenuDish,
} from "@/data/full-menu";
import { site } from "@/data/site";

function DishRow({ dish }: { dish: MenuDish }) {
  return (
    <div className="border-b border-[var(--border-subtle)] py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="max-w-xl font-medium leading-snug text-[var(--text-primary)]">
          {dish.name}
          {dish.note ? (
            <span className="mt-1 block text-sm font-normal text-[var(--accent)]">
              {dish.note}
            </span>
          ) : null}
        </h3>
        <span className="shrink-0 font-serif text-lg tabular-nums text-[var(--accent)]">
          {dish.price}
        </span>
      </div>
      {dish.description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          {dish.description}
        </p>
      ) : null}
    </div>
  );
}

function CategorySection({ cat }: { cat: MenuCategory }) {
  return (
    <section
      id={cat.id}
      className="scroll-mt-28 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 p-6 sm:p-8"
    >
      {cat.eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {cat.eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
        {cat.title}
      </h2>
      {cat.intro?.length ? (
        <div className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
          {cat.intro.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      ) : null}

      {cat.items?.length ? (
        <div className="mt-6">
          {cat.items.map((dish) => (
            <DishRow key={`${cat.id}-${dish.name}`} dish={dish} />
          ))}
        </div>
      ) : null}

      {cat.subsections?.map((sub) => (
        <div key={sub.title} className="mt-10 first:mt-8">
          <h3 className="border-b border-[var(--border-subtle)] pb-2 font-serif text-xl font-semibold text-[var(--text-primary)]">
            {sub.title}
          </h3>
          {sub.description ? (
            <p className="mt-2 text-sm text-[var(--text-muted)]">{sub.description}</p>
          ) : null}
          <div className="mt-4">
            {sub.items.map((dish) => (
              <DishRow
                key={`${cat.id}-${sub.title}-${dish.name}`}
                dish={dish}
              />
            ))}
          </div>
        </div>
      ))}

      {cat.outro ? (
        <p className="mt-6 text-sm italic text-[var(--text-muted)]">{cat.outro}</p>
      ) : null}
    </section>
  );
}

export function MenuPageView() {
  return (
    <div className="grain relative pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[var(--accent)]/8 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
            {site.name}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight text-[var(--text-primary)] sm:text-5xl">
            {menuTagline}
          </h1>
          <p className="mt-4 text-lg text-[var(--text-muted)]">
            Everything from apps to brunch cocktails — same welcome you get at the bar,
            easier to read than a PDF on your phone.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/order"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--bg-deep)] transition hover:brightness-110"
            >
              <ShoppingBag className="size-4" aria-hidden />
              Order takeout
            </Link>
            <a
              href={`tel:${site.phoneTel}`}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-6 py-3 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent)]"
            >
              Call {site.phone}
            </a>
            <Link
              href="/#menu-highlights"
              className="focus-ring inline-flex items-center gap-2 rounded-full px-2 py-3 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Menu highlights
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-12 lg:flex-row lg:gap-16">
          <nav
            aria-label="Menu sections"
            className="lg:w-56 lg:shrink-0 lg:pt-2"
          >
            <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] lg:block">
              Jump to
            </p>
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {menuCategories.map((cat) => (
                <li key={cat.id} className="shrink-0">
                  <a
                    href={`#${cat.id}`}
                    className="focus-ring block rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-2 text-center text-sm font-medium text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--text-primary)] lg:border-transparent lg:bg-transparent lg:px-3 lg:text-left lg:hover:bg-[var(--bg-card)]"
                  >
                    {cat.nav}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 flex-1 space-y-12">
            {menuCategories.map((cat) => (
              <CategorySection key={cat.id} cat={cat} />
            ))}

            <section
              id="policies"
              className="scroll-mt-28 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 sm:p-8"
            >
              <h2 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                Before you order
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text-muted)]">
                {menuLegal.map((line) => (
                  <li key={line.slice(0, 24)} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 font-serif text-lg font-semibold text-[var(--text-primary)]">
                What are you waiting for? Get down here.
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {site.address.street}, {site.address.city}, {site.address.state}{" "}
                {site.address.zip} · {site.phone}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
