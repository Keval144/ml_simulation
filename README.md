<p align="center">
  <img src="public/logo.png" alt="ML Simulations Logo" width="120" height="120" />
</p>

<h1 align="center">ML Simulations</h1>

<p align="center">
  <strong>Interactive machine learning educational platform with visual simulations</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## About

ML Simulations is an interactive educational platform designed to help users understand machine learning concepts through visual simulations. Watch algorithms come alive, adjust parameters in real-time, and build deep intuition for how ML models work.

**No signup required** — jump straight into any simulation and start learning.

## Features

- **Interactive Simulations** — Visualize ML algorithms working in real-time
- **In-depth Articles** — Engaging explanations with code examples and math formulas
- **Code Examples with Copy** — Python/sklearn code snippets with syntax highlighting and one-click copy
- **Mathematical Formulas** — Beautiful LaTeX rendering with KaTeX
- **Parameter Tables** — sklearn parameter explanations with practical impact descriptions
- **Simulation Links** — Direct links from articles to related interactive simulations
- **Callout Boxes** — Tips, warnings, notes, and examples to enhance learning
- **Dark/Light Mode** — Comfortable viewing in any environment
- **Responsive Design** — Works seamlessly on desktop and mobile
- **100% Free & Open Source**
- **SEO Optimized** — Dynamic metadata, Open Graph tags, Twitter cards, sitemap, and more

## Available Content

### Simulations

| Category | Simulations |
|----------|-------------|
| **Regression** | Gradient Descent, Least Squares, Linear Regression Interactive, Polynomial Regression, Support Vector Regression, SVR Kernel Lift |
| **Classification** | Logistic Regression, Logistic Function Visualizer, Logistic Training Simulation |
| **Advanced** | Kernel Trick Visualizer |

### Articles

