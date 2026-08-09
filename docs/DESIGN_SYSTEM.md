# GGLBET Design System

Version: 1.0  
Updated: 2026-08-05  
Reference analyzed: https://www.gglbet5.com/en/  
Method: brand-signal extraction only (colors, typeface, IA hierarchy). No HTML/CSS/assets/animations were copied.

---

## 1. Brand analysis summary

Observed official brand signals:

| Signal | Observed value | Notes |
| --- | --- | --- |
| Primary | `#EC008C` | Highest-frequency brand pink in site skin |
| Primary hover | `#CA008B` | Darker action state |
| Accent | `#FF0198` | Brighter highlight pink |
| Secondary | `#716AE7` | Violet paired with primary in brand gradients |
| Surface / chip | `#35373D`, `#23252B` | Elevated dark panels |
| Border strong | `#534759` | Muted purple-gray divider |
| Canvas | Near-black / `#000000` theme | Dark product shell |
| Typeface | Rubik | Platform font-family |
| Radii | ~10px controls, ~16px larger panels | Chip/card language |
| IA | Logo + auth + multi-level category nav | Dense product navigation |

Our redesign keeps these identity anchors, then improves clarity, performance, SEO structure, and EEAT presentation.

---

## 2. Design principles

1. **Brand-faithful, not cloned** — same pink/violet/dark identity, original component architecture.
2. **Cleaner than official** — remove neon pulse / heartbeat glow language; use restrained elevation.
3. **Faster** — tokenized CSS, minimal client JS, no decorative animation loops.
4. **SEO / EEAT first** — semantic landmarks, skip link, trust copy in footer, reusable content cards.
5. **One system** — every page uses the same color, type, spacing, radius, and motion tokens.

---

## 3. Color tokens

Source of truth: `styles/theme.css` + `config/design-tokens.ts`

### Brand

- Primary: `#EC008C`
- Primary hover: `#CA008B`
- Primary active: `#B0007A`
- Primary muted: `rgb(236 0 140 / 0.14)`
- Secondary: `#716AE7`
- Accent: `#FF0198`

### Feedback

- Success: `#22C55E`
- Warning: `#F5A524`
- Danger: `#EF4444`
- Info: `#38BDF8`

### Surfaces

- Background: `#0A0B0D`
- Surface: `#16181D`
- Surface elevated: `#1E2128`
- Surface muted: `#23252B`
- Card: `#35373D`
- Overlay: `rgb(0 0 0 / 0.64)`

### Text / border

- Ink: `#FFFFFF`
- Ink muted: `rgb(255 255 255 / 0.72)`
- Ink subtle: `rgb(255 255 255 / 0.48)`
- Border: `rgb(255 255 255 / 0.12)`
- Border strong: `#534759`
- Border brand: `rgb(236 0 140 / 0.55)`

Tailwind aliases: `bg-background`, `bg-card`, `text-ink`, `text-brand`, `border-border`, `bg-primary`, `bg-secondary`, etc.

---

## 4. Typography

- Family: **Rubik** via `next/font` (`--font-rubik`)
- Weights: 400 / 500 / 600 / 700
- Display and UI share Rubik for brand consistency
- Heading tracking: tight (`-0.02em`)
- Body line-height: 1.5

Hierarchy guidance:

| Role | Size guidance | Weight |
| --- | --- | --- |
| H1 | 2.25–3rem | 700 |
| H2 | 1.5–2rem | 700 |
| H3 / Card title | 1–1.125rem | 600 |
| Body | 0.875–1rem | 400/500 |
| Eyebrow / meta | 0.75rem uppercase | 600 |

---

## 5. Spacing, radius, shadow, motion

### Spacing

- Scale: 4 → 96px (`--ggl-space-*`)
- Page gutters:
  - Mobile: `1rem`
  - Tablet: `1.5rem`
  - Desktop: `2rem`
- Section padding: `sm 2.5rem` / `md 4rem` / `lg 6rem`
- Card padding: `1.25rem`

### Radius

