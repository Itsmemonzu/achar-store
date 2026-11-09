(function () {
  const D = window.ACHAR_DATA, S = window.ACHAR_STORE, U = window.ACHAR_UI, SH = window.ACHAR_SHIRT;
  const { $, $$, esc } = U;
  const shirts = D.products.filter((p) => p.cat === "shirts");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  /* ---------- Hero: letters part, the film grows (never past its source size) ---------- */
  const hero = $("[data-hero]"), stage = $(".hero__stage"), film = $("[data-film]"), line = $("[data-word-line]");
  $("[data-hero-shirt]").innerHTML = U.shirt(S.product("r01-oat"));
  let target = 0, cur = 0;
  const readP = () => {
    const total = hero.offsetHeight - stage.offsetHeight;
    target = reduce ? 0 : clamp(-hero.getBoundingClientRect().top / Math.max(1, total));
  };
  function frame() {
    cur += (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.0005) cur = target;
    const e = ease(cur);
    const fs = 0.86 + e * 0.14, rad = 18 - e * 12;
    stage.style.setProperty("--fs", fs.toFixed(4));
    stage.style.setProperty("--frs", `${(rad / fs).toFixed(2)}px`);
    stage.style.setProperty("--spread", (e * maxSpread).toFixed(2));
    stage.style.setProperty("--cy", `${e * -18}px`);
    const sr = stage.getBoundingClientRect(), fr = film.getBoundingClientRect();
    line.style.setProperty("--clip", `inset(${(fr.top - sr.top).toFixed(1)}px ${(sr.right - fr.right).toFixed(1)}px ${(sr.bottom - fr.bottom).toFixed(1)}px ${(fr.left - sr.left).toFixed(1)}px round ${rad.toFixed(1)}px)`);
    requestAnimationFrame(frame);
  }
  /* Outer letters may travel only until they touch the window edge (16px margin). */
  const word = $("[data-word]");
  let maxSpread = 0;
  const measureWord = () => {
    /* Centre the H (the middle letter) on the film, not the word as a whole. */
    const sr0 = stage.getBoundingClientRect(), hr = word.querySelector("span:nth-child(3)").getBoundingClientRect();
    const wx = parseFloat(stage.style.getPropertyValue("--wx") || 0);
    stage.style.setProperty("--wx", `${(wx + (sr0.left + sr0.width / 2) - (hr.left + hr.width / 2)).toFixed(1)}px`);
    const w = word.querySelector("span:first-child").getBoundingClientRect();
    const r = word.querySelector("span:last-child").getBoundingClientRect();
    const sp = parseFloat(stage.style.getPropertyValue("--spread") || 0);
    const left = w.left + 2.2 * sp, right = r.right - 2.2 * sp;
    maxSpread = Math.max(0, Math.min(left - 16, innerWidth - 16 - right) / 2.2);
  };
  addEventListener("scroll", readP, { passive: true });
  addEventListener("resize", () => { readP(); measureWord(); });
  readP(); measureWord(); frame();
  if (document.fonts) document.fonts.ready.then(measureWord);

  const v = $("[data-film] video"), pb = $("[data-hero-play]");
  const setPB = (vid, btn) => { btn.innerHTML = vid.paused ? U.I.play : U.I.pause; btn.setAttribute("aria-label", vid.paused ? "Play film" : "Pause film"); };
  pb.addEventListener("click", () => { v.paused ? v.play() : v.pause(); });
  v.addEventListener("play", () => setPB(v, pb)); v.addEventListener("pause", () => setPB(v, pb));
  if (reduce) v.pause();
  setPB(v, pb);

  /* ---------- Recipe 01: the five real colours ---------- */
  $("[data-r2]").innerHTML = shirts.map((p) => U.card(p)).join("");

  /* ---------- Explore: mosaic of real colours ---------- */
  $("[data-fan]").innerHTML = ["r01-oat", "r01-sky", "r01-lime", "r01-navy"].map((id) => { const p = S.product(id); return `<img src="${p.imgs[0]}" alt="" loading="lazy">`; }).join("");

  /* ---------- Film ---------- */
  const fv = $("[data-lazyplay]"), fb = $("[data-film-play]");
  let userPaused = false;
  fb.addEventListener("click", () => { if (fv.paused) { userPaused = false; fv.play(); } else { userPaused = true; fv.pause(); } });
  fv.addEventListener("play", () => setPB(fv, fb)); fv.addEventListener("pause", () => setPB(fv, fb));
  setPB(fv, fb);
  new IntersectionObserver(([en]) => { if (en.isIntersecting && !reduce && !userPaused) fv.play().catch(() => {}); else fv.pause(); }, { threshold: 0.25 }).observe(fv);
  $("[data-film-shop]").innerHTML = ["r01-navy", "r01-brown"].map((id) => {
    const p = S.product(id);
    return `<a class="film__item" href="${U.url(p)}"><span class="p">${U.shirt(p)}</span><span><b>${esc(U.title(p))}</b>${U.priceTag(p)}</span><button class="btn btn--sm" data-quick="${p.id}">Add</button></a>`;
  }).join("");

  /* ---------- Voices ---------- */
  const vstage = $("[data-voices]"), nav = $("[data-voices-nav]");
  let vi = 0, vt;
  nav.innerHTML = D.reviews.map((_, i) => `<button aria-label="Review ${i + 1}" aria-current="${i === 0}" data-vi="${i}"></button>`).join("");
  vstage.innerHTML = D.reviews.map((r, i) => {
    const p = shirts.find((s) => s.colour === r.colour) || shirts[0];
    return `<figure class="voice" style="margin:0" aria-hidden="${i !== 0}"><q>${esc(r.text.replace("Placeholder review. ", ""))}</q><cite><span class="dot" style="--c:${p.hex}"></span>${esc(r.colour)} · ${esc(r.city)}</cite></figure>`;
  }).join("");
  function showVoice(i) {
    const figs = $$(".voice", vstage);
    figs.forEach((f, j) => {
      const was = f.classList.contains("is-on");
      f.classList.toggle("is-on", j === i);
      f.classList.toggle("is-out", was && j !== i);
      f.setAttribute("aria-hidden", j !== i);
    });
    vi = i;
    $$("[data-vi]").forEach((b, j) => b.setAttribute("aria-current", j === i));
  }
  nav.addEventListener("click", (e) => { const b = e.target.closest("[data-vi]"); if (b) { clearInterval(vt); showVoice(Number(b.dataset.vi)); } });
  showVoice(0);
  if (!reduce) vt = setInterval(() => showVoice((vi + 1) % D.reviews.length), 6000);

  /* ---------- IG (sharpest sources only) ---------- */
  $("[data-ig]").innerHTML = [3, 4, 5, 6].map((n) => `<a href="https://www.instagram.com/achar.wear/" target="_blank" rel="noopener" aria-label="ACHAR on Instagram"><img src="${D.ig(n)}" alt="" loading="lazy"></a>`).join("");

  /* ---------- Editorial parallax ---------- */
  const pars = $$("[data-par]");
  const parFrame = () => {
    pars.forEach((im) => {
      const r = im.parentElement.getBoundingClientRect();
      const c = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      im.style.transform = `translate3d(0, ${(c * 6 * Number(im.dataset.par)).toFixed(2)}%, 0)`;
    });
    requestAnimationFrame(parFrame);
  };
  if (!reduce) parFrame();

  U.watchAll();
})();
