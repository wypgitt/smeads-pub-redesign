import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TakeoutOrderClient } from "@/components/takeout/takeout-order-client";

export const metadata: Metadata = {
  title: "Order takeout",
  description:
    "Send a pickup order to Smeads Pub — Washougal. We’ll confirm by phone when needed.",
};

export default function OrderPage() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-deep)]">
      <SiteHeader />
      <main className="flex-1">
        <TakeoutOrderClient />
      </main>
      <SiteFooter />
    </div>
  );
}
