export const siteConfig = {
  name: "ML Simulations",
  // Canonical production URL. VERCEL_URL is a per-deployment hostname
  // (often auth-protected), so it must never be used for OG URLs —
  // scrapers fetch og:image out-of-band and get a login redirect instead
  // of an image. Explicit env wins, then the project's production alias.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://mlsimulation.vercel.app"),
  description:
    "Interactive machine learning simulations designed to help students understand concepts through hands-on experimentation.",
};

/** Fallback "last updated" (ISO) shown in every article footer until
 * per-article dates land. Bumped when article chrome/content changes. */
export const ARTICLE_LAST_UPDATED_ISO = "2026-10-06";

/**
 * Minutes per article at 200 wpm, measured with the same extractText logic
 * as ArticlePost's header pill — cards reuse these so numbers never drift.
 */
export const articleReadingTime: Record<string, number> = {
  "gradient-descent": 5,
  "least-squares": 3,
  "linear-regression": 4,
  "polynomial-regression": 3,
  "logistic-regression": 3,
  "decision-trees": 4,
  "k-nearest-neighbors": 3,
  "naive-bayes": 3,
  "kernel-trick": 4,
  svr: 3,
  "what-is-ml": 6,
  "first-project": 6,
  "good-vs-bad-models": 5,
};

export const simulationMetadata: Record<
  string,
  { title: string; description: string; image: string }
> = {
  "gradient-descent": {
    title: "Gradient Descent Visualization",
    description:
      "Visualize how gradient descent optimization finds the minimum of a function. Adjust learning rate and see convergence in real-time.",
    image: "/og/gradient-descent.jpg",
  },
  "least-squares": {
    title: "Least Squares Method",
    description:
      "Interactive demonstration of ordinary least squares regression. Add data points and see the best-fit line minimize squared errors.",
    image: "/og/least-squares.jpg",
  },
  "linear-regression": {
    title: "Linear Regression Interactive",
    description:
      "Build intuition for linear regression with interactive data points. Add, remove, and see how the regression line changes.",
    image: "/og/linear-regression.jpg",
  },
  "polynomial-regression": {
    title: "Polynomial Regression",
    description:
      "Explore polynomial curve fitting with adjustable degree. Drag control points and see how higher-degree polynomials fit data.",
    image: "/og/polynomial-regression.jpg",
  },
  "logistic-regression": {
    title: "Logistic Regression",
    description:
      "Understand binary classification with logistic regression. Visualize probability predictions and decision boundaries.",
    image: "/og/logistic-regression.jpg",
  },
  "logistic-function": {
    title: "Logistic Function Visualizer",
    description:
      "Explore the sigmoid function shape. Adjust weight and bias parameters to see how they affect the logistic curve.",
    image: "/og/sim-logistic-function.jpg",
  },
  "logistic-training": {
    title: "Logistic Training Simulation",
    description:
      "Watch logistic regression learn in real-time with stochastic gradient descent. See loss curves and weight updates.",
    image: "/og/sim-logistic-training.jpg",
  },
  "kernel-trick": {
    title: "Kernel Trick Visualizer",
    description:
      "See how kernel methods transform non-linearly separable data into higher dimensions where it becomes separable.",
    image: "/og/kernel-trick.jpg",
  },
  "k-nearest-neighbors": {
    title: "K-Nearest Neighbors Playground",
    description:
      "Click anywhere and watch the k closest points vote. Tune k, switch distance metrics, and see why feature scaling matters.",
    image: "/og/k-nearest-neighbors.jpg",
  },
  "decision-trees": {
    title: "Decision Tree Playground",
    description:
      "Watch one tree grow split by split, then push depth and feel overfitting happen.",
    image: "/og/decision-trees.jpg",
  },
  "naive-bayes": {
    title: "Naive Bayes Detective",
    description:
      "Stack word clues, tune priors and smoothing, and watch posterior odds move like a detective weighing evidence.",
    image: "/og/naive-bayes.jpg",
  },
  "naive-bayes-gaussian": {
    title: "Gaussian Naive Bayes",
    description:
      "Drag class blobs and watch the Bayes decision boundary follow the math.",
    image: "/og/naive-bayes.jpg",
  },
  "svr-visualizer": {
    title: "Support Vector Regression",
    description:
      "Understand SVR with epsilon tubes and support vectors. Interactive visualization of margin and kernel effects.",
    image: "/og/svr.jpg",
  },
  "svr-kernel-lift": {
    title: "SVR Kernel Lift",
    description:
      "An interactive visualization showing how Support Vector Regression lifts curved data into higher-dimensional space to enable linear regression.",
    image: "/og/sim-svr-kernel-lift.jpg",
  },
};

