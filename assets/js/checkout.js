(function () {
  const D = window.ACHAR_DATA, S = window.ACHAR_STORE, U = window.ACHAR_UI;
  const { $, $$, esc } = U;
  let step = 0, promo = 0, sealed = -1;
  const ship = { inside: { label: "Inside Dhaka", eta: "1–2 days", fee: 70 }, outside: { label: "Outside Dhaka", eta: "3–5 days", fee: 130 }, express: { label: "Same-day, Dhaka only", eta: "Today, if ordered before 2pm", fee: 150 } };
  let shipKey = "inside";

  $("[data-dist]").innerHTML = D.districts.map((d) => `<option>${d}</option>`).join("");
  const isDhaka = () => ["Dhaka", "Gazipur", "Narayanganj"].includes($("[data-dist]").value);
  function paintShip() {
    const keys = isDhaka() ? ["inside", "express"] : ["outside"];
    if (!keys.includes(shipKey)) shipKey = keys[0];
    $("[data-ship]").innerHTML = keys.map((k) => `<label class="co__opt"><input type="radio" name="ship" value="${k}" ${k === shipKey ? "checked" : ""}><span><b>${ship[k].label}</b><small>${ship[k].eta}</small></span><span class="amt">${S.tk(ship[k].fee)}</span></label>`).join("");
    totals();
  }
  $("[data-dist]").addEventListener("change", paintShip);
  $("[data-ship]").addEventListener("change", (e) => { shipKey = e.target.value; totals(); });
  $("[data-gift]").addEventListener("change", (e) => ($("[data-giftnote]").hidden = !e.target.checked));
  $("[data-brands-ssl]").innerHTML = U.payBadges(["bkash", "nagad", "rocket", "visa", "mc", "amex"]);
  $("[data-badge-ssl]").innerHTML = U.payBadges(["ssl"]);
  $("[data-badge-cod]").innerHTML = U.payBadges(["cod"]);
  $("[data-pay]").addEventListener("change", (e) => ($("[data-cardnote]").hidden = e.target.value !== "ssl"));
  let paidWith = "";

  /* ---------- SSLCOMMERZ gateway preview (visual only, never processes anything) ---------- */
  function gateway() {
    const amt = S.tk(grand());
    const banks = ["City Bank", "Dutch-Bangla", "BRAC Bank", "Eastern Bank", "Islami Bank", "Prime Bank"];
    U.openModal(`<div class="gw">
      <div class="gw__bar"><span class="gw__logo"><svg width="14" height="16" viewBox="0 0 10 12" aria-hidden="true"><rect x="1" y="5" width="8" height="7" rx="1.5" fill="#fff"/><path d="M3 5V3.5a2 2 0 0 1 4 0V5" fill="none" stroke="#fff" stroke-width="1.4"/></svg>SSL<b>COMMERZ</b></span><span class="gw__sand">Sandbox preview</span></div>
      <div class="gw__warn"><svg viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17v.01"/></svg><span><b>DEMO — no real payment.</b> This screen imitates a payment page for the pitch. It is not connected to SSLCOMMERZ. Do not enter real card, PIN or OTP details.</span></div>
      <div class="gw__merchant"><span class="gw__m">${U.jar()}</span><span><b>ACHAR</b><small>achar.wear · Order total</small></span><span class="gw__amt">${amt}</span></div>
      <div class="gw__tabs" role="tablist"><button role="tab" aria-selected="true" data-gt="mobile">Mobile banking</button><button role="tab" aria-selected="false" data-gt="card">Cards</button><button role="tab" aria-selected="false" data-gt="net">Net banking</button></div>
      <div class="gw__pane" data-gp="mobile"><div class="gw__grid">${["bkash", "nagad", "rocket", "upay"].map((k) => `<button class="gw__m-opt" data-gm="${k}" aria-pressed="false">${U.payBadges([k])}</button>`).join("")}</div></div>
      <div class="gw__pane" data-gp="card" hidden>
        <div class="gw__grid gw__grid--cards">${U.payBadges(["visa", "mc", "amex", "nexus"])}</div>
        <div class="gw__card">
          <div class="fld"><label>Card number</label><input class="inp" disabled placeholder="Disabled in demo"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div class="fld"><label>Expiry</label><input class="inp" disabled placeholder="MM/YY"></div><div class="fld"><label>CVC</label><input class="inp" disabled placeholder="•••"></div></div>
          <p class="t-small">Card fields are switched off in this demo.</p>
        </div>
      </div>
      <div class="gw__pane" data-gp="net" hidden><div class="gw__grid gw__grid--banks">${banks.map((b) => `<button class="gw__m-opt" data-gm="${b}" aria-pressed="false">${b}</button>`).join("")}</div><p class="t-small" style="margin-top:10px">Sample bank list.</p></div>
      <p class="err" data-gerr style="margin:0 22px"></p>
      <div class="gw__foot"><button class="btn btn--ghost" data-gcancel>Cancel</button><button class="btn gw__pay" data-gpay>Pay ${amt} · demo</button></div>
      <p class="gw__fine">Secured by SSLCOMMERZ on the live site · This preview processes nothing</p>
    </div>`);
    const box = $(".gw");
    let tab = "mobile", method = null;
    box.addEventListener("click", (e) => {
      const t = e.target.closest("[data-gt]");
      if (t) { tab = t.dataset.gt; method = tab === "card" ? "Card" : null; $$("[data-gt]", box).forEach((x) => x.setAttribute("aria-selected", x === t)); $$("[data-gp]", box).forEach((p) => (p.hidden = p.dataset.gp !== tab)); $("[data-gerr]").textContent = ""; }
      const m = e.target.closest("[data-gm]");
      if (m) { method = m.dataset.gm; $$("[data-gm]", box).forEach((x) => x.setAttribute("aria-pressed", x === m)); $("[data-gerr]").textContent = ""; }
      if (e.target.closest("[data-gcancel]")) U.closeModal();
      const pay = e.target.closest("[data-gpay]");
      if (pay) {
        if (!method) { $("[data-gerr]").textContent = tab === "mobile" ? "Choose a wallet to continue." : "Choose a bank to continue."; return; }
        pay.disabled = true;
        pay.innerHTML = `<span class="gw__spin"></span>Processing (demo)`;
        setTimeout(() => {
          box.innerHTML = `<div class="gw__ok"><span class="gw__tick"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><b>Payment approved</b><p class="t-small">Demo result. No money moved.</p></div>`;
          paidWith = { bkash: "bKash", nagad: "Nagad", rocket: "Rocket", upay: "upay" }[method] || method;
          setTimeout(() => { U.closeModal(); printLabel(); }, 1300);
        }, 1600);
      }
    });
  }

  const fee = () => (S.subtotal() >= 4000 && shipKey === "inside" ? 0 : ship[shipKey].fee);
  const grand = () => Math.max(0, S.subtotal() - Math.round(S.subtotal() * promo) + (step >= 1 ? fee() : 0));

  function lines() {
    const ls = S.bag();
    $("[data-sum-lines]").innerHTML = ls.length ? ls.map((l) => `<div class="co__sl"><span class="co__thumb">${U.shirt(l.p)}<i>${l.qty}</i></span><span>${esc(l.p.cat === "shirts" ? l.p.colour + " Linen Shirt" : l.p.name)}<small>Size ${esc(l.size)}</small></span><span>${S.tk(l.p.price * l.qty)}</span></div>`).join("") : `<p style="color:var(--grey)">Empty</p>`;
    $("[data-co-lines]").innerHTML = ls.length
      ? ls.map((l) => {
          const k = l.id + "|" + l.size;
          return `<div class="bag-line" style="grid-template-columns:110px 1fr"><a class="bag-line__img" href="${U.url(l.p)}" style="width:110px">${U.shirt(l.p)}</a><div><div class="bag-line__top"><h4>${esc(l.p.cat === "shirts" ? l.p.colour + " Boxy Linen Shirt" : l.p.name)}</h4>${U.priceTag({ ...l.p, price: l.p.price * l.qty, was: l.p.was ? l.p.was * l.qty : null })}</div><p class="meta">Size ${esc(l.size)}</p><div class="bag-line__ctl"><div class="qty" role="group" aria-label="Quantity"><button data-q="-1" data-k="${k}" aria-label="Decrease">−</button><output>${l.qty}</output><button data-q="1" data-k="${k}" aria-label="Increase">+</button></div><button class="remove" data-rm="${k}">Remove</button></div></div></div>`;
        }).join("")
      : `<div class="empty">${U.jarOutline}<p class="t-h3">Your bag is empty</p><a class="btn" href="shop.html">Shop Recipe 01</a></div>`;
    $("[data-step='0'] [data-next]").disabled = !ls.length;
  }
  function totals() {
    const sub = S.subtotal();
    const off = Math.round(sub * promo);
    const f = fee();
    $("[data-sum-totals]").innerHTML = `<div><span>Subtotal</span><span>${S.tk(sub)}</span></div>
      ${S.savings() ? `<div class="save"><span>Puja saving included</span><span>${S.tk(S.savings())}</span></div>` : ""}
      ${off ? `<div class="save"><span>GETPICKLED</span><span>−${S.tk(off)}</span></div>` : ""}
      <div><span>Delivery</span><span>${step >= 1 ? (f ? S.tk(f) : "Free") : "Next step"}</span></div>
      <div class="grand"><span>Total</span><span>${S.tk(grand())}</span></div>`;
    $("[data-place-total]").textContent = S.tk(grand());
  }
  S.on(() => { lines(); totals(); });

  $("[data-promo]").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = $("[data-promo-in]").value.trim().toUpperCase();
    if (v === "GETPICKLED") { promo = 0.1; $("[data-promo-msg]").textContent = "Applied: 10% off (demo code)"; $("[data-promo-msg]").style.color = "var(--sale)"; }
    else { promo = 0; $("[data-promo-msg]").textContent = v ? `“${v}” isn't a valid code. Check the spelling.` : "Enter a code first."; $("[data-promo-msg]").style.color = ""; }
    totals();
  });

  function go(n) {
    sealed = Math.max(sealed, n - 1);
    step = n;
    $$("[data-step]").forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    $$("[data-st]").forEach((li) => { const i = Number(li.dataset.st); li.classList.toggle("is-done", i < n); li.classList.toggle("is-live", i === n); li.setAttribute("aria-current", i === n ? "step" : "false"); });
    totals();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function validAddr() {
    let ok = true;
    const req = [["#f-name", null, (v) => v.trim().length > 1], ["#f-phone", "phone", (v) => /^01[3-9]\d{8}$/.test(v.replace(/[\s-]/g, ""))], ["#f-addr", "addr", (v) => v.trim().length > 8]];
    req.forEach(([sel, key, test]) => {
      const el = $(sel), good = test(el.value);
      el.classList.toggle("is-bad", !good);
      if (key) $(`[data-e="${key}"]`).textContent = good ? "" : key === "phone" ? "Use an 11-digit Bangladeshi number, e.g. 017XXXXXXXX." : "Add house, road and area so the rider can find you.";
      if (!good) ok = false;
    });
    if (!ok) $(".is-bad").focus();
    return ok;
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-next]")) { if (step === 1 && !validAddr()) return; go(step + 1); }
    if (e.target.closest("[data-back]")) go(step - 1);
    if (e.target.closest("[data-place]")) {
      if (!$("[data-terms]").checked) { $('[data-e="terms"]').textContent = "Tick the box to agree to the exchange policy."; return; }
      $('[data-e="terms"]').textContent = "";
      if ($('input[name="pay"]:checked').value === "ssl") gateway(); else printLabel();
    }
    const st = e.target.closest("[data-st]");
    if (st && Number(st.dataset.st) <= sealed && step < 3) go(Number(st.dataset.st));
  });

  function printLabel() {
    const code = "ACH-" + Date.now().toString(36).toUpperCase().slice(-7);
    const pay = $('input[name="pay"]:checked').value;
    const payTxt = pay === "cod" ? `Cash on delivery · ${S.tk(grand())}` : `Paid via SSLCOMMERZ · ${esc(paidWith)} (demo)`;
    const items = S.bag();
    const n = S.count();
    const gift = $("[data-gift]").checked;
    const first = $("#f-name").value.trim().split(" ")[0];
    $("[data-done]").innerHTML = `
      <div>
        <p class="t-cap" style="color:var(--grey)">Order confirmed</p>
        <h2 class="t-hero co__done-h" style="margin-top:14px">Thank you,<br>${esc(first)}</h2>
        <p class="co__done-p">Your shirt is being folded into its kraft box. We'll send an SMS when it's on the road. <span class="t-small">(Demo: no order was placed and nothing was charged.)</span></p>
        <div class="co__actions" style="justify-content:flex-start;gap:10px;margin-top:0"><a class="btn" href="account.html">Track order</a><button class="btn btn--ghost" data-print>Print slip</button><a class="link" href="index.html">Keep shopping</a></div>
      </div>
      <div class="slip">
        <div class="slip__top"><span class="brand">${U.jar()}<span class="brand__word" style="font-size:13px">ACHAR</span></span><span class="slip__code">${code}</span></div>
        <div class="slip__items">${items.map((l) => `<span title="${esc(U.title(l.p))}, ${esc(l.size)}">${U.shirt(l.p)}</span>`).join("")}</div>
        <div class="slip__grid">
          <div><small>Ship to</small>${esc($("#f-name").value)}<br>${esc($("#f-phone").value)}<br>${esc($("#f-addr").value)}, ${esc($("[data-dist]").value)}</div>
          <div><small>Delivery</small>${esc(ship[shipKey].label)}<br>${esc(ship[shipKey].eta)}</div>
          <div><small>Pieces</small>${n}</div>
          <div><small>Payment</small>${gift && pay !== "cod" ? "Gift · nothing to collect" : payTxt}</div>
          ${gift ? `<div style="grid-column:1/-1"><small>Gift note</small>${esc($("#f-note").value || "—")}</div>` : ""}
        </div>
        <div class="slip__total"><span class="t-small">Total · delivery ${fee() ? S.tk(fee()) : "free"}</span><b>${S.tk(grand())}</b></div>
        ${U.barcode(code, 38)}
      </div>`;
    $("[data-print]").addEventListener("click", () => window.print());
    $("[data-co]").classList.add("is-done");
    S.clear();
    go(3);
  }

  paintShip(); lines(); totals(); go(0);
})();