- Control / buttons / inputs: `0.625rem` (10px)
- Cards: `0.75rem`
- Sections / mega panel: `1rem`
- Pills: full

### Shadow

- Soft panel shadow
- Elevated dropdown shadow
- Brand CTA shadow (subtle, non-pulsing)
- Focus ring: pink halo

### Motion

- Fast `140ms` / base `200ms` / slow `320ms`
- Standard easing only
- No infinite glow/heartbeat animations

---

## 6. Layout system (Desktop / Tablet / Mobile)

### Breakpoints

- Tablet: `768px`
- Desktop: `1024px`
- Wide: `1280px`

### Containers

- Narrow: `42rem` (prose / forms)
- Content: `72rem` (default sections)
- Wide: `83rem` (header/footer shell)

### Shell behavior

| Viewport | Header | Navigation | Auth |
| --- | --- | --- | --- |
| Mobile `< lg` | Compact sticky bar | Drawer with nested links | Inside drawer |
| Tablet `md+` | Sticky bar | Drawer until `lg` | Visible outline + primary |
| Desktop `lg+` | Sticky bar + brand border | Mega Menu | Visible outline + primary |

Component: `components/ui/Container.tsx`  
Section wrapper: `components/ui/Section.tsx`

---

## 7. Components

### Foundations

| Component | Path | Purpose |
| --- | --- | --- |
| Container | `components/ui/Container.tsx` | Max-width + responsive gutters |
| Section | `components/ui/Section.tsx` | Vertical rhythm + landmark |
| Button | `components/ui/Button.tsx` | primary / secondary / outline / ghost / soft / danger |
| Input | `components/ui/Input.tsx` | Label, hint, error, leading/trailing |
| Card | `components/ui/Card.tsx` | Base interactive surface + media slot |
| Icons | `components/icons` | Original stroke icons only |

### Domain cards

| Component | Path |
| --- | --- |
| ProviderCard | `components/cards/ProviderCard.tsx` |
| GameCard | `components/cards/GameCard.tsx` |
| PromotionCard | `components/cards/PromotionCard.tsx` |
| NewsCard | `components/cards/NewsCard.tsx` |

All domain cards accept typed CMS models and route `href`s — ready for content pages without redesign.

### Layout

| Component | Path |
| --- | --- |
| Header | `components/layout/Header.tsx` |
| MegaMenu | `components/layout/MegaMenu.tsx` |
| MobileNavigation | `components/layout/MobileNavigation.tsx` |
| Footer | `components/layout/Footer.tsx` |
| SiteShell | `components/layout/SiteShell.tsx` |

Mega Menu IA (cleaner than dual chip rows):

- Games (categories + discover)
- Providers
- Promotions
- Guides
- News
- Support (help + trust)

---

## 8. Icon style

- Geometric stroke icons
- 24×24 viewBox, 1.75 stroke
- Round caps/joins
- CurrentColor for theme inheritance
- No copied SVGs from the official site

---

## 9. Accessibility & UX rules

- Skip-to-content link in `SiteShell`
- Focus ring uses brand focus shadow
- Mega Menu supports Escape + outside click close
- Mobile drawer locks body scroll
- Buttons/links share sizing tokens
- Images require `alt` through `OptimizedImage`

---

## 10. File map

```text
styles/theme.css              # CSS tokens + Tailwind @theme bridge
styles/globals.css            # Base styles
config/design-tokens.ts       # TS token mirror
config/theme.ts               # Theme config export
constants/colors.ts           # Brand hex helpers
constants/navigation.ts       # Mega menu + footer IA
components/ui/*               # Foundations
components/cards/*            # Domain cards
components/layout/*           # Header / MegaMenu / Footer
components/icons/*            # Original icons
docs/DESIGN_SYSTEM.md         # This document
```

---

## 11. What comes next (not in this phase)

- Homepage composition using this system
- CMS-backed content for cards
- Page-level templates (Games / Providers / Promotions / News)
- EEAT author modules and trust badges (original artwork)

Homepage content was intentionally not built in this phase.
