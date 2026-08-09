/**
 * Generate premium dark casino SVG atmosphere artworks for GGLBET home v2.
 * Brand: #ec008c pink, #716ae7 violet, #0a0b0d black, #16181d surface
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "home", "v2");

const PINK = "#ec008c";
const VIOLET = "#716ae7";
const BLACK = "#0a0b0d";
const SURFACE = "#16181d";

fs.mkdirSync(OUT, { recursive: true });

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function defsBlock(id, w, h, seed) {
  const rnd = mulberry32(seed);
  const g1 = `${id}-bg`;
  const g2 = `${id}-glow-p`;
  const g3 = `${id}-glow-v`;
  const g4 = `${id}-radial`;
  const g5 = `${id}-shine`;
  const g6 = `${id}-chip`;
  const n1 = `${id}-noise`;
  const f1 = `${id}-blur`;
  const f2 = `${id}-soft`;

  const cx1 = lerp(0.15, 0.85, rnd());
  const cy1 = lerp(0.1, 0.7, rnd());
  const cx2 = lerp(0.1, 0.9, rnd());
  const cy2 = lerp(0.2, 0.9, rnd());

  return `
  <defs>
    <linearGradient id="${g1}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BLACK}"/>
      <stop offset="${(25 + rnd() * 30).toFixed(1)}%" stop-color="${SURFACE}"/>
      <stop offset="100%" stop-color="${BLACK}"/>
    </linearGradient>
    <radialGradient id="${g2}" cx="${(cx1 * 100).toFixed(1)}%" cy="${(cy1 * 100).toFixed(1)}%" r="55%">
      <stop offset="0%" stop-color="${PINK}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${PINK}" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="${PINK}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${g3}" cx="${(cx2 * 100).toFixed(1)}%" cy="${(cy2 * 100).toFixed(1)}%" r="60%">
      <stop offset="0%" stop-color="${VIOLET}" stop-opacity="0.5"/>
      <stop offset="50%" stop-color="${VIOLET}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${VIOLET}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${g4}" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1c1f28" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="${SURFACE}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${BLACK}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${g5}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="40%" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="${g6}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${PINK}" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="${VIOLET}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${PINK}" stop-opacity="0.4"/>
    </linearGradient>
    <filter id="${f1}" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="${(18 + rnd() * 22).toFixed(1)}"/>
    </filter>
    <filter id="${f2}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="${(4 + rnd() * 6).toFixed(1)}"/>
    </filter>
    <pattern id="${n1}" width="80" height="80" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="18" r="0.8" fill="#fff" opacity="0.04"/>
      <circle cx="48" cy="32" r="0.6" fill="#fff" opacity="0.03"/>
      <circle cx="64" cy="58" r="0.7" fill="${PINK}" opacity="0.05"/>
      <circle cx="28" cy="62" r="0.5" fill="${VIOLET}" opacity="0.04"/>
    </pattern>
  </defs>`;
}

function chip(cx, cy, r, stroke, opacity = 0.35) {
  const inner = r * 0.72;
  const notches = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(a) * (r * 0.88);
    const y1 = cy + Math.sin(a) * (r * 0.88);
    return `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="${(r * 0.08).toFixed(1)}" fill="${stroke}" opacity="${opacity * 0.7}"/>`;
  }).join("");
  return `
  <g opacity="${opacity}">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${(r * 0.08).toFixed(1)}"/>
    <circle cx="${cx}" cy="${cy}" r="${inner}" fill="none" stroke="${stroke}" stroke-width="${(r * 0.035).toFixed(1)}" opacity="0.7"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.45}" fill="none" stroke="${stroke}" stroke-width="1" opacity="0.5"/>
    ${notches}
  </g>`;
}

function ringArc(cx, cy, r, startDeg, sweep, stroke, sw = 2, opacity = 0.4) {
  const toRad = (d) => (d * Math.PI) / 180;
  const s = toRad(startDeg);
  const e = toRad(startDeg + sweep);
  const x1 = cx + Math.cos(s) * r;
  const y1 = cy + Math.sin(s) * r;
  const x2 = cx + Math.cos(e) * r;
  const y2 = cy + Math.sin(e) * r;
  const large = Math.abs(sweep) > 180 ? 1 : 0;
  const sweepFlag = sweep >= 0 ? 1 : 0;
  return `<path d="M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} ${sweepFlag} ${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" opacity="${opacity}"/>`;
}

function orb(cx, cy, r, fill, filterId, opacity = 0.7) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" filter="url(#${filterId})" opacity="${opacity}"/>`;
}

function diamond(cx, cy, s, stroke, opacity = 0.25) {
  const h = s * 0.6;
  return `<path d="M ${cx} ${cy - s} L ${cx + h} ${cy} L ${cx} ${cy + s} L ${cx - h} ${cy} Z" fill="none" stroke="${stroke}" stroke-width="1.2" opacity="${opacity}"/>`;
}

function cardCorner(x, y, w, h, stroke, opacity = 0.2) {
  return `
  <g opacity="${opacity}">
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${stroke}" stroke-width="1.5"/>
    <path d="M ${x + 12} ${y + 18} L ${x + 22} ${y + 28} L ${x + 12} ${y + 38} L ${x + 2} ${y + 28} Z" fill="${stroke}" opacity="0.35"/>
  </g>`;
}

function wordmark(x, y, size, opacity, fill = "#ffffff") {
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="Segoe UI, Helvetica Neue, Arial, sans-serif" font-size="${size}" font-weight="700" letter-spacing="${(size * 0.28).toFixed(1)}" opacity="${opacity}" text-anchor="middle">GGLBET</text>`;
}

function gridLines(w, h, rnd, stroke, opacity = 0.06) {
  const lines = [];
  const step = 80 + Math.floor(rnd() * 40);
  for (let x = step; x < w; x += step) {
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${stroke}" stroke-width="1" opacity="${opacity}"/>`);
  }
  for (let y = step; y < h; y += step) {
    lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${stroke}" stroke-width="1" opacity="${opacity * 0.8}"/>`);
  }
  return lines.join("\n");
}

/**
 * Build a unique SVG composition based on motif key and dimensions.
 */
