# Design System & Style Guide

A comprehensive, production-ready design guide extracted from the **Northline / MUBI Cinematic Visual Studio & OTT Platform**. Use this specification to replicate the cinematic, dark-themed, editorial aesthetics across other projects.

---

## 1. Design Philosophy

- **Cinematic & Immersive**: Dark obsidian palettes paired with deep gradients, subtle ambient glows, and high-bitrate video/photo hero framing.
- **Editorial Typography**: Pairing a clean sans-serif body font with a geometric display typeface for high-impact editorial headings.
- **Micro-Interactions**: Smooth scale transforms, directional icon hovers, scroll-bound parallax, and blurred entrance transitions.
- **High-Contrast Section Breaks**: Alternating dark cinematic sections with warm, tactile editorial beige (`#e9e3d8`) and energetic terracotta (`#d94826`) blocks to create visual rhythm.

---

## 2. Color Palette & Tokens

### Base & Background Colors
| Token / Name | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Obsidian Black** | `#090909` | `bg-[#090909]` | Primary background across the entire site |
| **Deep Charcoal** | `#0d0d0c` | `bg-[#0d0d0c]` | Alternate section background (e.g. Featured Work) |
| **Surface Dark** | `#0c0c0c` | `bg-[#0c0c0c]` | Secondary surface background (e.g. Plans / Pricing) |
| **Card Surface** | `#101010` | `bg-[#101010]` | Badge cards, sector blocks, subtle tile elements |
| **Pure Black** | `#000000` | `bg-black` | Overlays, menu backdrops, deep shadows |

### Accent & Energy Colors
| Token / Name | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Flame Orange (Primary)** | `#f04a23` | `bg-[#f04a23]`, `text-[#f04a23]` | Primary CTAs, active indicators, badges, highlights |
| **Flame Orange (Hover)** | `#ff5b32` | `hover:bg-[#ff5b32]` | Interactive hover state for primary action buttons |
| **Rust Red** | `#c43c1c` | `text-[#c43c1c]` | Icon accents & eyebrow labels on light backgrounds |
| **Terracotta CTA Block** | `#d94826` | `bg-[#d94826]` | Full-bleed footer CTA banner background |

### Warm Editorial Section (High Contrast Break)
| Token / Name | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Warm Sand / Linen** | `#e9e3d8` | `bg-[#e9e3d8]` | Process / Curation section background |
| **Editorial Black Text** | `#11100e` | `text-[#11100e]` | Primary text inside the light beige section |
| **Editorial Muted Text** | `rgba(0,0,0,0.60)` | `text-black/60` | Body copy inside the light beige section |
| **Editorial Subtle Border**| `rgba(0,0,0,0.15)` | `border-black/15` | Dividers inside the light beige section |

### Text Opacity Hierarchy (Dark Theme)
```css
/* Primary Text */
.text-primary   { color: #ffffff; }                     /* Headings, active states (100%) */
.text-high      { color: rgba(255, 255, 255, 0.85); }   /* Lead paragraphs (85%) */
.text-medium    { color: rgba(255, 255, 255, 0.65); }   /* Navigation, secondary copy (65%) */
.text-body      { color: rgba(255, 255, 255, 0.55); }   /* Body text, descriptions (55%) */
.text-muted     { color: rgba(255, 255, 255, 0.45); }   /* Captions, subtitles, labels (45%) */
.text-faint     { color: rgba(255, 255, 255, 0.30); }   /* Numbers (01, 02), inactive icons (30%) */
.text-ghost     { color: rgba(255, 255, 255, 0.25); }   /* Large decorative numeral counters (25%) */
```

### Borders & Dividers
```css
.border-subtle   { border-color: rgba(255, 255, 255, 0.10); } /* Standard section & header divider */
.border-medium   { border-color: rgba(255, 255, 255, 0.15); } /* Card headers & testimonial borders */
.border-strong   { border-color: rgba(255, 255, 255, 0.25); } /* Secondary button borders */
.border-focus    { border-color: rgba(255, 255, 255, 0.30); } /* Plink focus / quote borders */
```

---

## 3. Typography System

### Font Families
- **Body & UI**: `"Inter", sans-serif`
- **Headings & Display**: `"Manrope", sans-serif` (Utility class: `.display`)

