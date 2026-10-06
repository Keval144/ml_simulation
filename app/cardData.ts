import { articleReadingTime } from "@/lib/metadata";

export const learningCards = [
  {
    title: "Gradient Descent",
    description:
      "Visualize how optimization works step-by-step on real loss surfaces.",
    href: "/learn/gradient-descent",
    image: "/images/regression/gradient-descent.webp",
    badge: "Optimization",
    readingTime: articleReadingTime["gradient-descent"],
  },
  {
    title: "Linear Regression",
    description:
      "Interactive exploration of linear regression and least squares fitting.",
    href: "/learn/linear-regression",
    image: "/images/regression/linear-regression.webp",
    badge: "Regression",
    readingTime: articleReadingTime["linear-regression"],
  },
  {
    title: "Polynomial Regression",
    description:
      "Understand overfitting, underfitting, and model complexity visually.",
    href: "/learn/polynomial-regression",
    image: "/images/regression/polynomial-regression.webp",
    badge: "Regression",
    readingTime: articleReadingTime["polynomial-regression"],
  },
  {
    title: "Support Vector Regression",
    description:
      "Explore epsilon tubes, margins, and support vectors interactively.",
    href: "/learn/svr",
    image: "/images/regression/svr.webp",
    badge: "Advanced",
    readingTime: articleReadingTime["svr"],
  },
  {
    title: "Logistic Regression",
    description:
      "Binary classification, sigmoid functions, and decision boundaries.",
    href: "/learn/logistic-regression",
    image: "/images/classification/logistic-regression.webp",
    badge: "Classification",
    readingTime: articleReadingTime["logistic-regression"],
  },
  {
    title: "Decision Trees",
    description:
      "Flowchart-style classification with Gini impurity, entropy, and pruning.",
    href: "/learn/decision-trees",
    image: "/images/classification/decision-tree-v2.webp",
    badge: "Classification",
    readingTime: articleReadingTime["decision-trees"],
  },
];
