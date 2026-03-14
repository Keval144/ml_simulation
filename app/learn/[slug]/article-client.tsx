"use client";

import GradientDescentArticle from "@/components/articles/GradientDescentArticle";
import KernelTrickArticle from "@/components/articles/KernelTrickArticle";
import KNearestNeighborsArticle from "@/components/articles/KNearestNeighborsArticle";
import LeastSquaresArticle from "@/components/articles/LeastSquaresArticle";
import LinearRegressionArticle from "@/components/articles/LinearRegressionArticle";
import LogisticRegressionArticle from "@/components/articles/LogisticRegressionArticle";
import NaiveBayesArticle from "@/components/articles/NaiveBayesArticle";
import PolynomialRegressionArticle from "@/components/articles/PolynomialRegressionArticle";
import SVRArticle from "@/components/articles/SVRArticle";
import DecisionTreeArticle from "@/components/articles/DecisionTreeArticle";

const articleComponents: Record<string, React.ComponentType> = {
  "gradient-descent": GradientDescentArticle,
  "least-squares": LeastSquaresArticle,
  "linear-regression": LinearRegressionArticle,
  "polynomial-regression": PolynomialRegressionArticle,
  "logistic-regression": LogisticRegressionArticle,
  "decision-trees": DecisionTreeArticle,
  "k-nearest-neighbors": KNearestNeighborsArticle,
  "naive-bayes": NaiveBayesArticle,
  "kernel-trick": KernelTrickArticle,
  svr: SVRArticle,
};

export default function ArticleClient({ slug }: { slug: string }) {
  const ArticleComponent = articleComponents[slug];

  if (!ArticleComponent) {
    return null;
  }

  return <ArticleComponent />;
}
