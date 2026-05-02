import Link from "next/link";
import { site } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-deep)] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-serif text-lg font-semibold text-[var(--text-primary)]">
            {site.name}
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{site.tagline}</p>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
        <p className="text-sm text-[var(--text-muted)]">
          <Link
            href={site.creditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent)]"
          >
            {site.credit}
          </Link>
        </p>
      </div>
    </footer>
  );
}
