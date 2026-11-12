/* Legacy authored SVG shirt illustration (unused by the Northline catalogue, kept for reference).
   One drawing, recoloured per product. Views: "front", "back". */
window.NL_SHIRT = (function () {
  let n = 0;
  const lum = (hex) => {
    const h = hex.replace("#", "");
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const mirror = (d) => d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${(400 - Number(x)).toFixed(1)},${y}`);

  const BODY = "M165,46 L88,62 L84,72 L92,152 L96,402 C140,428 260,428 304,402 L308,152 L316,72 L312,62 L235,46 Q200,60 165,46 Z";
  const SLEEVE_L = "M90,62 L54,82 Q40,90 38,108 L22,328 Q21,339 31,341 L63,346 Q73,347 74,337 L93,172 Z";
  const SLEEVE_R = mirror(SLEEVE_L);
  const CUFF_L = "M24,306 Q46,312 70,318";
  const CUFF_R = mirror(CUFF_L);

  function svg(hex, view = "front", cls = "") {
    const id = "s" + ++n;
    const dark = lum(hex) < 0.32;
    const front = view === "front";
    const buttons = front ? [98, 150, 202, 254, 306, 358].map((y) => `<circle class="btn-dot" cx="200" cy="${y}" r="4.2"/><circle cx="200" cy="${y}" r="1.1" fill="rgba(0,0,0,.25)"/>`).join("") : "";
    return `<svg class="shirt ${dark ? "is-dark" : ""} ${cls}" viewBox="0 0 400 460" style="--c:${hex}" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="${id}x" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".2" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <linearGradient id="${id}y" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".10"/></linearGradient>
    <filter id="${id}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="2.2 .14" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
    <filter id="${id}b"><feGaussianBlur stdDeviation="7"/></filter>
    <filter id="${id}s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
    <clipPath id="${id}c"><path d="${BODY}"/><path d="${SLEEVE_L}"/><path d="${SLEEVE_R}"/></clipPath>
  </defs>
  <ellipse cx="200" cy="436" rx="150" ry="12" fill="#000" opacity=".10" filter="url(#${id}s)"/>
  <g>
    <path class="body" d="${SLEEVE_L}"/><path class="body" d="${SLEEVE_R}"/>
    <path class="body" d="${BODY}"/>
  </g>
  <g clip-path="url(#${id}c)">
    <rect x="0" y="0" width="400" height="460" fill="url(#${id}x)"/>
    <rect x="0" y="0" width="400" height="460" fill="url(#${id}y)"/>
    <rect x="0" y="0" width="400" height="460" fill="#000" filter="url(#${id}n)" opacity=".38"/>
    <g filter="url(#${id}b)" fill="none" stroke-linecap="round">
      <path d="M128,180 Q142,290 126,398" stroke="#000" stroke-opacity=".08" stroke-width="14"/>
      <path d="M268,200 Q256,300 274,396" stroke="#000" stroke-opacity=".06" stroke-width="12"/>
      <path d="M150,130 Q170,160 166,230" stroke="#fff" stroke-opacity=".12" stroke-width="10"/>
      <path d="M46,140 Q40,230 34,300" stroke="#000" stroke-opacity=".08" stroke-width="10"/>
      <path d="M354,140 Q360,230 366,300" stroke="#000" stroke-opacity=".08" stroke-width="10"/>
      <path d="M92,154 L86,190" stroke="#000" stroke-opacity=".14" stroke-width="8"/>
      <path d="M308,154 L314,190" stroke="#000" stroke-opacity=".14" stroke-width="8"/>
    </g>
  </g>
  <path class="seam" d="M88,62 L92,152"/><path class="seam" d="M312,62 L308,152"/>
  <path class="seam" d="${CUFF_L}"/><path class="seam" d="${CUFF_R}"/>
  <path class="stitch" d="M98,396 C142,421 258,421 302,396"/>
  ${front ? `
  <path class="body" d="M163,44 Q200,30 237,44 L233,54 Q200,44 167,54 Z"/>
  <path d="M163,44 Q200,30 237,44 L233,54 Q200,44 167,54 Z" fill="#000" opacity=".14"/>
  <rect class="tag-w" x="189" y="45" width="22" height="11" rx="1.5"/>
  <path class="tag-ink" d="M197.6,47 h4.8 v1.2 h-.6 v.7 h.5 a1.1 1.1 0 0 1 1.1 1.1 v3.3 a1.1 1.1 0 0 1 -1.1 1.1 h-4.6 a1.1 1.1 0 0 1 -1.1 -1.1 v-3.3 a1.1 1.1 0 0 1 1.1 -1.1 h.5 v-.7 h-.6 Z"/>
  <path class="body" d="M191,70 L209,70 L209,418 Q200,421 191,418 Z"/>
  <path class="seam" d="M191,74 L191,417"/><path class="seam" d="M209,74 L209,417"/>
  <path class="stitch" d="M194,78 L194,415"/><path class="stitch" d="M206,78 L206,415"/>
  ${buttons}
  <path class="body" d="M232,132 L276,132 L276,180 L254,188 L232,180 Z"/>
  <path d="M232,132 L276,132 L276,180 L254,188 L232,180 Z" fill="#000" opacity=".05"/>
  <path class="seam" d="M232,132 L276,132 L276,180 L254,188 L232,180 Z"/>
  <path class="stitch" d="M232,138 L276,138"/>
  <path class="body" d="M200,72 L166,50 L159,59 L172,104 Q187,89 200,74 Z"/>
  <path class="body" d="M200,72 L234,50 L241,59 L228,104 Q213,89 200,74 Z"/>
  <path d="M200,72 L166,50 L159,59 L172,104 Q187,89 200,74 Z" fill="url(#${id}y)"/>
  <path d="M200,72 L234,50 L241,59 L228,104 Q213,89 200,74 Z" fill="url(#${id}y)"/>
  <path class="seam" d="M200,72 L166,50 L159,59 L172,104 Q187,89 200,74 Z"/>
  <path class="seam" d="M200,72 L234,50 L241,59 L228,104 Q213,89 200,74 Z"/>
  <path d="M172,104 Q187,89 200,74 Q213,89 228,104" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3" filter="url(#${id}b)"/>
  ` : `
  <path class="body" d="M158,46 Q200,34 242,46 L244,66 Q200,76 156,66 Z"/>
  <path d="M158,46 Q200,34 242,46 L244,66 Q200,76 156,66 Z" fill="url(#${id}y)"/>
  <path class="seam" d="M158,46 Q200,34 242,46 L244,66 Q200,76 156,66 Z"/>
  <path class="stitch" d="M160,61 Q200,70 240,61"/>
  <path class="seam" d="M86,106 Q200,116 314,106"/>
  <path class="stitch" d="M88,111 Q200,121 312,111"/>
  <path class="seam" d="M193,112 L191,170"/><path class="seam" d="M207,112 L209,170"/>
  <path d="M193,112 L191,170" stroke="#000" stroke-opacity=".08" stroke-width="5" filter="url(#${id}b)"/>
  `}
</svg>`;
  }
  return { svg, lum };
})();
