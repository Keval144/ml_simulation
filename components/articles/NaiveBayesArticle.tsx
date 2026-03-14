"use client";

import { ArticlePost } from "./article-post";
import {
  CodeBlock,
  MathBlock,
  CalloutBox,
  AhaBox,
  ParameterTable,
} from "./components";

const naiveBayesParams = [
  {
    name: "alpha",
    type: "float",
    default: "1.0",
    description: "Additive smoothing strength for Multinomial and Bernoulli Naive Bayes.",
    impact: "Higher values protect against zero probabilities but can oversmooth the evidence.",
  },
  {
    name: "fit_prior",
    type: "bool",
    default: "True",
    description: "Whether the model should learn class priors from the training data.",
    impact: "Turn it off only when you want to impose equal priors or set your own.",
  },
  {
    name: "class_prior",
    type: "array-like | None",
    default: "None",
    description: "Manual prior probabilities for each class.",
    impact: "Useful when domain knowledge says the real-world class balance differs from the sample.",
  },
  {
    name: "force_alpha",
    type: "bool",
    default: "True",
    description: "Whether sklearn should preserve the provided alpha exactly.",
    impact: "Mostly relevant when experimenting with extremely small smoothing values.",
  },
  {
    name: "var_smoothing",
    type: "float",
    default: "1e-9",
    description: "GaussianNB stability term added to variances.",
    impact: "Important when continuous features have tiny variances or numerical issues.",
  },
];

const bayesWalkthrough = `# Simplified spam filter
# Message contains the words: "free" and "win"

P(spam) = 0.40
P(ham)  = 0.60

P(free | spam) = 0.70
P(win  | spam) = 0.60

P(free | ham)  = 0.05
P(win  | ham)  = 0.01

# Naive Bayes assumes conditional independence, so multiply:
spam_score = 0.40 * 0.70 * 0.60   # 0.168
ham_score  = 0.60 * 0.05 * 0.01   # 0.0003

total = spam_score + ham_score
P(spam | message) = spam_score / total   # 0.9982
P(ham  | message) = ham_score / total    # 0.0018

print("This message is almost certainly spam.")`;

const sklearnNbExample = `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

texts = [
    "win cash now",
    "claim your free prize",
    "cheap meds available",
    "project meeting at 3pm",
    "please review the budget",
    "team lunch tomorrow",
]
labels = ["spam", "spam", "spam", "ham", "ham", "ham"]

model = make_pipeline(
    CountVectorizer(),
    MultinomialNB(alpha=1.0)
)

model.fit(texts, labels)

new_messages = [
    "free cash prize",
    "budget meeting tomorrow",
]

predictions = model.predict(new_messages)
probabilities = model.predict_proba(new_messages)

for text, pred, probs in zip(new_messages, predictions, probabilities):
    print(text)
    print("prediction:", pred)
    print("probabilities:", probs.round(3))
    print("-" * 30)`;

