/**
 * Procedurally generates the app icon, Android adaptive icon and splash image
 * as PNGs (pure Node, no native canvas needed). Run: npm run generate:assets
 *
 * Design: deep-space navy disc, cyan planet with glow, two neon orbit
 * ellipses with satellite dots — matching the in-app "Orbit Emblem".
 */
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

// ---- Minimal PNG encoder (truecolor + alpha, 8-bit) ----
function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let crc = -1;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePNG(width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter: none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- Drawing helpers ----
const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

function blend(px, i, r, g, b, a) {
  const inv = 1 - a;
  px[i] = Math.round(r * a + px[i] * inv);
  px[i + 1] = Math.round(g * a + px[i + 1] * inv);
  px[i + 2] = Math.round(b * a + px[i + 2] * inv);
  px[i + 3] = Math.max(px[i + 3], Math.round(a * 255));
}

/** Signed distance to an ellipse ring (approximate, good enough for icons). */
function ellipseRingDist(x, y, rx, ry, angle) {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  const u = x * cos + y * sin;
  const v = -x * sin + y * cos;
  const d = Math.sqrt((u / rx) ** 2 + (v / ry) ** 2);
  return Math.abs(d - 1) * Math.min(rx, ry);
}

function render(size, { transparentBg }) {
  const px = Buffer.alloc(size * size * 4);
  const c = size / 2;
  const planetR = size * 0.17;
  const glowR = size * 0.34;
  const ringA = { rx: size * 0.34, ry: size * 0.13, angle: -0.5 };
  const ringB = { rx: size * 0.43, ry: size * 0.165, angle: 0.55 };
  const ringWidth = size * 0.008;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const dx = x - c;
      const dy = y - c;
      const r = Math.sqrt(dx * dx + dy * dy);

      // Background: radial navy gradient (or transparent for adaptive icon fg)
      if (!transparentBg) {
        const t = clamp01(r / c);
        px[i] = Math.round(lerp(10, 3, t));
        px[i + 1] = Math.round(lerp(17, 6, t));
        px[i + 2] = Math.round(lerp(40, 22, t));
        px[i + 3] = 255;
        // Sparse starfield from a hash
        const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
        const star = h - Math.floor(h);
        if (star > 0.9985) {
          const s = (star - 0.9985) / 0.0015;
          blend(px, i, 220, 240, 255, 0.35 + 0.5 * s);
        }
      }

      // Planet glow halo
      if (r < glowR) {
        const a = (1 - r / glowR) ** 2.2 * 0.55;
        blend(px, i, 34, 211, 238, a);
      }

      // Planet disc with simple top-left shading
      if (r < planetR) {
        const shade = clamp01(0.55 + (-dx - dy) / (2.2 * planetR));
        const rr = lerp(8, 60, shade);
        const gg = lerp(50, 200, shade);
        const bb = lerp(100, 235, shade);
        blend(px, i, rr, gg, bb, 1);
        // Rim light
        if (r > planetR * 0.86) blend(px, i, 103, 232, 249, 0.5 * ((r - planetR * 0.86) / (planetR * 0.14)));
      }

      // Orbit ring A (cyan) and B (violet), each with a satellite dot
      const dA = ellipseRingDist(dx, dy, ringA.rx, ringA.ry, ringA.angle);
      if (dA < ringWidth * 2.5) blend(px, i, 34, 211, 238, clamp01(1 - dA / (ringWidth * 2.5)) * 0.85);
      const dB = ellipseRingDist(dx, dy, ringB.rx, ringB.ry, ringB.angle);
      if (dB < ringWidth * 2.5) blend(px, i, 167, 139, 250, clamp01(1 - dB / (ringWidth * 2.5)) * 0.7);
    }
  }

  // Satellite dots on the rings
  const dots = [
    { angle: 0.9, ring: ringA, color: [103, 232, 249], rad: size * 0.028 },
    { angle: 3.6, ring: ringB, color: [196, 181, 253], rad: size * 0.024 },
  ];
  for (const dot of dots) {
    const cos = Math.cos(dot.ring.angle), sin = Math.sin(dot.ring.angle);
    const u = dot.ring.rx * Math.cos(dot.angle);
    const v = dot.ring.ry * Math.sin(dot.angle);
    const dotX = c + u * cos - v * sin;
    const dotY = c + u * sin + v * cos;
    const R = dot.rad * 2.6;
    for (let y = Math.max(0, Math.floor(dotY - R)); y < Math.min(size, dotY + R); y++) {
      for (let x = Math.max(0, Math.floor(dotX - R)); x < Math.min(size, dotX + R); x++) {
        const d = Math.sqrt((x - dotX) ** 2 + (y - dotY) ** 2);
        const i = (y * size + x) * 4;
        if (d < dot.rad) blend(px, i, dot.color[0], dot.color[1], dot.color[2], 1);
        else if (d < R) blend(px, i, dot.color[0], dot.color[1], dot.color[2], (1 - (d - dot.rad) / (R - dot.rad)) * 0.45);
      }
    }
  }

  return encodePNG(size, size, px);
}

const outDir = path.join(__dirname, "..", "assets");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "icon.png"), render(1024, { transparentBg: false }));
fs.writeFileSync(path.join(outDir, "adaptive-icon.png"), render(1024, { transparentBg: true }));
fs.writeFileSync(path.join(outDir, "splash.png"), render(1024, { transparentBg: false }));
console.log("Generated assets/icon.png, assets/adaptive-icon.png, assets/splash.png");
