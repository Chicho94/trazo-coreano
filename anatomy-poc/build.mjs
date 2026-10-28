import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "file:///C:/Users/cesid/.agents/skills/anatomy/kit/iso-kit.mjs";
import { kitScript } from "file:///C:/Users/cesid/.agents/skills/anatomy/scripts/inline-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DIST = join(HERE, "..", "dist");
const theme = process.argv.includes("--dark") ? "dark" : "light";
const WIDTH = 640;
const HEIGHT = 410;

const BASE = { x: -132, y: -76, w: 264, d: 152, r: 10 };
const MOULD = { x: 6, y: -18, w: 48, d: 48, r: 5 };
const CON_START = [-92, -4, 11];
const CON_END = [15, -4, 11];
const VOWEL_START = [30, 62, 11];
const VOWEL_END = [30, 5, 11];
const PLATEN_START = [30, 6, 92];
const PLATEN_END = [30, 6, 49];

const P = k.fitProjection(
  [...k.boxCorners(BASE, -16, 118), [-140, -84, -16], [140, 84, 118]],
  WIDTH,
  HEIGHT,
  { pad: 34, azimuth: 47, elevation: 31 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (path, style) => k.lineSvg(path, style);
const D = (points, style) => k.dotsSvg(points, style);
const slab = (plan, z, h, tone = "mid", extra = {}) => S(k.slabOf(plan, z, h, P, Math.max(2, Math.round(plan.r || 2)), extra.bevel ?? 0.7), { tone, crease: extra.crease, lit: extra.lit, inner: extra.inner });
const textOn = (point, value, options = {}) => k.faceTextSvg(k.topMatrix(point, options.z ?? point[2], P, options.axis || "x"), value, { size: options.size || 8, tone: options.tone || "hi", anchor: "middle" });
const moveFromTo = (from, to) => k.translateAlong(P, [to[0] - from[0], to[1] - from[1], to[2] - from[2]]);

function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -16, 14, P)}"/>`];
  for (const [x, y] of k.corners(BASE, 20).sort((a, b) => k.depthOf([a[0], a[1], -16], P) - k.depthOf([b[0], b[1], -16], P))) {
    out.push(slab({ x: x - 7, y: y - 7, w: 14, d: 14, r: 3 }, -16, 5, "lo"));
  }
  out.push(slab(BASE, -11, 11, "mid", { bevel: 1.6 }));
  out.push(slab(k.insetPlan(BASE, 3), 0, 3, "mid", { bevel: 1 }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 7), 3, P), { tone: "lo" }));
  const screws = k.corners(BASE, 12);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 3, P, 18)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 3])), { size: 0.5, tone: "mid" }));

  const leftRule = { x: -112, y: -48, w: 104, d: 8, r: 1 };
  const backRule = { x: 74, y: 4, w: 8, d: 58, r: 1 };
  out.push(slab(leftRule, 3, 1, "lo", { crease: "none" }));
  out.push(slab(backRule, 3, 1, "lo", { crease: "none" }));
  const leftTicks = k.topTicks(-108, -12, 4, 5, leftRule.y + 1, 4, [2, 4], P);
  out.push(L(leftTicks.minor, { tone: "lo" }), L(leftTicks.major, { tone: "mid" }));
  const label = { x: -117, y: 47, w: 58, d: 17, r: 3 };
  out.push(slab(label, 3, 1.2, "lo", { crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 2), 4.2, P), { tone: "faint" }));
  out.push(textOn([label.x + label.w / 2, label.y + label.d / 2, 4.3], "HGL-01", { size: 3.2, tone: "mid" }));
  return out.join("");
}

function frame() {
  const out = [];
  const posts = [[-4,-30],[66,-30],[-4,42],[66,42]];
  posts.sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P)).forEach(([x, y]) => {
    out.push(slab({ x: x - 6, y: y - 6, w: 12, d: 12, r: 2 }, 3, 5, "mid"));
    out.push(slab({ x: x - 3, y: y - 3, w: 6, d: 6, r: 1.2 }, 8, 92, "mid", { crease: "none" }));
    out.push(D([at([x, y, 101])], { size: 0.5, tone: "mid" }));
  });
  out.push(slab({ x: -7, y: -34, w: 76, d: 8, r: 2 }, 100, 8, "mid"));
  out.push(slab({ x: -7, y: 38, w: 76, d: 8, r: 2 }, 100, 8, "mid"));
  out.push(slab({ x: -7, y: -26, w: 8, d: 64, r: 2 }, 100, 8, "mid"));
  out.push(slab({ x: 61, y: -26, w: 8, d: 64, r: 2 }, 100, 8, "mid"));
  out.push(slab({ x: 25, y: -20, w: 5, d: 52, r: 1.2 }, 52, 52, "mid", { crease: "none" }));
  out.push(slab({ x: 36, y: -20, w: 5, d: 52, r: 1.2 }, 52, 52, "mid", { crease: "none" }));
  out.push(slab({ x: 16, y: -12, w: 34, d: 36, r: 4 }, 94, 8, "hi"));
  return out.join("");
}

