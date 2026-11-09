(function () {
  const D = window.ACHAR_DATA, S = window.ACHAR_STORE, U = window.ACHAR_UI, SH = window.ACHAR_SHIRT;
  const { $, $$, esc } = U;
  const shirts = D.products.filter((p) => p.cat === "shirts");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Strips: each colour's cleanest real shot, cropped above any caption ---------- */
  const STRIP = {
    "r01-oat": [D.ig(9), "height:210%;object-position:50% 0"],
    "r01-lime": [D.ig(7), "height:118%;object-position:50% 0"],
    "r01-sky": [D.ig(4), "height:122%;object-position:50% 0"],
    "r01-navy": [D.ig(3), "height:122%;object-position:50% 0"],
    "r01-brown": [D.ig(8), "height:190%;object-position:50% 0"],
  };
  $("[data-strips]").innerHTML = shirts.map((p) => `<a class="strip ${SH.lum(p.hex) < 0.32 ? "is-dark" : ""}" href="#studio" data-pick="${p.id}" style="--c:${p.hex}" aria-label="${p.colour}">
      <span class="strip__dot"></span><span class="strip__name">${p.colour}</span>
      <span class="strip__shirt"><img src="${STRIP[p.id][0]}" alt="" loading="lazy" style="${STRIP[p.id][1]}"></span>
      <span class="strip__info"><span><b>${p.colour}</b><span>${esc(p.notes)}</span></span><span>${S.tk(p.price)}</span></span>
    </a>`).join("");

  /* ---------- Studio ---------- */
  const studio = $("[data-studio]"), list = $("[data-studio-list]");
  let cur = shirts[0], size = null, auto = null;
  list.innerHTML = shirts.map((p, i) => `<button role="tab" aria-selected="${i === 0}" data-sc="${p.id}"><span class="dot" style="--c:${p.hex}"></span>${p.colour}</button>`).join("");
  $("[data-studio-shirt]").innerHTML = shirts.map((p, i) => `<img class="pimg" data-si="${p.id}" src="${p.imgs[0]}" alt="${esc(U.title(p))}" ${i ? "" : 'aria-current="true"'}>`).join("");
  function paint(p) {
    cur = p;
    studio.style.setProperty("--tint", p.hex);
    $$("[data-si]").forEach((im) => im.toggleAttribute("aria-current", im.dataset.si === p.id));
    const nm = $("[data-studio-name]");
    nm.classList.add("is-swap");
    setTimeout(() => { nm.textContent = p.colour; nm.classList.remove("is-swap"); }, 260);
    $("[data-studio-title]").textContent = U.title(p);
    $("[data-studio-notes]").textContent = p.notes;
    $("[data-studio-price]").innerHTML = U.priceTag(p) + ` <span class="t-small">· sample price</span>`;
    if (size && p.soldOut.includes(size)) size = null;
    $("[data-studio-sizes]").innerHTML = p.sizes.map((s) => `<button class="chip" data-ss="${s}" ${p.soldOut.includes(s) ? 'aria-disabled="true" title="Sold out in this colour"' : `aria-pressed="${s === size}"`}>${s}</button>`).join("");
    $$("[data-sc]").forEach((b) => b.setAttribute("aria-selected", b.dataset.sc === p.id));
  }
  paint(cur);
  const stopAuto = () => { clearInterval(auto); auto = null; studio.dataset.touched = "1"; };
  list.addEventListener("click", (e) => { const b = e.target.closest("[data-sc]"); if (b) { stopAuto(); paint(S.product(b.dataset.sc)); } });
  list.addEventListener("mouseover", (e) => { const b = e.target.closest("[data-sc]"); if (b && matchMedia("(hover:hover)").matches) { stopAuto(); paint(S.product(b.dataset.sc)); } });
  $("[data-strips]").addEventListener("click", (e) => { const a = e.target.closest("[data-pick]"); if (a) { stopAuto(); paint(S.product(a.dataset.pick)); } });
  $("[data-studio-sizes]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ss]");
    if (!b || b.getAttribute("aria-disabled") === "true") return;
    stopAuto(); size = b.dataset.ss;
    $$("[data-ss]").forEach((x) => x.getAttribute("aria-disabled") !== "true" && x.setAttribute("aria-pressed", x === b));
    $("[data-studio-err]").textContent = "";
  });
  $("[data-studio-add]").addEventListener("click", () => {
    stopAuto();
    if (!size) { $("[data-studio-err]").textContent = "Choose a size first."; return; }
    U.flyToBag($("[data-studio-shirt]"), cur);
    S.add(cur.id, size);
    U.toast(`Added ${esc(cur.colour)}, size ${esc(size)} <a href="#" data-open="bag">View bag</a>`);
  });
  if (!reduce) {
    new IntersectionObserver(([en]) => {
      if (en.isIntersecting && auto === null && !studio.dataset.touched) auto = setInterval(() => paint(shirts[(shirts.indexOf(cur) + 1) % shirts.length]), 2600);
      else if (!en.isIntersecting && auto) { clearInterval(auto); auto = null; }
    }, { threshold: 0.4 }).observe(studio);
  }

  /* ---------- Quiz ---------- */
  const Q = [
    [["office", "Office"], ["dawat", "Dawat"], ["adda", "Adda with friends"], ["date", "A date"], ["trip", "Weekend trip"]],
    [["morning", "Morning"], ["noon", "Afternoon"], ["night", "After six"]],
    [["quiet", "Whisper"], ["mid", "Talk"], ["loud", "Shout"]],
  ];
  const ans = [null, null, null];
  $$(".q").forEach((fs, i) => { fs.querySelector(".chips").innerHTML = Q[i].map(([k, t]) => `<button type="button" class="chip" aria-pressed="false" data-a="${k}">${t}</button>`).join(""); });
  function score() {
    const pts = Object.fromEntries(shirts.map((p) => [p.id, 0]));
    const add = (ids, n) => ids.forEach((id) => (pts[id] += n));
    const [where, when, loud] = ans;
    ({ office: () => add(["r01-navy", "r01-sky", "r01-sky"], 3), dawat: () => add(["r01-brown", "r01-navy", "r01-oat"], 3), adda: () => add(["r01-oat", "r01-sky", "r01-lime"], 3), date: () => add(["r01-brown", "r01-sky", "r01-lime"], 3), trip: () => add(["r01-lime", "r01-lime", "r01-oat"], 3) })[where]?.();
    ({ morning: () => add(["r01-sky", "r01-lime", "r01-oat"], 2), noon: () => add(["r01-sky", "r01-lime", "r01-oat"], 2), night: () => add(["r01-navy", "r01-brown"], 2) })[when]?.();
    ({ quiet: () => add(["r01-oat", "r01-sky", "r01-sky"], 2), mid: () => add(["r01-navy", "r01-lime", "r01-brown"], 2), loud: () => add(["r01-lime", "r01-lime"], 3) })[loud]?.();
    return Object.entries(pts).sort((a, b) => b[1] - a[1])[0][0];
  }
  const out = $("[data-quiz-out]");
  function renderOut() {
    const done = ans.filter(Boolean).length;
    $$(".q").forEach((fs, i) => fs.classList.toggle("is-later", i > 0 && !ans[i - 1] && !ans[i]));
    if (done < 3) { out.innerHTML = `<div class="qo__pending">${U.jarOutline}<p class="t-h3" style="color:var(--on-black)">${done ? `${3 - done} more to go` : "Your colour is in here"}</p><p class="t-small">Answer the three questions and we'll open the jar.</p></div>`; return; }
    const p = S.product(score());
    out.innerHTML = `<div class="qo__field"><img class="pimg" src="${p.imgs[0]}" alt="${esc(U.title(p))}"></div>
      <div class="qo__body"><span class="t-small">We'd pour</span><b>${esc(p.colour)}</b><p class="t-small">${esc(p.notes)}</p>${U.priceTag(p)}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:6px"><button class="btn" data-quick="${p.id}">Add ${esc(p.colour)}</button><button class="btn btn--ghost" data-quiz-reset>Start over</button></div></div>`;
  }
  $("[data-quiz]").addEventListener("click", (e) => {
    const b = e.target.closest("[data-a]"); if (!b) return;
    const fs = b.closest(".q"); ans[Number(fs.dataset.step)] = b.dataset.a;
    $$("[data-a]", fs).forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderOut();
  });
  out.addEventListener("click", (e) => { if (e.target.closest("[data-quiz-reset]")) { ans.fill(null); $$("[data-a]").forEach((x) => x.setAttribute("aria-pressed", "false")); renderOut(); } });
  renderOut();
  out.classList.add("on-black");

  U.watchAll();
})();
