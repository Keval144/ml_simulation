import * as React from "react";
import { Children, cloneElement, isValidElement } from "react";
import { Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTICLE_LAST_UPDATED_ISO } from "@/lib/metadata";
import { ArticleImage } from "./article-image";
import { ArticleActions } from "./article-actions";
import { Breadcrumb } from "./article-breadcrumb";
import { slugify } from "./use-active-section";

const WORDS_PER_MINUTE = 200;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats "2026-10-06" → "October 6, 2026" without locale-dependent Date APIs. */
function formatISODate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number")
    return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: React.ReactNode }>(node))
    return extractText(node.props.children);
  return "";
}

/**
 * Assigns stable ids to h2s at RENDER time (server + client identical).
 * Previously ids were stamped by collectToc in an effect — the first client
 * render then differed from SSR HTML (hydration mismatch), and TOC
 * collection raced the dynamic article chunk. Headings nested inside custom
 * components stay mutation-fallback via collectToc (no warning either way,
 * since neither side renders an id for those).
 */
function assignHeadingIds(
  node: React.ReactNode,
  used: Set<string>,
): React.ReactNode {
  // Children.toArray re-keys runtime arrays (static JSX children lose
  // their compile-time key exemption once remapped) — kills the
  // "unique key prop" warnings without touching article sources.
  if (Array.isArray(node))
    return Children.toArray(node).map((c) => assignHeadingIds(c, used));
  if (!isValidElement(node)) return node;
  const props = node.props as { id?: string; children?: React.ReactNode };
  if (typeof node.type === "string" && node.type === "h2" && !props.id) {
    const base = slugify(extractText(props.children)) || "section";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return cloneElement(node, { id } as Partial<unknown> as object);
  }
  if (props?.children) {
    const kids = assignHeadingIds(props.children, used);
    if (kids !== props.children)
      return cloneElement(node, { children: kids } as Partial<unknown> as object);
  }
  return node;
}

type ArticlePostProps = {
  title: string;
  author: string;
  date?: string;
  /** ISO date ("2026-10-06") shown as "Last updated" in the footer. */
  updated?: string;
  description?: React.ReactNode;
  image?: {
    src: string;
    alt?: string;
    /** Above-fold hero image — preloads instead of lazy-loading (LCP). */
    priority?: boolean;
  };
  children?: React.ReactNode;
  className?: string;
  /** Optional breadcrumb trail. When omitted, a Home / Learn / title trail renders. */
  breadcrumb?: { label: string; href?: string }[];
};

export function ArticlePost({
  title,
  author,
  date,
  updated = ARTICLE_LAST_UPDATED_ISO,
  description,
  image,
  children,
  className,
  breadcrumb,
}: ArticlePostProps) {
  // Deterministic across server/client (memo on stable children identity).
  const body = React.useMemo(
    () => assignHeadingIds(children, new Set<string>()),
    [children],
  );
  // Reading time from prose (headings, paragraphs, callouts). Code passed
  // via `code` props isn't plain children text, so this stays a read estimate.
  const minutes = React.useMemo(() => {
    const text = extractText([title, description, children]);
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  }, [title, description, children]);
  return (
    <article className={cn("mx-auto w-full max-w-none py-8 sm:py-12", className)}>
      {/* Header */}
      <header className="space-y-6">
        <Breadcrumb
          items={
            breadcrumb ?? [
              { label: "Home", href: "/" },
              { label: "Learn", href: "/learn" },
              { label: title },
            ]
          }
        />
        <h1 className="text-3xl font-semibold leading-tight tracking-tight">
          {title}
        </h1>

        <div className="text-sm text-muted-foreground">
          By <span className="font-medium text-foreground">{author}</span>
          {date && <span className="mx-1">·</span>}
          {date && <time>{date}</time>}
        </div>

        {description && (
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}

        <p className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground">
          <Clock size={14} aria-hidden="true" className="text-primary" />
          <span>{minutes} min read</span>
        </p>

        <ArticleActions title={title} />
      </header>

      {/* Optional Image — click to expand, click outside / Escape to close */}
        {image && (
          <ArticleImage
            src={image.src}
            alt={image.alt ?? title}
            priority={image.priority ?? true}
          />
        )}

          {children && (
        <div data-article-body>
        <div
          className={cn(
            "max-w-none text-foreground",

            // --- PARAGRAPHS ---
            "[&>p]:text-lg",
            "[&>p]:leading-6",
            "[&>p]:mb-4",
            "[&>p]:font-normal",

            // --- H2 (Styled as H1) ---
            "[&>h2]:text-2xl",
            "[&>h2]:font-semibold!", 
            "[&>h2]:tracking-tighter",
            "[&>h2]:leading-tight",
            "[&>h2]:mb-2", 

            // --- H3 ---
            "[&>h3]:text-xl",
            "[&>h3]:font-bold",
            "[&>h3]:mt-12",
            "[&>h3]:mb-4",

            // --- DROP CAP ---
            "[&>p:first-of-type]:first-letter:text-5xl",
            "[&>p:first-of-type]:first-letter:font-semi-bold",
            "[&>p:first-of-type]:first-letter:float-left",
            "[&>p:first-of-type]:first-letter:mr-3",
            "[&>p:first-of-type]:first-letter:leading-none",

            "[&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-8",
            "[&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-8",
            "[&>li]:mb-2",
          )}
        >
          {body}
        </div>
        </div>
      )}

      {updated && (
        <footer className="mt-12 flex items-center gap-1.5 border-t border-border pt-6 text-sm text-muted-foreground">
          <History size={14} aria-hidden="true" />
          <span>
            Last updated on <time dateTime={updated}>{formatISODate(updated)}</time>
          </span>
        </footer>
      )}
    </article>
  );
}
