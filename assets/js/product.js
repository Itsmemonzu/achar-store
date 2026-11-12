(function () {
  const D = window.NL_DATA, S = window.NL_STORE, U = window.NL_UI;
  const { $, $$, esc } = U;
  const id = new URLSearchParams(location.search).get("id") || "nl-tee";
  const p = S.product(id) || S.product("nl-tee");
  const shirts = D.products.filter((x) => x.cat === "shirts" && x.name === p.name);
  const isShirt = p.cat === "shirts";
  const name = U.title(p);
  document.title = `${name} — Northline`;

  $("[data-crumbs]").innerHTML = `<a href="index.html">Home</a><span>/</span><a href="shop.html${isShirt ? "?cat=shirts" : ""}">${isShirt ? "Line 01" : "Shop"}</a><span>/</span><span aria-current="page">${esc(name)}</span>`;

  let size = null, qty = 1;
  const tint = `background:color-mix(in srgb, ${p.hex} 14%, #f3f2ef)`;
  const shots = [...p.imgs];
  const frames = shots.length
    ? shots.map((src, i) => `<figure class="pdp__frame" data-zoom><img class="pimg" src="${src}" alt="${esc(name)}, photo ${i + 1} (mood photography, placeholder)" loading="${i ? "lazy" : "eager"}"><figcaption>${i === 0 ? "Northline · Line 01" : "Close-up"}</figcaption></figure>`)
    : [`<figure class="pdp__frame">${U.shirt(p)}</figure>`];

  const sizes = p.sizes.map((s) => `<button class="chip" data-size="${esc(s)}" ${p.soldOut.includes(s) ? 'aria-disabled="true" title="Sold out"' : 'aria-pressed="false"'}>${esc(s)}</button>`).join("");

  $("[data-pdp]").innerHTML = `
    <div class="pdp__gallery" data-frames>${frames.join("")}</div>
    <div class="pdp__panel">
      <div>
        <p class="pdp__brand">Northline · ${isShirt ? "Line 01 · " + esc(p.type) : esc(p.colour)}</p>
        <h1 class="pdp__title">${esc(isShirt ? p.colour + " " + p.name : p.name)}</h1>
      </div>
      <div class="pdp__price">${U.priceTag(p)}${p.was ? `<span class="pdp__pill">Puja −৳${D.SALE}</span>` : ""}<span class="t-small">Sample price</span></div>
      <p class="pdp__notes">${esc(p.notes)}</p>
      ${isShirt ? `<div><div class="pdp__row-h"><span class="t-cap">Colour</span><b>${esc(p.colour)}</b></div><div class="dots" style="gap:12px">${(shirts.length ? shirts : [p]).map((s) => `<a class="dot dot--lg" href="product.html?id=${s.id}" style="--c:${s.hex}" aria-label="${s.colour}" title="${s.colour}" ${s.id === p.id ? 'aria-pressed="true"' : ""}></a>`).join("")}</div></div>` : ""}
      ${p.sizes.length ? `<div><div class="pdp__row-h"><span class="t-cap">${p.cat === "gift" ? "Amount" : "Size"}</span>${isShirt && p.type !== "Denim" ? `<a class="link" href="#" data-size-guide style="font-size:12px">Size guide</a>` : ""}</div><div class="chips" data-sizes>${sizes}</div><p class="err" data-err aria-live="polite" style="margin-top:8px"></p>${isShirt ? `<p class="t-small" style="margin-top:6px">${p.type === "Denim" ? "Waist in inches. Cut wide, true to size." : "Cut boxy. Between sizes? Take the smaller one."}</p>` : ""}</div>` : ""}
      ${p.price ? `<div style="display:grid;gap:10px">
          <div class="pdp__buyrow"><div class="qty" role="group" aria-label="Quantity"><button data-pq="-1" aria-label="Decrease">−</button><output data-pqty>1</output><button data-pq="1" aria-label="Increase">+</button></div><button class="btn" data-add>Add to bag</button><button class="icon-btn" data-wish="${p.id}" aria-pressed="${S.isWished(p.id)}" aria-label="Save to wishlist" style="width:48px;height:48px;border:1px solid var(--line)">${U.I.heart}</button></div>
          <button class="btn btn--ghost btn--block" data-buynow>Buy it now</button>
        </div>
        <div class="pdp__perks">
          <div>${U.I.truck}<span data-eta></span><select class="sel" data-district aria-label="Your district">${D.districts.map((d) => `<option>${d}</option>`).join("")}</select></div>
          <div><svg class="icon" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"/><circle cx="12" cy="12" r="2.5"/></svg><span style="display:grid;gap:8px">Cash on delivery, or pay online via SSLCOMMERZ${U.payBadges(["ssl","bkash","nagad","visa","mc"])}</span></div>
          <div><svg class="icon" viewBox="0 0 24 24"><path d="M7 9a7 7 0 1 1-1 6"/><path d="M4 6v4h4"/></svg><span>Exchange within 7 days (sample policy)</span></div>
        </div>`
      : `<button class="btn btn--block" data-notify="${p.id}">Notify me when it's ready</button>`}
      <div class="acc">
        <details open><summary>Details <span class="pm"></span></summary><div class="acc__body"><p>${esc(p.ingredients)}. Garment washed once before it ships.</p>${isShirt ? `<p>${p.type === "Denim" ? "Wide leg, mid rise, full length." : "Boxy fit, dropped shoulder, relaxed through the body."}</p>` : ""}</div></details>
        ${isShirt && p.type !== "Denim" ? `<details><summary>Size &amp; fit <span class="pm"></span></summary><div class="acc__body"><table class="sizetable"><thead><tr>${D.sizeChart.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${D.sizeChart.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="t-small">Inches, garment laid flat · sample chart</p></div></details>` : ""}
        <details><summary>Care <span class="pm"></span></summary><div class="acc__body"><p>Machine wash cold with like colours. Hang to dry in shade. Iron on low, inside out, if you iron at all.</p></div></details>
        <details><summary>Delivery &amp; exchange <span class="pm"></span></summary><div class="acc__body"><p>Inside Dhaka 1–2 days (৳70). Outside Dhaka 3–5 days (৳130). Free in Dhaka over ৳4,000. Sample fees and policy for the pitch.</p></div></details>
      </div>
    </div>`;

  /* Zoom frames */
  $$("[data-zoom]").forEach((f) => f.addEventListener("click", () => f.classList.toggle("is-zoom")));

  /* Size, qty, add */
  const sz = $("[data-sizes]");
  if (sz) sz.addEventListener("click", (e) => {
    const b = e.target.closest("[data-size]");
    if (!b || b.getAttribute("aria-disabled") === "true") return;
    size = b.dataset.size;
    $$("[data-size]").forEach((x) => x.getAttribute("aria-disabled") !== "true" && x.setAttribute("aria-pressed", x === b));
    $("[data-err]").textContent = "";
    paintBuybar();
  });
  $$("[data-pq]").forEach((b) => b.addEventListener("click", () => { qty = Math.max(1, Math.min(9, qty + Number(b.dataset.pq))); $("[data-pqty]").textContent = qty; }));
  function add(then) {
    if (!size) {
      $("[data-err]").textContent = p.cat === "gift" ? "Choose an amount first." : "Choose a size first.";
      $("[data-sizes]").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    U.flyToBag($("[data-frames] .pdp__frame"), p);
    S.add(p.id, size, qty);
    then();
  }
  const a = $("[data-add]");
  if (a) a.addEventListener("click", () => add(() => { a.textContent = "Added"; setTimeout(() => { a.textContent = "Add to bag"; U.open("bag"); }, 700); }));
  const bn = $("[data-buynow]");
  if (bn) bn.addEventListener("click", () => add(() => setTimeout(() => (location.href = "checkout.html"), 500)));

  const dist = $("[data-district]");
  if (dist) {
    const eta = () => {
      const inDhaka = ["Dhaka", "Gazipur", "Narayanganj"].includes(dist.value);
      const d = new Date(); d.setDate(d.getDate() + (inDhaka ? 2 : 5));
      $("[data-eta]").textContent = `Arrives by ${d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}`;
    };
    dist.addEventListener("change", eta); eta();
  }

  /* Sticky buy bar */
  const bar = $("[data-buybar]");
  function paintBuybar() {
    if (!p.price) return;
    bar.innerHTML = `<div class="buybar__in"><span class="buybar__img">${U.shirt(p)}</span><div class="buybar__t"><b>${esc(name)}</b><span>${size ? "Size " + esc(size) + " · " : ""}${S.tk(p.price)}</span></div><button class="btn btn--sm" data-bb-add>${size ? "Add to bag" : "Choose size"}</button></div>`;
  }
  paintBuybar();
  bar.addEventListener("click", (e) => { if (e.target.closest("[data-bb-add]")) { if (size) add(() => setTimeout(() => U.open("bag"), 600)); else $("[data-sizes]").scrollIntoView({ behavior: "smooth", block: "center" }); } });
  if (a) new IntersectionObserver(([en]) => { const show = !en.isIntersecting && en.boundingClientRect.top < 0; bar.classList.toggle("is-on", show); bar.setAttribute("aria-hidden", !show); }).observe(a);

  $("[data-related]").innerHTML = shirts.filter((s) => s.id !== p.id).slice(0, 4).map((s) => U.card(s)).join("");
})();
