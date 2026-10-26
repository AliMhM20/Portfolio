# Ali Mohamadi — Personal Portfolio Website

[![Deploy to GitHub Pages](https://github.com/AliMhM20/Portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/AliMhM20/Portfolio/actions/workflows/deploy.yml)

> Personal engineering portfolio website of **Ali Mohamadi**, Computer Engineering student at **Amirkabir University of Technology (Tehran Polytechnic)**.
> Designed with an architectural, editorial aesthetic combining minimalist typography, fluid transitions, and high-performance interactive elements.

🌐 **Live Demo:** [https://AliMhM20.github.io/Portfolio/](https://AliMhM20.github.io/Portfolio/)

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom Editorial Design System
- **Animation & Transitions:** Framer Motion, Canvas Confetti
- **Typography:** Sahel (Persian RTL with zero CDN lag), Instrument Serif, Plus Jakarta Sans, JetBrains Mono
- **Deployment:** GitHub Pages via GitHub Actions CI/CD pipeline

---

## ✨ Key Features

1. **Editorial Dual-Mode Design**:
   - **Light Mode:** Crisp monochrome, magenta/purple accents, and subtle grid lines.
   - **Dark Mode:** Deep obsidian tones, warm rust-orange accents, and sunset gradients.
2. **Bilingual Support (FA / EN)**:
   - Full bidirectional RTL / LTR switching with tailored typography enforcement.
3. **Fullpage Editorial Navigation**:
   - Desktop: Smooth section transitions with direction-aware physics and mouse-wheel lock.
   - Mobile: Natural responsive continuous scrolling.
4. **Interactive Flagship Project Showcase (UniSchedule)**:
   - 50/50 split layout with technical specs and an animated interactive screenshot gallery.
5. **Architectural Grid & Interactive Elements**:
   - Gravity-based responsive grid backdrop and studio-contrast portrait cutout composition.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/AliMhM20/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Start local development server
npm run dev
```

---

## 📦 Build & Deployment

The repository is configured with automated GitHub Actions CI/CD in `.github/workflows/deploy.yml`. Every push to `main` compiles and deploys the static site to GitHub Pages.

```bash
# Manual production build
npm run build
```

---

© 2026 Ali Mohamadi • Amirkabir University of Technology. All rights reserved.
