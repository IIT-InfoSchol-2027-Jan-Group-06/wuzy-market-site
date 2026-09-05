---
# Wuzy design tokens. Machine-readable half of this file; the prose below says why.
# Source of truth is src/styles/global.css — if these disagree, the CSS wins and this file is stale.

meta:
  product: Wuzy
  surface: dark-only            # there is no light theme and none is planned
  stack: [astro, tailwind-v4, gsap]
  tailwind_config: none         # all theming lives in @theme blocks in src/styles/global.css

colors:
  # NAMING TRAP: these names are inverted from a light-theme palette that no longer exists.
  # charcoal is the LIGHT cream. bone is BLACK. Read the value, never the name.
  charcoal:   "#f4efd4"   # ink — all body text and headings
  steel:      "#a8a594"   # muted sage-grey — footer, de-emphasised copy, free-tier
  bone:       "#000000"   # marketing page ground
  ember:      "#ffe783"   # THE accent. the only chromatic colour in the system
  app_ground: "#000811"   # in-app (phone mockup) ground — near-black blue, NOT bone
  panel:      "#070607"   # mobile nav panel only; the one bespoke near-black

  alpha_ladder:
    sub_copy:        "charcoal/70"    # every paragraph under a heading
    unlit_word:      "charcoal/40"    # words before a scroll light-up reaches them
    muted_label:     "charcoal/45"    # "everything in free, plus"
    nav_link_rest:   "charcoal/65"
    card_hairline:   "white/10"       # marketing card borders
    card_fill:       "white/0.03"     # free tier / neutral surfaces
    ember_border:    "0.45 -> 0.70"   # rest -> hover, every ember-outline control
    ember_fill:      "0.10 -> 0.20"   # rest -> hover, same controls
    app_ink:         [white, "white/92", "white/90", "white/85", "white/80", "white/75", "white/60", "white/55"]

typography:
  # Three marketing voices, one in-app voice. Four of seven font tokens alias to Anton.
  display: { family: Anton,   weight: 400, tracking: "0.02em",  role: "h1/h2/h3, .font-script" }
  body:    { family: Inter,   weight: 400, tracking: "-0.02em", role: "body, UI, numerals" }
  accent:  { family: Caveat,  case: lowercase, color: ember,    role: "the tail of every headline" }
  app:     { family: Poppins, tracking: normal, role: "everything inside a phone frame" }

  tracking_rule: "small type positive (0.08-0.18em) | display 0.02em | body -0.01 to -0.02em"

  marketing_scale:            # per-section clamp(), authored inline as Tailwind arbitrary values
    hero_h1:      "clamp(48px, 7.5vw, 96px)"
    why_h2:       "clamp(63px, 9.6vw, 119px)"   # largest type on the page
    community_h2: "clamp(48px, 8vw, 112px)"
    waitlist_h2:  "clamp(48px, 7.5vw, 84px)"
    feature_h3:   "clamp(36px, 6vw, 80px)"
    pricing_h2:   "clamp(38px, 6vw, 68px)"
    about_h2:     "clamp(36px, 5.5vw, 68px)"
    features_h2:  "clamp(30px, 4.5vw, 56px)"
    stat_figure:  "clamp(44px, 5vw, 60px)"      # Inter 300, tracking -0.02em
    eyebrow:      "14px / 500 / uppercase / 0.08em / ember"
    sub_copy:     "16px / 400 / lh 1.625 / charcoal-70"

  app_scale:                  # design units, not px. @utility not @theme — see Don'ts.
    hero:    { size: 36, lh: 1.12 }
    display: { size: 30, lh: 1.15 }
    numeric: { size: 26, lh: 1.10 }
    title:   { size: 18, lh: 1.25 }
    body:    { size: 16, lh: 1.35 }
    meta:    { size: 14, lh: 1.30 }

radius:
  marketing:                  # what sections ACTUALLY use; the --radius-* tokens are near-dead
    card:   "24px"            # pricing, why-choose
    panel:  "32px"            # about cards, waitlist success
    pill:   "9999px"          # every button, every badge. no square button exists.
    nav_item: "14px"
  app:                        # design units, scale with --fw
    sm: 14                    # badges
    md: 22                    # rows, search fields
    lg: 32                    # photo cards, hero, map
    full: "9999px"            # chrome, chips

shadow:
  # House rule: structure from hairline borders, elevation from a subtle drop.
  card:     "0 0 0 1px rgba(244,239,212,0.08), 0 12px 32px -16px rgba(0,0,0,0.85)"
  elevated: "0 0 0 1px rgba(244,239,212,0.10), 0 24px 48px -20px rgba(0,0,0,0.90)"
  image:    "0 24px 48px -24px rgba(0,0,0,0.90)"
  premium:  "0 0 0 1px rgba(255,231,131,0.12), 0 24px 64px -24px rgba(255,231,131,0.28), 0 24px 48px -20px rgba(0,0,0,0.90)"
  glass_highlight: "inset 0 1px 0 rgba(255,255,255,0.12)"   # the glass tell
  app_float: "inset 0 0 0 1px ember/25%, 0 22px 34px -10px app-ground/55%, 0 6px 12px -4px app-ground/30%"

spacing:
  marketing:
    gutter: "1.25rem"         # px-5, on every unpinned section without exception
    section_y: "7rem"         # py-28
    header_clearance: "6rem"  # pt-24, and scroll-padding-top
    eyebrow_to_heading: "1rem"    # mt-4
    heading_to_subcopy: "1.25rem" # mt-5
    subcopy_to_body: ["2.5rem", "3.5rem", "4rem"]  # mt-10 / mt-14 / mt-16
  app:                        # design units against a 390 artboard
    artboard: 390
    gutter: 32
    column: 326
    section_gap: 40
    label_to_content: 20
    status_clearance: 56
    bottom_runway: 180