```html
<!-- Google Fonts CDN -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Hierarchy & Scale

| Style / Element | Font | Classes | Sample Usage |
| :--- | :--- | :--- | :--- |
| **Hero Title** | Manrope | `display text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.94]` | Masthead hero statement |
| **Section Title** | Manrope | `display text-4xl sm:text-6xl font-normal leading-tight tracking-tight` | Main section headings |
| **CTA Heading** | Manrope | `display text-5xl sm:text-7xl font-medium leading-[0.98] tracking-tight` | Bottom banner heading |
| **Card / Title** | Manrope | `display text-2xl sm:text-3xl font-medium tracking-tight` | Film/Project card titles |
| **Number Counters** | Manrope | `display text-3xl sm:text-4xl font-medium tracking-tight` | Stat numerals & step numbers |
| **Lead Subtext** | Inter | `text-base sm:text-lg leading-7 text-white/85` | Hero sub-statement |
| **Body Copy** | Inter | `text-base leading-7 text-white/55` | Feature descriptions, paragraphs |
| **Eyebrows / Badges** | Inter | `text-xs text-[#f04a23]` or `text-xs text-white/70` | Category labels above titles |
| **Metadata / Micro** | Inter | `text-xs text-white/45` | Date stamps, aspect ratios, subtitles |

---

## 4. Spacing, Grid & Layout Rules

### Container & Max Width
- **Max Width**: `max-w-7xl` (`1280px` / `80rem`) centered with `mx-auto`.
- **Horizontal Container Padding**: `px-5 sm:px-8 lg:px-10`.
- **Vertical Section Spacing**: `py-20 sm:py-28` (standard section height).

### Asymmetric Grid Patterns

1. **Section Header with Offset Description**:
```html
<div class="grid gap-8 lg:grid-cols-12">
  <div class="lg:col-span-4">
    <p class="text-xs text-[#f04a23]">Eyebrow Label</p>
  </div>
  <div class="lg:col-span-8">
    <h2 class="display text-4xl font-normal leading-tight tracking-tight sm:text-6xl">
      Main statement.<br />
      <span class="text-white/35">Secondary muted clause.</span>
    </h2>
  </div>
</div>
```

2. **Staggered Portfolio / Catalog Grid**:
- Card 1: Full-width `16/10` aspect ratio.
- Card 2 (Left): `lg:col-span-7` with `aspect-[4/5]`.
- Card 3 (Right): `lg:col-span-5` with `aspect-[4/5]` and `lg:pt-32` top-padding stagger.

3. **Multi-Column Stat Bar**:
```html
<div class="grid grid-cols-2 border-y border-white/10 md:grid-cols-4">
  <div class="border-b border-r border-white/10 px-4 py-8 md:border-b-0">
    <strong class="display block text-3xl font-medium sm:text-4xl">15M+</strong>
    <span class="mt-2 block text-xs text-white/45">Label</span>
  </div>
  <!-- Repeat columns -->
</div>
```

---

## 5. Animation & Motion System

### 1. Entrance Keyframe Animation (`.hero-enter`)
Used on the hero elements for initial page-load entrance:
```css
.hero-enter {
  opacity: 0;
  transform: translateY(1.5rem);
  filter: blur(0.25rem);
  animation: hero-in 800ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes hero-in {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

### 2. Scroll Reveal (`.reveal`)
Applied to all sections and animated when entering the viewport:
```css
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  filter: blur(0.25rem);
  transition: 
    opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1),
    filter 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}
```

### 3. Image Hover Scale
```css
/* Card container: overflow-hidden group */
/* Image inside: */
className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
```

### 4. Interactive Accordion Expand
```html
<div class="grid transition-all duration-200 grid-rows-[0fr] aria-expanded:grid-rows-[1fr]">
  <div class="overflow-hidden">
    <p>Collapsible content...</p>
  </div>
</div>
```

### 5. Reduced Motion Fallback
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .hero-enter {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
```

---

## 6. Core Component Blueprints

### A. Primary Action Button
```html
<a
  href="#action"
  class="group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#f04a23] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ff5b32] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
>
  Button Text
  <svg class="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" ... />
</a>
```