function rails() {
  const out = [];
  for (const y of [-18, 10]) out.push(slab({ x: -112, y, w: 111, d: 5, r: 1 }, 3, 4, "mid"));
  for (const x of [-112, -4]) out.push(slab({ x, y: -22, w: 5, d: 41, r: 1 }, 3, 10, "mid"));
  for (const x of [17, 46]) out.push(slab({ x, y: 27, w: 5, d: 43, r: 1 }, 3, 4, "mid"));
  for (const y of [27, 66]) out.push(slab({ x: 13, y, w: 42, d: 5, r: 1 }, 3, 10, "mid"));
  return out.join("");
}

function carriage(kind) {
  const isCon = kind === "consonant";
  const start = isCon ? CON_START : VOWEL_START;
  const plan = { x: start[0] - 18, y: start[1] - 17, w: 36, d: 34, r: 4 };
  const out = [slab(plan, 7, 5, "mid")];
  for (const [dx, dy] of [[-13,-12],[13,-12],[-13,12],[13,12]]) {
    out.push(slab({ x: start[0] + dx - 3, y: start[1] + dy - 3, w: 6, d: 6, r: 1 }, 3, 5, "lo"));
  }
  const tile = { x: start[0] - 12, y: start[1] - 12, w: 24, d: 24, r: 3 };
  out.push(slab(tile, 12, 7, "hi", { bevel: 1.1 }));
  const initial = isCon ? "ㅅ" : "ㅏ";
  const part = isCon ? "consonant-glyph" : "vowel-glyph";
  out.push(textOn([start[0], start[1], 19.2], initial, { size: 11, tone: "hi" }).replace("<text", `<text data-part="${part}"`));
  const handle = isCon
    ? { x: plan.x - 9, y: start[1] - 7, w: 9, d: 14, r: 2 }
    : { x: start[0] - 7, y: plan.y + plan.d, w: 14, d: 9, r: 2 };
  out.push(slab(handle, 8, 6, "mid"));
  return out.join("");
}

function mould() {
  const out = [];
  out.push(slab(MOULD, 3, 8, "mid", { bevel: 1.2 }));
  out.push(slab(k.insetPlan(MOULD, 6), 11, 3, "lo", { crease: "none" }));
  for (const [x, y] of k.corners(MOULD, 7)) {
    out.push(slab({ x: x - 3, y: y - 3, w: 6, d: 6, r: 1 }, 11, 4, "mid"));
  }
  const output = { x: MOULD.x + 10, y: MOULD.y + 10, w: 28, d: 28, r: 4 };
  out.push(`<g data-part="output" data-move="${k.translateAlong(P, [0, -30, 0])}" opacity="0.16">${slab(output, 14, 6, "hi", { lit: true, bevel: 1.2 })}${textOn([output.x + 14, output.y + 14, 20.2], "사", { size: 13, tone: "lit" }).replace("<text", '<text data-part="output-glyph"')}</g>`);
  return out.join("");
}

function platen() {
  const out = [];
  out.push(slab({ x: 17, y: -8, w: 28, d: 28, r: 4 }, PLATEN_START[2] - 8, 8, "hi"));
  out.push(slab({ x: 21, y: -4, w: 20, d: 20, r: 3 }, PLATEN_START[2] - 14, 6, "hi", { lit: true }));
  out.push(L(k.planOutline({ x: 24, y: -1, w: 14, d: 14, r: 2 }, PLATEN_START[2] - 14, P), { tone: "lo" }));
  return out.join("");
}

function controls() {
  const out = [];
  const box = { x: 83, y: -57, w: 35, d: 45, r: 5 };
  out.push(slab(box, 3, 17, "mid", { bevel: 1 }));
  out.push(slab(k.insetPlan(box, 3), 20, 2, "hi"));
  [0,1,2].forEach((index) => out.push(slab({ x: box.x + 7 + index * 9, y: box.y + 9, w: 6, d: 8, r: 1.5 }, 22, 3, index === 0 ? "hi" : "lo")));
  out.push(slab({ x: box.x + 9, y: box.y + 27, w: 17, d: 11, r: 3 }, 22, 4, "hi"));
  return out.join("");
}