export const articleMetadata: Record<
  string,
  { title: string; description: string; image: string; author: string }
> = {
  "gradient-descent": {
    title: "Understanding Gradient Descent",
    description:
      "Learn how gradient descent optimizes models by minimizing loss functions. Visual explanations of learning rate, convergence, and local minima.",
    image: "/og/gradient-descent.jpg",
    author: "Keval Kansagra",
  },
  "least-squares": {
    title: "Least Squares Method Explained",
    description:
      "Understand the mathematical foundation of ordinary least squares regression and how it finds the best-fit line.",
    image: "/og/least-squares.jpg",
    author: "Het Bhuva",
  },
  "linear-regression": {
    title: "Linear Regression Explained",
    description:
      "A comprehensive guide to linear regression, the foundational statistical technique for predictive modeling.",
    image: "/og/linear-regression.jpg",
    author: "Keval Kansagra",
  },
  "polynomial-regression": {
    title: "Polynomial Regression Guide",
    description:
      "Learn how polynomial features allow regression models to fit non-linear patterns. Understand overfitting and model complexity.",
    image: "/og/polynomial-regression.jpg",
    author: "Keval Kansagra",
  },
  "logistic-regression": {
    title: "Logistic Regression Fundamentals",
    description:
      "Visual guide to binary classification with logistic regression. Understand sigmoid functions and decision boundaries.",
    image: "/og/logistic-regression.jpg",
    author: "Keval Kansagra",
  },
  "decision-trees": {
    title: "Decision Trees Explained",
    description:
      "Learn how decision trees split data into pure branches using Gini impurity, entropy, pruning, and simple rules.",
    image: "/og/decision-trees.jpg",
    author: "Codex",
  },
  "k-nearest-neighbors": {
    title: "K-Nearest Neighbors Guide",
    description:
      "Understand KNN classification with distance metrics, voting, scaling, and practical tips for choosing k.",
    image: "/og/k-nearest-neighbors.jpg",
    author: "Codex",
  },
  "naive-bayes": {
    title: "Naive Bayes Classification",
    description:
      "Fast probabilistic classification with Bayes' theorem, smoothing, priors, and practical text examples.",
    image: "/og/naive-bayes.jpg",
    author: "Codex",
  },
  "kernel-trick": {
    title: "Kernel Methods Explained",
    description:
      "Discover how kernel tricks transform data into higher-dimensional spaces. Learn about RBF, polynomial, and linear kernels.",
    image: "/og/kernel-trick.jpg",
    author: "Het Bhuva",
  },
  svr: {
    title: "Support Vector Regression",
    description:
      "Comprehensive guide to SVR including epsilon tubes, margins, and support vectors. Learn kernel-based regression.",
    image: "/og/svr.jpg",
    author: "Het Bhuva",
  },
  "what-is-ml": {
    title: "Regression, Classification, and Deep Learning",
    description:
      "Learn what a model is, how regression and classification differ, where deep learning fits, and which tools beginners use first.",
    image: "/og/home.jpg",
    author: "Keval Kansagra",
  },
  "first-project": {
    title: "From Messy CSV to Working Prediction API",
    description:
      "Build a local prediction API with a virtual environment, pandas, scikit-learn, FastAPI, and the beginner AI engineering loop.",
    image: "/og/home.jpg",
    author: "Keval Kansagra",
  },
  "good-vs-bad-models": {
    title: "Your Model Is Cheating",
    description:
      "Understand underfitting, overfitting, validation, L1, L2, and regularization through one visual model experiment.",
    image: "/og/home.jpg",
    author: "Keval Kansagra",
  },
};
