import Image from "next/image";
import { site } from "@/data/site";

type Size = "header" | "footer" | "drawer";

const sizeClass: Record<Size, string> = {
  header: "h-9 w-9 sm:h-10 sm:w-10",
  footer: "h-14 w-14 sm:h-16 sm:w-16",
  drawer: "h-10 w-10",
};

export function BrandMark({
  size,
  className = "",
  priority = false,
}: {
  size: Size;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={site.brandMarkSrc}
      alt=""
      width={512}
      height={512}
      priority={priority}
      className={`object-contain ${sizeClass[size]} ${className}`}
      aria-hidden
    />
  );
}