max_width:                    # the funnel: the page narrows as it nears conversion
  default: "1150px"
  why_grid: "1200px"
  pricing: "980px"
  waitlist: "760px"

motion:
  css_durations: ["0.18s", "0.20s", "0.25s", "0.28s", "0.30s"]
  easing:
    standard:   "cubic-bezier(0.4, 0, 0.2, 1)"    # burger, Tailwind transition-colors
    decelerate: "cubic-bezier(0.2, 0.8, 0.2, 1)"  # nav panel drop
    app:        "cubic-bezier(0.22, 0.61, 0.36, 1)"  # phone tilt + breakout entrance
  gsap:
    entrance: { ease: power3.out, duration: "0.7-0.9", stagger: "0.09-0.14", start: "top 85%" }
    word_reveal: { ease: power4.out, duration: 0.9, yPercent: 110, rotate: 4, stagger: 0.09 }
    exit: { ease: power2.in, duration: "0.3-0.6" }
    scrubbed: { ease: none }
  app_drift:
    heavy: { amp: 12, dur: 6.8 }
    mid:   { amp: 10, dur: 5.8 }
    light: { amp: 8,  dur: 5.0 }
    depth: 26           # design units
    stagger: 90         # ms between pieces entering

breakpoints:              # Tailwind v4 defaults, unmodified
  sm: 640
  md: 768
  lg: 1024
  xl: 1280
---

# Wuzy — Design Language

This is the design contract for the Wuzy marketing site. It exists so nobody has
to re-derive these decisions from the CSS again. Read it before touching any UI.

**Companion rule from `AGENTS.md`, which outranks anything here:** do not change
the layout or the animations. This document describes them so you can work
*around* them correctly, not so you can rebuild them.

---

## 1. Overview

Wuzy is a Sri Lanka–based app for finding events, communities and people worth
showing up for. The marketing site is a single scrolling page (Astro 7 +
Tailwind v4 + GSAP ScrollTrigger) that ends in a waitlist form.

**The site carries two design systems on purpose.** Keeping them apart is the
single most important thing about working here.

| | Marketing page | In-app (phone mockups) |
|---|---|---|
| ground | `--color-bone` `#000000` | `--color-app-ground` `#000811` |
| ink | `#f4efd4` cream, `#a8a594` grey | white + a fixed alpha ladder |
| type | Anton display / Inter body / Caveat accent | Poppins, nothing else |
| case & tracking | uppercase headings, `-0.02em` body | reset to `none` / `normal` |
| radii | fixed px (24 / 32 / 9999) | design units (14 / 22 / 32) that scale |
| hairline | cream `rgba(244,239,212,.08–.1)` | ember `25–28%` |
| motion | GSAP, scroll-driven | CSS keyframes + a small rAF runtime |

They share **exactly one token**: `--color-ember: #ffe783`.

`.wz-screen`, `.wz-out` and `.wz-pin` explicitly reset `text-transform` and
`letter-spacing`, because the marketing page's uppercase Anton would otherwise
inherit straight into the product and read as the website leaking into the app.
Never style a phone mockup with a marketing token, or vice versa.

**Routes.** Two real pages, both through `Layout.astro` (which supplies `<main>`
— a page renders bare `<section>`s and must not nest its own):

- `/` (`src/pages/index.astro`) — Hero → Features → Community → Why Choose →
  Pricing → Waitlist → Footer. The consumer pitch.
- `/enterprise` (`src/pages/enterprise.astro`) — EnterpriseHero →
  EnterpriseFeatures (pinned, "how it works" as two live mockups) → WhyHost
  (pinned, "why host" on the Why Choose card treatment) → Waitlist (host
  variant) → Footer. The host pitch.

(`src/pages/mock/[...page].astro` is a dev-only bench for the phone mockups.)

---

## 2. Visual theme & atmosphere

Black, warm cream, one yellow. Nothing else has a hue.

Two fixed full-viewport layers sit on `<body>` and define the whole atmosphere:

**The locked ember bloom** (`body::before`, `z-index: -2`) — five yellow radials
over a black→`#060606`→black vertical, viewport-fixed so it **never scrolls**:

```css
radial-gradient(1200px 720px at 50% -12%,  rgba(255,231,131,0.08),  transparent 62%),
radial-gradient(900px  560px at 100% 104%, rgba(255,231,131,0.06),  transparent 60%),
radial-gradient(760px  480px at 0% 60%,    rgba(255,231,131,0.035), transparent 60%),
radial-gradient(1000px 560px at 50% -6%,   rgba(255,231,131,0.095), transparent 62%),
radial-gradient(760px  420px at 90% 110%,  rgba(255,231,131,0.06),  transparent 60%),
linear-gradient(180deg, #000000 0%, #060606 45%, #000000 100%);
```

It is a fixed pseudo-element rather than `background-attachment: fixed`, which
iOS Safari ignores. Because it never scrolls, **no section has a background of
its own** and there are no seams — even where GSAP pinning makes a section
seventeen viewports tall. Do not add a per-section background.

**The film grain** (`body::after`, `z-index: 60`, `opacity: 0.05`,
`pointer-events: none`) — an inline-SVG `feTurbulence fractalNoise` at
`baseFrequency='0.85' numOctaves='3'`, tiled `240px × 240px`. z-index 60 puts it
**above the nav** (z-50). It is a data URI, not a file.

**Copy voice.** All body and UI copy is lowercase and clipped —
*"not a dating app."*, *"not another group chat that dies in four days."* Caps
appear only on headings, stat figures, and the wordmark. In-app copy follows a
separate house style, stated in `screens/content.ts`: names, places and titles in
Title Case; buttons and previews in sentence case; timestamps bare (`1d`, not
`.1d`).

---

## 3. Colors

### Tokens

