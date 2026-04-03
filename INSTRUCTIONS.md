# Pathway Personalisation Engine: User & Developer Instructions

The **Pathway Personalisation Engine** is an academically grounded tool designed for programme teams and academic leads to explore and evaluate structured learning pathways within healthcare and public health domains.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/cloudpedagogy/cloudpedagogy-pathway-personalisation-engine.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cloudpedagogy-pathway-personalisation-engine
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the local URL (usually `http://localhost:5173`).

---

## 🛠️ Using the Engine

### 1. Loading the Curriculum
By default, the engine loads a healthcare/public health curriculum. You can always reset to the base curriculum by clicking **"Load Demo Curriculum"** in the header.

### 2. Selecting a Pathway Intent
Choose one of the predefined "Pathway Intents" (e.g., *Epidemiological Research Pathway*). This defines the target capabilities that the engine will use to generate recommended sequences.

### 3. Evaluating Aligned Pathways
The engine generates three distinct strategies:
- **Focused**: The most efficient route to cover the primary intent.
- **Guided**: Uses pre-vetted curriculum templates as a baseline.
- **Comprehensive**: Provides a broad-spectrum deep dive into the category.

### 4. Analysis & Comparison
- **Capability Mapping**: View mapped vs. unaligned target competencies.
- **Structural Evaluation**: Compare pathways side-by-side using metrics like *Analytical Depth* and *Sequencing Depth*.
- **Extension Insights**: View optional suggestions for curriculum enhancements.

---

## 📝 Customising the Curriculum

To add your own modules or pathway intents:
1. Open `src/data/demo/index.ts`.
2. Add your new `skills`, `learningGoals`, or `modules` to the `healthcareDemoDataset` object.
3. Ensure all `id` fields are unique.
4. If you have defined prerequisites, ensure those `id`s exist in the `modules` array.

---

## 📦 Deployment

### Building for Production
To generate a production-ready bundle in the `dist/` folder:
```bash
npm run build
```

### Static Hosting
The `dist/` folder can be hosted on any static web server (e.g., AWS S3, GitHub Pages, Vercel). Ensure your server is configured to serve `index.html`.

---

## 🛡️ Governance & Professional Practice
This tool is an **Information Aid**, not a decision-maker. All generated pathways should be reviewed by academic leads to ensure they meet institutional standards and specific learner requirements.
