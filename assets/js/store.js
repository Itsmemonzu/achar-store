/* Front-end only state: bag + wishlist in localStorage. Nothing is sent anywhere. */
window.ACHAR_STORE = (function () {
  const KEY_BAG = "achar.bag.v1";
  const KEY_WISH = "achar.wish.v1";
  const listeners = new Set();

  const read = (k, d) => {
    try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; }
  };
  const write = (k, v) => {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked: keep in memory */ }
  };

  let bag = read(KEY_BAG, []);
  let wish = read(KEY_WISH, []);

  const byId = (id) => window.ACHAR_DATA.products.find((p) => p.id === id);
  const emit = (type, detail) => {
    write(KEY_BAG, bag);
    write(KEY_WISH, wish);
    listeners.forEach((fn) => fn(type, detail || {}));
  };

  return {
    on(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    product: byId,
    bag: () => bag.map((l) => ({ ...l, p: byId(l.id) })).filter((l) => l.p),
    count: () => bag.reduce((n, l) => n + l.qty, 0),
    subtotal: () => bag.reduce((s, l) => s + (byId(l.id)?.price || 0) * l.qty, 0),
    savings: () => bag.reduce((s, l) => { const p = byId(l.id); return s + (p && p.was ? (p.was - p.price) * l.qty : 0); }, 0),
    add(id, size, qty = 1) {
      const line = bag.find((l) => l.id === id && l.size === size);
      if (line) line.qty = Math.min(9, line.qty + qty);
      else bag.push({ id, size, qty });
      emit("add", { id, size });
    },
    setQty(id, size, qty) {
      const line = bag.find((l) => l.id === id && l.size === size);
      if (!line) return;
      if (qty <= 0) bag = bag.filter((l) => l !== line);
      else line.qty = Math.min(9, qty);
      emit("qty", { id, size });
    },
    remove(id, size) { bag = bag.filter((l) => !(l.id === id && l.size === size)); emit("remove", { id, size }); },
    clear() { bag = []; emit("clear"); },
    wish: () => wish.slice(),
    isWished: (id) => wish.includes(id),
    toggleWish(id) {
      wish = wish.includes(id) ? wish.filter((w) => w !== id) : [...wish, id];
      const on = wish.includes(id);
      emit("wish", { id, on });
      return on;
    },
    tk: (n) => "৳" + Number(n).toLocaleString("en-IN"),
  };
})();