| Token | Value | Use |
|---|---|---|
| `--color-charcoal` | `#f4efd4` | All ink. Body, headings. **A light cream despite the name.** |
| `--color-steel` | `#a8a594` | Footer text, free-tier labels, anything de-emphasised. |
| `--color-bone` | `#000000` | Marketing page ground. Also the text colour *on* solid ember. |
| `--color-ember` | `#ffe783` | The accent. CTAs, current state, hairlines, all glow. |
| `--color-app-ground` | `#000811` | In-app ground only. Never on the marketing page. |

Every yellow `rgba()` in the codebase is `rgb(255,231,131)` at an alpha — that is
`#ffe783`. Every cream `rgba()` is `rgb(244,239,212)`.

### The alpha ladder

Opacity carries meaning here; memorise these rather than inventing new ones.

- `charcoal/70` — every paragraph under a heading. The single most-used value.
- `charcoal/40` — a word that has not yet been lit by a scroll light-up.
- `charcoal/65` → `charcoal` — nav link rest → hover.
- `white/10` — card hairline. `white/0.03`–`white/0.06` — neutral card fill.
- Ember controls move **border `0.45 → 0.70`, fill `0.10 → 0.20`** on hover. The
  nav CTA, the hamburger and the premium pricing button all use this exact
  delta. Reuse it; do not pick new numbers.

### Painted glass

`.pricing-card` and `.ys-card` share one surface — a faked 145° light source plus
a top-centre bloom:

```css
background-image:
  linear-gradient(145deg,
    rgba(255,255,255,0.08)  0%,
    rgba(255,255,255,0.025) 26%,
    transparent             52%),
  radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,0.045), transparent 62%);
```

**There is deliberately no `backdrop-filter` on these cards.** It re-rastered and
banded during CTA hover transitions, and it was a no-op anyway — only the fixed
gradient sits behind them. Do not add it back.

`backdrop-filter` survives in exactly four places: the desktop nav pill
(`blur(20px)`), `.btn-glass-yellow` (`blur(16px) saturate(1.5)`), and the
waitlist input and success panel (`blur(24px)`), and `.wz-chrome` inside the
phone frames (`blur(16px) saturate(140%)`).

### The in-app surface

```css
background-color: color-mix(in srgb, var(--color-ember) 20%, var(--color-app-ground));
```

`bg-app-surface` is ember-at-20% **resolved opaque**, so a search pill floating
over the marketing page is the same colour as its seated twin over the app
screen. That is the entire reason it is a `color-mix` and not `ember/20`.

---

## 4. Typography

### Four voices

| Voice | Family | Where | Notes |
|---|---|---|---|
| Display | **Anton** | `h1, h2, h3, .font-script` | One weight (400) — it is already black. |
| Body / UI | **Inter** | `body` default, all copy, all numerals | Variable 100–900. |
| Accent | **Caveat** | the tail of every headline | Always lowercase, always ember. |
| App | **Poppins** | inside phone frames only | 400/500/600/700/800. |

Four of the seven `--font-*` tokens alias to Anton (`--font-serif` is not a serif;
`--font-script` is not a script). The real system is three faces on the marketing
page plus Poppins in the product. Loaded from one Google Fonts `@import` in
`global.css:1`.

### The tracking inversion — the sharpest rule in the system

```css
body       { letter-spacing: -0.02em; }   /* tight */
h1, h2, h3 { letter-spacing:  0.02em; }   /* open */
```

Restated as a rule you can apply anywhere:

> **Small type gets positive tracking (0.08–0.18em). Display type gets 0.02em.
> Body type gets −0.01 to −0.02em.**

Eyebrows `0.08em`, the pricing badge `0.1em`, the nav wordmark `0.16em` →
`0.18em` at ≥640px. That wide wordmark tracking is what makes it read as a
logotype rather than a nav item.

### Type roles

- **Eyebrow** — `text-sm font-medium uppercase tracking-[0.08em] text-ember`.
  This exact string is the token. Every section that has one uses it verbatim.
- **Headings** — Anton, weight 400, `leading-[1.2]` almost universally (hero
  `1.13`, Community `1.05`).
- **Sub-copy** — `text-base font-normal leading-relaxed text-charcoal/70`,
  constrained to `max-w-md` (28rem) or `max-w-lg` (32rem). The two heroes are
  the exception: `max-w-xl` (36rem) at `mt-6`, because they carry the page.
- **Numerals** — Inter at **weight 300** with negative tracking (`-0.02em` for
  stats, `-0.03em` for prices) at `clamp(44px,5vw,60px)` / `40px`. Huge, light
  Inter against heavy Anton is a deliberate counterpoint. Do not set a figure in
  Anton.

### The max-width funnel

`1150px` for most sections → `1200px` (why-choose grid) → `980px` (pricing) →
`760px` (waitlist). The page narrows as it approaches the conversion point. Keep
new sections on the ladder.

### In-app type

Six steps, nothing between them: hero 36 / display 30 / numeric 26 / title 18 /
body 16 / meta 14 (design units). `hero` is the one loud step, reserved for event
titles. These are `@utility` rules, **not** `@theme` tokens — see Don'ts §12.

---

## 5. Layout

### Marketing

- **Gutter: `px-5` (1.25rem) on every unpinned section, without exception.**
- **Vertical: `py-28` (7rem)** for flow sections; `pt-24` (6rem) where a section
  follows the fixed header.
- Rhythm inside a section: `mt-4` eyebrow→heading, `mt-5` heading→sub-copy,
  `mt-10`/`mt-14`/`mt-16` copy→body.
- Everything is `mx-auto` inside a `max-w-*`. Every section is
  `position: relative` so decoration can hang off it.
- Pinned sections (`#features`, `#community`, `#why`, and both on /enterprise)
  carry **no padding on the
  outer element** — their sticky inner layer owns the spacing.
- `html { scroll-padding-top: 6rem }` clears the fixed header on anchor jumps.
  Do not add per-section `scroll-mt`; that is what left `#pricing` and
  `#waitlist` landing 96px apart.

### In-app

One rhythm, repeated in every screen's header comment:

