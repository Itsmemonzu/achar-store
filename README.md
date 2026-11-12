# Northline storefront (concept brand, demo)

Northline is a concept clothing brand used to demonstrate a complete storefront. It is static and front-end only. Open `index.html` through any local server, for example:

```bash
python -m http.server 5317
```

Then visit http://localhost:5317.

## Brand

- **Name:** Northline. Named for 23.8° N, the latitude through Dhaka.
- **Mark:** one line that draws an N and keeps going north. Built from filled shapes so it stays crisp at any size.
  - `assets/img/logo/northline-mark.svg` (ink), `northline-mark-white.svg`, `northline-mark-bold.svg` (for small sizes)
  - `assets/img/logo/northline-logo.svg`: mark plus wordmark (**NORTH** bold, LINE light, Urbanist, wide tracking)
  - `assets/img/favicon.svg`: bold mark on a dark rounded square
  - the same mark is inlined in `assets/js/ui.js` as `MARK`, used for the header, footer, band, slip and gift card
- **Voice:** "Clean lines. Considered fit." Drops are called Lines (Line 01 is out, Line 02 is coming). Packaging line: "Keep north."
- **Share image:** `assets/og-northline.jpg` (1200×630).

## Pages

| Page | What works |
|---|---|
| `index.html` | Scroll-driven NORTHLINE wordmark around the film. Line 01 grid. Editorial split. Lookbook and sale cards. Film with shoppable pieces. Delivery stations. Reviews. Close-up grid. |
| `shop.html` | Filters for category, colour, size, vibe, price, stock and sale. Sort, grid density, active-filter chips and the empty state. Mobile filter sheet. |
| `product.html?id=nl-blazer` | Photo and close-up, sizes with sold-out states, size guide (not for denim), quantity, add to bag, buy now, delivery estimate by district, accordions, sticky buy bar. |
| `checkout.html` | Bag, Address, Payment and Label stations. Phone and address validation, delivery options, gift note, promo code `KEEPNORTH`. Ends in a printable parcel label. |
| `account.html` | OTP sign-in and sign-up (visual only) and order tracking. |

These work on every page:
- the bag drawer, with free-delivery meter and pairings
- the wishlist
- search
- quick view
- newsletter and notify-me forms

The bag and wishlist persist in `localStorage`. **No order is placed and nothing is sent anywhere.**

## Placeholders

- **Photography.** Product images in `assets/img/p/nl-*.jpg` are crops of third-party mood photography (`assets/img/look-XX.jpg`), not Northline products. The films in `assets/video/` are placeholder mood footage and carry a creator's watermark; a jacket in the hero film shows another brand's print. Some look photos also carry third-party marks. Replace all of it with Northline's own shoot before any real use.
- **Prices.** Every Line 01 piece shows ৳400 off as a sample offer.
- **Specs.** Fabrics and the size chart are samples.
- **Reviews.** All four are labelled samples.
- **Delivery fees and times, and the exchange policy.** All samples.
- **Contact details.** Phone, email and Instagram are still to be added.

## History

This storefront began as a pitch for the clothing label ACHAR and was rebranded to Northline on 2026-11-13. ACHAR's own photographs were removed from the site.
