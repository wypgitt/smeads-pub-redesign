"use client";

import Link from "next/link";
import {
  Bot,
  Clock3,
  MapPin,
  Moon,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useAskSmeads } from "@/components/providers/ask-smeads-provider";
import { site } from "@/data/site";

const items = [
  { href: "/order", label: "Order", icon: ShoppingBag, kind: "link" as const },
  { href: "/menu", label: "Menu", icon: UtensilsCrossed, kind: "link" as const },
  { href: "#tonight", label: "Tonight", icon: Moon, kind: "link" as const },
  {
    href: "/contact#hours",
    label: "Hours",
    icon: Clock3,
    kind: "link" as const,
  },
  { href: "/contact", label: "Directions", icon: MapPin, kind: "link" as const },
  { label: "Ask AI", icon: Bot, kind: "ask" as const },
];

export function TaskStrip() {
  const { toggleAsk } = useAskSmeads();

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        if (item.kind === "ask") {
          return (
            <button
              key={item.label}
              type="button"
              onClick={toggleAsk}
              className="focus-ring inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent)]/50 bg-[var(--accent)]/10 px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)]/20"
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </button>
          );
        }
        return (
          <Link
            key={item.label}
            href={item.href}
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/90 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--accent)]/50"
          >
            <Icon className="size-4 text-[var(--accent)]" aria-hidden />
            {item.label}
          </Link>
        );
      })}
      <a
        href={`tel:${site.phoneTel}`}
        className="focus-ring inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] px-4 py-2.5 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]"
      >
        Call
      </a>
    </div>
  );
}