> 390 artboard · **32** gutter · **326** content column · **40** between sections
> · **20** from a label to its content · **pt-56** status-bar clearance ·
> **pb-180** bottom runway.

All of it in design units. `--spacing` is rebased per frame:

```css
--spacing: calc(var(--fw) * 0.9536 / var(--screen-units, 390));
```

so `w-326`, `gap-12`, `size-34` in markup are literally artboard numbers, and the
whole system scales from one `--fw` knob. `0.9536 = 287.72 / 301.72` (well width
over frame width).

---

## 6. Elevation & depth

The house rule, quoted from `global.css`:

> **Structure from hairline borders, elevation from subtle drop.**

There is no elevation scale of tinted surfaces. A thing is separated from the
page by a 1px hairline, and lifted off it by a wide-blur, heavily-negative-spread
black shadow. Never a tight shadow, never a heavy border.

### Marketing

| Token | Value |
|---|---|
| `--shadow-card` | `0 0 0 1px rgba(244,239,212,.08), 0 12px 32px -16px rgba(0,0,0,.85)` |
| `--shadow-elevated` | `0 0 0 1px rgba(244,239,212,.10), 0 24px 48px -20px rgba(0,0,0,.90)` |

The 1px ring lives in the shadow's spread slot, not in `border`. `--shadow-card`
is the one actually used; the other three are defined and unused.

The **premium pricing card** is the single most emphatic surface on the page, and
the only one with a coloured glow:

```css
box-shadow:
  0 0 0 1px   rgba(255,231,131,0.12),   /* ember hairline */
  0 24px 64px -24px rgba(255,231,131,0.28),   /* ember bloom */
  0 24px 48px -20px rgba(0,0,0,0.90);   /* black drop */
```

The **inner top highlight** `inset 0 1px 0 rgba(255,255,255,0.12 | .25 | .35)` on
the nav pill and the primary button is the glass tell. If something should read
as glass, it needs that line.

### In-app

Three names, **one shadow geometry** (`22/34/-10` + `6/12/-4`):

- `wz-float` — ground fill + ember hairline + the drop. For a piece with no fill
  of its own.
- `wz-lifted` — the same list without the ground. For a piece that already has a
  fill (the search pill).
- `.wz-chrome` — the frame's own material, below.

Everything is multiplied by `(1 - var(--t))`, so **elevation dissolves as a piece
seats into the screen**. A floating card needs a surface to survive over a light
page; seated back in the UI that surface would be wrong.

Use `box-shadow`, never `filter: drop-shadow()` — the latter puts the subtree on
a filter render surface that Chrome rasterises once and then transforms, so a
floating card was a stretched bitmap while its seated twin was live DOM.

---

## 7. Shapes

### Marketing

The `--radius-*` tokens (14/16px) are defined and **effectively unused**. What
sections actually use:

- `24px` — pricing and why-choose cards
- `32px` — about cards, waitlist success panel
- `9999px` / `100px` — every button, every badge, the nav pill, the input
- `14px` — mobile nav panel items

**There is no square button anywhere on this site.** Every interactive control is
a pill.

### In-app

A three-step ladder in design units, with a fixed assignment:

| Utility | Units | Applies to |
|---|---|---|
| `rounded-app-sm` | 14 | badges |
| `rounded-app-md` | 22 | rows, search fields |
| `rounded-app-lg` | 32 | photo cards, hero, map |
| `rounded-full` | — | chrome, chips |

Do not reach past this ladder. The map card was pulled down to `lg` because the
export's corner was nearly as round as the phone's own and read as a second
bezel.

---

## 8. Components

### 8.1 The section shell

Every marketing section is a recombination of this:

```html
<section id="…" class="relative px-5 py-28">
  <div class="mx-auto w-full max-w-[1150px]">
    <p class="X-label text-sm font-medium uppercase tracking-[0.08em] text-ember">eyebrow</p>
    <h2 class="mt-4 font-display font-normal leading-[1.2] tracking-[0.02em] text-charcoal">
      <span class="block overflow-hidden text-[clamp(a,bvw,c)]">…per-word spans…</span>
      <span class="block overflow-hidden text-[clamp(a,bvw,c)]">
        <span class="font-control-cursive lowercase text-ember">accent phrase.</span>
      </span>
    </h2>
    <p class="X-desc mx-auto mt-5 max-w-md text-base font-normal leading-relaxed text-charcoal/70">…</p>
    …body…
  </div>
</section>
```

### 8.2 The headline — the brand signature

**Two lines, always.** Line 1 in Anton, uppercase, cream. Line 2 ends in a
**Caveat lowercase ember phrase**:

| Section | The tail |
|---|---|
| Hero | `story.` / `vibe.` / `scene.` / `match.` (cycles) |
| Features | `miss.` |
| Community | `communities.` |
| Why Choose | `wuzy.` / `us.` (cycles, then freezes on `us.`) |
| Pricing | `main character era.` |
| Waitlist | `create stories` |

Six of seven live sections carry it. **That handwritten yellow tail is the brand
signature** — a new section without one will not look like this site.

### 8.3 Cards

| Card | Radius | Border | Fill | Padding | Hover |
|---|---|---|---|---|---|
| About | 32px | `charcoal/15` | `#000000` | 1.75rem | none |
| Pricing free | 24px | `white/10` | `white/.03` | 1.75→2rem | none |
| Pricing premium | 24px | `ember/40` | `ember/.05` | 1.75→2rem | none |
| Why Choose | 24px | `white/10` | `#10100e`/85 | 2.25rem | inner `-translate-y-2` / 300ms |
| Waitlist success | 32px | `white/15` | `white/.06` | 1.5rem | n/a |

**Cards are read-only surfaces here, not affordances.** Exactly one card in the
whole page lifts on hover, and it lifts an *inner wrapper* — the card's border
and shadow stay put while the content rises inside the frame. Do not add hover
lifts to the others.

