"use client";

import { ArticlePost } from "./article-post";
import {
  CodeBlock,
  MathBlock,
  CalloutBox,
  AhaBox,
  ParameterTable,
} from "./components";

const knnParams = [
  {
    name: "n_neighbors",
    type: "int",
    default: "5",
    description: "How many nearby examples get a vote.",
    impact: "Small k = flexible but noisy. Large k = smoother but can blur class boundaries.",
  },
  {
    name: "weights",
    type: "str | callable",
    default: "'uniform'",
    description: "Whether all neighbors vote equally or closer points count more.",
    impact: "'distance' often helps when the nearest points are much more trustworthy.",
  },
  {
    name: "metric",
    type: "str | callable",
    default: "'minkowski'",
    description: "Distance function used to define what 'near' means.",
    impact: "Your model quality depends heavily on whether distance matches the real geometry of the problem.",
  },
  {
    name: "p",
    type: "int",
    default: "2",
    description: "Power parameter for the Minkowski metric. p=2 gives Euclidean distance.",
    impact: "Changing p changes neighborhood shape, but scaling usually matters more.",
  },
  {
    name: "algorithm",
    type: "str",
    default: "'auto'",
    description: "Backend used to search for neighbors.",
    impact: "Mostly a speed choice. It rarely changes the predictions.",
  },
];

const manualKnnExample = `import numpy as np

# Features: [sweetness, crunchiness]
X = np.array([
    [8, 7],  # apple
    [7, 8],  # apple
    [2, 3],  # lemon
    [3, 2],  # lemon
    [4, 3],  # lemon
])
y = np.array(["apple", "apple", "lemon", "lemon", "lemon"])

query = np.array([6, 6])  # mystery fruit

distances = np.sqrt(((X - query) ** 2).sum(axis=1))
nearest = np.argsort(distances)[:3]

print("Distances:", distances.round(2))
print("3 nearest labels:", y[nearest])

# Majority vote among the 3 closest points
labels, counts = np.unique(y[nearest], return_counts=True)
prediction = labels[np.argmax(counts)]
print("Prediction:", prediction)`;

const sklearnKnnExample = `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42, stratify=iris.target
)

model = make_pipeline(
    StandardScaler(),
    KNeighborsClassifier(n_neighbors=5, weights="distance")
)

model.fit(X_train, y_train)

print(f"Accuracy: {model.score(X_test, y_test):.3f}")

sample_probs = model.predict_proba(X_test[:3])
for i, probs in enumerate(sample_probs, start=1):
    print(f"Sample {i} class probabilities: {probs.round(3)}")`;

