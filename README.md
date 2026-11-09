# ACHAR storefront (pitch prototype)

This is a static, front-end-only storefront for ACHAR (@achar.wear). Open `index.html` through any local server, for example:

```bash
python -m http.server 5317
```

Then visit http://localhost:5317.

## Pages

| Page | What works |
|---|---|
| `index.html` | Hero label with colour, size and add-to-bag. Vibe filter on the shelf. Lookbook. "What colour for what vibe?" quiz. Delivery stations. Reviews. Instagram strip. |
| `shop.html` | Filters for category, colour, size, vibe, price, stock and sale. Sort, grid density, active-filter chips and the empty state. Mobile filter sheet. |
| `product.html?id=r01-navy` | Colour swatches, sizes with sold-out states, size guide with a size finder, quantity, add to bag, buy now, delivery estimate by district, accordions, sticky buy bar. |
| `checkout.html` | Bag, Address, Payment and Label stations. Phone and address validation, delivery options, gift note, promo code `GETPICKLED`. Ends in a printable parcel label. |
| `account.html` | OTP sign-in and sign-up (visual only) and order tracking. |

These work on every page:
- the bag drawer, with free-delivery meter and pairings
- the wishlist
- search
- quick view
- newsletter and notify-me forms

The bag and wishlist persist in `localStorage`. **No order is placed and nothing is sent anywhere.**

## Replace before going live

- **Photography.** Everything in `assets/img/` and `assets/video/` is placeholder mood imagery from `images/`, not ACHAR products. Some of it carries third-party marks (STARSKY LABS, JAYA, AZTREP, OOTD, TREND).
- **Prices.** ৳2,450 with ৳400 off is a sample.
- **Specs.** Fabric, buttons and the size chart are samples.
- **Reviews.** All four are labelled samples.
- **Delivery fees and times, and the exchange policy.** All samples.
- **Contact details.** Phone, email and address are still to be added.