`#10100e` at 85% on the why-choose card is deliberately near-opaque: those cards
must occlude the pinned heading sitting behind them.

### 8.4 Buttons — four variants, no more

**Primary — `.btn-glass-yellow`** (Hero, About, waitlist submit):

```css
background: rgba(255,231,131,0.12);
color: var(--color-ember);
border: 1px solid rgba(255,231,131,0.45);
border-radius: 100px;
padding: 0.7rem 1.4rem;
font: 450 0.9375rem/1.4;  letter-spacing: -0.02em;
backdrop-filter: blur(16px) saturate(1.5);
box-shadow: 0 8px 24px -8px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.25);
transition: background-color .2s ease, transform .2s ease, box-shadow .2s ease;
```

Hover moves three channels together: fill `0.12 → 0.22`, `translateY(-1px)`,
deeper drop + brighter inner highlight. `font-weight: 450` is a variable-font
value — it is intentional.

**Ember outline** — premium pricing CTA, `.nav-cta`, `.nav-burger`. Border
`0.45–0.5 → 0.7`, fill `0.1–0.12 → 0.2`. **Colour only, no lift.**

**Neutral ghost** — free pricing CTA, the waitlist input. Border
`white/0.15 → 0.25`, fill `white/0.06 → 0.1`.

**Inverted** — solid `#ffe783` on `#000000`. Reserved for exactly two moments:
the current-state nav CTA and the "the move" pricing badge. Do not spend it
elsewhere.

### 8.5 Pills & badges

One geometry, three weights:

- Nav item — pill, `12px→13px`, weight 500, `-0.01em`
- Pricing badge — pill, `11px`, weight 700, uppercase, `0.1em`, solid ember
- Eyebrow — `14px`, weight 500, uppercase, `0.08em`, ember

### 8.6 In-app primitives

All in `src/components/mockups/screens/`. Every one takes the `slotName` /
`hollow` prop pair: `hollow` blanks the contents while keeping the box (the gap a
floating piece flies into), `data-slot` is the landing target the runtime
measures.

| Component | Box (units) | Notes |
|---|---|---|
| **NavBar** | `290 × 50`, `px-22`, `rounded-full` | `.wz-chrome`. Four `size-25` icons + `size-30` avatar. |
| **PlusButton** | `size-45` circle, `size-30` glyph | `.wz-chrome`. One component for both the static and floating compose. |
| **DateBadge** | `84 × 72`, `rounded-app-sm` | White card, app-ground ink — a torn-off calendar page. |
| **EventRow** | `h-128 w-326`, `rounded-app-md` | Left-heavy scrim `from-black/70 via-black/35 to-transparent`. |
| **MessageRow** | `h-56 w-326`, `rounded-app-md` | `wz-float` when floating; box and radius unchanged so it lands exactly. |
| **FeedCard** | `h-320 w-326`, `rounded-app-lg` | Top scrim `h-96` = identity block + inset. |
| **HeroCard** | `h-438 w-326`, `rounded-app-lg` | Has a `peek` prop that renders the copy-free variant for the rail edge. |
| **MapCard** | `h-218 w-358`, `rounded-app-lg` | Just the tile; its actions are frame chrome now. |
| **Poster** | `h-236 w-158`, `rounded-app-lg` | Same identity treatment as FeedCard, bottom-left. |
| **ChatSearch** | `h-48 w-326`, `rounded-app-md`, `bg-app-surface` | Discover inlines byte-identical markup. |
| **Chip** | `h-28 rounded-full px-14` | Active `bg-ember text-app-ground`; rest `bg-ember/25 text-ember ring-1 ring-ember/70 ring-inset`. |
| **EventBanner** | `h-180 w-326`, `rounded-app-lg` | The one photo card that carries a ring (`ring-1 ring-ember/45 ring-inset`) — here the photo is a *field*, not content, and the ring ties it to the field cards below. |
| **FieldCard** | `w-326`, auto height, `rounded-app-md`, `bg-app-surface` | Label + value. Same surface family as the search pills; `wz-lifted` when floating. Height comes from content — `invisible` keeps the box, so the hollow twin still holds the gap. |
| **DetailRow** | `h-22 w-326` | One component for both a value+chevron row and a switch row, so their right-hand sides cannot drift out of alignment. Fixed 22 because a switch is 22 and a body line 21.6. |
| **PublishButton** | `h-50 w-162`, `rounded-full` | `.wz-accent`. Like PlusButton, one component for both the pinned landing slot and the floating piece. |
| **EventSummary** | `h-126 w-326`, `rounded-app-lg` | Cover + kicker + name. Full-card scrim, not the corner blocks' fixed `h-96` — a name that wraps to two lines pushes the kicker above a fixed depth and onto bare photo. |
| **StatCard** | `h-126 w-155`, `rounded-app-lg`, `bg-app-surface` | `justify-between`, not centred: one label wraps and one does not, and centring each stack put the two figures at different heights. Explicit width, not `flex-1` — the floating copy renders outside the row. |
| **IncomeChart** | `h-280 w-326`, `rounded-app-lg`, `bg-app-surface` | Inline SVG. Its viewBox is the plot box in design units and the element is sized to those units, so `stroke-width="6"` is a real 6 units — see the Don'ts. |

**Chips use an *inset* ring.** An outset ring paints a second rounded rect one
pixel outside, and at this size the two radii disagree enough that the corners
read squared off.

**Identity treatment** — every avatar on content is
`rounded-full object-cover ring-1 ring-ember/80`. NavBar's uses `ring-white/35`
because it is chrome; the overlapping "who's going" stack uses `ring-app-ground`.

