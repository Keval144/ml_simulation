"use client";

import { ArticlePost } from "./article-post";
import {
  CodeBlock,
  MathBlock,
  CalloutBox,
  AhaBox,
  ParameterTable,
} from "./components";

const treeParams = [
  {
    name: "criterion",
    type: "str",
    default: "'gini'",
    description: "Function used to measure split quality: 'gini', 'entropy', or 'log_loss'.",
    impact: "Usually small differences, but 'entropy' can prefer slightly more informative splits.",
  },
  {
    name: "max_depth",
    type: "int | None",
    default: "None",
    description: "Maximum depth of the tree.",
    impact: "The fastest way to stop overfitting. Smaller depth = simpler tree.",
  },
  {
    name: "min_samples_split",
    type: "int | float",
    default: "2",
    description: "Minimum samples required before a node is allowed to split.",
    impact: "Higher values make the tree less eager to keep branching.",
  },
  {
    name: "min_samples_leaf",
    type: "int | float",
    default: "1",
    description: "Minimum samples that must remain in every leaf node.",
    impact: "Useful for preventing tiny, noisy leaves that memorize the data.",
  },
  {
    name: "ccp_alpha",
    type: "float",
    default: "0.0",
    description: "Cost-complexity pruning strength.",
    impact: "Increase it to prune weak branches and shrink an overgrown tree.",
  },
];

const impurityWalkthrough = `# Root node: 10 emails
# 6 spam, 4 not spam

gini_root = 1 - (6/10)^2 - (4/10)^2
gini_root = 1 - 0.36 - 0.16 = 0.48

# Try splitting on: contains the word "free"?

# Left child (contains "free"): 5 spam, 0 not spam
gini_left = 1 - (5/5)^2 - (0/5)^2 = 0

# Right child (doesn't contain "free"): 1 spam, 4 not spam
gini_right = 1 - (1/5)^2 - (4/5)^2
gini_right = 1 - 0.04 - 0.64 = 0.32

# Weighted impurity after the split
gini_after = (5/10) * 0 + (5/10) * 0.32
gini_after = 0.16

# Impurity reduction
gain = 0.48 - 0.16 = 0.32

print("That is a strong split, so the tree likes it.")`;

const sklearnTreeExample = `import pandas as pd
from sklearn.tree import DecisionTreeClassifier, export_text

# Tiny loan-approval dataset
data = pd.DataFrame({
    "income_k": [35, 42, 48, 52, 58, 64, 70, 85, 90, 110],
    "credit_score": [580, 610, 600, 640, 690, 710, 720, 750, 770, 810],
    "debt_ratio": [0.48, 0.42, 0.38, 0.35, 0.33, 0.29, 0.26, 0.22, 0.18, 0.12],
    "approved": [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
})

X = data[["income_k", "credit_score", "debt_ratio"]]
y = data["approved"]

model = DecisionTreeClassifier(
    criterion="gini",
    max_depth=3,
    min_samples_leaf=1,
    random_state=42
)

model.fit(X, y)

print("Predictions for new applicants:")
new_people = pd.DataFrame({
    "income_k": [45, 60, 95],
    "credit_score": [605, 705, 790],
    "debt_ratio": [0.44, 0.31, 0.15],
})

print(model.predict(new_people))
print(model.predict_proba(new_people))

print("\\nLearned rules:")
print(export_text(model, feature_names=list(X.columns)))`;

