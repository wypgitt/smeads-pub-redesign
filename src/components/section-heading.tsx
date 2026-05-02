import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  id,
  align = "left",
}: Props) {
  return (
    <div
      id={id}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-3 max-w-2xl text-base text-[var(--text-muted)] sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}