**Every photo carrying copy gets a scrim ending in `to-transparent`**, sized to
the copy block plus its inset (`h-96` for an identity block, `h-280` for
HeroCard's deep copy). A scrim with a floor across the whole photo is wrong.

### 8.7 Icons

`Icon.astro` — a hand-drawn Lucide-style outline set, 15 glyphs, all on a
`24 × 24` viewBox, `fill="none" stroke="currentColor"` with round caps and joins.
No icon dependency.

Stroke weight is **compensated for scale**:

```ts
const STROKE_AT_24 = 1.7;
strokeWidth = ((STROKE_AT_24 * 24) / u).toFixed(2)
```

Because the stroke lives in the 24-unit box and the box is scaled, a fixed stroke
would scale with it — a 35-unit icon carried a 46% heavier line than a 24-unit
one beside it. Dividing back out gives every glyph the same optical weight at any
size. `u=24 → 1.70`, `u=18 → 2.27`, `u=30 → 1.36`.

**Size with `u`, never with a `size-*` class.** The width and height are written
as an inline style, which beats a utility — so `class="size-30"` is silently
ignored and the glyph renders at the `u` default of 24. `NavBar` (`size-25`) and
`PlusButton` (`size-30`) both do this and have been drawing 24 all along;
PlusButton's own comment describes a 30 glyph it has never rendered. Left alone
because fixing it would visibly resize shipped screens.

### 8.8 The phone frame

- Bezel is a **single ring path** with no background fill, so it overlays and the
  screen shows through the hole. No masking; the component stays transparent over
  any page background. `viewBox 0 0 301.72 600.32`, ring 7 units, inner radius 38.
- `.wz-well` is **the only element that clips**. Breakouts are siblings of
  `.wz-phone`, never children of the well — that is what lets them cross the
  bezel.
- Layer stack: `0` well · `1` seated breakout · `3` bezel · `4` floating
  breakout · `5` chrome.
- One chrome material for every button on every screen:

```css
.wz-chrome {
  background: rgba(36, 32, 16, 0.94);
  box-shadow: inset 0 0 0 1px rgba(255,231,131,0.28), 0 10px 30px -8px rgba(0,0,0,0.7);
  backdrop-filter: blur(16px) saturate(140%);
}
```

  It is opaque enough to stand alone because `backdrop-filter` silently no-ops
  inside `.wz-stage`'s 3D context.

- `.wz-accent` (solid ember on app-ground) is the only place ember becomes a
  *surface*. **At most one per screen** — one where the screen has a primary
  action, none where it has none. The dashboard reports; it does not ask, so it
  carries no accent at all.

### 8.9 Rails

`wz-rail` — `overflow-x: auto`, `overscroll-behavior-x: contain`, scrollbar
hidden three ways, children all `shrink-0`.

**No scroll-snap, no mask, no fade.** The run-off is created by content, not by a
gradient: Feed leads at `px-8` so a poster is visibly cut by the screen edge;
Discover leads at `px-32` and appends a real copy-free `<HeroCard peek />` so the
next card peeks. If you want an edge to read as "there's more", add content that
runs off it.

The vertical well is `overscroll-behavior: auto` on purpose — trapping the wheel
inside a phone on a long page reads as broken scroll. Horizontal rails are
`contain` so dragging one never scrolls the page sideways.

---

## 9. Motion

### GSAP vocabulary (marketing)

| Beat | Recipe |
|---|---|
| Entrance | `y: 24–40, autoAlpha: 0, duration: 0.7–0.9, stagger: 0.09–0.14, ease: 'power3.out'` |
| Trigger points | `top 85%` labels/cards · `top 80%` words · `top 88%` sub-copy |
| Masked word reveal | wrapper `block overflow-hidden`, inner `yPercent: 110 → 0, rotate: 4 → 0, duration: 0.9, ease: 'power4.out', stagger: 0.09` |
| Scrubbed light-up | words start `text-charcoal/40`, tween `color` to `#f4efd4` (or ember for the accent) with `ease: 'none'` under `scrub: true` |
| Exit | **always** `power2.in`, `0.3–0.6s`, mirrored negative offsets |

**There are no CSS `@keyframes` on the marketing page at all.** Every marketing
animation is GSAP; every CSS transition is a hover/focus state.

### The pinned-section pattern

A hard convention, five for five (`#features`, `#community`, `#why` on the home
page; `#enterprise-features`, `#why-host` on /enterprise):

```
section > .X-scroll (the trigger, never moves) > .X-sticky (the pinned element)
```

Each budgets its scroll in viewports: `buildVH` for the build, then
`HOLD_VH = 1.2` to hold, then **fades its own content out before the pin
releases** so the next section never arrives on top of leftovers, then
`.to({}, { duration: 0.3 })`.

`pinScale()` in `src/lib/scroll.ts` is the one knob:

```ts
export const pinScale = () => (window.innerWidth < 768 ? 0.6 : 1);
```

Phones get 60% of the desktop budget — a budget that reads as deliberate on a
desktop takes three or four swipes on a phone. It is called *inside* ScrollTrigger
`end` functions so it re-evaluates on refresh and rotation.

### In-app motion (`screens/motion.ts`)

One vocabulary for every screen: three drift speeds (`heavy 12/6.8`,
`mid 10/5.8`, `light 8/5.0`), one depth (26 units), one stagger (90ms), one
entrance (`translateY(22px) scale(.94)` → none, `0.75s
cubic-bezier(.22,.61,.36,1)`), one float keyframe.

Amplitude and depth are **design units, not px** — as px the float read a third
stronger on a narrow viewport where the pieces are smallest. An `index * 0.3s`
animation-delay keeps two pieces of the same speed from breathing in lockstep.
`--fd` is `1 - t`, so the idle float damps to zero as a piece seats.

Each screen still chooses *which* pieces lift from *which* edge in *what* order.
The material is shared; the choreography is not.

### The seating model

A floating piece flies home when the screen scrolls past 6px. Above `t > 0.995`
the overlay copy hands off to the screen's own copy — which is natively clipped
by the well *and* by whatever rail it sits in, and scrolls with both. No
`clip-path` can reproduce "bounded by every ancestor box".

The flight is a **transform** (`--dx`/`--dy` in px), never `left`/`top`; writing
percentages every frame forces layout on every piece and stutters.

---

## 10. Responsive behaviour

**`clamp()` does about 90% of the work.** There are only six raw media queries in
the entire marketing surface:

1. NavBar `min-width: 640px` — the full-bleed bar becomes a floating frosted pill
2. NavBar `max-width: 639.98px` — the hamburger exists
3. Community `max-width: 1023px` — avatar positions and sizes
4. Why Choose **and Why Host** `max-width: 767px` — heading, padding and overlap
   shrink to fit a pinned viewport
5. `prefers-reduced-motion` — phone mockups only
6. Tailwind variants — `sm:` nav pill / pricing padding / waitlist form
   direction; `md:` grid columns; `lg:` overlap depth; `xl:` Features
   side-by-side

Every override inside a raw media query needs `!important`, because it is
competing with Tailwind utilities. When you override a heading size, put it on
the **line span, not the `h2`** — a child's own `font-size` beats an inherited
one.

The in-app system needs **no responsive rules at all**: everything is in design
units off one `--fw`, so there is no second set of numbers for small screens.

---

## 11. Naming conventions

- **Section prefix + role**: `.about-head`, `.feature-slide`,
  `.community-avatar`, `.ys-card`, `.pricing-label`, `.waitlist-desc`.
- `-label` = eyebrow · `-desc` = sub-copy · `-word` = animatable word span ·
  `-card` = surface · `-scroll` / `-sticky` = the pinned pair.
- **Classes exist for JS selection and cross-file styling only.** Everything
  visual is Tailwind utilities inline. Only four classes carry real styles in
  `global.css`: `.btn-glass-yellow`, `.nav-cta`, `.pricing-card`, `.ys-card`.
- `data-*` for behaviour: `data-nav-link`, `data-nav-toggle`, `data-slot`,
  `data-home`, `data-parallax`.
- `will-change-transform` on transform-animated word spans **only** — never on
  colour-only tweens.

---

## 12. Do's and Don'ts

Each of these was learned the hard way. The reason matters as much as the rule.

**Do**

- Put new spacing on the existing rhythm (`px-5`, `py-28`, `mt-4/5/10/14/16`).
- Give every new headline a Caveat lowercase ember tail.
- Reuse the ember hover delta (border `.45→.7`, fill `.1→.2`) rather than picking
  new alphas.
- Measure with `offsetLeft` / `offsetTop`, never `getBoundingClientRect()` — the
  phone's pointer tilt is a 3D rotation on an ancestor and client rects feed it
  back into itself; the Community avatars became a coin flip per load for the
  same reason.
- Keep `overflow-x: clip` after `overflow-x: hidden` on `html`/`body`. `hidden`
  makes the element a scroll container, which re-rasters fixed overlays on every
  scroll and tears on Windows.
- Define in-app type as `@utility`, not `@theme`. A custom property at `:root`
  substitutes its `var()` *there*, so `calc(36 * var(--spacing))` would freeze
  against the root's `0.25rem` and land four times too big.
- Keep one `SCREEN_UNITS = 390` ruler for every screen. When each divided by
  its own export width (360 / 393 / 402), the same `290` nav rendered 12% wider
  on Feed than on Discover.

**Don't**

- **Don't add `scroll-behavior: smooth`.** Five sections are pinned with
  `scrub: true`; the browser's smooth-scroll drives their timelines at fling
  speed — one nav click strobed roughly twenty viewports of animation, and
  `anticipatePin` mispredicts badly at that velocity. GSAP documents the
  combination as unsupported.
- **Don't add `will-change` to the pinned layers.** GSAP already promotes them,
  and a lingering `will-change` keeps a GPU texture alive forever, which Chrome
  drops to white tiles on fast scroll. Use `backface-visibility: hidden` instead.
- **Don't add `backdrop-filter` to the cards.** It banded during CTA hover
  transitions and is a no-op behind the fixed gradient.
- **Don't use `filter: drop-shadow()` on a floating breakout.** It rasterises the
  subtree once and then transforms it, so the piece is low-quality until it lands.
- **Don't set `.wz-phone` to `preserve-3d`.** As a 3D rendering context it paints
  by depth rather than z-index, and the nav hit-tested on top but painted under a
  passing feed card.
- **Don't put a breakout inside `.wz-well`.** The well is the only element that
  clips; a piece moved inside it gets sliced at the frame edge.
- **Don't give a section its own background.** The locked gradient is the only
  ground, which is what keeps pinned sections seamless.
- **Don't add hover lifts to cards.** One card lifts, on an inner wrapper, on
  purpose.
- **Don't put a descender in a Caveat accent word without loosening the line
  box.** The masked word reveal needs `overflow-hidden` on the line wrapper, and
  at the h2's `leading-[1.2]` that clips anything below the baseline. Every
  accent word that shipped first — `create stories`, `communities.`, `main
  character era.` — happens to have no descender, so this stayed hidden until
  `doors open.` lost its `p`. Give the accent line `leading-[1.45]`.
- **Don't reuse `#hero` as a section id on a new page.** The scroll spy treats
  `hero` as the signal to clear every nav highlight. Likewise `features`, `why`,
  `pricing` and `waitlist` — a new page using any of those ids will hijack the
  nav. `/enterprise` uses `ent-hero`, `enterprise-features`, `why-host`, `host`.
- **Don't reach for `vector-effect="non-scaling-stroke"` inside a frame.** It
  pins a stroke to CSS pixels, so it stops scaling with `--fw` and reads heavy on
  a narrow viewport — the same failure `Icon.astro` divides its stroke back out
  to avoid. Give the SVG a viewBox in design units and size the element to those
  same units instead; then the stroke width is literally in design units.
- **Don't give a floating piece a `flex-1` width.** It is rendered outside the
  row it belongs to, where `flex-1` means nothing, and it has to be the same box
  as the slot it lands on. Width goes on the component.
- **Don't render a component with a `<script>` twice on one page without scoping
  it.** Astro bundles that script once per page however many times the component
  renders, and every selector here is document-global — so
  `gsap.from('.x-card', …)` sweeps both instances into one stagger, and a
  *string* ScrollTrigger `trigger` resolves to the first match only, leaving
  instance two to play offscreen and be finished before you reach it. Scope it
  with `querySelectorAll('[data-x]').forEach(root => …)` and pass element
  references as triggers, never strings.
- **Don't mix the two systems.** No Anton inside a phone, no `--color-app-ground`
  on the marketing page, no `rounded-app-*` outside a frame.

### Cross-page links

Now that there is more than one route, every nav and footer href is
**root-relative** (`/#features`, not `#features`) — a bare hash resolves against
whatever page you are on and goes nowhere from `/enterprise`.

The scroll spy pairs a section id against a link's `data-target`, so that target
must be **the hash only**. `NavBar.astro` derives it with
`targetOf(href) = href.split('#')[1] ?? ''`. It used to be `href.slice(1)`, which
only ever meant "strip the `#`" — on a root-relative href that yields
`"#features"`, matches no section id, and kills the highlight on every link with
no error and no visual clue. If you touch the nav hrefs, check this first.

A link to a page rather than a section gets an empty target and never matches.
It reports "you are here" with a server-rendered `aria-current="page"` instead,
computed from `Astro.url.pathname`. Both `'true'` (spy) and `'page'` (page link)
are styled — if you add a current-state rule, match both.

---

## 13. Known deviations — do not propagate

These are true of the codebase today. They are recorded so nobody copies them
forward as if they were intentional design. **Fixing them is out of scope for a
design task** — `AGENTS.md` forbids layout and animation changes.

- **The colour token names are inverted.** `--color-charcoal` is a light cream
  `#f4efd4`; `--color-bone` is black `#000000`. Legacy names from a light-theme
  palette. Read values, not names.
- **`--radius-3xl` is redefined down to 14px**, equal to `--radius-xl` and
  `--radius-cards`, so `rounded-xl`, `rounded-3xl` and `rounded-cards` are all
  the same. The marketing sections ignore these tokens anyway.
- **Archivo Black is imported from Google Fonts and used by nothing.** A NavBar
  comment claims the wordmark is Archivo Black; `--font-display` resolves to
  Anton.
- **27 local font files in `src/assets/fonts/` are unreferenced**, as are
  `bg-hero.jpg`, `nnnoise.svg` (which is purple `#7957a8`, off-palette),
  `background.svg` and `astro.svg`.
- **No `prefers-reduced-motion` handling on the GSAP choreography.** Only the
  phone mockups honour it. The ~20 marketing timelines and three multi-viewport
  pins have no escape hatch.
- **No `:focus-visible` styles anywhere**, and no `::selection`. The waitlist
  input does `outline-none` and substitutes a border-colour change. The phone
  well is the only element with a real focus ring.
- **`formEndpoint` is `https://formspree.io/f/REPLACE_ME`** — flagged as a launch
  blocker in `src/data/site.ts`. Every signup fails visibly until it is swapped.
  Both forms post there; the host form carries a hidden `type=host` so the two
  lists can be told apart on one endpoint.
- **The two hand-kept selector lists in `global.css` are a standing trip-hazard.**
  The pinned-layer flicker guard and the painted-glass card surface each
  enumerate class names, so a new pinned section or a new card silently gets
  neither. Both caught the enterprise sections out once already. A new
  `.X-sticky` or `.X-card` needs adding to them by hand.
- **Every phone screen's title is an `<h1>`**, so a page carrying mockups emits
  several — five on `/`, three on `/enterprise`. They are app chrome inside a
  `role="region"`, not document headings, and they break the outline. Left alone
  because fixing it means touching all six shipped screens.
- **`.wz-card` in `WuzyFrame.astro` is dead**, and its `18px` radius is off the
  in-app 14/22/32 ladder. Nothing references it.
- **The in-app scale is documented in code as covering "four screens"** — in
  `global.css`, `content.ts` and each screen's header. There are six.
- **`About.astro` is a fully-styled orphan** — not imported by `index.astro`. It
  is the clearest example of the section pattern, which is why it is cited above,
  but it does not ship.
- **`twitter:card="summary_large_image"` with no `og:image`**, and no
  `preconnect` for Google Fonts (the `@import` is nested inside CSS).
- **`live-mockup-files/` is a superseded prototype.** The Astro components are
  canonical. Its README still describes an SVG-slice architecture that no longer
  exists, though its rationale notes are accurate and worth reading.

---

## 14. Agent prompt guide

Before touching any UI in this repo:

1. **Which system am I in?** Inside `src/components/mockups/**` → Poppins,
   `#000811`, design units, `rounded-app-*`. Everywhere else → Anton/Inter/Caveat,
   `#000000`, px radii. Never cross them.
2. **Am I about to change layout or animation?** `AGENTS.md` says don't. Colour,
   type, spacing within the existing rhythm, and surface treatment are fair game.
3. **Does a token or utility already exist for this?** `--color-ember`,
   `--shadow-card`, `wz-float`, `text-app-title`, `rounded-app-md`, the eyebrow
   string, `.btn-glass-yellow`. Reuse before you invent.
4. **Does my new section have a Caveat ember tail on its headline?** If not, it
   will not look like this site.
5. **Am I adding a fifth button variant?** There are four. Use one.
6. **Did I check §12 Don'ts?** Most visual regressions here are one of those.

Quick reference: `#ffe783` ember · `#f4efd4` ink · `#000000` marketing ground ·
`#000811` app ground · Anton display · Inter body · Caveat accent · Poppins
in-app · `px-5` gutter · `py-28` rhythm · pills only · hairline + drop.
