---
version: alpha
name: Developer Portfolio Design System
description: Minimalist, bilingual developer portfolio design system with dark and light themes
colors:
  primary: "#3b82f6"
  primary-hover: "#2563eb"
  secondary: "#a855f7"
  neutral-dark: "#030712"
  neutral-light: "#f9fafb"
  surface-dark: "#111827"
  surface-light: "#ffffff"
  card-dark: "rgba(17, 24, 39, 0.5)"
  card-light: "rgba(255, 255, 255, 0.8)"
  card-hover-dark: "rgba(31, 41, 55, 0.5)"
  card-hover-light: "rgba(243, 244, 246, 0.5)"
  elevated-dark: "rgba(31, 41, 55, 0.5)"
  elevated-light: "rgba(249, 250, 251, 0.8)"
  border-subtle-dark: "#1f2937"
  border-subtle-light: "#e5e7eb"
  border-strong-dark: "#374151"
  border-strong-light: "#d1d5db"
  text-heading-dark: "#ffffff"
  text-heading-light: "#111827"
  text-body-dark: "#d1d5db"
  text-body-light: "#374151"
  text-muted-dark: "#9ca3af"
  text-muted-light: "#4b5563"
  text-label-dark: "#6b7280"
  text-label-light: "#4b5563"
  text-accent-dark: "#60a5fa"
  text-accent-light: "#2563eb"
  glow-blue-dark: "rgba(59, 130, 246, 0.05)"
  glow-blue-light: "rgba(96, 165, 250, 0.05)"
  glow-purple-dark: "rgba(168, 85, 247, 0.05)"
  glow-purple-light: "rgba(192, 132, 252, 0.05)"
typography:
  headline-display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 72px
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 48px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-md:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 32px
    fontWeight: 300
    lineHeight: 1.25
    letterSpacing: 0px
  headline-sm:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0px
  title-card:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0px
  body-lg:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 20px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0px
  body-md:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body-sm:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  label-caps:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0.1em
  badge:
    fontFamily: "Urbanist, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0px
  persian-body:
    fontFamily: "Vazirmatn, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0px
rounded:
  none: 0px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  "2xl": 16px
  "3xl": 24px
  full: 9999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
  "20": 80px
  "24": 96px
