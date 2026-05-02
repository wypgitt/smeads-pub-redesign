"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

type Tile = { src: string; alt: string; caption: string };

export function HeroMosaic({ tiles }: { tiles: Tile[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {tiles.map((t) => (
        <MosaicTile key={t.src} tile={t} />
      ))}
    </div>
  );
}

function MosaicTile({ tile }: { tile: Tile }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-card)]/80 p-3 text-center">
        <ImageIcon className="size-8 text-[var(--accent)]/50" aria-hidden />
        <p className="text-xs text-[var(--text-muted)]">{tile.caption}</p>
        <p className="text-[0.65rem] text-[var(--text-muted)]/80">
          Photo temporarily unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 45vw, 220px"
        onError={() => setBroken(true)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2 pt-8">
        <p className="text-xs font-medium text-white sm:text-sm">{tile.caption}</p>
      </div>
    </div>
  );
}
