---
name: ACHAR
description: Recipe 01, one boxy linen shirt in seven colours, shown in a quiet white gallery.
colors:
  paper: "#ffffff"
  stone: "#f3f2ef"
  stone-deep: "#e9e7e2"
  hairline: "#e4e2dd"
  pebble: "#cfccc5"
  ink: "#141414"
  ink-soft: "#3d3b37"
  grey: "#64615b"
  sale-red: "#c42b16"
typography:
  wordmark:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "27vw"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.02em"
  display:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(40px, 6.4vw, 104px)"
    fontWeight: 200
    lineHeight: 1.05
    letterSpacing: "0.16em"
  headline:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(26px, 3.2vw, 44px)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "0.14em"
  title:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(28px, 2.6vw, 38px)"
    fontWeight: 300
    lineHeight: 1.12
  title-sm:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    letterSpacing: "0.01em"
  body:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"tnum\""
  lede:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.16em"
  button:
    fontFamily: "Urbanist, Helvetica Neue, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.12em"
  bangla:
    fontFamily: "Anek Bangla, Urbanist, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    letterSpacing: "0em"
rounded:
  check: "6px"
  thumb: "10px"
  field: "12px"
  tile: "14px"
  drawer: "18px"
  panel: "20px"
  stage: "24px"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 2.4vw, 32px)"
  max-width: "1520px"
  section: "clamp(72px, 10vw, 140px)"
  section-head: "clamp(32px, 4vw, 56px)"
  tile-gap: "clamp(10px, 1.2vw, 18px)"
  tile-row-gap: "clamp(28px, 3vw, 44px)"
  drawer-inset: "8px"
  drawer-pad: "24px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#2c2b28"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "48px"
  button-sm:
    padding: "0 18px"
    height: "40px"
  size-pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "42px"
    width: "52px"
  size-pill-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-chip:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "32px"
  colour-dot:
    rounded: "{rounded.round}"
    size: "16px"
  colour-dot-lg:
    rounded: "{rounded.round}"
    size: "30px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "50px"
  tile-media:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.tile}"
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  tag-sale:
    backgroundColor: "{colors.sale-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  drawer:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.drawer}"
    width: "min(440px, calc(100vw - 16px))"
  summary-panel:
    backgroundColor: "{colors.stone}"
    rounded: "{rounded.panel}"
    padding: "26px"
---

# Design System: ACHAR

## Overview

**Creative North Star: "The Quiet Gallery"**

ACHAR sells one shirt, and the system behaves like a white gallery built around it. The page is paper white with soft stone plinths; the drawn linen shirt sits on those plinths as the only saturated object, recoloured per product. Everything else steps back: ink type, a warm grey for secondary text, wide-tracked light uppercase headings that read as calm rather than loud, and controls that are all pills and circles.

Density is low on the home page and moderate on operate surfaces (shop, checkout, account). Containment comes from filled, rounded stone tiles, not from rules or boxes; hairlines appear only where a list needs separating. Motion is slow and eased (one curve, `cubic-bezier(0.22, 1, 0.36, 1)`) and is spent on a few signature moments: the film playing inside the giant ACHAR wordmark that scroll opens, the colour studio that recolours the shirt and tints its section, the anatomy leader lines drawing on scroll, the shirt flying to the bag, and drawers sliding in from the edge.

The world replaces the retired ruled "jar label" look: no ruled label boxes, no mono costume type, no photo spam.