components:
  NavBar:
    backgroundColor: "{colors.card-dark}"
    textColor: "{colors.text-muted-dark}"
    rounded: "{rounded.none}"
    height: 64px
  NavBar-light:
    backgroundColor: "{colors.card-light}"
    textColor: "{colors.text-muted-light}"
  ButtonPrimary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: 16px
  ButtonPrimary-hover:
    backgroundColor: "{colors.primary-hover}"
  ButtonOutline:
    textColor: "{colors.text-body-dark}"
    rounded: "{rounded.full}"
    padding: 16px
  ButtonOutline-light:
    textColor: "{colors.text-body-light}"
    rounded: "{rounded.full}"
    padding: 16px
  ProjectCard:
    backgroundColor: "{colors.card-dark}"
    rounded: "{rounded.2xl}"
    padding: 24px
  ProjectCard-light:
    backgroundColor: "{colors.card-light}"
    rounded: "{rounded.2xl}"
    padding: 24px
  ProjectCard-hover:
    backgroundColor: "{colors.card-hover-dark}"
  ProjectCard-hover-light:
    backgroundColor: "{colors.card-hover-light}"
  ElevatedPanel-dark:
    backgroundColor: "{colors.elevated-dark}"
  ElevatedPanel-light:
    backgroundColor: "{colors.elevated-light}"
  TechStackPill:
    backgroundColor: "{colors.border-subtle-dark}"
    textColor: "{colors.text-body-dark}"
    rounded: "{rounded.full}"
    padding: 8px
  TechStackPill-light:
    backgroundColor: "{colors.border-subtle-light}"
    textColor: "{colors.text-body-light}"
    rounded: "{rounded.full}"
    padding: 8px
  SectionHeader:
    textColor: "{colors.text-heading-dark}"
    rounded: "{rounded.none}"
    padding: 0px
  SectionHeader-light:
    textColor: "{colors.text-heading-light}"
  SectionHeader-label-dark:
    textColor: "{colors.text-label-dark}"
  SectionHeader-label-light:
    textColor: "{colors.text-label-light}"
  AccentText-dark:
    textColor: "{colors.text-accent-dark}"
  AccentText-light:
    textColor: "{colors.text-accent-light}"
  BorderSubtle-dark:
    backgroundColor: "{colors.border-subtle-dark}"
  BorderSubtle-light:
    backgroundColor: "{colors.border-subtle-light}"
  BorderStrong-dark:
    backgroundColor: "{colors.border-strong-dark}"
  BorderStrong-light:
    backgroundColor: "{colors.border-strong-light}"
  GlowDecoration:
    backgroundColor: "{colors.glow-blue-dark}"
    rounded: "{rounded.full}"
    size: 256px
  GlowDecoration-blue-light:
    backgroundColor: "{colors.glow-blue-light}"
  GlowDecoration-purple-dark:
    backgroundColor: "{colors.glow-purple-dark}"
  GlowDecoration-purple-light:
    backgroundColor: "{colors.glow-purple-light}"
  SectionWrapper:
    backgroundColor: "{colors.neutral-dark}"
    rounded: "{rounded.none}"
    padding: 96px
  SectionWrapper-light:
    backgroundColor: "{colors.neutral-light}"
    rounded: "{rounded.none}"
    padding: 96px
  ProjectDetailModal:
    backgroundColor: "{colors.surface-dark}"
    rounded: "{rounded.2xl}"
    padding: 40px
  ProjectDetailModal-light:
    backgroundColor: "{colors.surface-light}"
    rounded: "{rounded.2xl}"
    padding: 40px
---

## Overview

The Developer Portfolio design system embodies a modern, minimalist, content-focused aesthetic crafted for a bilingual (English and Persian) full-stack software engineer portfolio. The design language is characterized by clean geometric typography, generous white space, subtle tonal layers, refined border treatments, and atmospheric background glow effects.

The interface supports seamless dark and light modes, defaulting to a dark mode palette (`bg-gray-950` with `bg-gray-900` sections) and transitioning to a clean, crisp light mode (`bg-gray-50` with `bg-white` sections). Primary interaction and accent highlights are driven by an electric vibrant blue (`#3b82f6`), supplemented by purple accent glows.

Typography and layout dynamically adapt between English (left-to-right, utilizing wide letter tracking) and Persian (right-to-left, utilizing the Vazirmatn font with standard letter spacing).

## Colors

The color palette is built on high-contrast neutral backgrounds, subtle semi-transparent card surfaces, structured borders, and a vibrant primary accent color.

