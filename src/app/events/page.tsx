import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { EventsPageView } from "@/components/events/events-page-view";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Events",
  description: `Trivia, specials, and what's next at ${site.name} — Washougal, WA.`,
};

export default function EventsPage() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-deep)]">
      <SiteHeader />
      <main className="flex-1">
        <EventsPageView />
      </main>
      <SiteFooter />
    </div>
  );
}
