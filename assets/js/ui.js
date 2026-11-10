/* ACHAR shared chrome: band, header, drawers, search, quick view, size guide, toast, footer. */
(function () {
  document.documentElement.classList.add("js");
  const D = window.ACHAR_DATA;
  const S = window.ACHAR_STORE;
  const SH = window.ACHAR_SHIRT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  /* ---------- Theme: dark by default, light on request ---------- */
  function setTheme(t) {
    const root = document.documentElement;
    root.classList.add("theme-anim");
    root.dataset.theme = t;
    try { localStorage.setItem("achar.theme", t); } catch (e) {}
    const b = document.querySelector("[data-theme-toggle]");
    if (b) b.setAttribute("aria-label", t === "light" ? "Switch to dark mode" : "Switch to light mode");
    const m = document.querySelector('meta[name="theme-color"]');
    if (m) m.content = t === "light" ? "#ffffff" : "#0b0b0a";
    setTimeout(() => root.classList.remove("theme-anim"), 600);
  }
  if (!document.documentElement.dataset.theme) {
    let t = "dark";
    try { t = localStorage.getItem("achar.theme") || "dark"; } catch (e) {}
    document.documentElement.dataset.theme = t;
  }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const jar = (cls = "jar") =>
    `<svg class="${cls}" viewBox="0 0 18 26" aria-hidden="true"><rect x="5" y="0" width="8" height="3.2"/><rect x="6" y="3.2" width="6" height="2"/><path d="M4.5 5.2h9a3 3 0 0 1 3 3V23a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V8.2a3 3 0 0 1 3-3Z"/></svg>`;
  const jarOutline = `<svg class="jar-big" viewBox="0 0 18 26" aria-hidden="true"><rect x="5" y="0.6" width="8" height="2.6"/><path d="M4.5 5.2h9a3 3 0 0 1 3 3V23a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V8.2a3 3 0 0 1 3-3Z"/></svg>`;
  const I = {
    search: '<svg class="icon" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
    user: '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.2-4 4.3-6 8-6s6.8 2 8 6"/></svg>',
    heart: '<svg class="icon" viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/></svg>',
    bag: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 8h14l-1 12.5H6L5 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
    menu: '<svg class="icon" viewBox="0 0 24 24"><path d="M4 8h16M4 16h11"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    arrow: '<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>',
    truck: '<svg class="icon" viewBox="0 0 24 24"><path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3.2v3.3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    play: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
    pause: '<svg class="icon" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>',
  };

  /* Pseudo barcode, used only on the printed order slip. */
  function barcode(code, h = 34) {
    let x = 0, out = "", seed = 0;
    for (const ch of code) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
    const bars = [1, 1, 1, 1];
    for (let i = 0; i < 46; i++) { seed = (seed * 1103515245 + 12345) >>> 0; bars.push(1 + (seed % 3), 1 + ((seed >> 4) % 3)); }
    bars.push(1, 1, 1, 1);
    bars.forEach((w, i) => { if (i % 2 === 0) out += `<rect x="${x}" y="0" width="${w}" height="${h}"/>`; x += w; });
    return `<svg class="barcode" viewBox="0 0 ${x} ${h}" preserveAspectRatio="none" aria-hidden="true" fill="currentColor">${out}</svg>`;
  }

  /* Product visual: ACHAR's own photos; Recipe 02 is a typographic placeholder. */
  const shirt = (p, view = "front", cls = "") => {
    if (p.cat === "upcoming") return soonArt(cls);
    const src = (view === "back" ? p.imgs[1] : p.imgs[0]) || p.imgs[0];
    return `<img class="pimg ${cls}" src="${src}" alt="${esc((p.cat === "shirts" ? p.colour + " " + p.name : p.name) + (view === "back" ? ", worn" : ""))}" loading="lazy" decoding="async">`;
  };
  function giftArt(cls) {
    return `<svg class="shirt ${cls}" viewBox="0 0 400 460" aria-hidden="true"><ellipse cx="200" cy="420" rx="120" ry="10" fill="#000" opacity=".08"/><rect x="110" y="110" width="180" height="300" rx="22" fill="#c4a27a"/><rect x="132" y="70" width="136" height="48" rx="8" fill="#a9865e"/><rect x="110" y="190" width="180" height="120" fill="#f4efe4"/><g transform="translate(186 215) scale(1.6)" fill="#1d1c19"><rect x="5" y="0" width="8" height="3.2"/><rect x="6" y="3.2" width="6" height="2"/><path d="M4.5 5.2h9a3 3 0 0 1 3 3V23a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3V8.2a3 3 0 0 1 3-3Z"/></g><text x="200" y="292" text-anchor="middle" font-family="Urbanist,sans-serif" font-size="13" letter-spacing="5" fill="#1d1c19">GIFT JAR</text></svg>`;
  }
  function soonArt(cls) {
    return `<svg class="shirt ${cls}" viewBox="0 0 400 460" aria-hidden="true"><ellipse cx="200" cy="420" rx="120" ry="10" fill="#000" opacity=".08"/><rect x="110" y="110" width="180" height="300" rx="22" fill="#26241f"/><rect x="132" y="70" width="136" height="48" rx="8" fill="#3a3731"/><text x="200" y="262" text-anchor="middle" font-family="Urbanist,sans-serif" font-weight="200" font-size="64" fill="#f2efe8">02</text><text x="200" y="300" text-anchor="middle" font-family="Urbanist,sans-serif" font-size="12" letter-spacing="5" fill="#a9a59c">FERMENTING</text></svg>`;
  }

  /* Payment method badges: typographic stand-ins in each brand's colours. */
  const PB = {
    ssl: '<span class="pb pb--ssl" aria-label="SSLCOMMERZ"><svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><rect x="1" y="5" width="8" height="7" rx="1.5" fill="#17306b"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="#17306b" stroke-width="1.4"/></svg>SSL<b>COMMERZ</b></span>',
    bkash: '<span class="pb pb--bkash">bKash</span>',
    nagad: '<span class="pb pb--nagad">Nagad</span>',
    rocket: '<span class="pb pb--rocket">Rocket</span>',
    upay: '<span class="pb pb--upay">upay</span>',
    visa: '<span class="pb pb--visa">VISA</span>',
    mc: '<span class="pb pb--mc" aria-label="Mastercard" role="img"><i></i><i></i></span>',
    amex: '<span class="pb pb--amex">AMEX</span>',
    nexus: '<span class="pb pb--nexus">NEXUS</span>',
    cod: '<span class="pb pb--cod">COD</span>',
  };
  const payBadges = (list) => `<span class="paybadges">${list.map((k) => PB[k]).join("")}</span>`;

  const priceTag = (p) =>
    p.price == null ? `<span class="price">Coming soon</span>` :
    p.was ? `<span class="price"><s>${S.tk(p.was)}</s><span class="now">${S.tk(p.price)}</span></span>` : `<span class="price">${S.tk(p.price)}</span>`;
  const title = (p) => (p.cat === "shirts" ? `${p.colour} ${p.name.replace(/^Boxy /, "")}` : p.name);
  const url = (p) => `product.html?id=${encodeURIComponent(p.id)}`;
  const shirts = () => D.products.filter((p) => p.cat === "shirts");

  function card(p) {
    const tag = p.tag === "new" ? `<span class="tile__tag">New</span>` : p.tag === "soon" ? `<span class="tile__tag">Soon</span>` : p.was ? `<span class="tile__tag tile__tag--sale">Sale</span>` : "";
    const add = p.price == null ? `<button class="btn btn--sm tile__add" data-notify="${p.id}">Notify me</button>` : `<button class="btn btn--sm tile__add" data-quick="${p.id}" aria-label="Quick add ${esc(title(p))}"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg><span>Quick add</span></button>`;
    const dots = p.cat === "shirts" ? `<div class="dots">${shirts().map((s) => `<a class="dot" href="${url(s)}" style="--c:${s.hex}" aria-label="${s.colour}" ${s.id === p.id ? 'aria-pressed="true"' : ""}></a>`).join("")}</div>` : "";
    return `<article class="tile" data-id="${p.id}">
      <div class="tile__top">
        <a class="tile__media" href="${url(p)}" aria-label="${esc(title(p))}">
          ${shirt(p, "front", "shirt--front")}${p.cat === "shirts" ? shirt(p, "back", "shirt--back") : ""}
          ${tag}
        </a>
        <button class="tile__wish" data-wish="${p.id}" aria-pressed="${S.isWished(p.id)}" aria-label="Save ${esc(title(p))}">${I.heart}</button>
        ${add}
      </div>
      <div class="tile__info">
        <span class="tile__brand">ACHAR · ${p.cat === "shirts" ? "Recipe " + p.recipe : p.cat === "gift" ? "Gift" : "Next"}</span>
        <a class="tile__name" href="${url(p)}">${esc(title(p))}</a>
        ${priceTag(p)}
        ${dots}
      </div>
    </article>`;
  }

  /* ---------- Chrome ---------- */
  const bandItems = ["Recipe 01 — Now serving", `৳${D.SALE} off every Recipe 01 shirt · sample offer`, "Delivering across Bangladesh", "Cash on delivery · bKash · Nagad"];
  const bandRun = bandItems.map((t) => `<span class="band__item">${t}${jar()}</span>`).join("");
  const page = document.body.dataset.page || "";
  const navLink = (href, label, key, cls = "") => `<a class="${cls}" href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`;

  const top = `
  <a class="sr" href="#main">Skip to content</a>
  <div class="band" role="region" aria-label="Announcements"><div class="band__track">${bandRun}${bandRun}${bandRun}${bandRun}</div></div>
  <header class="header ${document.body.dataset.over ? "header--over" : ""}" id="header">
    <div class="wrap header__in">
      <div class="header__left">
        <button class="icon-btn" data-open="menu" aria-label="Open menu">${I.menu}</button>
        <nav class="nav" aria-label="Primary">
          ${navLink("shop.html", "Shop", "shop")}
          ${navLink("lookbook.html", "Lookbook", "look")}
          ${navLink("about.html", "The Recipe", "about")}
          ${navLink("sale.html", "Sale", "sale", "is-sale")}
        </nav>
      </div>
      <a class="brand" href="index.html" aria-label="ACHAR home">${jar()}<span class="brand__word">ACHAR</span></a>
      <div class="header__right">
        <button class="cur hide-mobile" data-cur aria-label="Currency: BDT">BDT ${I.chev}</button>
        <button class="icon-btn theme-btn" data-theme-toggle aria-label="Switch to light mode"><svg class="icon i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><svg class="icon i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg></button>
        <button class="icon-btn" data-open="search" aria-label="Search">${I.search}</button>
        <a class="icon-btn hide-mobile" href="account.html" aria-label="Account">${I.user}</a>
        <button class="icon-btn hide-mobile" data-open="wish" aria-label="Wishlist">${I.heart}<span class="badge" data-wish-count></span></button>
        <button class="icon-btn" data-open="bag" aria-label="Bag">${I.bag}<span class="badge" data-bag-count></span></button>
      </div>
    </div>
  </header>`;

  const overlays = `
  <div class="scrim" data-scrim></div>
  <aside class="drawer" id="bag" aria-label="Bag" aria-hidden="true">
    <div class="drawer__head"><span class="t-cap">Your bag <span data-bag-count-text></span></span><button class="icon-btn" data-close aria-label="Close bag">${I.close}</button></div>
    <div class="drawer__body" data-bag-lines></div>
    <div class="drawer__foot" data-bag-foot></div>
  </aside>
  <aside class="drawer" id="wish" aria-label="Wishlist" aria-hidden="true">
    <div class="drawer__head"><span class="t-cap">Saved</span><button class="icon-btn" data-close aria-label="Close wishlist">${I.close}</button></div>
    <div class="drawer__body" data-wish-lines></div>
  </aside>
  <aside class="drawer drawer--left" id="menu" aria-label="Menu" aria-hidden="true">
    <div class="drawer__head"><a class="brand" href="index.html">${jar()}<span class="brand__word">ACHAR</span></a><button class="icon-btn" data-close aria-label="Close menu">${I.close}</button></div>
    <div class="menu__bg" aria-hidden="true"><img src="assets/img/look-02.jpg" alt="" data-menu-bg></div>
    <div class="drawer__body menu">
      <nav aria-label="Menu">
        ${[["shop.html", "Shop all", "assets/img/look-02.jpg"], ["lookbook.html", "Lookbook", "assets/img/look-01.jpg"], ["sale.html", "Sale", "assets/img/p/ig-08.jpg"], ["about.html", "The Recipe", "assets/img/look-13.jpg"], ["help.html", "Help & delivery", "assets/img/p/ig-06.jpg"], ["account.html", "Account", "assets/img/look-15.jpg"]].map(([h, t, im], i) => `<a href="${h}" class="menu__link" style="--i:${i}" data-menu-img="${im}">${t}</a>`).join("")}
      </nav>
    </div>
  </aside>
  <div class="search" id="search" role="dialog" aria-label="Search" aria-hidden="true">
    <div class="wrap">
      <div class="search__bar">${I.search}<input type="search" placeholder="Search ACHAR" aria-label="Search products" data-search-input><button class="icon-btn" data-close aria-label="Close search">${I.close}</button></div>
      <div class="search__res">
        <div class="search__sug"><span class="t-cap" style="color:var(--grey)">Popular</span>${["Navy", "Lime", "Oatmeal", "Office", "Gift", "Recipe 02"].map((t) => `<button data-sug="${t}">${t}</button>`).join("")}</div>
        <div><p class="t-small" data-search-meta style="margin-bottom:14px">Everything</p><div class="search__grid" data-search-grid></div></div>
      </div>
    </div>
  </div>
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-hidden="true"><div class="modal__box" data-modal-box></div></div>
  <div class="toast" role="status" aria-live="polite" data-toast></div>`;

  const footer = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div>
          <h4 class="t-cap">Be first to taste Recipe 02</h4>
          <p style="max-width:36ch;color:var(--ink-2);font-size:15px">One email when the next jar opens. Nothing else.</p>
          <form class="news" data-news novalidate><input type="email" placeholder="Your email" aria-label="Email address" required><button class="btn btn--sm" type="submit">Subscribe</button></form>
          <p class="msg" data-news-msg aria-live="polite"></p>
        </div>
        <div><h4 class="t-cap">Shop</h4><ul><li><a href="shop.html">All</a></li><li><a href="lookbook.html">Lookbook</a></li><li><a href="sale.html">Sale</a></li><li><a href="shop.html?cat=gift">Gift Jar</a></li></ul></div>
        <div><h4 class="t-cap">Help</h4><ul><li><a href="help.html#size">Size guide</a></li><li><a href="help.html#delivery">Delivery &amp; COD</a></li><li><a href="help.html#payments">Payments</a></li><li><a href="help.html#exchange">Exchanges</a></li><li><a href="account.html">Track an order</a></li></ul></div>
        <div><h4 class="t-cap">ACHAR</h4><ul><li><a href="about.html">The Recipe</a></li><li><a href="https://www.instagram.com/achar.wear/" target="_blank" rel="noopener">Instagram</a></li><li><a href="help.html#contact">Contact</a></li></ul></div>
      </div>
    </div>
    <div class="footer__word" aria-hidden="true">${jar()}ACHAR</div>
  </footer>
  <div class="signoff" role="contentinfo">
    <div class="wrap signoff__in">
      <span class="signoff__brand">${jar()}<b>ACHAR</b><span class="bn" lang="bn">আচার</span></span>
      <span class="signoff__tag">An acquired taste. A considered fit.</span>
      <span class="signoff__right"><a href="https://www.instagram.com/achar.wear/" target="_blank" rel="noopener">@achar.wear</a><span>Dhaka, Bangladesh</span></span>
    </div>
    <div class="wrap signoff__bot">
      <span>© 2026 ACHAR · Made in Bangladesh · Demo storefront: no orders are placed, prices are samples.</span>
      <span class="footer__pay"><span>Payments by</span>${payBadges(["ssl", "bkash", "nagad", "rocket", "visa", "mc", "amex", "cod"])}</span>
    </div>
  </div>`;

  document.body.insertAdjacentHTML("afterbegin", top);
  document.body.insertAdjacentHTML("beforeend", footer + overlays);
  const mcss = document.createElement("style");
  mcss.textContent = `.menu__link{display:flex;justify-content:space-between;align-items:center;padding:14px 0;font-size:26px;font-weight:300;letter-spacing:.02em;border-bottom:1px solid var(--line);opacity:0;transform:translateX(-14px);transition:opacity .5s var(--ease),transform .6s var(--ease);transition-delay:calc(var(--i)*45ms + 120ms)}#menu.is-open .menu__link{opacity:1;transform:none}.menu__link:hover{padding-left:6px}`;
  document.head.appendChild(mcss);

  /* Menu: the model image behind the links follows the hovered link */
  document.addEventListener("pointerover", (e) => {
    const a = e.target.closest && e.target.closest("[data-menu-img]");
    const bg = document.querySelector("[data-menu-bg]");
    if (!a || !bg || bg.dataset.cur === a.dataset.menuImg) return;
    bg.dataset.cur = a.dataset.menuImg;
    bg.classList.add("is-swap");
    setTimeout(() => { bg.src = a.dataset.menuImg; bg.onload = () => bg.classList.remove("is-swap"); }, 220);
  });

  /* ---------- Overlay control ---------- */
  const scrim = $("[data-scrim]");
  let openEl = null, lastFocus = null;
  function open(id) {
    closeModal(true);
    close();
    const el = document.getElementById(id);
    if (!el) return;
    lastFocus = document.activeElement;
    openEl = el;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    scrim.classList.add("is-open");
    document.body.classList.add("locked");
    if (id === "bag") renderBag();
    if (id === "wish") renderWish();
    if (id === "search") { renderSearch(""); setTimeout(() => $("[data-search-input]").focus(), 80); }
    else setTimeout(() => (el.querySelector("[data-close]") || el).focus(), 60);
  }
  function close() {
    if (!openEl) return;
    openEl.classList.remove("is-open");
    openEl.setAttribute("aria-hidden", "true");
    scrim.classList.remove("is-open");
    document.body.classList.remove("locked");
    openEl = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  scrim.addEventListener("click", () => { close(); closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { close(); closeModal(); } });

  let tt;
  function toast(html) {
    const t = $("[data-toast]");
    t.innerHTML = html;
    t.classList.add("is-on");
    clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("is-on"), 3000);
  }

  /* ---------- Bag ---------- */
  const FREE_AT = 4000;
  function renderBag(newKey) {
    const lines = S.bag();
    const body = $("[data-bag-lines]"), foot = $("[data-bag-foot]");
    $("[data-bag-count-text]").textContent = lines.length ? `(${S.count()})` : "";
    if (!lines.length) {
      body.innerHTML = `<div class="empty">${jarOutline}<p class="t-h3">Your bag is empty</p><p class="t-small">Recipe 01 comes in five colours.</p><a class="btn" href="shop.html">Shop the recipe</a></div>`;
      foot.style.display = "none";
      return;
    }
    foot.style.display = "";
    body.innerHTML = lines.map((l) => {
      const k = l.id + "|" + l.size;
      return `<div class="bag-line ${newKey === k ? "line-new" : ""}">
        <a class="bag-line__img" href="${url(l.p)}">${shirt(l.p)}</a>
        <div>
          <div class="bag-line__top"><h4>${esc(title(l.p))}</h4>${priceTag({ ...l.p, price: l.p.price * l.qty, was: l.p.was ? l.p.was * l.qty : null })}</div>
          <p class="meta">${l.p.cat === "shirts" ? `<span class="dot" style="--c:${l.p.hex};width:12px;height:12px"></span>${esc(l.p.colour)} · ` : ""}Size ${esc(l.size)}</p>
          <div class="bag-line__ctl">
            <div class="qty" role="group" aria-label="Quantity"><button data-q="-1" data-k="${k}" aria-label="Decrease">−</button><output>${l.qty}</output><button data-q="1" data-k="${k}" aria-label="Increase">+</button></div>
            <button class="remove" data-rm="${k}">Remove</button>
          </div>
        </div></div>`;
    }).join("") + pairs(lines);
    const sub = S.subtotal(), left = Math.max(0, FREE_AT - sub);
    foot.innerHTML = `
      <div class="free-meter"><span>${left ? `You're <b>${S.tk(left)}</b> away from free delivery in Dhaka` : `Free delivery in Dhaka unlocked`}</span><div class="free-meter__bar"><i style="width:${Math.min(100, (sub / FREE_AT) * 100)}%"></i></div></div>
      <div class="totals"><div><span>Subtotal</span><span>${S.tk(sub)}</span></div>${S.savings() ? `<div class="save"><span>You save</span><span>−${S.tk(S.savings())}</span></div>` : ""}</div>
      <a class="btn btn--block" href="checkout.html">Checkout · ${S.tk(sub)}</a>
      <p class="t-small center" style="margin-top:10px">Sample prices · cash on delivery available</p>`;
  }
  function pairs(lines) {
    const have = new Set(lines.map((l) => l.id));
    const pick = shirts().filter((p) => !have.has(p.id)).slice(0, 3);
    return `<div style="padding-top:22px"><p class="t-cap" style="color:var(--grey)">Pairs well with</p><div class="pairs">${pick.map((p) => `<button data-quick="${p.id}"><span class="p">${shirt(p)}</span><small>${p.colour}</small></button>`).join("")}</div></div>`;
  }
  document.addEventListener("click", (e) => {
    const q = e.target.closest("[data-q]");
    if (q) { const [id, size] = q.dataset.k.split("|"); const l = S.bag().find((x) => x.id === id && x.size === size); if (l) S.setQty(id, size, l.qty + Number(q.dataset.q)); }
    const rm = e.target.closest("[data-rm]");
    if (rm) { const [id, size] = rm.dataset.rm.split("|"); S.remove(id, size); }
  });

  function renderWish() {
    const ids = S.wish();
    const body = $("[data-wish-lines]");
    if (!ids.length) { body.innerHTML = `<div class="empty">${I.heart.replace('class="icon"', 'class="icon" style="width:34px;height:34px;color:#b9b5ad"')}<p class="t-h3">Nothing saved yet</p><p class="t-small">Tap the heart on any colour to keep it here.</p></div>`; return; }
    body.innerHTML = `<div class="tiles" style="--cols:2;padding-top:16px">${ids.map((id) => S.product(id)).filter(Boolean).map((p) => card(p)).join("")}</div>`;
  }

  function counts() {
    const n = S.count(), w = S.wish().length;
    $$("[data-bag-count]").forEach((b) => (b.textContent = n || ""));
    $$("[data-wish-count]").forEach((b) => (b.textContent = w || ""));
  }
  S.on((type, d) => {
    counts();
    if (openEl && openEl.id === "bag") renderBag(type === "add" ? d.id + "|" + d.size : null);
    if (openEl && openEl.id === "wish") renderWish();
    $$(`[data-wish="${d.id}"]`).forEach((b) => b.setAttribute("aria-pressed", S.isWished(d.id)));
    if (type === "add") { const b = $("[data-bag-count]"); b.classList.add("is-live"); setTimeout(() => b.classList.remove("is-live"), 900); }
  });
  counts();

  /* Fly-to-bag: a small shirt flies from the source element into the bag icon. */
  function flyToBag(fromEl, p) {
    const bagBtn = $('[data-open="bag"]');
    if (!fromEl || !bagBtn || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = fromEl.getBoundingClientRect(), b = bagBtn.getBoundingClientRect();
    const f = document.createElement("div");
    f.innerHTML = shirt(p);
    Object.assign(f.style, { position: "fixed", left: a.left + a.width / 2 - 40 + "px", top: a.top + a.height / 2 - 46 + "px", width: "80px", zIndex: 95, pointerEvents: "none", transition: "transform .8s cubic-bezier(.5,-0.3,.3,1), opacity .8s" });
    document.body.appendChild(f);
    requestAnimationFrame(() => {
      const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
      f.style.transform = `translate(${dx}px, ${dy}px) scale(.18) rotate(-12deg)`;
      f.style.opacity = ".4";
    });
    setTimeout(() => f.remove(), 850);
  }

  /* ---------- Search ---------- */
  function renderSearch(q) {
    const t = q.trim().toLowerCase();
    const res = D.products.filter((p) => !t || [p.name, p.colour, p.notes, p.cat, "recipe " + p.recipe, ...(p.vibe || [])].join(" ").toLowerCase().includes(t));
    $("[data-search-meta]").textContent = t ? `${res.length} result${res.length === 1 ? "" : "s"} for “${q}”` : "Everything";
    $("[data-search-grid]").innerHTML = res.length
      ? res.map((p) => `<a href="${url(p)}"><span class="p">${shirt(p)}</span><span style="display:flex;justify-content:space-between;gap:8px;font-size:14px;margin-top:10px"><span>${esc(title(p))}</span>${p.price ? `<span style="color:var(--grey)">${S.tk(p.price)}</span>` : ""}</span></a>`).join("")
      : `<p>No match. Try a colour like “Navy” or a vibe like “Calm”.</p>`;
  }
  $("[data-search-input]").addEventListener("input", (e) => renderSearch(e.target.value));
  $("[data-search-input]").addEventListener("keydown", (e) => { if (e.key === "Enter") location.href = `shop.html?q=${encodeURIComponent(e.target.value)}`; });

  /* ---------- Modal ---------- */
  const modal = $("#modal");
  function openModal(html, narrow = false) {
    close();
    lastFocus = document.activeElement;
    $("[data-modal-box]").innerHTML = `<button class="icon-btn modal__close" data-modal-close aria-label="Close">${I.close}</button>` + html;
    $("[data-modal-box]").style.width = narrow ? "min(560px,100%)" : "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    scrim.classList.add("is-open");
    document.body.classList.add("locked");
    setTimeout(() => $("[data-modal-close]").focus(), 50);
  }
  function closeModal(silent) {
    if (!modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!silent) { scrim.classList.remove("is-open"); document.body.classList.remove("locked"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  }
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest("[data-modal-close]")) closeModal(); });

  function sizeGuideHTML() {
    return `<div style="padding:36px clamp(20px,4vw,40px) 36px">
      <h2 class="t-h2" style="font-size:28px;margin-bottom:10px">Size guide</h2>
      <p style="color:var(--ink-2);margin-bottom:22px;max-width:52ch">Recipe 01 is cut boxy: wide through the body with a dropped shoulder. Prefer it closer? Take one size down. Inches, garment laid flat (sample chart).</p>
      <table class="sizetable"><thead><tr>${D.sizeChart.head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${D.sizeChart.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-top:26px">
        <div class="fld"><label for="sg-h">Your height (cm)</label><input class="inp" id="sg-h" type="number" inputmode="numeric" placeholder="e.g. 172"></div>
        <div class="fld"><label for="sg-fit">How you like it</label><select class="sel" id="sg-fit"><option value="0">Boxy, as designed</option><option value="-1">A little closer</option><option value="1">Extra roomy</option></select></div>
      </div>
      <p style="margin-top:16px;font-size:16px" data-sg-out aria-live="polite">Enter your height and we'll suggest a size.</p>
    </div>`;
  }
  function bindSizeGuide() {
    const h = $("#sg-h"), f = $("#sg-fit"), out = $("[data-sg-out]");
    const calc = () => {
      const v = Number(h.value);
      if (!v) { out.textContent = "Enter your height and we'll suggest a size."; return; }
      const order = ["S", "M", "L", "XL", "XXL"];
      let i = v < 163 ? 0 : v < 171 ? 1 : v < 179 ? 2 : v < 187 ? 3 : 4;
      i = Math.max(0, Math.min(4, i + Number(f.value)));
      out.innerHTML = `We'd pick <b>${order[i]}</b> for you.`;
      $$(".sizetable tbody tr").forEach((r, j) => r.classList.toggle("is-hit", j === i));
    };
    h.addEventListener("input", calc); f.addEventListener("change", calc);
  }

  function quickView(id) {
    const p = S.product(id);
    if (!p) return;
    const sizes = p.sizes.map((s) => `<button class="chip" data-qv-size="${esc(s)}" ${p.soldOut.includes(s) ? 'aria-disabled="true" title="Sold out"' : 'aria-pressed="false"'}>${esc(s)}</button>`).join("");
    openModal(`<div class="qv">
      <div class="qv__art">${shirt(p)}</div>
      <div class="qv__info">
        <p class="tile__brand">ACHAR · ${p.cat === "shirts" ? "Recipe " + p.recipe : esc(p.colour)}</p>
        <h2 style="font-size:28px;font-weight:400;line-height:1.15">${esc(title(p))}</h2>
        ${priceTag(p)}
        <p style="color:var(--ink-2)">${esc(p.notes)}</p>
        ${p.cat === "shirts" ? `<div class="dots" style="margin:4px 0">${shirts().map((s) => `<button class="dot dot--lg" data-quick="${s.id}" style="--c:${s.hex}" aria-label="${s.colour}" aria-pressed="${s.id === p.id}"></button>`).join("")}</div>` : ""}
        ${p.sizes.length ? `<div><p class="t-cap" style="margin-bottom:10px">${p.cat === "gift" ? "Amount" : "Size"}</p><div class="chips">${sizes}</div><p class="err" data-qv-err style="margin-top:8px"></p></div>` : ""}
        ${p.price ? `<button class="btn btn--block" data-qv-add="${p.id}">Add to bag · ${S.tk(p.price)}</button>` : `<button class="btn btn--block" data-notify="${p.id}">Notify me</button>`}
        <a class="link" href="${url(p)}" style="justify-self:start">View details</a>
      </div></div>`);
  }
  const qcss = document.createElement("style");
  qcss.textContent = `.qv{display:grid;grid-template-columns:1fr 1fr}.qv__art{display:grid;place-items:center;padding:40px;min-height:460px}.qv__art .shirt{width:min(340px,100%)}.qv__info{padding:44px clamp(20px,3vw,40px) 36px;display:grid;gap:16px;align-content:start}@media(max-width:720px){.qv{grid-template-columns:1fr}.qv__art{min-height:0;padding:28px}.qv__art .shirt{width:62%}}`;
  document.head.appendChild(qcss);

  const INFO = {
    returns: ["Exchanges", "Sample policy: exchange any unworn Recipe 01 shirt for another size or colour within 7 days. Inside Dhaka, we pick it up from your door."],
    delivery: ["Delivery & COD", "Inside Dhaka 1–2 days (৳70), outside Dhaka 3–5 days (৳130). Free in Dhaka over ৳4,000. Pay cash on delivery, bKash, Nagad or card. All fees are samples for the pitch."],
    about: ["The recipe", "ACHAR means pickle. Good achar takes time, the right ingredients, and a little patience. So do our clothes: one considered shirt, cut boxy, in colours you can almost taste. Recipe 01 is now serving."],
    contact: ["Contact", "DM us on Instagram @achar.wear. Phone, email and address to be added by the client."],
  };

  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); open(o.dataset.open); return; }
    if (e.target.closest("[data-close]")) { close(); return; }
    if (e.target.closest("[data-cur]")) { toast("Prices shown in BDT (৳). Other currencies when ACHAR ships abroad."); return; }
    if (e.target.closest("[data-theme-toggle]")) { setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"); return; }
    const w = e.target.closest("[data-wish]");
    if (w) { e.preventDefault(); const on = S.toggleWish(w.dataset.wish); const p = S.product(w.dataset.wish); toast(on ? `Saved ${esc(title(p))} <a href="#" data-open="wish">View</a>` : `Removed ${esc(title(p))}`); return; }
    const qv = e.target.closest("[data-quick]");
    if (qv) { e.preventDefault(); quickView(qv.dataset.quick); return; }
    const sz = e.target.closest("[data-qv-size]");
    if (sz && sz.getAttribute("aria-disabled") !== "true") { $$("[data-qv-size]").forEach((b) => b.getAttribute("aria-disabled") !== "true" && b.setAttribute("aria-pressed", b === sz)); $("[data-qv-err]").textContent = ""; return; }
    const add = e.target.closest("[data-qv-add]");
    if (add) {
      const chosen = $('[data-qv-size][aria-pressed="true"]');
      if (!chosen) { $("[data-qv-err]").textContent = "Choose a size first."; return; }
      const p = S.product(add.dataset.qvAdd);
      flyToBag($(".qv__art"), p);
      S.add(p.id, chosen.dataset.qvSize);
      add.textContent = "Added";
      setTimeout(() => { closeModal(); open("bag"); }, 650);
      return;
    }
    const n = e.target.closest("[data-notify]");
    if (n) { e.preventDefault(); openModal(`<form style="padding:40px clamp(20px,4vw,40px)" data-notify-form><h2 class="t-h2" style="font-size:28px;margin-bottom:12px">Get told first</h2><p style="color:var(--ink-2);margin-bottom:20px">Recipe 02 is still fermenting. One message when it's ready.</p><div class="fld"><label for="nt-e">Email or phone</label><input class="inp" id="nt-e" required placeholder="you@email.com or 01XXXXXXXXX"></div><button class="btn btn--block" style="margin-top:16px">Notify me</button><p class="t-small msg" style="margin-top:12px" aria-live="polite"></p></form>`, true); return; }
    const sg = e.target.closest("[data-size-guide]");
    if (sg) { e.preventDefault(); openModal(sizeGuideHTML(), true); bindSizeGuide(); return; }
    const inf = e.target.closest("[data-info]");
    if (inf) { e.preventDefault(); const [h, t] = INFO[inf.dataset.info]; openModal(`<div style="padding:40px clamp(20px,4vw,40px)"><h2 class="t-h2" style="font-size:28px;margin-bottom:14px">${h}</h2><p style="color:var(--ink-2);font-size:16px">${t}</p></div>`, true); return; }
    const sug = e.target.closest("[data-sug]");
    if (sug) { const i = $("[data-search-input]"); i.value = sug.dataset.sug; renderSearch(i.value); i.focus(); }
  });

  document.addEventListener("submit", (e) => {
    const f = e.target;
    if (f.matches("[data-news]")) {
      e.preventDefault();
      const i = f.querySelector("input"), m = $("[data-news-msg]");
      if (!/^\S+@\S+\.\S+$/.test(i.value)) { m.textContent = "That email doesn't look right. Check for a typo."; return; }
      m.textContent = "You're on the list. (Demo: nothing was sent.)"; i.value = "";
    }
    if (f.matches("[data-notify-form]")) {
      e.preventDefault();
      const i = f.querySelector("input"), m = f.querySelector(".msg");
      if (i.value.trim().length < 6) { i.classList.add("is-bad"); m.textContent = "Add an email or an 11-digit phone number."; return; }
      i.classList.remove("is-bad"); m.textContent = "Done. You'll hear from us first. (Demo: nothing was sent.)";
    }
  });

  /* ---------- Header state ---------- */
  const header = $("#header");
  const overTarget = $("[data-over-until]");
  let raf = 0;
  const check = () => {
    raf = 0;
    header.classList.toggle("is-scrolled", scrollY > 8);
    if (overTarget) header.classList.toggle("header--over", overTarget.getBoundingClientRect().bottom > header.getBoundingClientRect().bottom + 4 && overTarget.dataset.overOn === "1");
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(check); }, { passive: true });
  check();

  /* ---------- Reveal + rails ---------- */
  const rio = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); rio.unobserve(en.target); } }), { rootMargin: "0px 0px -10% 0px" });
  const watchReveal = () => $$(".rv:not(.is-in)").forEach((el) => rio.observe(el));
  watchReveal();
  function bindRail(rail, bar) {
    if (!rail || !bar) return;
    const upd = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const vis = rail.clientWidth / rail.scrollWidth;
      bar.style.width = vis * 100 + "%";
      bar.style.transform = `translateX(${max ? (rail.scrollLeft / max) * ((1 - vis) / vis) * 100 : 0}%)`;
    };
    rail.addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    upd();
  }

  /* ---------- Split headings into words for the rise reveal ---------- */
  function splitWords(root = document) {
    $$("[data-split]:not([data-split-done])", root).forEach((el) => {
      let i = 0;
      const walk = (node) => {
        [...node.childNodes].forEach((c) => {
          if (c.nodeType === 3) {
            const frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
              const w = document.createElement("span"); w.className = "w";
              const s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
              w.appendChild(s); frag.appendChild(w);
            });
            c.replaceWith(frag);
          } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
        });
      };
      walk(el);
      el.dataset.splitDone = "1";
      el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    });
  }
  splitWords();
  const io2 = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io2.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  function watchAll() {
    splitWords();
    $$(".stagger").forEach((g) => [...g.children].forEach((c, n) => c.style.setProperty("--n", n % 8)));
    $$("[data-split]:not(.is-in), .img-rv:not(.is-in), .stagger:not(.is-in), .rv:not(.is-in)").forEach((el) => io2.observe(el));
  }
  watchAll();

  /* ---------- Smooth scroll (Lenis), loaded on demand ---------- */
  let lenis = null;
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const sc = document.createElement("script");
    sc.src = "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js";
    sc.onload = () => {
      if (!window.Lenis) return;
      lenis = new window.Lenis({ duration: 1.35, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.4 });
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      $$(".drawer__body, .search, .modal__box, .filters, .rail, [data-lenis-prevent]").forEach((el) => el.setAttribute("data-lenis-prevent", ""));
      new MutationObserver(() => (document.body.classList.contains("locked") ? lenis.stop() : lenis.start())).observe(document.body, { attributes: true, attributeFilter: ["class"] });
      document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (a && a.getAttribute("href").length > 1) { const t = document.querySelector(a.getAttribute("href")); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -80 }); } }
      });
    };
    document.head.appendChild(sc);
  }

  /* ---------- Soft page transitions between tabs ---------- */
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
    const u = new URL(href, location.href);
    if (u.pathname === location.pathname && u.search === location.search) return;
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => (location.href = u.href), 280);
  });
  addEventListener("pageshow", (e) => { if (e.persisted) document.body.classList.remove("is-leaving"); });

  /* ---------- Demo notice ---------- */
  let demoGone = false;
  try { demoGone = sessionStorage.getItem("achar.demo") === "1"; } catch (e) {}
  if (!demoGone) {
    document.body.insertAdjacentHTML("beforeend", `<div class="demo-pill" role="note"><i></i><span>Demo store<em> · nothing is charged</em></span><button aria-label="Dismiss demo notice" data-demo-x>${I.close.replace('class="icon"', 'class="icon" style="width:14px;height:14px"')}</button></div>`);
    $("[data-demo-x]").addEventListener("click", () => { $(".demo-pill").classList.add("is-gone"); try { sessionStorage.setItem("achar.demo", "1"); } catch (e) {} });
    const so = $(".signoff");
    if (so) new IntersectionObserver(([en]) => $(".demo-pill").classList.toggle("is-tucked", en.isIntersecting)).observe(so);
    /* Phones: keep the hero buttons clear; the notice slides in once the hero is scrolled past. */
    const heroEl = $("[data-hero]");
    if (heroEl && matchMedia("(max-width: 700px)").matches) new IntersectionObserver(([en]) => $(".demo-pill").classList.toggle("is-hero", en.isIntersecting), { rootMargin: "0px 0px -60% 0px" }).observe(heroEl);
  }

  window.ACHAR_UI = { $, $$, esc, jar, jarOutline, I, barcode, shirt, card, priceTag, title, url, open, close, toast, quickView, openModal, closeModal, sizeGuideHTML, bindSizeGuide, watchReveal, watchAll, bindRail, flyToBag, check, payBadges, get lenis() { return lenis; } };
})();
