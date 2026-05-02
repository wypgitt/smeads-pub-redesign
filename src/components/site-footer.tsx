import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const secondary = [
    { href: "/#about", label: "About" },
    { href: "/#specials", label: "Specials" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#karaoke", label: "Karaoke" },
    { href: "/menu", label: "Full menu" },
    { href: "/contact", label: "Contact" },
  ] as const;

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandMark size="footer" />
          <div>
            <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{site.tagline}</p>
          </div>
        </div>

        <nav
          className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--text-muted)]"
          aria-label="Footer"
        >
          {secondary.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[var(--text-muted)] underline-offset-4 hover:text-[var(--accent)] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 text-xs text-[var(--text-muted)]">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