export default function KNearestNeighborsArticle() {
  return (
    <ArticlePost
      title="K-Nearest Neighbors: Show Me Similar Examples"
      author="Het Bhuva"
      description="KNN is the machine learning version of asking, 'What happened to the most similar cases we have already seen?'"
      image={{
        src: "/images/classification/k-nearest-neighbors.svg",
        alt: "K-nearest neighbors classification diagram",
      }}
    >
      <h2>What is K-Nearest Neighbors?</h2>
      <p>
        K-nearest neighbors, or KNN, is one of the simplest classification methods in
        machine learning. To classify a new point, it looks at the <em>k</em> closest
        training examples and lets them vote.
      </p>
      <p>
        No fancy training loop. No gradient descent. No learned equation. Just:
        find nearby points, count their labels, and trust the neighborhood.
      </p>

      <CalloutBox type="note" title="What the Docs Emphasize">
        <p>
          The scikit-learn neighbors guide describes neighbors-based classification as
          a kind of instance-based learning. That is the key mental model: KNN leans
          on stored examples instead of learning a compact global formula.
        </p>
      </CalloutBox>

      <h2>How Does It Actually Work?</h2>

      <h3>Step 1: Store the Training Data</h3>
      <p>
        Training is mostly just remembering the dataset. That sounds almost too easy,
        but it is exactly why KNN is useful as a baseline.
      </p>

      <h3>Step 2: Measure Distance to the New Point</h3>
      <p>
        Usually we use Euclidean distance:
      </p>
      <MathBlock formula={"d(x, x_i) = \\sqrt{\\sum_{j=1}^{n}(x_j - x_{ij})^2}"} />
      <p>
        Smaller distance means the points are more similar under the chosen metric.
      </p>

      <h3>Step 3: Pick the Closest k Neighbors</h3>
      <p>
        If k = 3, the model grabs the 3 nearest examples. If k = 7, it grabs 7.
        Those neighbors become the local jury.
      </p>

      <h3>Step 4: Vote</h3>
      <p>
        The majority class wins. Some versions weight nearby neighbors more heavily,
        which helps when one point is extremely close and the rest are only loosely
        related.
      </p>

      <AhaBox>
        <p>
          KNN does not build a boundary explicitly. The decision boundary emerges from
          the shape of the data itself. That is why KNN can model strange non-linear
          patterns without any special engineering.
        </p>
      </AhaBox>

      <h2>Worked Example with Distances</h2>
      <p>
        Here is a toy fruit classifier. We describe each fruit using sweetness and
        crunchiness, then ask the three closest examples to vote:
      </p>
      <CodeBlock
        code={manualKnnExample}
        language="python"
        title="KNN Voting by Distance"
      />

      <CalloutBox type="tip" title="Picking k">
        <p>
          k = 1 makes the model extremely flexible but noisy. Larger k smooths the
          boundary. In practice, odd values like 3, 5, or 7 are common for binary
          classification because they reduce ties.
        </p>
      </CalloutBox>

      <h2>The Knobs and Dials You Can Tweak</h2>
      <p>
        Here are the main parameters in sklearn&apos;s
        <code>KNeighborsClassifier</code>:
      </p>
      <ParameterTable parameters={knnParams} />

      <CalloutBox type="warning" title="Scale Your Features or KNN Lies to You">
        <p>
          Distance-based models are brutally sensitive to feature scales. If one
          feature ranges from 0 to 1 and another ranges from 0 to 100000, the second
          feature will dominate the geometry unless you standardize first.
        </p>
      </CalloutBox>

      <h2>Where You&apos;ll Actually Use This</h2>
      <ul>
        <li>
          <strong>Recommendation and retrieval:</strong> Find items similar to a query.
        </li>
        <li>
          <strong>Simple tabular baselines:</strong> A fast sanity check before deeper modeling.
        </li>
        <li>
          <strong>Pattern recognition:</strong> When similar-looking examples should share labels.
        </li>
        <li>
          <strong>Low-data problems:</strong> Especially when interpretability via nearest examples is useful.
        </li>
      </ul>

      <h2>Let&apos;s Build Something</h2>
      <p>
        This sklearn example adds feature scaling and then performs neighbor voting on
        the Iris dataset:
      </p>
      <CodeBlock
        code={sklearnKnnExample}
        language="python"
        title="KNeighborsClassifier with Scaling"
      />

      <h2>Level Up: From Good to Great</h2>

      <h3>Use Validation to Choose k</h3>
      <p>
        Do not guess the best k. Tune it on validation data. Too small and you chase
        noise. Too large and you wash away local structure.
      </p>

      <h3>Know the Curse of Dimensionality</h3>
      <p>
        In high dimensions, everything starts looking far away from everything else.
        When that happens, &quot;nearest&quot; stops meaning much, and KNN often degrades.
      </p>

      <h3>Remember the Prediction Cost</h3>
      <p>
        KNN is lazy during training and busy during inference. Large datasets can make
        neighbor searches expensive unless you use indexing structures or approximate
        methods.
      </p>

      <CalloutBox type="example" title="Good Baseline, Not Always Final Model">
        <p>
          KNN is excellent for feeling out a dataset. If it works surprisingly well,
          that is a clue your problem has useful local structure. If it fails badly,
          you may need better features or a different notion of similarity.
        </p>
      </CalloutBox>

      <CalloutBox type="tip" title="Challenge">
        <p>
          Train KNN with <code>k=1</code>, <code>k=5</code>, and <code>k=15</code> on the
          same dataset. Then watch how the decision boundary changes from jagged to
          smooth.
        </p>
      </CalloutBox>
    </ArticlePost>
  );
}