- **Primary (#3b82f6):** Electric blue used for call-to-action buttons, key brand highlights, icons, and text accent spans. `ButtonPrimary` uses `#ffffff` on `#3b82f6` (`blue-500`) as an intentional brand accent decision matching the main portfolio theme (contrast ratio 3.68:1 for UI component button labels).
- **Primary Hover (#2563eb):** Darker blue for active and hover states on primary interactive elements.
- **Secondary (#a855f7):** Soft purple used in decorative background ambient glow blobs.
- **Neutral Dark (#030712):** Deep gray-950 serving as the outer page background in dark mode.
- **Neutral Light (#f9fafb):** Crisp gray-50 serving as the outer page background in light mode.
- **Surface Dark (#111827):** Rich gray-900 used for inner section wrappers and solid containers in dark mode.
- **Surface Light (#ffffff):** Pure white used for inner section wrappers and solid containers in light mode.
- **Card Dark (rgba(17, 24, 39, 0.5)):** Semi-transparent gray-900 with backdrop-blur-sm for cards and elevated panels.
- **Card Light (rgba(255, 255, 255, 0.8)):** Semi-transparent white with backdrop-blur-sm for light cards.
- **Borders:** Subtle gray-800 (#1f2937) and gray-200 (#e5e7eb) define card outlines, while stronger gray-700 (#374151) and gray-300 (#d1d5db) frame interactive buttons and hover states.
- **Text:** High-contrast headings in pure white or gray-900, readable body copy in gray-300 or gray-700, and secondary labels/captions in gray-400, gray-500, or gray-600.

## Typography

Typography establishes an institutional, modern, and engineering-driven voice using **Urbanist** for English and **Vazirmatn** for Persian.

- **Display & Headings:** Headings predominantly utilize a lightweight style (`font-light` / weight 300) to project elegance, with key words accentuated in medium weight (`font-medium` / weight 500) and blue coloring.
- **Section Labels:** Uppercase category headers (`text-sm font-normal`) featuring generous letter-spacing (`tracking-widest`) in English and normal spacing in Persian.
- **Card Titles:** Medium weight (`font-medium`) at 20px (`text-xl`) to establish distinct card hierarchies.
- **Body:** Ranging from `text-lg font-light leading-relaxed` for section subtitles to `text-base` and `text-sm leading-relaxed` for long-form narrative, descriptions, and metadata.
- **Pills & Badges:** Compact 12px (`text-xs font-medium`) for tech tags, project categories, and status indicators.

## Layout

Layout follows a responsive grid system built around standard container max-widths and an 8px-based spacing scale:

- **Max Widths:** Desktop layouts are contained within `max-w-6xl` (1152px) or `max-w-7xl` (1280px) centered with `mx-auto`.
- **Section Padding:** Sections use standard vertical padding of `py-24 px-6` (96px vertical, 24px horizontal).
- **Header Margins:** Section headers maintain a consistent `mb-20` (80px) separation from the content grid.
- **Grid Gaps:** Multi-column layouts use `gap-8` (32px) for project and skill card grids, and `gap-16` (64px) for two-column asymmetric arrangements.
- **Modal Dimensions:** The `ProjectDetail` modal spans `w-full h-full` on mobile and `md:h-[85vh] md:max-w-6xl` on desktop screens.

## Elevation & Depth

Visual depth is achieved through layered tonal contrast, subtle semi-transparent surfaces with backdrop filters, and soft atmospheric glow blobs rather than heavy drop shadows:

- **Surface Layers:** Outer page (`bg-page`) -> Section container (`bg-section`) -> Card / Content container (`bg-card` with `backdrop-blur-sm`).
- **Atmospheric Glow:** Large circular elements (256px to 384px) positioned absolutely behind content with `blur-3xl opacity-5` or `opacity-10`, slowly oscillating or rotating to provide subtle ambient illumination.
- **Shadows:** Subtle colored shadows such as `hover:shadow-2xl hover:shadow-blue-500/10` to enhance interactive card focus on hover.

## Shapes

Shapes follow a consistent hierarchy from soft rounded containers to pill-shaped interactive controls:

- **Cards & Modals (`rounded-2xl` / 16px):** Primary content containers, project cards, info boxes, and the ProjectDetail modal.
- **Inner Panels & Inputs (`rounded-xl` / 12px):** Skill category icon containers, form input fields, social link containers.
- **Buttons, Pills & Badges (`rounded-full` / 9999px):** All interactive buttons (primary, outline), tech stack pills, category badges, and navigation toggles.

## Components

The design system is composed of consistent, reusable component patterns:

### NavBar
- **Role:** Sticky/fixed top navigation with logo, section scroll links, language switcher, and theme toggle.
- **Tokens:** Fixed `top-0 w-full z-50`, `bg-gray-950/80` (dark) / `bg-gray-50/80` (light), `backdrop-blur-md`, `border-b border-subtle`.
- **Links:** `text-sm uppercase tracking-wider transition-colors` with hover states.

### ButtonPrimary
- **Role:** High-priority calls-to-action (e.g., Resume download, Send Message, Live Demo).
- **Tokens:** `bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm uppercase font-medium px-8 py-3 md:py-4 transition-all duration-300`.

### ButtonOutline
- **Role:** Secondary actions (e.g., Get In Touch, GitHub links, Back button).
- **Tokens:** `border border-strong text-body hover:border-gray-600 (dark) / hover:border-gray-400 (light) rounded-full text-sm font-medium px-8 py-3 md:py-4 transition-all duration-300`.

### ProjectCard
- **Role:** Interactive showcase card for featured projects.
- **Tokens:** `rounded-2xl border border-subtle bg-card backdrop-blur-sm overflow-hidden hover:border-strong hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500`.
- **Image:** `aspect-video` with subtle scale zoom on hover (`scale-1.05`).

### TechStackPill
- **Role:** Technology stack tags.
- **Tokens:** `text-xs px-3 py-1 rounded-full font-medium bg-gray-800 text-gray-300 (dark) / bg-gray-100 text-gray-700 (light)`.

### SectionHeader
- **Role:** Standardized title presentation for sections.
- **Tokens:** Uppercase label (`text-sm text-label mb-4 tracking-widest`), heading (`text-3xl md:text-5xl font-light mb-6`) with accent span (`text-blue-500 font-medium`), and subtitle (`text-lg text-muted max-w-2xl mx-auto font-light`).

### GlowDecoration
- **Role:** Ambient background atmospheric lighting.
- **Tokens:** `absolute inset-0 overflow-hidden pointer-events-none` containing blurred rounded-full blobs (`w-72 h-72 rounded-full blur-3xl opacity-5 bg-blue-500`).

### SectionWrapper
- **Role:** Full-screen wrapper ensuring smooth theme background transitions.
- **Tokens:** `min-h-screen transition-all duration-500 bg-page` wrapping inner `py-24 px-6` section.

### ProjectDetailModal
- **Role:** Modal container displaying comprehensive project details, screenshots, actions, and README.
- **Tokens:**
  - Overlay: `fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm`.
  - Container: `relative w-full h-full md:h-[85vh] md:max-w-6xl rounded-2xl overflow-hidden border shadow-2xl bg-section border-subtle`.
  - Entrance Animation: `initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} transition={{ duration: 0.3, ease: 'easeInOut' }}`.
  - Sub-elements: TopBar with solid outline buttons (`rounded-full`), Hero with `aspect-video`, Actions with solid Primary and Outline buttons, TechStack with solid `TechStackPill` tokens, and content utilizing shared `containerVariants` and `itemVariants`.

## Do's and Don'ts

- **Do** always pass `isDarkMode` and check conditionally for dark and light token pairs.
- **Do** use shared animation variants (`containerVariants`, `itemVariants`) from `src/utils/helper.js`.
- **Do** handle bilingual text rendering conditionally: apply `tracking-wider` or `tracking-widest` only when `lang === "En"`.
- **Do** keep headings in `font-light` with accent spans in `font-medium text-blue-500`.
- **Do** use `rounded-2xl` (`rounded-card`) for major cards and modals, and `rounded-full` for all buttons and chips.
- **Do** use `#ffffff` on `#3b82f6` (`blue-500`) for `ButtonPrimary` as an intentional brand accent decision matching the main portfolio theme (contrast ratio 3.68:1 for UI component button labels).
- **Don't** introduce ad-hoc glassmorphism borders (`border-white/10`, `border-black/10`) or semi-transparent button backgrounds (`bg-white/5`, `bg-white/10`).
- **Don't** duplicate the `NavBar` inside modal overlays or sub-pages.
- **Don't** use heavy saturated drop shadows; prefer subtle tonal borders and colored glow tints (`shadow-blue-500/10`).
- **Don't** use `font-bold` for section titles or card headings; adhere to `font-light` and `font-medium`.
