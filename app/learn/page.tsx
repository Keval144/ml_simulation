// app/learn/page.tsx — server shell (SEO + static header),
// interactive search/filter lives in the client island below.
import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import {
  ArticleBrowser,
  type Article,
} from "@/components/listings/article-browser";
import { articleReadingTime } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "ML Articles",
  description:
    "Articles & visual explanations to understand machine learning concepts",
  alternates: { canonical: "/learn" },
};

const articles: Article[] = [
  {
    id: "what-is-ml",
    title: "Regression, Classification, and Deep Learning",
    description:
      "What is a model, what does the answer shape mean, and where does deep learning fit?",
    image: "/article/beginner/what-is-ml-hero.webp",
    badge: "Beginner",
    category: "beginner",
    readingTime: articleReadingTime["what-is-ml"],
  },
  {
    id: "first-project",
    title: "From Messy CSV to Working Prediction API",
    description:
      "Use venv, pandas, scikit-learn, and FastAPI to build a local prediction service.",
    image: "/article/beginner/first-project-hero.webp",
    badge: "Beginner",
    category: "beginner",
    readingTime: articleReadingTime["first-project"],
  },
  {
    id: "good-vs-bad-models",
    title: "Your Model Is Cheating",
    description:
      "Find the sweet spot between underfitting, overfitting, and too much model wiggle.",
    image: "/article/beginner/good-vs-bad-hero.webp",
    badge: "Beginner",
    category: "beginner",
    readingTime: articleReadingTime["good-vs-bad-models"],
  },
  {
    id: "gradient-descent",
    title: "Gradient Descent",
    description:
      "Visualize how gradient descent optimizes models by minimizing a loss function",
    image: "/images/regression/gradient-descent.webp",
    badge: "Regression",
    category: "regression",
    readingTime: articleReadingTime["gradient-descent"],
  },
  {
    id: "linear-regression",
    title: "Linear Regression",
    description:
      "Interactive exploration of linear regression, least squares fitting, and model behavior",
    image: "/images/regression/linear-regression.webp",
    badge: "Regression",
    category: "regression",
    readingTime: articleReadingTime["linear-regression"],
  },
  {
    id: "least-squares",
    title: "Least Squares Method",
    description:
      "Understand the mathematical foundation of ordinary least squares regression and how it finds the best-fit line",
    image: "/images/regression/least-squares.webp",
    badge: "Regression",
    category: "regression",
    readingTime: articleReadingTime["least-squares"],
  },
  {
    id: "polynomial-regression",
    title: "Polynomial Regression",
    description:
      "Understand how polynomial features allow regression models to fit non-linear patterns",
    image: "/images/regression/polynomial-regression.webp",
    badge: "Regression",
    category: "regression",
    readingTime: articleReadingTime["polynomial-regression"],
  },
  {
    id: "svr",
    title: "Support Vector Regression",
    description:
      "Explore SVR concepts including epsilon tubes, margins, and support vectors",
    image: "/images/regression/svr.webp",
    badge: "Regression",
    category: "regression",
    readingTime: articleReadingTime["svr"],
  },
  {
    id: "logistic-regression",
    title: "Logistic Regression",
    description:
      "Visual and interactive guide to binary classification, sigmoid functions, and decision boundaries",
    image: "/images/classification/logistic-regression.webp",
    badge: "Classification",
    category: "classification",
    readingTime: articleReadingTime["logistic-regression"],
  },
  {
    id: "decision-trees",
    title: "Decision Trees",
    description:
      "Learn how trees split data with impurity measures, pruning, and flowchart-like rules",
    image: "/images/classification/decision-tree-v2.webp",
    badge: "Classification",
    category: "classification",
    readingTime: articleReadingTime["decision-trees"],
  },
  {
    id: "k-nearest-neighbors",
    title: "K-Nearest Neighbors",
    description:
      "Distance-based classification with local voting, feature scaling, and choosing the right k",
    image: "/images/classification/k-nearest-neighbors-v2.webp",
    badge: "Classification",
    category: "classification",
    readingTime: articleReadingTime["k-nearest-neighbors"],
  },
  {
    id: "naive-bayes",
    title: "Naive Bayes",
    description:
      "Probability-driven classification with Bayes' theorem, priors, and smoothing",
    image: "/images/classification/naive-bayes-v2.webp",
    badge: "Classification",
    category: "classification",
    readingTime: articleReadingTime["naive-bayes"],
  },
  {
    id: "kernel-trick",
    title: "Kernel Methods",
    description:
      "Visualize how kernel tricks transform data into higher-dimensional spaces",
    image: "/images/other/kernel-trick.webp",
    badge: "Advanced",
    category: "other",
    readingTime: articleReadingTime["kernel-trick"],
  },
];

export default function LearnPage() {
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

      <ArticleBrowser articles={articles} />
    </div>
  );
}
