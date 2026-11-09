/* ACHAR catalogue.
   Colours, fabric names and product photos come from ACHAR's Instagram (@achar.wear):
   Recipe 01 — Boxy Linen Shirt (Oatmeal, Lime), Boxy Cotton Shirt (Powder Blue, Navy), Brown.
   Prices, specs and reviews are SAMPLE content for the pitch. */
window.ACHAR_DATA = (function () {
  const img = (n) => `assets/img/look-${String(n).padStart(2, "0")}.jpg`;
  const ig = (n) => `assets/img/p/ig-${String(n).padStart(2, "0")}.jpg`;
  const SIZES = ["S", "M", "L", "XL", "XXL"];
  const PRICE = 2450;
  const SALE = 400;

  const shirt = (o) => ({
    cat: "shirts",
    recipe: "01",
    price: PRICE - SALE,
    was: PRICE,
    sizes: SIZES,
    season: "Late summer / Pre-winter",
    ...o,
  });

  const products = [
    shirt({ id: "r01-oat", name: "Boxy Linen Shirt", colour: "Oatmeal", hex: "#D9CFBF", ink: "#141414", batch: "07", fabric: "Linen", ingredients: "Linen (composition to be confirmed)", vibe: ["calm", "everyday"], notes: "Mild. Goes with everything, forgives everything.", imgs: [ig(9), ig(6)], mood: [img(2), img(20)], soldOut: [], tag: "bestseller" }),
    shirt({ id: "r01-lime", name: "Boxy Linen Shirt", colour: "Lime", hex: "#D6DC4C", ink: "#141414", batch: "07", fabric: "Linen", ingredients: "Linen (composition to be confirmed)", vibe: ["loud", "weekend"], notes: "Sour, bright, a little loud. For days you want to be found.", imgs: [ig(11), ig(7)], mood: [img(8), img(5)], soldOut: ["XXL"], tag: "new" }),
    shirt({ id: "r01-sky", name: "Boxy Cotton Shirt", colour: "Powder Blue", hex: "#A9C2DC", ink: "#141414", batch: "07", fabric: "Cotton", ingredients: "Cotton (composition to be confirmed)", vibe: ["calm", "office"], notes: "Cool and clean. Monsoon morning in a shirt.", imgs: [ig(10), ig(4)], mood: [img(1), img(19)], soldOut: ["S"], tag: null }),
    shirt({ id: "r01-navy", name: "Boxy Cotton Shirt", colour: "Navy", hex: "#1D2744", ink: "#f2f0eb", batch: "06", fabric: "Cotton", ingredients: "Cotton (composition to be confirmed)", vibe: ["office", "evening"], notes: "Deep and steady. After-six, or a Monday that matters.", imgs: [ig(12), ig(3), ig(5)], mood: [img(15), img(17)], soldOut: [], tag: "bestseller" }),
    shirt({ id: "r01-brown", name: "Boxy Shirt", colour: "Brown", hex: "#3B2A22", ink: "#f2f0eb", batch: "06", fabric: "To be confirmed", ingredients: "Fabric to be confirmed by ACHAR", vibe: ["evening", "everyday"], notes: "Dark roast. Serious without trying.", imgs: [ig(8), ig(1)], mood: [img(13), img(7)], soldOut: [], tag: null }),
    {
      id: "gift-jar", cat: "gift", recipe: "—", name: "Gift Jar", colour: "Gift card", hex: "#C4A27A", ink: "#141414", batch: "—",
      price: 2000, was: null, sizes: ["৳1,000", "৳2,000", "৳5,000"], soldOut: [], vibe: [], tag: null,
      ingredients: "Digital gift card, sent by SMS and email", notes: "Can't pick a colour for them? Let them choose.", imgs: [ig(6)], mood: [],
    },
    {
      id: "r02", cat: "upcoming", recipe: "02", name: "Recipe 02", colour: "Still fermenting", hex: "#1B1A16", ink: "#F2ECDF", batch: "—",
      price: null, was: null, sizes: [], soldOut: [], vibe: [], tag: "soon", imgs: [],
      ingredients: "Under wraps", notes: "In the jar. Not ready yet. Get told first.", mood: [],
    },
  ];

  const vibes = {
    calm: { label: "Calm" }, loud: { label: "Loud" }, office: { label: "Office" },
    evening: { label: "Evening" }, weekend: { label: "Weekend" }, everyday: { label: "Everyday" },
  };

  const reviews = [
    { name: "Sample customer", city: "Dhanmondi", colour: "Oatmeal", text: "Placeholder review. Boxy without looking sloppy; I sized down once.", stars: 5 },
    { name: "Sample customer", city: "Chattogram", colour: "Navy", text: "Placeholder review. Came in the kraft bag with the little jar tag. Two-day delivery.", stars: 5 },
    { name: "Sample customer", city: "Sylhet", colour: "Lime", text: "Placeholder review. Brighter than I expected, in a good way.", stars: 4 },
    { name: "Sample customer", city: "Uttara", colour: "Powder Blue", text: "Placeholder review. Gets softer every wash.", stars: 5 },
  ];

  const sizeChart = {
    head: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
    rows: [["S", "44", "27.5", "20", "23"], ["M", "46", "28", "21", "23.5"], ["L", "48", "28.5", "22", "24"], ["XL", "50", "29", "23", "24.5"], ["XXL", "52", "29.5", "24", "25"]],
  };

  const districts = ["Dhaka", "Gazipur", "Narayanganj", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Cox's Bazar", "Cumilla", "Bogura"];

  return { products, vibes, reviews, sizeChart, districts, img, ig, PRICE, SALE };
})();
