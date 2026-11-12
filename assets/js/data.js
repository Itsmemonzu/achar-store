/* Northline catalogue. Northline is a concept brand for this demo storefront.
   Product photos are cropped from third-party mood photography (assets/img/look-XX.jpg) as placeholders;
   replace them with Northline's own shoot. Prices, specs and reviews are SAMPLE content. */
window.NL_DATA = (function () {
  const img = (n) => `assets/img/look-${String(n).padStart(2, "0")}.jpg`;
  const shot = (slug, n) => `assets/img/p/nl-${slug}-${n}.jpg`;
  const SIZES = ["S", "M", "L", "XL", "XXL"];
  const SALE = 400;

  /* every Line 01 piece: base price, ৳400 off for the Puja offer */
  const piece = (o) => ({
    cat: "shirts",
    line: "01",
    sizes: SIZES,
    season: "Autumn / Winter 2026",
    was: o.base,
    price: o.base - SALE,
    imgs: [shot(o.slug, 1), shot(o.slug, 2)],
    ...o,
  });

  const products = [
    piece({ id: "nl-tee", slug: "tee", name: "Boxy Tee", type: "Tee", colour: "Black", hex: "#151515", ink: "#f2f0eb", base: 1950, batch: "03", fabric: "Cotton", ingredients: "Heavyweight cotton jersey (sample spec)", vibe: ["everyday", "weekend"], notes: "The one you reach for first. Dropped shoulder, boxy body, no fuss.", soldOut: [], tag: "bestseller" }),
    piece({ id: "nl-hoodie", slug: "hoodie", name: "Hooded Pullover", type: "Hoodie", colour: "Bone", hex: "#E6E1D8", ink: "#141414", base: 3250, batch: "03", fabric: "Cotton fleece", ingredients: "Brushed cotton fleece (sample spec)", vibe: ["calm", "weekend"], notes: "Soft, heavy, and quietly loud in Bone.", soldOut: ["XXL"], tag: "new" }),
    piece({ id: "nl-denim", slug: "denim", name: "Wide-Leg Denim", type: "Denim", colour: "Washed Grey", hex: "#9C9EA1", ink: "#141414", base: 3650, batch: "02", fabric: "Denim", ingredients: "Rigid cotton denim, washed (sample spec)", vibe: ["everyday", "weekend"], notes: "Wide all the way down. Stack it over boots or roll it once.", sizes: ["28", "30", "32", "34", "36"], soldOut: ["28"], tag: null }),
    piece({ id: "nl-work", slug: "work", name: "Cropped Work Jacket", type: "Jacket", colour: "Ink", hex: "#1E2130", ink: "#f2f0eb", base: 4850, batch: "02", fabric: "Cotton twill", ingredients: "Cotton twill with a printed lining (sample spec)", vibe: ["evening", "office"], notes: "Short, square and sharp. Wear it open.", soldOut: [], tag: null }),
    piece({ id: "nl-blazer", slug: "blazer", name: "Pinstripe Cropped Blazer", type: "Blazer", colour: "Navy", hex: "#1D2744", ink: "#f2f0eb", base: 5250, batch: "02", fabric: "Wool blend", ingredients: "Wool-blend suiting, pinstripe (sample spec)", vibe: ["office", "evening"], notes: "Tailoring, cut short. Monday to midnight.", soldOut: ["S"], tag: "bestseller" }),
    piece({ id: "nl-leather", slug: "leather", name: "Faux-Leather Jacket", type: "Jacket", colour: "Black", hex: "#101010", ink: "#f2f0eb", base: 5850, batch: "01", fabric: "Faux leather", ingredients: "Faux leather with a quilted lining (sample spec)", vibe: ["evening", "loud"], notes: "Big shoulders, soft drape. Turns a T-shirt into an outfit.", soldOut: [], tag: null }),
    piece({ id: "nl-jersey", slug: "jersey", name: "Mesh Jersey", type: "Top", colour: "Navy", hex: "#1F2A44", ink: "#f2f0eb", base: 2450, batch: "03", fabric: "Mesh", ingredients: "Breathable polyester mesh (sample spec)", vibe: ["loud", "weekend"], notes: "A number on the front and nothing to prove.", soldOut: [], tag: "new" }),
    {
      id: "gift-card", cat: "gift", line: "—", name: "Gift Card", colour: "Gift card", hex: "#C9C6BF", ink: "#141414", batch: "—",
      price: 2000, was: null, sizes: ["৳1,000", "৳2,000", "৳5,000"], soldOut: [], vibe: [], tag: null, imgs: [],
      ingredients: "Digital gift card, sent by SMS and email", notes: "Not sure of their size? Let them choose.",
    },
    {
      id: "nl-02", cat: "upcoming", line: "02", name: "Line 02", colour: "On the drawing board", hex: "#1B1A16", ink: "#F2ECDF", batch: "—",
      price: null, was: null, sizes: [], soldOut: [], vibe: [], tag: "soon", imgs: [],
      ingredients: "Under wraps", notes: "Still being drawn. Get told first.",
    },
  ];

  const vibes = {
    calm: { label: "Calm" }, loud: { label: "Loud" }, office: { label: "Office" },
    evening: { label: "Evening" }, weekend: { label: "Weekend" }, everyday: { label: "Everyday" },
  };

  const reviews = [
    { name: "Sample customer", city: "Dhanmondi", colour: "Black", text: "Placeholder review. Boxy without looking sloppy; I sized down once.", stars: 5 },
    { name: "Sample customer", city: "Chattogram", colour: "Navy", text: "Placeholder review. Came in a black mailer with the little arrow tag. Two-day delivery.", stars: 5 },
    { name: "Sample customer", city: "Sylhet", colour: "Bone", text: "Placeholder review. Heavier than I expected, in a good way.", stars: 4 },
    { name: "Sample customer", city: "Uttara", colour: "Washed Grey", text: "Placeholder review. The wide leg stays wide after washing.", stars: 5 },
  ];

  const sizeChart = {
    head: ["Size", "Chest", "Length", "Shoulder", "Sleeve"],
    rows: [["S", "44", "27.5", "20", "23"], ["M", "46", "28", "21", "23.5"], ["L", "48", "28.5", "22", "24"], ["XL", "50", "29", "23", "24.5"], ["XXL", "52", "29.5", "24", "25"]],
  };

  const districts = ["Dhaka", "Gazipur", "Narayanganj", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Cox's Bazar", "Cumilla", "Bogura"];

  return { products, vibes, reviews, sizeChart, districts, img, shot, SALE };
})();
