# 🎨 UX/UI Style Guide: Modern SaaS Design System

## 🧭 1. Navigation & Layout

- **Token: nav.primary**
  - Type: top-fixed
  - Content: logo left, search center, user/profile right
  - Behavior: sticky with scroll shadow
  - Visual: flat, high-contrast, no borders
  - UX Goal: Frictionless global access, like Saatchi header

- **Token: layout.grid**
  - Columns: 12-col fluid grid
  - Max Width: 1440px
  - Gutters: 24px
  - Breakpoints: `sm`, `md`, `lg`, `xl`
  - Usage: cards, content blocks, artwork walls

- **Token: layout.spacing**
  - Base: 8px scale (8, 16, 24, 32, 48, 64)
  - Intent: Breathable whitespace with hierarchy
  - Example: profile card padding: `p-32`; art tile gap: `gap-24`

---

## 🎨 2. Color System

- **Token: color.primary**
  - Value: `#111827` (Slate Black)
  - Purpose: High-contrast base for text and header

- **Token: color.accent**
  - Value: `#F97316` (Vibrant Orange)
  - Purpose: Strategic CTAs & visual hierarchy

- **Token: color.surface**
  - Value: `#F9FAFB` (Warm White)
  - Purpose: Canvas background to reduce visual noise

- **Token: color.gradient.subtle**
  - Value: `linear-gradient(90deg, #f3f4f6, #e5e7eb)`
  - Usage: Section transitions or category backgrounds

- **Token: color.status.loading**
  - Value: `#60A5FA`
  - Purpose: Real-time system state animation feedback

---

## 🔡 3. Typography

- **Token: font.family**
  - Value: `Inter, sans-serif`
  - Goal: Neutral, readable, scalable

- **Token: font.heading**
  - H1: `48px / 1.25 / 700`
  - H2: `36px / 1.3 / 600`
  - H3: `24px / 1.4 / 500`

- **Token: font.body**
  - Size: `16px`
  - Weight: `400`
  - Line-height: `1.6`
  - Contrast: WCAG AA minimum (4.5:1)

- **Token: text.highlight**
  - Style: `color.accent`, `font-weight: 600`
  - Use: Prices, CTA buttons, artist location

---

## 🧱 4. Components

### 🖼 Card

- **Token: card.default**
  - Border Radius: `12px`
  - Shadow: `sm` (hover: `md`)
  - Padding: `24px`
  - States: `hover`, `active`, `disabled`
  - Motion: `0.25s ease-out scale/opacity`

### 🔘 Button

- **Token: button.primary**
  - BG: `color.accent`
  - Text: `#ffffff`
  - Hover: `darken(accent, 10%)`
  - Radius: `8px`
  - Motion: `translateY(-1px) on hover`

### 📥 Modal

- **Token: modal.overlay**
  - BG: `rgba(0,0,0,0.5)`
  - Entry Animation: `fadeIn + scaleUp`
  - Exit Animation: `fadeOut + scaleDown`
  - Delay: `0.15s`

---

## 🧠 5. Cognitive Load & Feedback

- **Token: density.default**
  - Limit text rows to 3 per card before truncation
  - Use iconography (❤️, ➕) with tooltips

- **Token: feedback.state**
  - Loading: spinner + label (e.g. "Saving...")
  - Error: `#DC2626` text with clear action
  - Success: `#10B981` banner or inline toast

- **Token: transitions.motion**
  - Navigation: `slide-in`
  - State change: `fade+scale`
  - Timing: `0.2s ease-in-out`

---

## ♿ 6. Accessibility

- **Token: contrast.AA**
  - Min text contrast ratio: `4.5:1`
  - Large text (≥18px bold): `3:1`

- **Token: interaction.keyboard**
  - All nav & buttons accessible via `Tab`
  - Focus ring: `2px solid #3B82F6`

- **Token: labels.aria**
  - All interactive elements include `aria-label` or `aria-describedby`

---

## 🧪 7. Verification Checklist

| Goal                              | Token(s)                          | Verified Example                     |
|-----------------------------------|-----------------------------------|--------------------------------------|
| Frictionless Navigation           | `nav.primary`, `layout.grid`      | Top nav bar (like Saatchi Art)       |
| Breathable Whitespace             | `layout.spacing`, `card.default`  | Artist profile blocks, home layout   |
| Visual Hierarchy via Color        | `color.accent`, `text.highlight`  | Price tags, button focus             |
| Typography Scaling                | `font.heading`, `font.body`       | Artist bios, art titles              |
| Density Optimization              | `density.default`                 | Artwork listings grid                |
| Spatial Continuity (Motion)       | `transitions.motion`              | Card hover, modal open/close         |
| Accessibility Contrast + Nav      | `contrast.AA`, `interaction.keyboard` | All text and focus areas           |
| Feedback Responsiveness           | `feedback.state`                  | Add to cart, follow artist buttons   |

---