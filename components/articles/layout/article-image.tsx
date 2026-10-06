"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { blurDataURL } from "@/lib/blur";

type ArticleImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

/**
 * Click-to-expand hero image. Thumbnail opens a fullscreen lightbox;
 * clicking the backdrop, pressing Escape, or the X button closes it.
 */
export function ArticleImage({ src, alt, priority, className }: ArticleImageProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <figure className={cn("relative my-10 aspect-video rounded-xl border-2", className)}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Expand image: ${alt}`}
          aria-haspopup="dialog"
          className="group absolute inset-0 block h-full w-full cursor-zoom-in rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority ?? true}
            loading={priority === false ? "lazy" : undefined}
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="(max-width: 768px) 100vw, 800px"
            quality={src.endsWith(".svg") ? undefined : 85}
            className="rounded-xl object-cover"
          />
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            <Expand size={14} aria-hidden="true" />
            Expand
          </span>
        </button>
      </figure>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close image"
            className="absolute right-4 top-4 rounded-full bg-background/90 p-2 text-foreground shadow-lg transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X size={20} aria-hidden="true" />
          </button>
          {/* Stop propagation so clicks on the image itself don't close. */}
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative aspect-video w-[min(90vw,64rem)]"
          >
            <Image
              src={src}
              alt={alt}
              fill
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="90vw"
              quality={src.endsWith(".svg") ? undefined : 90}
              className="rounded-xl object-contain"
            />
            {alt && (
              <figcaption className="absolute -bottom-8 left-0 right-0 truncate text-center text-sm text-white/80">
                {alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
