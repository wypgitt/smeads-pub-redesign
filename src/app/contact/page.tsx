import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactPageView } from "@/components/contact/contact-page-view";
import { site } from "@/data/site";
import { JsonLd } from "@/components/contact/json-ld";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.phone}, ${site.email}. 3395 Evergreen Way, Washougal, WA.`,
};

export default function ContactPage() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-deep)]">
      <JsonLd />
      <SiteHeader />
      <main className="flex-1">
        <ContactPageView />
      </main>
      <SiteFooter />
    </div>
  );
}