const conMove = moveFromTo(CON_START, CON_END);
const vowelMove = moveFromTo(VOWEL_START, VOWEL_END);
const platenMove = moveFromTo(PLATEN_START, PLATEN_END);

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label: "Una prensa tipográfica isométrica. Una consonante entra por la izquierda y una vocal desde el fondo; el cabezal las reúne en un molde que muestra la sílaba resultante.",
  body: [
    base(), rails(), frame(),
    `<g data-part="consonant" data-move="${conMove}">${carriage("consonant")}</g>`,
    `<g data-part="vowel" data-move="${vowelMove}">${carriage("vowel")}</g>`,
    mould(), controls(),
    `<g data-part="platen" data-move="${platenMove}">${platen()}</g>`,
  ],
});

const live = `
const stage = document.querySelector('.iso-stage');
const consonant = stage.querySelector('[data-part="consonant"]');
const vowel = stage.querySelector('[data-part="vowel"]');
const platen = stage.querySelector('[data-part="platen"]');
const output = stage.querySelector('[data-part="output"]');
const conGlyph = stage.querySelector('[data-part="consonant-glyph"]');
const vowelGlyph = stage.querySelector('[data-part="vowel-glyph"]');
const outputGlyph = stage.querySelector('[data-part="output-glyph"]');
const readout = document.querySelector('[data-readout]');
const examples = {
  sa: { c:'ㅅ', v:'ㅏ', result:'사' },
  ga: { c:'ㄱ', v:'ㅏ', result:'가' },
  na: { c:'ㄴ', v:'ㅏ', result:'나' }
};
const still = matchMedia('(prefers-reduced-motion: reduce)');
let value = 0, target = 0, frame = 0, last = 0, visible = false, touring = !still.matches, clock = 0, current = examples.sa;
const matrixAt = (raw, share) => {
  if (!raw || share <= 0) return '';
  const match = raw.match(/translate\\(([-.0-9]+) ([-.0-9]+)\\)/);
  if (!match) return '';
  return 'translate(' + (Number(match[1]) * share).toFixed(2) + ' ' + (Number(match[2]) * share).toFixed(2) + ')';
};
function apply() {
  const feed = Math.min(1, value / 0.72);
  const press = Math.max(0, (value - 0.68) / 0.32);
  const eject = Math.max(0, Math.min(1, (value - 0.84) / 0.16));
  consonant.setAttribute('transform', matrixAt(consonant.dataset.move, feed));
  vowel.setAttribute('transform', matrixAt(vowel.dataset.move, feed));
  platen.setAttribute('transform', matrixAt(platen.dataset.move, press));
  output.setAttribute('transform', matrixAt(output.dataset.move, eject));
  output.setAttribute('opacity', String(0.16 + press * 0.84));
  const phase = value < 0.08 ? 'piezas separadas' : value < 0.68 ? 'alineando letras' : value < 0.96 ? 'componiendo bloque' : current.result + ' · sílaba lista';
  readout.textContent = phase;
  stage.setAttribute('aria-valuenow', String(Math.round(value * 100)));
  stage.setAttribute('aria-valuetext', current.c + ' más ' + current.v + ': ' + phase);
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (touring) {
    clock += dt;
    const cycle = clock % 5.8;
    target = cycle < 1.2 ? 0 : cycle < 3.8 ? 1 : 0;
  }
  value = still.matches ? target : value + (target - value) * (1 - Math.exp(-dt / 0.34));
  if (Math.abs(target - value) < 0.001) value = target;
  apply();
  const settled = !touring && value === target;
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const steer = (next) => { touring = false; target = next; run(); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin:'120px 0px' }).observe(stage);
stage.addEventListener('click', () => steer(target > 0.5 ? 0 : 1));
stage.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Enter' || event.key === 'ArrowRight' || event.key === 'ArrowUp') { event.preventDefault(); steer(1); }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'Home' || event.key === 'Escape') { event.preventDefault(); steer(0); }
  if (event.key === 'End') { event.preventDefault(); steer(1); }
});
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-example]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  current = examples[button.dataset.example];
  conGlyph.textContent = current.c;
  vowelGlyph.textContent = current.v;
  outputGlyph.textContent = current.result;
  value = 0; target = 1; touring = false; apply(); run();
}));
document.querySelector('[data-compose]').addEventListener('click', () => steer(target > 0.5 ? 0 : 1));
apply();
`;

