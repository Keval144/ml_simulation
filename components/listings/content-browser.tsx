"use client";

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, SearchX } from "lucide-react";
import { LearningCard } from "@/components/cards/learning-card";
import { QuickTags } from "@/components/listings/quick-tags";
import { useSearchShortcut } from "@/lib/hooks/use-search-shortcut";

export interface BrowserItem {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  category: string;
  readingTime?: number;
}

export interface BrowserCategory {
  value: string;
  title: string;
}

type ContentBrowserProps = {
  items: BrowserItem[];
  /** Section order + headings (drives grouping, so every value renders). */
  categories: BrowserCategory[];
  /** Noun for search UI, e.g. "articles". */
  searchNoun: string;
  /** Empty-state heading, e.g. "No articles found". */
  emptyTitle: string;
  hrefFor: (item: BrowserItem) => string;
  cardVariant?: "read" | "simulation";
  /** Category whose first card preloads its image (LCP). */
  eagerCategory?: string;
  /** Extra per-item match beyond title/description/badge/category. */
  matchesExtra?: (item: BrowserItem, query: string) => boolean;
  /** Wrap a card, e.g. hover-prefetch wrapper. Must set key. */
  wrapCard?: (card: ReactNode, item: BrowserItem) => ReactNode;
  /** Runs once on mount, e.g. CDN preconnect warm-up. */
  onMount?: () => void;
};

/**
 * Shared search/filter/group listing behind /learn, /simulations and
 * /cheatsheets: search input with ⌘K shortcut, badge quick tags,
 * category sections of LearningCards, and a no-results empty state.
 */
export function ContentBrowser({
  items,
  categories,
  searchNoun,
  emptyTitle,
  hrefFor,
  cardVariant = "read",
  eagerCategory,
  matchesExtra,
  wrapCard,
  onMount,
}: ContentBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Stable callback so the global keydown listener isn't re-registered per render.
  const clearSearch = useCallback(() => setSearchQuery(""), []);
  const searchInputRef = useSearchShortcut(clearSearch);
  useEffect(() => {
    onMount?.();
  }, [onMount]);
  // Keep typing responsive while filtering cards + images.
  const deferredQuery = useDeferredValue(searchQuery.trim().toLowerCase());

  const grouped = useMemo(() => {
    const groups: Record<string, BrowserItem[]> = Object.fromEntries(
      categories.map((c) => [c.value, []]),
    );
    for (const item of items) {
      if (
        deferredQuery &&
        !item.title.toLowerCase().includes(deferredQuery) &&
        !item.description.toLowerCase().includes(deferredQuery) &&
        !item.badge.toLowerCase().includes(deferredQuery) &&
        !item.category.toLowerCase().includes(deferredQuery) &&
        !(matchesExtra?.(item, deferredQuery) ?? false)
      ) {
        continue;
      }
      groups[item.category]?.push(item);
    }
    return groups;
  }, [items, categories, deferredQuery, matchesExtra]);

  // Quick tags use card badges only — no freeform terms.
  const badgeTags = useMemo(
    () => Array.from(new Set(items.map((i) => i.badge))),
    [items],
  );

  const resultCount = useMemo(
    () =>
      categories.reduce((n, c) => n + (grouped[c.value]?.length ?? 0), 0),
    [grouped, categories],
  );

  return (
    <>
      {/* Search */}
      <div className="relative mb-3">
        <Search
          aria-hidden
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={searchInputRef}
          type="text"
          aria-label={`Search ${searchNoun}`}
          placeholder={`Search ${searchNoun}… (⌘+K)`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <QuickTags
        tags={badgeTags}
        activeQuery={searchQuery}
        onSelect={setSearchQuery}
      />

      {/* Sections */}
      <div className="space-y-16">
        {categories.map(({ value, title }) => {
          const list = grouped[value] ?? [];
          if (list.length === 0) return null;
          return (
            <section key={value} className="space-y-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                {title}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {list.map((item, i) => {
                  const card = (
                    <LearningCard
                      key={item.id}
                      title={item.title}
                      description={item.description}
                      href={hrefFor(item)}
                      image={item.image}
                      badge={item.badge}
                      variant={cardVariant}
                      readingTime={item.readingTime}
                      priority={eagerCategory !== undefined && value === eagerCategory && i === 0}
                    />
                  );
                  return wrapCard ? wrapCard(card, item) : card;
                })}
              </div>
            </section>
          );
        })}
      </div>

      {resultCount === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/60 py-20 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <SearchX className="h-6 w-6" aria-hidden />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">{emptyTitle}</p>
            <p className="text-muted-foreground">
              Nothing matches &quot;{searchQuery}&quot;
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={clearSearch}>
            Clear search
          </Button>
        </div>
      )}
    </>
  );
}