export default function DecisionTreeArticle() {
  return (
    <ArticlePost
      title="Decision Trees: The Flowchart That Learns"
      author="Het Bhuva"
      description="If a model could think in yes/no questions, it would look like a decision tree. Split, split again, and keep going until each branch feels confident."
      image={{
        src: "/images/classification/decision-tree.svg",
        alt: "Decision tree classifier diagram",
      }}
    >
      <h2>What is a Decision Tree?</h2>
      <p>
        A decision tree is exactly what it sounds like: a tree of questions. At each
        node, the model asks something like &quot;Is credit score above 650?&quot; or
        &quot;Did the email contain the word free?&quot; Then it follows the matching branch.
      </p>
      <p>
        Keep stacking those questions and you get a model that can classify new
        examples using a sequence of simple rules. That&apos;s why decision trees are
        popular when interpretability matters.
      </p>

      <CalloutBox type="note" title="Why People Like Trees">
        <p>
          The scikit-learn docs describe decision trees as non-parametric supervised
          models that learn simple decision rules from features. That makes them easy
          to explain to humans compared with many black-box models.
        </p>
      </CalloutBox>

      <h2>How Does It Actually Work?</h2>

      <h3>Step 1: Start with the Full Dataset</h3>
      <p>
        The root node contains every training example. Right now it is messy because
        multiple classes are mixed together.
      </p>

      <h3>Step 2: Search for the Best Question</h3>
      <p>
        The tree tries many possible splits and asks: which question makes the child
        nodes purer? In other words, after splitting, do the branches contain more
        of a single class and less of a mixture?
      </p>

      <h3>Step 3: Measure Impurity</h3>
      <p>
        A common choice is Gini impurity. Lower impurity means the node is more
        class-consistent.
      </p>
      <MathBlock formula={"Gini = 1 - \\sum_{k=1}^{K} p_k^2"} />
      <p>
        Another option is entropy, which comes from information theory:
      </p>
      <MathBlock formula={"Entropy = -\\sum_{k=1}^{K} p_k \\log_2(p_k)"} />

      <h3>Step 4: Recurse on Each Child Node</h3>
      <p>
        Once the tree finds a strong split, it repeats the same process on the child
        nodes. Each branch gets more specialized.
      </p>

      <h3>Step 5: Stop Before the Tree Becomes Weird</h3>
      <p>
        If you let a tree keep splitting forever, it can memorize the training data.
        So we usually stop with rules like max depth, minimum samples per node, or
        post-pruning.
      </p>

      <AhaBox>
        <p>
          A decision tree is basically a learned <strong>if/else program</strong>. The model
          is not solving equations at prediction time. It is walking down a flowchart.
        </p>
      </AhaBox>

      <h2>The Math Behind a Good Split</h2>
      <p>
        Suppose the root node has 10 emails: 6 spam and 4 not spam. That node is
        mixed, so impurity is fairly high. If we split on the word &quot;free,&quot; the
        children become much cleaner:
      </p>
      <CodeBlock
        code={impurityWalkthrough}
        language="python"
        title="Gini Impurity Worked Example"
      />

      <CalloutBox type="tip" title="Intuition">
        <p>
          A good split creates branches that are boring. Boring is good here. You want
          one branch to look mostly like class A and the other branch to look mostly
          like class B.
        </p>
      </CalloutBox>

      <h2>The Knobs and Dials You Can Tweak</h2>
      <p>
        Here are the parameters you will adjust most often in
        sklearn&apos;s <code>DecisionTreeClassifier</code>:
      </p>
      <ParameterTable parameters={treeParams} />

      <CalloutBox type="warning" title="Classic Tree Failure Mode">
        <p>
          An unrestricted tree can keep splitting until each leaf contains just one or
          two training examples. Training accuracy becomes amazing. Generalization
          becomes terrible. This is textbook overfitting.
        </p>
      </CalloutBox>

      <h2>Where You&apos;ll Actually Use This</h2>
      <ul>
        <li>
          <strong>Credit decisions:</strong> Easy-to-audit rule-based classification.
        </li>
        <li>
          <strong>Medical triage:</strong> Clear branching logic can be easier to inspect.
        </li>
        <li>
          <strong>Fraud screening:</strong> Fast non-linear rules over tabular features.
        </li>
        <li>
          <strong>Feature discovery:</strong> Trees often reveal which variables matter first.
        </li>
      </ul>

      <CalloutBox type="example" title="Why Trees Show Up Everywhere">
        <p>
          Random forests and gradient-boosted trees are both built from decision trees.
          So even if you outgrow a single tree, the core idea stays useful.
        </p>
      </CalloutBox>

      <h2>Let&apos;s Build Something</h2>
      <p>
        Here is a small decision tree classifier that learns approval rules from
        tabular data:
      </p>
      <CodeBlock
        code={sklearnTreeExample}
        language="python"
        title="DecisionTreeClassifier Example"
      />

      <h2>Level Up: From Good to Great</h2>

      <h3>Prune Aggressively</h3>
      <p>
        Start with <code>max_depth</code>, <code>min_samples_leaf</code>, and
        <code>ccp_alpha</code>. Those three controls solve most &quot;my tree memorized the
        dataset&quot; problems.
      </p>

      <h3>Watch Out for Instability</h3>
      <p>
        Tiny changes in the data can produce a different tree. That is normal. Trees
        are high-variance models, which is one reason ensembles like random forests
        tend to be more robust.
      </p>

      <h3>Compare Against Simpler Baselines</h3>
      <p>
        If a shallow tree does not beat logistic regression, that usually means your
        problem may not need fancy branching structure in the first place.
      </p>

      <CalloutBox type="tip" title="Challenge">
        <p>
          Train the same tree twice: once with <code>max_depth=2</code> and once with
          <code>max_depth=None</code>. Then compare train accuracy and validation accuracy.
          You will feel overfitting immediately.
        </p>
      </CalloutBox>
    </ArticlePost>
  );
}
