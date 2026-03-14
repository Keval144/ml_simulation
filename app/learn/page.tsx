"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, BookOpen } from "lucide-react";
import { LearningCard } from "@/components/learning-card";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  badge: string;
  category:
    | "regression"
    | "classification"
    | "clustering"
    | "testing"
    | "tuning"
    | "cleaning"
    | "other";
}

const CATEGORY_TITLES: Record<Article["category"], string> = {
  regression: "Regression",
  classification: "Classification",
  clustering: "Clustering",
  testing: "Testing",
  tuning: "Fine Tuning HyperParameters",
  cleaning: "Cleaning Datas",
  other: "Advanced & Experimental",
};

const articles: Article[] = [
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description:
      "Visualize how gradient descent optimizes models by minimizing a loss function",
    image: "/images/regression/gradient-descent.png",
    badge: "Regression",
    category: "regression",
  },
  {
    id: "linear-regression",
    title: "Linear Regression",
    description:
      "Interactive exploration of linear regression, least squares fitting, and model behavior",
    image: "/images/regression/linear-regression.png",
    badge: "Regression",
    category: "regression",
  },
  {
    id: "polynomial-regression",
    title: "Polynomial Regression",
    description:
      "Understand how polynomial features allow regression models to fit non-linear patterns",
    image: "/images/regression/polynomial-regression.png",
    badge: "Regression",
    category: "regression",
  },
  {
    id: "svr",
    title: "Support Vector Regression",
    description:
      "Explore SVR concepts including epsilon tubes, margins, and support vectors",
    image: "/images/regression/svr.png",
    badge: "Regression",
    category: "regression",
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    description:
      "Visual and interactive guide to binary classification, sigmoid functions, and decision boundaries",
    image: "/images/classification/logistic-regression.png",
    badge: "Classification",
    category: "classification",
  },
  {
    id: "decision-trees",
    title: "Decision Trees",
    description:
      "Learn how trees split data with impurity measures, pruning, and flowchart-like rules",
    image: "/images/classification/decision-tree.svg",
    badge: "Classification",
    category: "classification",
  },
  {
    id: "k-nearest-neighbors",
    title: "K-Nearest Neighbors",
    description:
      "Distance-based classification with local voting, feature scaling, and choosing the right k",
    image: "/images/classification/k-nearest-neighbors.svg",
    badge: "Classification",
    category: "classification",
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    description:
      "Probability-driven classification with Bayes' theorem, priors, and smoothing",
    image: "/images/classification/naive-bayes.svg",
    badge: "Classification",
    category: "classification",
  },
  {
    id: "kernel-trick",
    title: "Kernel Methods",
    description:
      "Visualize how kernel tricks transform data into higher-dimensional spaces",
    image: "/images/other/kernel-trick.png",
    badge: "Advanced",
    category: "other",
  },
];

export default function SimulationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  /* ⌘K / CtrlK focus + Esc clear */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (e.key === "Escape") {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const query = searchQuery.trim().toLowerCase();

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query),
  );

  const groupedArticles = filteredArticles.reduce<
    Record<Article["category"], Article[]>
  >(
    (acc, article) => {
      acc[article.category].push(article);
      return acc;
    },
    {
      regression: [],
      classification: [],
      clustering: [],
      testing: [],
      tuning: [],
      cleaning: [],
      other: [],
    },
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <h1 className="text-4xl font-bold">ML Articles</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Articles & visual explanations to understand machine learning concepts
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Search articles… (⌘+K)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 border-2"
        />

        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Sections */}
      <div className="space-y-16">
        {(Object.keys(CATEGORY_TITLES) as Article["category"][]).map(
          (category) => {
            const items = groupedArticles[category];
            if (items.length === 0) return null;

            return (
              <section key={category} className="space-y-6">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {CATEGORY_TITLES[category]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((article) => (
                    <LearningCard
                      key={article.id}
                      title={article.title}
                      description={article.description}
                      href={`/learn/${article.id}`}
                      image={article.image}
                      badge={article.badge}
                    />
                  ))}
                </div>
              </section>
            );
          },
        )}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No articles found matching &quot;{searchQuery}&quot;
        </div>
      )}
    </div>
  );
}