### B. Ghost / Secondary Action Button
```html
<a
  href="#secondary"
  class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-white/25 bg-black/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
>
  Secondary Action
  <svg class="h-4 w-4 fill-current" ... />
</a>
```

### C. Glass Fixed Header with Scroll State
```tsx
<header
  id="site-header"
  className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
    isScrolled
      ? "border-b border-white/10 bg-[#090909]/90 shadow-lg backdrop-blur-xl"
      : "border-b border-transparent"
  }`}
>
  <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
    <!-- Brand + Nav Links + Action -->
  </div>
</header>
```

### D. Video Background Hero Masthead
```tsx
<section id="home" className="relative flex min-h-screen items-end overflow-hidden border-b border-white/10">
  <div ref={heroMediaRef} id="hero-media" className="absolute inset-0 scale-[1.03] will-change-transform overflow-hidden">
    <video autoPlay muted loop playsInline poster="/images/hero.png" className="h-full w-full object-cover">
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
    <!-- Cinematic Gradient Overlay -->
    <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/25 to-[#090909]/60" />
  </div>
  <!-- Lateral vignette gradient -->
  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.45),transparent_50%,rgba(0,0,0,.2))]" />

  <!-- Hero Content Grid -->
</section>
```

### E. List Item with Hover Arrow
```html
<article class="reveal group grid gap-6 py-9 transition-colors hover:bg-white/[0.025] sm:grid-cols-12 sm:items-center">
  <span class="display text-3xl text-white/30 sm:col-span-1">01</span>
  <div class="sm:col-span-4">
    <h3 class="display text-2xl font-medium tracking-tight">Feature Title</h3>
  </div>
  <p class="text-base leading-7 text-white/55 sm:col-span-5">
    Detailed description of the feature or service...
  </p>
  <div class="hidden justify-end sm:col-span-2 sm:flex">
    <svg class="h-5 w-5 text-white/30 transition-colors group-hover:text-[#f04a23]" ... />
  </div>
</article>
```

### F. Pricing / Plan Tier Row
```html
<article class="reveal grid gap-5 py-8 sm:grid-cols-12 sm:items-center">
  <span class="display text-3xl text-white/25 sm:col-span-1">02</span>
  <div class="sm:col-span-5">
    <div class="flex items-center gap-3">
      <h3 class="text-base font-medium">Plan Name</h3>
      <span class="rounded-full bg-[#f04a23] px-3 py-1 text-xs text-white">Recommended</span>
    </div>
    <p class="mt-2 text-sm leading-6 text-white/45">Plan benefits description...</p>
  </div>
  <p class="text-sm text-white/50 sm:col-span-3">Billing frequency / notes</p>
  <div class="sm:col-span-3 sm:text-right">
    <span class="display text-xl font-medium">$19.99 / month</span>
  </div>
</article>
```

---

## 7. Global CSS Reference (`globals.css`)

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

html {
  background: #090909;
}

body {
  font-family: "Inter", sans-serif;
  background-color: #090909;
  color: #ffffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.display {
  font-family: "Manrope", sans-serif;
}

/* Scroll reveal transition */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  filter: blur(0.25rem);
  transition: 
    opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1), 
    transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1), 
    filter 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* Page entrance keyframe */
.hero-enter {
  opacity: 0;
  transform: translateY(1.5rem);
  filter: blur(0.25rem);
  animation: hero-in 800ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes hero-in {
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* Accessible reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal, .hero-enter {
    opacity: 1;
    transform: none;
    filter: none;
  }
}
```

---

## 8. Summary Checklist for Applying to New Projects

- [ ] Add **Inter** (Body) and **Manrope** (Display) fonts.
- [ ] Set root background to `#090909` and selection highlight to `#f04a23`.
- [ ] Use `max-w-7xl mx-auto px-5 sm:px-8 lg:px-10` for consistent container bounds.
- [ ] Configure `reveal` intersection observer script or Framer Motion equivalent.
- [ ] Use 12-column grid splits (`col-span-8` / `col-span-4` and `col-span-7` / `col-span-5`).
- [ ] Apply `#e9e3d8` for warm editorial contrast sections and `#d94826` for bold call-to-action blocks.