| Category | Articles | Author |
|----------|----------|--------|
| **Regression** | Gradient Descent, Linear Regression, Polynomial Regression, Least Squares | Keval Kansagra, Het Bhuva |
| **Classification** | Logistic Regression, Decision Trees, K-Nearest Neighbors, Naive Bayes | Keval Kansagra, Codex |
| **Advanced** | Support Vector Regression, Kernel Methods | Het Bhuva |

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with oklch() color system
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/), [Hugeicons](https://hugeicons.com/)
- **Math Rendering**: [KaTeX](https://katex.org/)
- **Syntax Highlighting**: [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)

## Project Structure

```
ml_simulation/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Search engine directives
│   ├── cardData.ts               # Featured cards data
│   ├── about/                    # About page
│   │   └── layout.tsx            # About page metadata
│   ├── learn/                    # Articles section
│   │   ├── page.tsx              # Articles listing
│   │   ├── layout.tsx            # Articles section metadata
│   │   └── [slug]/               # Dynamic article pages
│   │       ├── page.tsx          # Server component with generateMetadata
│   │       └── article-client.tsx # Client component
│   └── simulations/              # Simulations section
│       ├── page.tsx              # Simulations listing
│       ├── layout.tsx            # Simulations section metadata
│       └── [slug]/               # Dynamic simulation pages
│           ├── page.tsx          # Server component with generateMetadata
│           └── simulation-client.tsx # Client component
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   ├── common/                   # Shared components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── logo.tsx
│   │   ├── sim-header.tsx
│   │   └── article-header.tsx
│   ├── simulations/              # ML visualization components
│   │   ├── GradientDescent.tsx
│   │   ├── LeastSquares.tsx
│   │   ├── LinearRegressionInteractive.tsx
│   │   ├── LogisticRegression.tsx
│   │   ├── LogisticFunctionVisualizer.tsx
│   │   ├── LogisticTrainingSim.tsx
│   │   ├── PolynomialRegression.tsx
│   │   ├── SVRVisualizer.tsx
│   │   ├── SupportVectorRegression.tsx
│   │   └── KernelTrickVisualizer.tsx
│   ├── articles/                 # Article content components
│   │   ├── article-post.tsx      # Base article wrapper
│   │   ├── components/           # Reusable article components
│   │   │   ├── index.ts          # Barrel export
│   │   │   ├── CodeBlock.tsx     # Syntax highlighted code with copy
│   │   │   ├── MathBlock.tsx     # KaTeX formula rendering
│   │   │   ├── CalloutBox.tsx    # Tips, warnings, notes, examples
│   │   │   ├── SimulationLink.tsx # Links to simulations
│   │   │   └── ParameterTable.tsx # sklearn parameter tables
│   │   ├── GradientDescentArticle.tsx
│   │   ├── LinearRegressionArticle.tsx
│   │   ├── PolynomialRegressionArticle.tsx
│   │   ├── LogisticRegressionArticle.tsx
│   │   ├── SVRArticle.tsx
│   │   ├── KernelTrickArticle.tsx
│   │   └── LeastSquaresArticle.tsx
│   ├── learning-card.tsx
│   ├── theme-provider.tsx
│   ├── mode-toogle.tsx
│   └── lenis-provider.tsx
│
├── lib/
│   ├── utils.ts                  # Utility functions (cn())
│   └── metadata.ts               # SEO metadata & article-simulation mapping
│
├── public/
│   ├── logo.png                  # Project logo
│   ├── images/                   # Simulation thumbnails
│   │   ├── regression/
│   │   ├── classification/
│   │   └── other/
│   └── article/                  # Article images
│       ├── regression/
│       ├── classification/
│       └── other/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.x or later
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Keval144/ml_simulation.git
   cd ml_simulation
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start the development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## Contributing

Contributions are welcome! Here's how you can help:

### Adding a New Simulation

1. **Create the simulation component**

   ```bash
   # Create your component in the simulations folder
   touch components/simulations/YourSimulation.tsx
   ```

2. **Build your visualization**

   Use the `useResponsiveCanvas` hook for mobile-friendly canvas simulations:

   ```tsx
   "use client";

   import { useEffect, useState, useCallback } from "react";
   import { useResponsiveCanvas } from "@/lib/use-responsive-canvas";

   export default function YourSimulation() {
     const { containerRef, canvasRef, size } = useResponsiveCanvas({
       maxWidth: 700,      // Maximum canvas width in pixels
       aspectRatio: 16/10, // Width divided by height
       minHeight: 300,     // Minimum height in pixels
     });
     const [parameter, setParameter] = useState(0.5);

     const draw = useCallback(() => {
       const canvas = canvasRef.current;
       if (!canvas) return;
       const ctx = canvas.getContext("2d");
       if (!ctx) return;

       // Use size.width and size.height for calculations
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(0, 0, size.width, size.height);

       // Your drawing logic here
     }, [parameter, size]);

     useEffect(() => {
       draw();
     }, [draw]);

     return (
       <div>
         {/* Container div with ref for resize detection */}
         <div ref={containerRef} className="w-full max-w-2xl">
           <canvas
             ref={canvasRef}
             width={size.width}
             height={size.height}
             className="w-full rounded-lg border"
           />
         </div>
         {/* Add controls */}
       </div>
     );
   }
   ```

   **Hook Options:**
   | Option | Default | Description |
   |--------|---------|-------------|
   | `maxWidth` | 700 | Maximum canvas width in pixels |
   | `aspectRatio` | 16/10 | Canvas aspect ratio (width/height) |
   | `minHeight` | 300 | Minimum canvas height in pixels |

   **Returns:**
   - `containerRef` - Attach to wrapper div for resize detection
   - `canvasRef` - Attach to canvas element
   - `size` - Object with `width` and `height` values

3. **Register the simulation**

   Add to `simulationComponents` in `app/simulations/[slug]/simulation-client.tsx`:

   ```tsx
   const simulationComponents: Record<string, React.ComponentType> = {
     // ... existing simulations
     "your-simulation": YourSimulation,
   };
   ```

4. **Add SEO metadata**

   Add entry to `simulationMetadata` in `lib/metadata.ts`:

   ```tsx
   "your-simulation": {
     title: "Your Simulation Title",
     description: "SEO description for search engines",
     image: "/images/category/your-simulation.png",
   },
   ```

5. **Add to the simulations listing**

   Add entry to `simulations` array in `app/simulations/page.tsx`:

   ```tsx
   {
     id: "your-simulation",
     title: "Your Simulation Title",
     description: "Description of what your simulation demonstrates",
     image: "/images/category/your-simulation.png",
     badge: "Category",
     category: "regression", // or classification, clustering, other
   }
   ```

### Adding a New Article

1. **Create the article component**

   ```bash
   touch components/articles/YourArticle.tsx
   ```

2. **Use the article components**

   Import and use the reusable components for rich content:

   ```tsx
   "use client";

   import { ArticlePost } from "./article-post";
   import {
     CodeBlock,
     MathBlock,
     CalloutBox,
     AhaBox,
     SimulationLink,
     ParameterTable,
   } from "./components";

   const pythonCode = `import numpy as np
   from sklearn.linear_model import LinearRegression

   # Your example code here
   model = LinearRegression()
   model.fit(X, y)`;

   const parameters = [
     {
       name: "fit_intercept",
       type: "bool",
       default: "True",
       description: "Whether to calculate the intercept",
       impact: "Set to False if your data is already centered",
     },
   ];

   export default function YourArticle() {
     return (
       <ArticlePost
         title="Your Article Title"
         author="Your Name"
         description="Brief description of the article"
         image={{
           src: "/article/category/your-article.png",
           alt: "Description",
         }}
       >
         <h2>Introduction</h2>
         <p>Your engaging introduction here...</p>

         <CalloutBox type="tip" title="Pro Tip">
           <p>Share a helpful tip here!</p>
         </CalloutBox>

         <h2>The Mathematics</h2>
         <MathBlock formula="y = mx + b" />

         <AhaBox>
           <p>Share that "aha moment" insight here!</p>
         </AhaBox>

         <h2>Code Example</h2>
         <CodeBlock code={pythonCode} language="python" title="Linear Regression" />

         <h2>Parameters</h2>
         <ParameterTable parameters={parameters} />

         <h2>Try It Yourself</h2>
         <SimulationLink
           simulationSlug="your-simulation"
           description="Experiment with the parameters"
         />
       </ArticlePost>
     );
   }
   ```

3. **Available Article Components**

   | Component | Purpose |
   |-----------|---------|
   | `CodeBlock` | Syntax-highlighted code with copy button |
   | `MathBlock` | KaTeX-rendered LaTeX formulas |
   | `CalloutBox` | Tips (`tip`), warnings (`warning`), notes (`note`), info (`info`), examples (`example`) |
   | `AhaBox` | Highlight "aha moment" insights |
   | `SimulationLink` | Button linking to related simulation |
   | `ParameterTable` | sklearn parameter documentation table |

4. **Register in the client component**

   Add to `articleComponents` in `app/learn/[slug]/article-client.tsx`:

   ```tsx
   const articleComponents: Record<string, React.ComponentType> = {
     // ... existing articles
     "your-article": YourArticle,
   };
   ```

5. **Add SEO metadata**

   Add entry to `articleMetadata` in `lib/metadata.ts`:

   ```tsx
   "your-article": {
     title: "Your Article Title",
     description: "SEO description for search engines",
     image: "/article/category/your-article.png",
     author: "Your Name",
   },
   ```

6. **Add article-simulation mapping** (if applicable)

   Add entry to `articleSimulationMap` in `lib/metadata.ts`:

   ```tsx
   export const articleSimulationMap: Record<string, string[]> = {
     // ... existing mappings
     "your-article": ["your-simulation", "related-simulation"],
   };
   ```

7. **Add to the articles listing**

   Add entry to `articals` array in `app/learn/page.tsx`

### General Guidelines

- **Code Style**: Follow existing patterns in the codebase
- **TypeScript**: Use strict typing
- **Styling**: Use Tailwind CSS with the `cn()` utility from `@/lib/utils`
- **Images**: Use Next.js `Image` component
- **Components**: Use `"use client"` directive for interactive components
- **Article Tone**: Keep it conversational and engaging - explain concepts like you're talking to a friend!

### Pull Request Process

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test locally**
   ```bash
   pnpm build
   ```
5. **Commit with a descriptive message**
6. **Push to your fork**
7. **Open a Pull Request**

## Authors

- **Keval Kansagra** - Linear Regression, Gradient Descent, Polynomial Regression, Logistic Regression
- **Het Bhuva** - SVR, Kernel Trick, Least Squares

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with Next.js, React, and a passion for ML education
</p>