export default function NaiveBayesArticle() {
  return (
    <ArticlePost
      title="Naive Bayes: Fast Classification with Probability"
      author="Het Bhuva"
      description="Naive Bayes looks at clues, multiplies evidence, and makes a surprisingly strong classification decision from simple probability rules."
      image={{
        src: "/images/classification/naive-bayes.svg",
        alt: "Naive Bayes probability diagram",
      }}
    >
      <h2>What is Naive Bayes?</h2>
      <p>
        Naive Bayes is a family of classifiers built around Bayes&apos; theorem. It asks:
        given the features I observed, which class is now most probable?
      </p>
      <p>
        The &quot;naive&quot; part is the assumption that features are conditionally
        independent once you know the class. That assumption is often wrong in the
        real world, but the method still works shockingly well for many tasks.
      </p>

      <CalloutBox type="note" title="What the Official Guide Says">
        <p>
          The scikit-learn Naive Bayes guide frames these models as Bayes-theorem
          classifiers with strong independence assumptions between features. That
          sentence is basically the whole algorithm.
        </p>
      </CalloutBox>

      <h2>How Does It Actually Work?</h2>

      <h3>Step 1: Start with a Prior Belief</h3>
      <p>
        Before seeing any features, each class has a prior probability. Maybe 40% of
        emails are spam and 60% are not spam.
      </p>

      <h3>Step 2: Score How Likely the Features Are</h3>
      <p>
        For each class, the model estimates how likely the observed features would be
        if that class were true.
      </p>

      <h3>Step 3: Apply Bayes&apos; Theorem</h3>
      <MathBlock
        formula={
          "P(y \\mid x_1, \\ldots, x_n) \\propto P(y) \\prod_{j=1}^{n} P(x_j \\mid y)"
        }
      />
      <p>
        The denominator is the same for every class, so for prediction we mostly care
        about the relative scores.
      </p>

      <h3>Step 4: Pick the Biggest Posterior Probability</h3>
      <p>
        After combining the prior and the feature evidence, whichever class gets the
        largest posterior wins.
      </p>

      <AhaBox>
        <p>
          Naive Bayes is like a detective stacking clues. One clue might be weak. Ten
          clues pointing the same way can become overwhelming.
        </p>
      </AhaBox>

      <h2>Worked Example with Numbers</h2>
      <p>
        Spam detection is the classic Naive Bayes demo because words act like many
        small clues:
      </p>
      <CodeBlock
        code={bayesWalkthrough}
        language="python"
        title="Posterior Probability by Hand"
      />

      <CalloutBox type="tip" title="Why Smoothing Matters">
        <p>
          If a word never appeared in spam during training, the raw probability would
          be zero, and one zero wipes out the entire product. Smoothing fixes that by
          giving unseen events a tiny non-zero chance.
        </p>
      </CalloutBox>

      <h2>Common Naive Bayes Variants</h2>
      <ul>
        <li>
          <strong>GaussianNB:</strong> Best for continuous features like measurements or sensor values.
        </li>
        <li>
          <strong>MultinomialNB:</strong> Great for counts, especially text classification.
        </li>
        <li>
          <strong>BernoulliNB:</strong> Useful when features are binary yes/no signals.
        </li>
      </ul>

      <h2>The Knobs and Dials You Can Tweak</h2>
      <p>
        These are the settings you will most often touch across
        sklearn&apos;s Naive Bayes estimators:
      </p>
      <ParameterTable parameters={naiveBayesParams} />

      <CalloutBox type="warning" title="Strong Probabilities, Not Always Calibrated">
        <p>
          Naive Bayes can be very good at ranking classes while still being overconfident
          about the actual probability values. The chosen class is often useful even when
          the raw probabilities need calibration.
        </p>
      </CalloutBox>

      <h2>Where You&apos;ll Actually Use This</h2>
      <ul>
        <li>
          <strong>Spam filtering:</strong> The textbook Naive Bayes use case.
        </li>
        <li>
          <strong>Document classification:</strong> News tags, support tickets, sentiment baselines.
        </li>
        <li>
          <strong>Medical screening:</strong> Combining many small indicator signals.
        </li>
        <li>
          <strong>Fast baselines:</strong> When you need a strong first pass with minimal compute.
        </li>
      </ul>

      <CalloutBox type="example" title="Why It Stays Relevant">
        <p>
          Naive Bayes trains extremely fast, handles high-dimensional sparse text well,
          and often gives you a surprisingly hard baseline to beat on small NLP tasks.
        </p>
      </CalloutBox>

      <h2>Let&apos;s Build Something</h2>
      <p>
        Here is a tiny text classifier using bag-of-words features and
        <code>MultinomialNB</code>:
      </p>
      <CodeBlock
        code={sklearnNbExample}
        language="python"
        title="Spam vs Ham with MultinomialNB"
      />

      <h2>Level Up: From Good to Great</h2>

      <h3>Match the Variant to the Data</h3>
      <p>
        Do not throw GaussianNB at word counts or MultinomialNB at continuous sensor
        data just because the names are familiar. The distributional assumption matters.
      </p>

      <h3>Respect Feature Correlation</h3>
      <p>
        Highly correlated features can make the model double-count evidence. Naive
        Bayes can still work, but that independence assumption is being stretched.
      </p>

      <h3>Use It as a Serious Baseline</h3>
      <p>
        If a more complicated classifier barely beats Naive Bayes, your extra
        complexity may not be worth it.
      </p>

      <CalloutBox type="tip" title="Challenge">
        <p>
          Train two text models with <code>alpha=1.0</code> and <code>alpha=0.01</code>.
          Then compare how often each model becomes overconfident on rare words.
        </p>
      </CalloutBox>
    </ArticlePost>
  );
}
