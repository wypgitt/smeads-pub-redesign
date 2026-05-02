"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

type Tile = { src: string; alt: string; caption: string };

export function HeroMosaic({ tiles }: { tiles: Tile[] }) {
  const [feature, ...supporting] = tiles;
  if (!feature) return null;

  return (
    <div className="grid gap-3">
      <MosaicTile tile={feature} variant="feature" priority />
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {supporting.slice(0, 3).map((t) => (
          <MosaicTile key={t.src} tile={t} variant="support" />
        ))}
      </div>
    </div>
  );
}

function MosaicTile({
  tile,
  variant,
  priority = false,
}: {
  tile: Tile;
  variant: "feature" | "support";
  priority?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const isFeature = variant === "feature";
  const aspectClass = isFeature ? "aspect-[16/10]" : "aspect-square";

  if (broken) {
    return (
      <div
        className={`flex ${aspectClass} flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-3 text-center`}
      >
        <ImageIcon className="size-8 text-[var(--accent)]/50" aria-hidden />
        <p className="text-xs text-[var(--text-muted)]">{tile.caption}</p>
        <p className="text-[0.65rem] text-[var(--text-muted)]/80">
          Photo temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`group relative ${aspectClass} overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-lg shadow-black/20`}
    >
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes={
          isFeature
            ? "(max-width: 1024px) 100vw, 520px"
            : "(max-width: 640px) 30vw, 160px"
        }
        priority={priority}
        onError={() => setBroken(true)}
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent ${
          isFeature ? "p-4 pt-16" : "p-2 pt-8"
        }`}
      >
        <p
          className={`font-medium text-white ${
            isFeature ? "text-base sm:text-lg" : "text-xs sm:text-sm"
          }`}
        >
          {tile.caption}
        </p>
      </div>
    </div>
  );
}