**Key Characteristics:**
- White paper ground, stone (#f3f2ef) plinths for every product image.
- One authored SVG linen shirt, front and back, filled with the product colour.
- Urbanist throughout; light-weight, wide-tracked uppercase for headings; Anek Bangla for আচার.
- Pills for actions and sizes, circles for colours and icon buttons.
- Rounded tiles and floating drawers; hairlines only for lists.
- Red appears only where money is cut or something is wrong.

## Colors

A near-monochrome warm-neutral palette with one red that is kept rare.

### Primary
- **Gallery Ink** (#141414): primary buttons, body text, selected size pills, selected colour-dot ring, active steps, the focus ring, progress fills. The system's only "accent" is ink on paper.

### Secondary
- **Sale Red** (#c42b16): sale tags and the sale price, the SALE nav link, the savings line in totals, form errors and invalid-field borders, plus two momentary confirmations (the filled wishlist heart and the bag-count pulse).

### Neutral
- **Paper** (#ffffff): page ground, drawers, modals, inputs, white pill buttons on dark film.
- **Stone** (#f3f2ef): product-image plinths, stone sections, footer, order cards, the checkout summary, filter chips, perk panels.
- **Deep Stone** (#e9e7e2): hover state of stone thumbnails, free-delivery meter track.
- **Hairline** (#e4e2dd): list dividers, drawer head and foot rules, input and size-pill strokes, table rows, scrolled-header rule.
- **Pebble** (#cfccc5): ghost-button stroke and idle testimonial dashes.
- **Soft Ink** (#3d3b37): ledes, accordion bodies, footer links, field labels.
- **Warm Grey** (#64615b): secondary text, captions, struck original prices, product brand line, crumbs.

The colour studio's section background is derived, not fixed: `color-mix(in srgb, <shirt colour> 22%, #f6f5f2)`, easing over 0.9s as the colour changes.

### Named Rules
**The One Red Rule.** Sale Red marks a cut price, a sale label, or an error; beyond that it appears only as the momentary wishlist and bag-count confirmations. It is never a button fill, a heading colour, or decoration.

**The Shirt Holds the Colour Rule.** Saturated colour belongs to the shirt and to the studio tint it casts. Chrome stays ink, grey, stone and white.

## Typography

**Display Font:** Urbanist (with Helvetica Neue, Arial, sans-serif)
**Body Font:** Urbanist (same stack)
**Bengali:** Anek Bangla, weight 500, for আচার

**Character:** A single geometric sans used at both extremes: hairline-light, wide-tracked uppercase for headings that feel airy and expensive, and a heavy 900 cut only for the hero wordmark mask. Body text is plain and tabular-numbered for prices.

### Hierarchy
- **Wordmark** (900, 27vw, 1, -0.02em): the giant ACHAR mask in the hero, filled by the film. The studio colour name is its quieter sibling (800, clamp(48px, 7.5vw, 130px), white at 55%, behind the shirt).
- **Display** (200, clamp(40px, 6.4vw, 104px), 1.05, 0.16em, uppercase): the opened hero headline; the same light uppercase voice sets the "two ways" panel titles (200, 0.12em) and the footer wordmark (200, 0.32em).
- **Headline** (300, clamp(26px, 3.2vw, 44px), 1.12, 0.14em, uppercase): section titles and page titles.
- **Title** (300, clamp(28px, 2.6vw, 38px), 1.12, sentence case): product title and studio title, with testimonial quotes at the same weight (300, clamp(22px, 2.6vw, 34px)).
- **Title Small** (500, 18px): sub-headings inside cards and panels.
- **Body** (400, 16px, 1.6, tabular numerals): running text; ledes at 18px in Soft Ink, max 46ch.
- **Label** (500, 12px, 0.16em, uppercase): standalone headings in checkout and account ("Your bag", "Order summary"), filter titles, option-row headers, short captions.
- **Button / Nav** (600, 13px, 0.12–0.14em, uppercase): buttons, nav links, text links, accordion summaries.

### Named Rules
**The Light Caps Rule.** Large headings are light (200–300) and tracked wide (0.12–0.16em) in uppercase. Weight never substitutes for size; the only heavy setting is the wordmark mask.

**The Native Script Rule.** Bengali text is set in Anek Bangla, never left to fall back through Urbanist.

## Layout

Content sits in a centred wrap of max 1520px with a fluid gutter (clamp(16px, 2.4vw, 32px)). Sections breathe vertically (clamp(72px, 10vw, 140px)) and alternate white and stone grounds; section heads are centred with a single heading and optional small grey line beneath.

Product grids run 4 columns, 3 under 1100px, 2 under 760px, with tight column gaps and generous row gaps so each tile reads as an object with its caption. Horizontal rails show four tiles with a 2px progress line beneath instead of arrows. The product page pairs a 1.35fr stone gallery with a sticky 1fr buy panel; checkout pairs the form with a sticky 420px stone summary. Below 960px the nav collapses into a left drawer and filters become a bottom sheet; below 1000px two-column product, checkout and studio layouts stack.

The header is a three-column grid (nav, centred brand, actions), sticky, translucent white with blur, gaining a hairline only once scrolled; over the hero film it turns transparent with white type. A 32px ink announcement band runs a slow marquee above it.

## Elevation & Depth

Flat at rest. Depth comes from stone-on-white tonal layering and from the shirt's own painted shading. Shadows appear only on things that float above the page (drawers, modals, the sticky buy bar, the floating film card, the hover "add" pill on tiles) and are always soft, wide and offset downward with negative spread.

### Shadow Vocabulary
- **Drawer** (`box-shadow: 0 30px 80px -20px rgba(0,0,0,.35)`): side drawers.
- **Modal** (`box-shadow: 0 40px 100px -30px rgba(0,0,0,.45)`): quick view and size guide.
- **Float** (`box-shadow: 0 20px 50px -20px rgba(0,0,0,.35)`): sticky buy bar and film product card (.4 alpha).
- **Lift** (`box-shadow: 0 10px 30px -12px rgba(0,0,0,.25)`): tile add-to-bag pill on hover.
- **Field focus** (`box-shadow: 0 0 0 3px rgba(20,20,20,.06)`): input focus halo alongside the ink border.

### Named Rules
**The Only-What-Floats Rule.** A surface gets a shadow only if it is detached from the page flow. Tiles, sections and panels never carry one.

## Shapes

Everything is soft. Controls are pills (999px) or circles: buttons, size pills, filter chips, tags, the quantity stepper, tabs, the newsletter field, colour dots, icon buttons. Containers are rounded rectangles that scale their radius with their size: 10px thumbnails, 12px fields, 14px product tiles and option cards, 18px drawers, 20px modals and the checkout summary, 24px for the studio stage. Drawers are inset 8px from the viewport edges so their rounded corners show. Product imagery is always 4:5 portrait. Borders are 1px hairlines and appear on inputs, unselected size pills, selectable option rows and list separators only.

## Components

### Buttons
Calm, solid, uppercase pills.
- **Shape:** full pill (999px), 48px tall, 40px for the small size.
- **Primary:** Gallery Ink fill, white label, 0 28px padding, 600 13px 0.12em uppercase. Price may ride inside the label at 500 weight.
- **Hover / Focus:** fill lifts to #2c2b28; press scales to 0.98; 0.35s on the shared ease. Focus is a 2px ink outline offset 3px.
- **Ghost:** transparent with a Pebble stroke; fills ink on hover.
- **Light:** white pill for use over film; goes transparent with white text on hover.
- **Text link:** uppercase 13px label with a 1px underline that wipes away to the right on hover.

### Chips
- **Size pills:** 42px tall, min 52px wide, white with a hairline stroke; hover darkens the stroke to ink; selected is ink-filled; unavailable sizes are greyed with a diagonal strike.
- **Filter chips:** 32px stone-filled pills with no stroke, in the sticky shop toolbar.
- **Colour dots:** 16px circles (30px on the product page) filled with the product colour and a faint inner ring; selection is an ink ring offset 4px outside the dot.

### Cards / Containers
- **Product tile:** stone 4:5 plinth (14px radius) holding the shirt; on hover the front view lifts away and the back view settles in, a translucent round wishlist button fades in top-right, and a white "add" pill rises from the bottom. Caption below: grey uppercase brand line, 15px name, price, colour dots.
- **Background:** stone on white sections; white thumbnails on stone panels.
- **Shadow Strategy:** none (see Elevation).
- **Border:** none, except selectable option rows (hairline, ink when checked).
- **Internal Padding:** 16–26px.

### Inputs / Fields
- **Style:** 50px tall, white, hairline stroke, 12px radius, 16px side padding; placeholders in #76726b.
- **Focus:** stroke turns ink with a 3px 6% ink halo.
- **Error:** stroke and message in Sale Red.
- **Checkbox / radio:** 20px; checkbox is a 6px-rounded square that fills ink; radio is a ring with an ink centre dot.

### Navigation
Uppercase 600 13px links with 0.14em tracking; an ink underline scales in from the left on hover and stays on the current page. The SALE link is red. Icon buttons are 42px circles with a 6% ink wash on hover; the bag badge is a small ink pill that pulses red and enlarges when an item lands. Mobile moves links into the left drawer.

### Drawers and Overlays
Bag, menu and filters slide in from the edge over a 36% ink scrim (0.6s on the shared ease). Head and foot are separated by hairlines; bag lines are a hairline-separated list with a stone thumbnail, quantity pill stepper and an underlined remove link. Search drops from the top with rounded bottom corners and a 200-weight uppercase input. Toasts are ink pills rising from the bottom centre.

### Shirt Illustration (signature)
One authored SVG (viewBox 400 × 460) of the boxy linen shirt in front and back views, filled with the product colour through a `--c` custom property. Weave noise, side shading, folds, seams, dashed hem stitching and a soft ground shadow are painted over the fill; dark colours switch seams, stitches and buttons to light variants. The fill transitions over 0.7s so recolouring is always animated. It is the only product image in tiles, bag lines, thumbnails, search and the studio.

### Signature Motion
- **Wordmark reveal:** a white screen-blended mask with a 900-weight ACHAR cuts the hero film into the letters; over a 260vh sticky scroll the mask scales up until the film fills the screen, then the headline and CTAs fade in.
- **Colour studio:** choosing a colour name recolours the floating shirt, swaps the giant colour name behind it, and eases the section tint.
- **Anatomy:** leader lines draw via stroke-dashoffset (1.6s, staggered 0.15s) when the section enters, then their end dots and notes appear.
- **Fly to bag:** a shirt clone arcs from the image to the bag icon (0.8s, `cubic-bezier(.5,-0.3,.3,1)`), then the badge pulses.
- **Reveal on scroll:** content rises 26px and fades in over 1s.

## Do's and Don'ts

### Do:
- **Do** put every product image on a stone (#f3f2ef) rounded plinth at 4:5, with the SVG shirt recoloured to the product.
- **Do** set large headings light (200–300), uppercase, tracked 0.12–0.16em.
- **Do** make every action a pill and every colour choice a circle.
- **Do** use the single ease `cubic-bezier(0.22, 1, 0.36, 1)` for state and layout motion, and honour reduced motion.
- **Do** separate list rows with 1px hairlines (#e4e2dd) and contain everything else with fill and radius.
- **Do** keep shadows for floating layers only, soft and negative-spread.

### Don't:
- **Don't** use Sale Red for anything but cut prices, sale labels, errors and the two momentary confirmations.
- **Don't** outline tiles, panels or sections with borders, or draw ruled label boxes around content.
- **Don't** use monospace or condensed costume type; Urbanist carries every role except Bengali.
- **Don't** replace the shirt illustration with stock photography in tiles or bag lines.
- **Don't** stack a small uppercase label above a heading as a kicker; the label style is for standalone headings and captions.
- **Don't** square off controls; no sharp-cornered buttons, chips or inputs.
