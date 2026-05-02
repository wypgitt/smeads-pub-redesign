import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MenuPageView } from "@/components/menu/menu-page-view";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Smeads Pub full menu — appetizers, burgers, sandwiches, breakfast, cocktails, and more. Washougal, WA.",
};

export default function MenuPage() {
  return (
    <div className="flex min-h-full flex-col bg-[var(--bg-deep)]">
      <SiteHeader />
      <main className="flex-1">
        <MenuPageView />
      </main>
      <SiteFooter />
    </div>
  );
}
