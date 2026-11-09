(function () {
  const D = window.ACHAR_DATA, S = window.ACHAR_STORE, U = window.ACHAR_UI;
  const { $, $$, esc } = U;
  const qs = new URLSearchParams(location.search);
  const all = D.products;
  const shirts = all.filter((p) => p.cat === "shirts");

  const st = {
    cat: new Set(qs.get("cat") ? [qs.get("cat")] : []),
    colour: new Set(),
    size: new Set(),
    vibe: new Set(qs.get("vibe") ? [qs.get("vibe")] : []),
    max: 5000,
    instock: false,
    sale: qs.get("sale") === "1",
    q: qs.get("q") || "",
    sort: "featured",
  };
  const CATS = { shirts: "Recipe 01 shirts", gift: "Gift Jar", upcoming: "Coming soon" };

  /* Build filter controls */
  $('[data-f="cat"]').innerHTML = Object.entries(CATS).map(([k, t]) => `<label class="check"><input type="checkbox" value="${k}" ${st.cat.has(k) ? "checked" : ""}> ${t} <span style="color:var(--grey);margin-left:auto">${all.filter((p) => p.cat === k).length}</span></label>`).join("");
  $('[data-f="colour"]').innerHTML = shirts.map((p) => `<button class="dot dot--lg" style="--c:${p.hex}" data-v="${p.colour}" aria-pressed="false" aria-label="${p.colour}" title="${p.colour}"></button>`).join("");
  $('[data-f="size"]').innerHTML = ["S", "M", "L", "XL", "XXL"].map((s) => `<button class="chip" data-v="${s}" aria-pressed="false">${s}</button>`).join("");
  $('[data-f="vibe"]').innerHTML = Object.entries(D.vibes).map(([k, v]) => `<label class="check"><input type="checkbox" value="${k}" ${st.vibe.has(k) ? "checked" : ""}> ${v.label}</label>`).join("");
  $("[data-sale]").checked = st.sale;

  $('[data-f="cat"]').addEventListener("change", (e) => { e.target.checked ? st.cat.add(e.target.value) : st.cat.delete(e.target.value); render(); });
  $('[data-f="vibe"]').addEventListener("change", (e) => { e.target.checked ? st.vibe.add(e.target.value) : st.vibe.delete(e.target.value); render(); });
  ["colour", "size"].forEach((k) => $(`[data-f="${k}"]`).addEventListener("click", (e) => {
    const b = e.target.closest("[data-v]"); if (!b) return;
    st[k].has(b.dataset.v) ? st[k].delete(b.dataset.v) : st[k].add(b.dataset.v);
    b.setAttribute("aria-pressed", st[k].has(b.dataset.v));
    render();
  }));
  $("[data-price]").addEventListener("input", (e) => { st.max = Number(e.target.value); $("[data-price-out]").textContent = `Up to ${S.tk(st.max)}`; render(); });
  $("[data-instock]").addEventListener("change", (e) => { st.instock = e.target.checked; render(); });
  $("[data-sale]").addEventListener("change", (e) => { st.sale = e.target.checked; render(); });
  $("[data-sort]").addEventListener("change", (e) => { st.sort = e.target.value; render(); });
  $$("[data-cols]").forEach((b) => b.addEventListener("click", () => {
    $$("[data-cols]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    $("[data-grid]").style.setProperty("--cols", b.dataset.cols);
  }));
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-clear]")) {
      Object.assign(st, { max: 5000, instock: false, sale: false, q: "" });
      ["cat", "colour", "size", "vibe"].forEach((k) => st[k].clear());
      $$('#filters input[type="checkbox"]').forEach((i) => (i.checked = false));
      $$("#filters [aria-pressed]").forEach((i) => i.setAttribute("aria-pressed", "false"));
      $("[data-price]").value = 5000; $("[data-price-out]").textContent = "Up to ৳5,000";
      render();
    }
    const rm = e.target.closest("[data-unset]");
    if (rm) {
      const [k, v] = rm.dataset.unset.split(":");
      if (k === "q") st.q = "";
      else if (k === "sale") { st.sale = false; $("[data-sale]").checked = false; }
      else if (k === "instock") { st.instock = false; $("[data-instock]").checked = false; }
      else if (k === "max") { st.max = 5000; $("[data-price]").value = 5000; $("[data-price-out]").textContent = "Up to ৳5,000"; }
      else {
        st[k].delete(v);
        $$(`#filters [data-f="${k}"] input[value="${v}"]`).forEach((i) => (i.checked = false));
        $$(`#filters [data-f="${k}"] [data-v="${v}"]`).forEach((i) => i.setAttribute("aria-pressed", "false"));
      }
      render();
    }
  });

  /* Mobile filter sheet */
  const fl = $("#filters");
  const toggle = $("[data-filters-toggle]");
  $$("[data-filters-close]").forEach((b) => b.addEventListener("click", () => { fl.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); document.body.classList.remove("locked"); }));
  $("[data-filters-close].icon-btn").innerHTML = U.I.close;
  toggle.addEventListener("click", () => {
    if (matchMedia("(max-width: 900px)").matches) { fl.classList.add("is-open"); document.body.classList.add("locked"); toggle.setAttribute("aria-expanded", "true"); }
    else { document.body.classList.toggle("filters-hidden"); toggle.setAttribute("aria-expanded", !document.body.classList.contains("filters-hidden")); }
  });
  toggle.setAttribute("aria-expanded", "true");

  function match(p) {
    if (st.cat.size && !st.cat.has(p.cat)) return false;
    if (st.colour.size && !st.colour.has(p.colour)) return false;
    if (st.size.size && !p.sizes.some((s) => st.size.has(s))) return false;
    if (st.instock && st.size.size && ![...st.size].some((s) => p.sizes.includes(s) && !p.soldOut.includes(s))) return false;
    if (st.instock && !p.price) return false;
    if (st.vibe.size && !(p.vibe || []).some((v) => st.vibe.has(v))) return false;
    if (p.price && p.price > st.max) return false;
    if (st.sale && !p.was) return false;
    if (st.q) {
      const t = st.q.toLowerCase();
      if (![p.name, p.colour, p.notes, p.cat, "recipe " + p.recipe, ...(p.vibe || [])].join(" ").toLowerCase().includes(t)) return false;
    }
    return true;
  }
  const ORDER = { featured: (a, b) => all.indexOf(a) - all.indexOf(b), new: (a, b) => (b.tag === "new") - (a.tag === "new") || b.batch.localeCompare(a.batch), low: (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9), high: (a, b) => (b.price ?? -1) - (a.price ?? -1), az: (a, b) => a.colour.localeCompare(b.colour) };

  function render() {
    const res = all.filter(match).sort(ORDER[st.sort]);
    $("[data-grid]").innerHTML = res.map((p) => U.card(p)).join("");
    $("[data-empty]").hidden = res.length > 0;
    $("[data-grid]").hidden = res.length === 0;
    $("[data-count]").textContent = `${res.length} item${res.length === 1 ? "" : "s"}`;
    const chips = [];
    st.cat.forEach((v) => chips.push(["cat:" + v, CATS[v]]));
    st.colour.forEach((v) => chips.push(["colour:" + v, v]));
    st.size.forEach((v) => chips.push(["size:" + v, "Size " + v]));
    st.vibe.forEach((v) => chips.push(["vibe:" + v, D.vibes[v].label]));
    if (st.max < 5000) chips.push(["max:", "Up to " + S.tk(st.max)]);
    if (st.instock) chips.push(["instock:", "In stock"]);
    if (st.sale) chips.push(["sale:", "On sale"]);
    if (st.q) chips.push(["q:", `“${st.q}”`]);
    $("[data-active]").innerHTML = chips.map(([k, t]) => `<button class="chip chip--wide is-on" data-unset="${esc(k)}" aria-label="Remove filter ${esc(t)}">${esc(t)}<svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none" style="margin-left:8px" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg></button>`).join("");
    $("[data-fcount]").textContent = chips.length ? `(${chips.length})` : "";
    const one = st.cat.size === 1 ? [...st.cat][0] : null;
    $("[data-shop-title]").textContent = st.q ? `“${st.q}”` : one === "shirts" ? "Recipe 01" : one === "gift" ? "Gift Jar" : st.sale ? "On sale" : "All products";
    $("[data-crumb]").textContent = $("[data-shop-title]").textContent;
  }
  render();
})();
