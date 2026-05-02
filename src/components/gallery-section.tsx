"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/data/site";

export function GallerySection() {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = index !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [index]);

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Inside & out" title="Gallery" align="center">
          <p className="mx-auto">
            A taste of the vibe — swap these placeholders for your real photos anytime.
          </p>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {site.gallery.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setIndex(i)}
              className="focus-ring group relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
                <span className="text-sm font-medium text-white">{img.caption}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && site.gallery[index] ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={site.gallery[index].caption}
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-deep)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="focus-ring absolute right-3 top-3 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur hover:bg-black/70"
                onClick={close}
                aria-label="Close image"
              >
                <X className="size-5" />
              </button>
              <div className="relative aspect-[16/10] w-[min(100vw-2rem,56rem)]">
                <Image
                  src={site.gallery[index].src}
                  alt={site.gallery[index].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
              <p className="border-t border-[var(--border-subtle)] px-4 py-3 text-center text-sm text-[var(--text-muted)]">
                {site.gallery[index].caption}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