function buildSvg(name, w, h, motif) {
  const id = name.replace(/[^a-z0-9]/gi, "");
  const seed = hash(name + motif + `${w}x${h}`);
  const rnd = mulberry32(seed);
  const defs = defsBlock(id, w, h, seed);

  const layers = [];
  // Base
  layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-bg)"/>`);
  layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-radial)"/>`);
  layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-glow-p)"/>`);
  layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-glow-v)"/>`);
  layers.push(`<rect width="${w}" height="${h}" fill="url(#${id}-noise)"/>`);
  layers.push(gridLines(w, h, rnd, "#ffffff", 0.035 + rnd() * 0.025));

  // Soft light orbs
  const orbCount = 3 + Math.floor(rnd() * 3);
  for (let i = 0; i < orbCount; i++) {
    const ox = rnd() * w;
    const oy = rnd() * h;
    const or = 80 + rnd() * Math.min(w, h) * 0.28;
    const fill = i % 2 === 0 ? PINK : VIOLET;
    layers.push(orb(ox.toFixed(1), oy.toFixed(1), or.toFixed(1), fill, `${id}-blur`, 0.25 + rnd() * 0.25));
  }

  // Motif-specific geometry
  const mx = w * (0.35 + rnd() * 0.3);
  const my = h * (0.35 + rnd() * 0.3);
  const baseR = Math.min(w, h) * (0.18 + rnd() * 0.18);

  switch (motif) {
    case "cinematic": {
      // Wide horizon glow + stacked arcs
      layers.push(`<ellipse cx="${w * 0.5}" cy="${h * 0.78}" rx="${w * 0.55}" ry="${h * 0.18}" fill="${PINK}" filter="url(#${id}-blur)" opacity="0.22"/>`);
      layers.push(`<ellipse cx="${w * 0.72}" cy="${h * 0.35}" rx="${w * 0.28}" ry="${h * 0.32}" fill="${VIOLET}" filter="url(#${id}-blur)" opacity="0.28"/>`);
      for (let i = 0; i < 5; i++) {
        layers.push(ringArc(w * 0.5, h * 0.55, baseR + i * 55, -40 + i * 8, 220 - i * 15, i % 2 ? PINK : VIOLET, 1.5 + i * 0.3, 0.22 + i * 0.04));
      }
      layers.push(chip(w * 0.18, h * 0.62, 70, PINK, 0.4));
      layers.push(chip(w * 0.82, h * 0.28, 55, VIOLET, 0.35));
      layers.push(chip(w * 0.88, h * 0.72, 40, PINK, 0.28));
      layers.push(`<rect width="${w}" height="${h * 0.35}" fill="url(#${id}-shine)"/>`);
      break;
    }
    case "stage": {
      // Portrait spotlight stage
      layers.push(`<ellipse cx="${w * 0.5}" cy="${h * 0.42}" rx="${w * 0.38}" ry="${h * 0.22}" fill="${VIOLET}" filter="url(#${id}-blur)" opacity="0.35"/>`);
      layers.push(`<ellipse cx="${w * 0.5}" cy="${h * 0.85}" rx="${w * 0.42}" ry="${h * 0.12}" fill="${PINK}" filter="url(#${id}-blur)" opacity="0.3"/>`);
      for (let i = 0; i < 6; i++) {
        layers.push(ringArc(w * 0.5, h * 0.48, 90 + i * 42, 200, 140, i % 2 ? PINK : VIOLET, 2, 0.2 + i * 0.05));
      }
      layers.push(chip(w * 0.5, h * 0.48, 78, "#ffffff", 0.25));
      layers.push(chip(w * 0.22, h * 0.72, 48, PINK, 0.4));
      layers.push(chip(w * 0.78, h * 0.68, 42, VIOLET, 0.38));
      layers.push(diamond(w * 0.5, h * 0.28, 36, PINK, 0.35));
      break;
    }
    case "chips": {
      const positions = [
        [0.22, 0.35], [0.55, 0.28], [0.78, 0.45], [0.35, 0.68], [0.68, 0.72], [0.48, 0.5],
      ];
      positions.forEach(([px, py], i) => {
        layers.push(chip(w * px, h * py, 35 + rnd() * 45, i % 2 ? PINK : VIOLET, 0.28 + rnd() * 0.25));
      });
      layers.push(ringArc(mx, my, baseR * 1.4, rnd() * 60, 240, PINK, 2.5, 0.35));
      layers.push(ringArc(mx, my, baseR * 1.7, 120 + rnd() * 40, 200, VIOLET, 1.8, 0.3));
      break;
    }
    case "rings": {
      for (let i = 0; i < 8; i++) {
        layers.push(ringArc(mx, my, baseR * 0.5 + i * (baseR * 0.22), i * 35, 160 + rnd() * 80, i % 2 ? PINK : VIOLET, 1.5 + (i % 3), 0.18 + i * 0.04));
      }
      layers.push(chip(mx, my, baseR * 0.35, "#fff", 0.3));
      layers.push(diamond(w * 0.2, h * 0.25, 28, VIOLET, 0.3));
      layers.push(diamond(w * 0.8, h * 0.7, 32, PINK, 0.28));
      break;
    }
    case "cards": {
      layers.push(cardCorner(w * 0.12, h * 0.18, w * 0.22, h * 0.42, PINK, 0.35));
      layers.push(cardCorner(w * 0.28, h * 0.28, w * 0.22, h * 0.42, VIOLET, 0.3));
      layers.push(cardCorner(w * 0.55, h * 0.22, w * 0.24, h * 0.45, PINK, 0.25));
      layers.push(chip(w * 0.78, h * 0.7, 55, VIOLET, 0.4));
      layers.push(ringArc(w * 0.4, h * 0.55, baseR, -20, 200, PINK, 2, 0.3));
      break;
    }
    case "columns": {
      for (let i = 0; i < 5; i++) {
        const x = w * (0.12 + i * 0.18);
        layers.push(`<rect x="${x - 8}" y="${h * 0.15}" width="16" height="${h * 0.7}" rx="4" fill="url(#${id}-chip)" opacity="${0.12 + i * 0.03}"/>`);
        layers.push(ringArc(x, h * 0.5, 40 + i * 8, -90, 180, i % 2 ? PINK : VIOLET, 2, 0.35));
      }
      layers.push(chip(w * 0.5, h * 0.5, 60, "#fff", 0.22));
      break;
    }
    case "hex": {
      const hex = (cx, cy, r, stroke, op) => {
        const pts = Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`;
        }).join(" ");
        return `<polygon points="${pts}" fill="none" stroke="${stroke}" stroke-width="1.5" opacity="${op}"/>`;
      };
      for (let i = 0; i < 5; i++) {
        layers.push(hex(mx, my, baseR * 0.4 + i * 28, i % 2 ? PINK : VIOLET, 0.25 + i * 0.05));
      }
      layers.push(chip(w * 0.75, h * 0.3, 45, PINK, 0.35));
      layers.push(chip(w * 0.2, h * 0.7, 50, VIOLET, 0.32));
      break;
    }
    case "wave": {
      const wavePath = (amp, freq, y0, phase) => {
        let d = `M 0 ${y0}`;
        for (let x = 0; x <= w; x += 20) {
          const y = y0 + Math.sin((x / w) * Math.PI * freq + phase) * amp;
          d += ` L ${x} ${y.toFixed(1)}`;
        }
        return d;
      };
      for (let i = 0; i < 4; i++) {
        layers.push(`<path d="${wavePath(30 + i * 12, 2 + i * 0.5, h * (0.35 + i * 0.12), i)}" fill="none" stroke="${i % 2 ? PINK : VIOLET}" stroke-width="2" opacity="${0.25 + i * 0.05}"/>`);
      }
      layers.push(chip(w * 0.15, h * 0.25, 40, PINK, 0.35));
      layers.push(chip(w * 0.85, h * 0.75, 55, VIOLET, 0.35));
      layers.push(ringArc(w * 0.5, h * 0.5, baseR, 0, 270, PINK, 2, 0.3));
      break;
    }
    case "spotlight": {
      layers.push(`<path d="M ${w * 0.5} 0 L ${w * 0.15} ${h} L ${w * 0.85} ${h} Z" fill="${PINK}" filter="url(#${id}-blur)" opacity="0.15"/>`);
      layers.push(`<path d="M ${w * 0.35} 0 L ${w * 0.05} ${h} L ${w * 0.55} ${h} Z" fill="${VIOLET}" filter="url(#${id}-blur)" opacity="0.12"/>`);
      layers.push(chip(w * 0.5, h * 0.55, 70, "#fff", 0.28));
      for (let i = 0; i < 4; i++) {
        layers.push(ringArc(w * 0.5, h * 0.55, 100 + i * 40, -60, 120, i % 2 ? PINK : VIOLET, 2, 0.3));
      }
      break;
    }
    case "constellation": {
      const pts = Array.from({ length: 12 }, () => [rnd() * w, rnd() * h]);
      pts.forEach(([x, y], i) => {
        layers.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${3 + rnd() * 4}" fill="${i % 2 ? PINK : VIOLET}" opacity="0.55"/>`);
        if (i > 0) {
          const [px, py] = pts[i - 1];
          layers.push(`<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#fff" stroke-width="1" opacity="0.12"/>`);
        }
      });
      layers.push(chip(w * 0.5, h * 0.5, 50, VIOLET, 0.3));
      layers.push(ringArc(w * 0.3, h * 0.35, 80, 20, 200, PINK, 1.5, 0.28));
      break;
    }
    case "vault": {
      layers.push(ringArc(w * 0.5, h * 0.5, baseR * 1.2, 0, 360, VIOLET, 3, 0.35));
      layers.push(ringArc(w * 0.5, h * 0.5, baseR * 0.9, 15, 330, PINK, 2, 0.4));
      layers.push(chip(w * 0.5, h * 0.5, baseR * 0.55, "#fff", 0.35));
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        layers.push(`<line x1="${(w * 0.5 + Math.cos(a) * baseR * 0.55).toFixed(1)}" y1="${(h * 0.5 + Math.sin(a) * baseR * 0.55).toFixed(1)}" x2="${(w * 0.5 + Math.cos(a) * baseR * 1.1).toFixed(1)}" y2="${(h * 0.5 + Math.sin(a) * baseR * 1.1).toFixed(1)}" stroke="${PINK}" stroke-width="2" opacity="0.3"/>`);
      }
      layers.push(diamond(w * 0.18, h * 0.2, 24, VIOLET, 0.3));
      layers.push(diamond(w * 0.82, h * 0.78, 28, PINK, 0.3));
      break;
    }
    case "ladder": {
      for (let i = 0; i < 6; i++) {
        const y = h * (0.2 + i * 0.12);
        layers.push(`<line x1="${w * 0.2}" y1="${y}" x2="${w * 0.8}" y2="${y}" stroke="${i % 2 ? PINK : VIOLET}" stroke-width="2" opacity="${0.2 + i * 0.06}"/>`);
        layers.push(chip(w * (0.25 + (i % 3) * 0.25), y, 22 + i * 3, i % 2 ? VIOLET : PINK, 0.35));
      }
      layers.push(ringArc(w * 0.5, h * 0.5, baseR, -30, 240, "#fff", 1.5, 0.2));
      break;
    }
    case "portal": {
      layers.push(`<ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.22}" ry="${h * 0.32}" fill="none" stroke="url(#${id}-chip)" stroke-width="4" opacity="0.6"/>`);
      for (let i = 0; i < 5; i++) {
        layers.push(`<ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * (0.12 + i * 0.06)}" ry="${h * (0.18 + i * 0.08)}" fill="none" stroke="${i % 2 ? PINK : VIOLET}" stroke-width="1.5" opacity="${0.4 - i * 0.05}"/>`);
      }
      layers.push(chip(w * 0.5, h * 0.5, 40, "#fff", 0.3));
      layers.push(orb(w * 0.5, h * 0.5, 60, PINK, `${id}-soft`, 0.4));
      break;
    }
    case "bars": {
      for (let i = 0; i < 8; i++) {
        const bh = h * (0.2 + rnd() * 0.5);
        const x = w * (0.12 + i * 0.1);
        layers.push(`<rect x="${x}" y="${h - bh - h * 0.12}" width="${w * 0.055}" height="${bh}" rx="6" fill="${i % 2 ? PINK : VIOLET}" opacity="${0.15 + rnd() * 0.2}" filter="url(#${id}-soft)"/>`);
      }
      layers.push(ringArc(w * 0.5, h * 0.4, baseR, 0, 280, VIOLET, 2, 0.3));
      layers.push(chip(w * 0.85, h * 0.25, 40, PINK, 0.35));
      break;
    }
    case "fan": {
      for (let i = 0; i < 9; i++) {
        const a = -70 + i * 17;
        const rad = (a * Math.PI) / 180;
        const x2 = w * 0.5 + Math.cos(rad) * baseR * 2.2;
        const y2 = h * 0.75 + Math.sin(rad) * baseR * 2.2;
        layers.push(`<line x1="${w * 0.5}" y1="${h * 0.75}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${i % 2 ? PINK : VIOLET}" stroke-width="2" opacity="0.28"/>`);
      }
      layers.push(chip(w * 0.5, h * 0.75, 48, "#fff", 0.35));
      layers.push(ringArc(w * 0.5, h * 0.75, baseR * 1.5, -80, 160, PINK, 2.5, 0.35));
      break;
    }
    case "mesh": {
      for (let i = 0; i < 6; i++) {
        layers.push(ringArc(w * (0.25 + (i % 3) * 0.25), h * (0.3 + Math.floor(i / 3) * 0.35), 60 + i * 10, i * 40, 220, i % 2 ? PINK : VIOLET, 1.5, 0.28));
      }
      layers.push(chip(w * 0.5, h * 0.5, 55, PINK, 0.35));
      layers.push(diamond(w * 0.15, h * 0.5, 30, VIOLET, 0.3));
      layers.push(diamond(w * 0.85, h * 0.5, 30, PINK, 0.3));
      break;
    }
    default: {
      layers.push(chip(mx, my, baseR * 0.6, PINK, 0.4));
      layers.push(ringArc(mx, my, baseR, 0, 250, VIOLET, 2, 0.35));
      layers.push(ringArc(mx, my, baseR * 1.3, 80, 200, PINK, 1.5, 0.28));
      layers.push(diamond(w * 0.2, h * 0.3, 30, VIOLET, 0.3));
    }
  }

  // Accent floating chips
  layers.push(chip(w * (0.08 + rnd() * 0.1), h * (0.1 + rnd() * 0.2), 22 + rnd() * 18, VIOLET, 0.25));
  layers.push(chip(w * (0.82 + rnd() * 0.1), h * (0.75 + rnd() * 0.15), 18 + rnd() * 20, PINK, 0.22));

  // Subtle brand wordmark
  const wmSize = Math.max(18, Math.min(w, h) * 0.045);
  layers.push(wordmark(w * 0.5, h * (0.88 + rnd() * 0.05), wmSize, 0.12 + rnd() * 0.08, "#ffffff"));
  if (rnd() > 0.4) {
    layers.push(wordmark(w * (0.2 + rnd() * 0.15), h * (0.12 + rnd() * 0.1), wmSize * 0.55, 0.06, PINK));
  }

  // Top sheen
  layers.push(`<rect width="${w}" height="${h * 0.4}" fill="url(#${id}-shine)" opacity="0.8"/>`);

  // Edge vignette via dark rects with gradient simulation
  layers.push(`<rect width="${w}" height="${h}" fill="none" stroke="${BLACK}" stroke-width="${Math.max(40, w * 0.04)}" opacity="0.45"/>`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="GGLBET ${esc(name)} atmosphere">
${defs}
  ${layers.join("\n  ")}
</svg>
`;
}

const FILES = [
  { name: "hero-atmosphere", w: 1920, h: 1080, motif: "cinematic" },
  { name: "hero-stage", w: 900, h: 1000, motif: "stage" },
  { name: "about", w: 1200, h: 675, motif: "rings" },
  { name: "why-choose", w: 1200, h: 675, motif: "hex" },
  { name: "trending", w: 1200, h: 675, motif: "wave" },
  { name: "providers", w: 1200, h: 675, motif: "columns" },
  { name: "promotions", w: 1200, h: 675, motif: "spotlight" },
  { name: "categories", w: 1200, h: 675, motif: "mesh" },
  { name: "winners", w: 1200, h: 675, motif: "fan" },
  { name: "payments", w: 1200, h: 675, motif: "vault" },
  { name: "register", w: 1200, h: 675, motif: "portal" },
  { name: "login", w: 1200, h: 675, motif: "cards" },
  { name: "download", w: 1200, h: 675, motif: "ladder" },
  { name: "deposit", w: 1200, h: 675, motif: "chips" },
  { name: "withdraw", w: 1200, h: 675, motif: "bars" },
  { name: "vip", w: 1200, h: 675, motif: "constellation" },
  { name: "referral", w: 1200, h: 675, motif: "mesh" },
  { name: "responsible", w: 1200, h: 675, motif: "rings" },
  { name: "news", w: 1200, h: 675, motif: "columns" },
  { name: "guides", w: 1200, h: 675, motif: "cards" },
  { name: "trust", w: 1200, h: 675, motif: "vault" },
  { name: "support", w: 1200, h: 675, motif: "hex" },
  { name: "statistics", w: 1200, h: 675, motif: "bars" },
  { name: "new-games", w: 1200, h: 675, motif: "wave" },
  { name: "features", w: 1200, h: 675, motif: "constellation" },
  { name: "faq", w: 1200, h: 675, motif: "portal" },
  { name: "hub", w: 1200, h: 675, motif: "fan" },
  { name: "final-cta", w: 1200, h: 675, motif: "spotlight" },
  { name: "slots", w: 1200, h: 675, motif: "columns" },
  { name: "live", w: 1200, h: 675, motif: "stage" },
  { name: "sports", w: 1200, h: 675, motif: "fan" },
  { name: "fishing", w: 1200, h: 675, motif: "wave" },
  { name: "lottery", w: 1200, h: 675, motif: "chips" },
];

// Ensure unique seeds even when motif repeats by using name in hash (already done)

let written = 0;
for (const f of FILES) {
  const svg = buildSvg(f.name, f.w, f.h, f.motif);
  const outPath = path.join(OUT, `${f.name}.svg`);
  fs.writeFileSync(outPath, svg, "utf8");
  written++;
  console.log(`wrote ${f.name}.svg (${Buffer.byteLength(svg, "utf8")} bytes)`);
}

console.log(`\nDone. ${written} files -> ${OUT}`);
