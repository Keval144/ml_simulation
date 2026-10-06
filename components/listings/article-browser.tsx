"use client";

import {
  ContentBrowser,
  type BrowserCategory,
} from "@/components/listings/content-browser";

export interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  readingTime?: number;
  category:
    | "beginner"
    | "regression"
    | "classification"
    | "clustering"
    | "testing"
    | "tuning"
    | "cleaning"
    | "other";
}

const CATEGORIES: BrowserCategory[] = [
  { value: "beginner", title: "Beginner" },
  { value: "regression", title: "Regression" },
  { value: "classification", title: "Classification" },
  { value: "clustering", title: "Clustering" },
  { value: "testing", title: "Testing" },
  { value: "tuning", title: "Fine Tuning HyperParameters" },
  { value: "cleaning", title: "Cleaning Datas" },
  { value: "other", title: "Advanced & Experimental" },
];

export function ArticleBrowser({ articles }: { articles: Article[] }) {
  return (
    <ContentBrowser
      items={articles}
      categories={CATEGORIES}
      searchNoun="articles"
      emptyTitle="No articles found"
      hrefFor={(a) => `/learn/${a.id}`}
      eagerCategory="regression"
    />
  );
}