const selector = `<div class="poc-intro"><a class="back-link" href="index.html">← Volver a Trazo</a><span class="poc-kicker">LABORATORIO VISUAL</span><h1>¿Puede una máquina explicar el Hangul?</h1><p>Elige una combinación y observa cómo dos piezas se convierten en una sola sílaba.</p><div class="poc-actions" role="group" aria-label="Elegir ejemplo"><button data-example="sa" aria-pressed="true">ㅅ + ㅏ</button><button data-example="ga" aria-pressed="false">ㄱ + ㅏ</button><button data-example="na" aria-pressed="false">ㄴ + ㅏ</button><button class="compose" data-compose>Componer</button></div></div>`;

const plate = k.plateHtml({
  fig: "Fig 1",
  title: "Compositor de Hangul",
  hint: "Pulsa la máquina o usa ← →",
  readout: "piezas separadas",
  keys: [
    { mark: "raised", label: "Dos carros alimentan el molde desde ejes distintos" },
    { mark: "lit", label: "El cabezal confirma la sílaba compuesta" },
  ],
  caption: "La consonante inicial y la vocal no se escriben en una línea: se acomodan dentro de un bloque silábico. Esta prensa convierte esa regla abstracta en un movimiento físico.",
  body: `<div class="iso-stage" tabindex="0" role="slider" aria-label="Compositor de Hangul: usa las flechas o pulsa para unir y separar las letras" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">${svg}</div>`,
});

const extraCss = `
.iso-page{width:min(860px,100% - 28px);margin:28px auto 80px}
.poc-intro{max-width:680px;margin:0 auto 34px;text-align:center}
.back-link{display:inline-flex;margin-bottom:28px;color:var(--anatomy-text);text-decoration:none;font-weight:650}
.poc-kicker{display:block;color:#0047a0;font:750 11px/1.2 var(--anatomy-mono);letter-spacing:.18em}
.poc-intro h1{margin:12px 0 10px;color:var(--anatomy-strong);font-size:clamp(30px,6vw,52px);line-height:1.02;letter-spacing:-.045em}
.poc-intro p{margin:0 auto;max-width:540px;font-size:16px}
.poc-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:22px}
.poc-actions button{border:1px solid var(--anatomy-faint);border-radius:10px;background:var(--anatomy-card);color:var(--anatomy-strong);padding:10px 15px;font:700 15px/1.2 system-ui;cursor:pointer;box-shadow:var(--anatomy-lift);transition:transform .18s var(--anatomy-ease),border-color .18s ease,background .18s ease}
.poc-actions button:hover{border-color:var(--anatomy-mid)}
.poc-actions button:active{transform:scale(.97)}
.poc-actions button[aria-pressed="true"]{border-color:#0047a0;background:#eef4ff;color:#002f6c}
.poc-actions .compose{background:#0047a0;color:white;border-color:#0047a0}
.iso-stage{cursor:pointer;touch-action:pan-y;outline:none}
.iso-stage:focus-visible{outline:2px solid #0047a0;outline-offset:6px;border-radius:14px}
@media(max-width:520px){.iso-page{width:min(100% - 16px,860px);margin-top:18px}.poc-intro{padding:0 8px}.iso-plate{overflow:hidden}.iso-stage{width:112%;margin-left:-6%}.poc-actions .compose{flex-basis:100%}}
@media(prefers-reduced-motion:reduce){.poc-actions button{transition:none}}
`;

const filename = theme === "dark" ? "laboratorio-anatomy-oscuro.html" : "laboratorio-anatomy.html";
const themeLink = theme === "dark"
  ? `<p class="theme-note"><a href="laboratorio-anatomy.html">Ver versión clara</a></p>`
  : `<p class="theme-note"><a href="laboratorio-anatomy-oscuro.html">Ver versión oscura</a></p>`;
let html = k.pageHtml({ title: "Laboratorio Anatomy — Trazo", theme, width: 860, body: selector + plate + themeLink, script: kitScript() + live });
html = html.replace("</style>", `${extraCss}.theme-note{text-align:center;margin-top:24px}.theme-note a{color:var(--anatomy-text)}</style>`).replace('<html lang="en">','<html lang="es">');
writeFileSync(join(DIST, filename), html);
console.log("wrote", filename);
