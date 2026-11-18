/* ==========================================================================
   ¿Así lo recuerdas? — Escenas ilustradas
   Cada escena se dibuja en SVG (viewBox 1600×1000) en dos versiones:
   · 'ai'   → la reconstrucción de la IA (contiene las tres diferencias)
   · 'real' → el recuerdo tal como lo describe quien lo vivió
   Ambas comparten la misma geometría para poder compararlas píxel a píxel.
   ========================================================================== */
(function (global) {
  'use strict';

  let UID = 0;
  const W = 1600, H = 1000;

  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  const f = (n) => Math.round(n * 10) / 10;

  function wrap(u, mode, defs, body, opts) {
    opts = opts || {};
    const par = opts.fit === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet';
    const ab = mode === 'ai' && opts.aberration !== false;
    const common = `
      <filter id="${u}-ab" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
        <feOffset in="r" dx="2.2" dy="0" result="r2"/>
        <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/>
        <feBlend in="r2" in2="gb" mode="screen"/>
      </filter>
      <radialGradient id="${u}-vig" cx="50%" cy="50%" r="72%">
        <stop offset="55%" stop-color="#000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".55"/>
      </radialGradient>
      <filter id="${u}-b3" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>
      <filter id="${u}-b8" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="${u}-b20" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="20"/></filter>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="${par}" data-uid="${u}" data-mode="${mode}" role="img" aria-label="${opts.label || ''}" focusable="false"><defs>${common}${defs}</defs><g${ab ? ` filter="url(#${u}-ab)"` : ''}>${body}<rect width="${W}" height="${H}" fill="url(#${u}-vig)" pointer-events="none"/></g></svg>`;
  }

  /* ======================================================================
     CASO 01 · LO QUE PERMANECE EN LA MESA
     ====================================================================== */
  function dinner(mode, opts) {
    const ai = mode === 'ai';
    const u = 'sc' + (++UID);

    const defs = `
      <linearGradient id="${u}-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#24180f"/><stop offset=".55" stop-color="#3d2b1f"/><stop offset="1" stop-color="#33241a"/>
      </linearGradient>
      <linearGradient id="${u}-floor" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a1c13"/><stop offset="1" stop-color="#0f0906"/>
      </linearGradient>
      <radialGradient id="${u}-lamp" cx="820" cy="330" r="780" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffd9a3" stop-opacity=".6"/>
        <stop offset=".32" stop-color="#e9a868" stop-opacity=".24"/>
        <stop offset="1" stop-color="#e9a868" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${u}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a2741"/><stop offset=".5" stop-color="#46506a"/>
        <stop offset=".82" stop-color="#b98a6c"/><stop offset="1" stop-color="#d69b72"/>
      </linearGradient>
      <linearGradient id="${u}-table" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#8d6442"/><stop offset="1" stop-color="#5c3d27"/>
      </linearGradient>
      <linearGradient id="${u}-skin" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#99705a"/><stop offset=".6" stop-color="#d2a382"/><stop offset="1" stop-color="#e4bb96"/>
      </linearGradient>
      <linearGradient id="${u}-paint" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#9dbbd2"/><stop offset=".55" stop-color="#e7d6a8"/><stop offset=".56" stop-color="#9aa860"/><stop offset="1" stop-color="#6f8545"/>
      </linearGradient>
      <radialGradient id="${u}-cool" cx="235" cy="330" r="460" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#a6bedc" stop-opacity=".22"/><stop offset="1" stop-color="#a6bedc" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${u}-flame" cx="50%" cy="60%" r="50%">
        <stop offset="0" stop-color="#fff6d6"/><stop offset=".5" stop-color="#ffc861"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/>
      </radialGradient>
      <clipPath id="${u}-glass"><rect x="108" y="158" width="254" height="344"/></clipPath>
      <pattern id="${u}-wp" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M28 6 q7 11 0 22 q-7 11 0 22" stroke="#6a4c36" stroke-opacity=".22" fill="none" stroke-width="2"/>
        <circle cx="0" cy="28" r="2.4" fill="#6a4c36" fill-opacity=".18"/><circle cx="56" cy="28" r="2.4" fill="#6a4c36" fill-opacity=".18"/>
      </pattern>
      <pattern id="${u}-lace" width="22" height="22" patternUnits="userSpaceOnUse">
        <rect width="22" height="22" fill="#f1e9db"/><circle cx="11" cy="11" r="5" fill="none" stroke="#cbbca2" stroke-width="1.6"/><circle cx="0" cy="0" r="2" fill="#cbbca2"/>
      </pattern>`;

    // ---- Room ----
    let b = `
      <rect width="${W}" height="640" fill="url(#${u}-wall)"/>
      <rect width="${W}" height="560" fill="url(#${u}-wp)"/>
      <rect y="560" width="${W}" height="80" fill="#2c1e15"/>
      <rect y="556" width="${W}" height="6" fill="#5d4331"/>
      <rect y="640" width="${W}" height="360" fill="url(#${u}-floor)"/>
      <ellipse cx="900" cy="905" rx="660" ry="110" fill="#4f2a22" opacity=".55"/>
      <ellipse cx="900" cy="905" rx="610" ry="92" fill="none" stroke="#a77653" stroke-opacity=".25" stroke-width="5" stroke-dasharray="14 10"/>`;

    // ---- Window (real) / decorated wall (AI) ----
    if (!ai) {
      const towers = [[112, 40, 330], [160, 30, 250], [196, 46, 300], [248, 26, 210], [282, 44, 360], [330, 34, 280]];
      let tw = '';
      towers.forEach((t, i) => {
        tw += `<rect x="${t[0]}" y="${t[2]}" width="${t[1]}" height="${520 - t[2]}" fill="#1c2236" opacity=".92"/>`;
        for (let k = 0; k < 6; k++) {
          tw += `<rect x="${t[0] + 6 + (k % 2) * 14}" y="${t[2] + 14 + k * 26}" width="5" height="7" fill="#e7b77c" opacity="${(i + k) % 3 === 0 ? 0.85 : 0.18}"/>`;
        }
      });
      tw += `<rect x="160" y="276" width="140" height="5" fill="#2b3350"/><line x1="261" y1="210" x2="261" y2="168" stroke="#2b3350" stroke-width="3"/>`;
      b += `
      <g class="window">
        <rect x="50" y="110" width="372" height="9" fill="#24170f"/>
        <rect x="90" y="140" width="290" height="380" fill="#4a3323"/>
        <rect x="108" y="158" width="254" height="344" fill="url(#${u}-sky)"/>
        <g clip-path="url(#${u}-glass)">
          <circle cx="160" cy="200" r="1.6" fill="#fff" opacity=".7"/><circle cx="300" cy="186" r="1.3" fill="#fff" opacity=".6"/><circle cx="226" cy="230" r="1.1" fill="#fff" opacity=".5"/>
          ${tw}
        </g>
        <rect x="232" y="158" width="7" height="344" fill="#4a3323"/>
        <rect x="108" y="318" width="254" height="7" fill="#4a3323"/>
        <rect x="80" y="512" width="310" height="18" fill="#5c412f"/>
        <path d="M58 118 L132 118 C118 250 142 380 118 545 L58 545 Z" fill="#6c4434"/>
        <path d="M78 130 C74 260 86 400 80 540 M100 128 C96 260 108 400 102 542" stroke="#4f2f24" stroke-width="3" fill="none" opacity=".7"/>
        <path d="M338 118 L412 118 L412 545 L352 545 C328 380 352 250 338 118 Z" fill="#6c4434"/>
        <path d="M368 128 C364 260 376 400 370 542 M392 130 C388 260 398 400 394 540" stroke="#4f2f24" stroke-width="3" fill="none" opacity=".7"/>
        <rect x="0" y="0" width="760" height="1000" fill="url(#${u}-cool)"/>
        <path d="M108 502 L362 502 L520 980 L-60 980 Z" fill="#a6bedc" opacity=".05"/>
      </g>`;
    } else {
      b += `
      <g class="painting">
        <rect x="126" y="196" width="228" height="278" fill="#b48d55"/>
        <rect x="132" y="202" width="216" height="266" fill="none" stroke="#e5c98a" stroke-width="3" opacity=".7"/>
        <rect x="146" y="216" width="188" height="238" fill="url(#${u}-paint)"/>
        <circle cx="282" cy="270" r="20" fill="#fbe7b0"/>
        <path d="M146 360 Q200 330 250 352 T334 342 L334 380 L146 380 Z" fill="#7d9150"/>
        <path d="M200 420 L204 360 M204 362 m-26 0 a26 22 0 1 0 52 0 a26 22 0 1 0 -52 0" fill="#4f6b3a" stroke="#4a3426" stroke-width="5"/>
        <rect x="126" y="196" width="228" height="278" fill="none" stroke="#7c5a2f" stroke-width="2"/>
        <path d="M86 300 l18 0 l-6 28 l-6 0 Z" fill="#c9a35c"/><ellipse cx="95" cy="296" rx="16" ry="8" fill="#ffe2a8" filter="url(#${u}-b8)" opacity=".9"/>
        <path d="M376 300 l18 0 l-6 28 l-6 0 Z" fill="#c9a35c"/><ellipse cx="385" cy="296" rx="16" ry="8" fill="#ffe2a8" filter="url(#${u}-b8)" opacity=".9"/>
      </g>`;
    }

    // ---- Sideboard + samovar ----
    b += `
      <rect x="1170" y="330" width="340" height="12" fill="#4a3222"/>
      <rect x="1180" y="342" width="320" height="298" fill="#3a271b"/>
      <rect x="1196" y="358" width="136" height="128" fill="#24180f" stroke="#5a3f2c" stroke-width="3"/>
      <rect x="1348" y="358" width="136" height="128" fill="#24180f" stroke="#5a3f2c" stroke-width="3"/>
      <circle cx="1232" cy="420" r="22" fill="#d9ccb3" opacity=".55"/><circle cx="1286" cy="420" r="22" fill="#d9ccb3" opacity=".55"/>
      <circle cx="1386" cy="420" r="22" fill="#d9ccb3" opacity=".55"/><circle cx="1440" cy="420" r="22" fill="#d9ccb3" opacity=".55"/>
      <rect x="1196" y="500" width="288" height="50" fill="#33221a" stroke="#5a3f2c" stroke-width="2"/>
      <rect x="1196" y="560" width="288" height="66" fill="#33221a" stroke="#5a3f2c" stroke-width="2"/>
      <circle cx="1340" cy="525" r="5" fill="#b08c5c"/><circle cx="1340" cy="593" r="5" fill="#b08c5c"/>
      <path d="M1232 330 L1238 282 Q1262 262 1286 282 L1292 330 Z" fill="#a9824f"/>
      <rect x="1246" y="256" width="32" height="20" rx="6" fill="#8a6a3f"/><circle cx="1262" cy="250" r="8" fill="#a9824f"/>
      <path d="M1292 300 l18 -6 l2 8 l-16 6z" fill="#8a6a3f"/>
      <rect x="1410" y="290" width="40" height="40" fill="#c5ad89" opacity=".8"/><rect x="1416" y="296" width="28" height="28" fill="#6b5442"/>
    `;

    // ---- Lamp glow (light on wall) ----
    b += `<rect width="${W}" height="${H}" fill="url(#${u}-lamp)"/>`;

    // ---- Back row (seated, behind the table) ----
    function sitter(x, hy, r, cloth, hair, kind) {
      const sw = r * 2.15;
      let s = `
        <path d="M${f(x - sw)} ${f(hy + r * 4.6)} C${f(x - sw)} ${f(hy + r * 1.8)} ${f(x - r * 1.2)} ${f(hy + r * 1.35)} ${x} ${f(hy + r * 1.35)} C${f(x + r * 1.2)} ${f(hy + r * 1.35)} ${f(x + sw)} ${f(hy + r * 1.8)} ${f(x + sw)} ${f(hy + r * 4.6)} Z" fill="${cloth}"/>
        <rect x="${f(x - r * .32)}" y="${f(hy + r * .7)}" width="${f(r * .64)}" height="${f(r * .8)}" fill="#a77b5c"/>
        <ellipse cx="${x}" cy="${hy}" rx="${f(r * .86)}" ry="${r}" fill="url(#${u}-skin)"/>`;
      if (kind === 'bun') {
        s += `<path d="M${f(x - r * .92)} ${f(hy + r * .15)} C${f(x - r)} ${f(hy - r * 1.25)} ${f(x + r)} ${f(hy - r * 1.25)} ${f(x + r * .92)} ${f(hy + r * .15)} C${f(x + r * .6)} ${f(hy - r * .55)} ${f(x - r * .6)} ${f(hy - r * .55)} ${f(x - r * .92)} ${f(hy + r * .15)} Z" fill="${hair}"/><circle cx="${x}" cy="${f(hy - r * 1.05)}" r="${f(r * .38)}" fill="${hair}"/>`;
      } else {
        s += `<path d="M${f(x - r * .9)} ${f(hy - r * .05)} C${f(x - r * .95)} ${f(hy - r * 1.15)} ${f(x + r * .95)} ${f(hy - r * 1.15)} ${f(x + r * .9)} ${f(hy - r * .05)} C${f(x + r * .5)} ${f(hy - r * .6)} ${f(x - r * .5)} ${f(hy - r * .6)} ${f(x - r * .9)} ${f(hy - r * .05)} Z" fill="${hair}"/>`;
      }
      s += `
        <ellipse cx="${f(x - r * .3)}" cy="${f(hy + r * .02)}" rx="${f(r * .09)}" ry="${f(r * .06)}" fill="#3a2a22" opacity=".7"/>
        <ellipse cx="${f(x + r * .3)}" cy="${f(hy + r * .02)}" rx="${f(r * .09)}" ry="${f(r * .06)}" fill="#3a2a22" opacity=".7"/>
        <path d="M${f(x - r * .2)} ${f(hy + r * .5)} q${f(r * .2)} ${f(r * .12)} ${f(r * .4)} 0" stroke="#6b3e32" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M${f(x + r * .55)} ${f(hy - r * .7)} q${f(r * .45)} ${f(r * .6)} ${f(r * .2)} ${f(r * 1.3)}" stroke="#ffd29c" stroke-opacity=".35" stroke-width="3" fill="none"/>`;
      return s;
    }
    b += sitter(700, 482, 36, '#7a4b3a', '#3a2418', 'bun');
    b += sitter(1010, 478, 38, '#3f4a5a', '#2a1c14', 'short');
    b += sitter(1168, 512, 29, '#c5ad89', '#6b4a2a', 'short');

    // ---- Grandfather (left end of the table, by the window) ----
    const gf = `
      <path d="M395 790 C392 610 420 548 470 538 L506 538 C548 548 572 610 575 790 Z" fill="#4c4e57"/>
      <path d="M466 542 L489 596 L512 542 Z" fill="#d9d0c0"/>
      <path d="M489 596 L489 700" stroke="#3a3c44" stroke-width="3"/>
      <rect x="468" y="500" width="40" height="44" fill="#a97e60"/>
      <ellipse cx="486" cy="455" rx="40" ry="48" fill="url(#${u}-skin)"/>
      <ellipse cx="452" cy="462" rx="8" ry="13" fill="#b4876a"/>
      <path d="M447 430 C440 470 452 495 470 500 C462 480 458 455 462 432 Z" fill="#ddd6cb"/>
      <path d="M454 420 Q486 396 520 420" stroke="#ddd6cb" stroke-width="3" fill="none" opacity=".7"/>
      <path d="M521 450 L533 470 L520 476 Z" fill="#b88a6c"/>
      <path d="M500 482 C510 476 528 478 534 486 C524 491 508 491 500 487 Z" fill="#e2dbd0"/>`;
    if (!ai) {
      b += `<g class="grandfather">${gf}
        <path d="M497 436 q11 -3 23 1" stroke="#d6cec2" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M501 452 q8 4 16 0" stroke="#3a2a22" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M509 496 q8 1 15 -1" stroke="#5b3a2e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M450 420 C440 450 444 486 462 502" stroke="#b8cbe3" stroke-opacity=".55" stroke-width="3" fill="none"/>
        <path d="M398 700 C398 640 410 580 430 556" stroke="#b8cbe3" stroke-opacity=".25" stroke-width="4" fill="none"/>
      </g>`;
    } else {
      b += `<g class="grandfather">${gf}
        <path d="M495 428 q12 -11 25 -2" stroke="#d6cec2" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <path d="M500 452 q8 -9 17 0" stroke="#3a2a22" stroke-width="3.2" fill="none" stroke-linecap="round"/>
        <circle cx="514" cy="470" r="9" fill="#d6795f" opacity=".45"/>
        <path d="M500 489 Q517 516 536 489 Z" fill="#4a1f1a"/>
        <path d="M503 491 L533 491" stroke="#f1e8dc" stroke-width="4"/>
      </g>`;
    }

    // ---- Grandmother (standing, serving) ----
    b += `
      <g class="grandmother">
        <path d="M1328 905 L1345 560 L1450 560 L1472 905 Z" fill="#5d3a30"/>
        <path d="M1340 590 C1335 452 1360 396 1395 391 C1430 396 1456 452 1452 590 Z" fill="#6e4234"/>
        <path d="M1362 470 L1430 470 L1446 885 L1350 885 Z" fill="#e2d5bc" opacity=".95"/>
        <path d="M1372 420 L1420 420 L1430 470 L1362 470 Z" fill="#e2d5bc" opacity=".95"/>
        <rect x="1380" y="356" width="28" height="36" fill="#a97e60"/>
        <ellipse cx="1393" cy="336" rx="34" ry="40" fill="url(#${u}-skin)"/>
        <path d="M1360 330 C1356 292 1430 292 1428 330 C1420 308 1366 308 1360 330 Z" fill="#b9b1a6"/>
        <circle cx="1408" cy="296" r="16" fill="#b9b1a6"/>
        <path d="M1362 336 L1352 350 L1364 354 Z" fill="#b88a6c"/>
        <path d="M1372 330 q7 -4 13 0" stroke="#3a2a22" stroke-width="2.6" fill="none" stroke-linecap="round"/>
        <path d="M1366 362 q8 5 16 1" stroke="#6b3e32" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M1356 432 Q1312 500 1292 540" stroke="#6e4234" stroke-width="26" fill="none" stroke-linecap="round"/>
        <path d="M1440 444 Q1400 528 1316 548" stroke="#6e4234" stroke-width="26" fill="none" stroke-linecap="round"/>
        <ellipse cx="1284" cy="548" rx="16" ry="11" fill="#c8977a"/>
        <ellipse cx="1262" cy="552" rx="58" ry="13" fill="#e8dcc5"/>
        <path d="M1226 548 Q1262 516 1298 548 Z" fill="#b5813f"/>
        <path d="M1244 530 q4 -12 0 -24 M1268 526 q4 -12 0 -24" stroke="#f3e6d2" stroke-width="3" fill="none" opacity=".35"/>
      </g>`;

    // ---- Table ----
    b += `
      <path d="M520 770 L1330 770 L1330 802 L520 802 Z" fill="#3e2a1a"/>
      <rect x="540" y="800" width="24" height="150" fill="#3a2718"/><rect x="1288" y="800" width="24" height="150" fill="#3a2718"/>
      <path d="M600 620 L1240 620 L1330 770 L520 770 Z" fill="url(#${u}-table)"/>
      <path d="M590 650 L1258 650 M570 690 L1282 690 M548 730 L1306 730" stroke="#4e321f" stroke-opacity=".25" stroke-width="2"/>`;

    if (ai) {
      b += `<g class="runner">
        <path d="M850 620 L962 620 L996 770 L816 770 Z" fill="url(#${u}-lace)" opacity=".92"/>
        <path d="M816 770 L996 770" stroke="#f1e9db" stroke-width="10" stroke-dasharray="2 12" stroke-linecap="round"/>
      </g>`;
    }

    // ---- Table setting (what grandma served) ----
    function plate(cx, cy, rx, ry) {
      return `<ellipse cx="${cx}" cy="${cy + 3}" rx="${rx}" ry="${ry}" fill="#3b2617" opacity=".5"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#e8dcc5"/>
        <ellipse cx="${cx}" cy="${cy}" rx="${f(rx * .68)}" ry="${f(ry * .62)}" fill="#d8c9ad"/>`;
    }
    b += plate(700, 646, 46, 12) + `<ellipse cx="694" cy="644" rx="16" ry="5" fill="#a5652f"/><ellipse cx="710" cy="646" rx="10" ry="4" fill="#7f8f45"/>`;
    b += plate(1010, 646, 46, 12) + `<ellipse cx="1004" cy="644" rx="15" ry="5" fill="#a5652f"/>`;
    b += plate(1166, 648, 40, 11) + `<ellipse cx="1166" cy="646" rx="12" ry="4" fill="#d1a85b"/>`;
    b += plate(642, 708, 52, 15) + `<ellipse cx="634" cy="705" rx="17" ry="6" fill="#a5652f"/><ellipse cx="654" cy="709" rx="11" ry="5" fill="#7f8f45"/>`;
    b += plate(800, 744, 58, 16) + plate(1100, 748, 58, 16);
    // soup pot
    b += `
      <path d="M858 604 L942 604 L936 656 Q900 670 864 656 Z" fill="#d8d0c2"/>
      <ellipse cx="900" cy="604" rx="42" ry="10" fill="#3a5a7a"/>
      <ellipse cx="900" cy="604" rx="36" ry="7" fill="#b07a3d"/>
      <path d="M856 616 l-12 -2 M944 616 l12 -2" stroke="#3a5a7a" stroke-width="5" stroke-linecap="round"/>
      <path d="M886 590 q-8 -16 0 -32 q8 -16 0 -32 M912 588 q-8 -16 0 -32 q8 -16 0 -32" stroke="#f3e6d2" stroke-width="3" fill="none" opacity=".28"/>`;
    // bread & potatoes bowl
    b += `
      <ellipse cx="1124" cy="706" rx="62" ry="15" fill="#6b4729"/>
      <ellipse cx="1124" cy="696" rx="46" ry="17" fill="#b7834f"/>
      <path d="M1100 690 l10 10 M1120 686 l10 10 M1140 688 l10 10" stroke="#8a5a32" stroke-width="3"/>
      <path d="M686 696 Q722 734 758 696 Z" fill="#c5ad89"/>
      <circle cx="704" cy="694" r="10" fill="#d8b46a"/><circle cx="722" cy="690" r="11" fill="#cfa85c"/><circle cx="740" cy="695" r="9" fill="#d8b46a"/>
      <rect x="760" y="646" width="16" height="24" rx="3" fill="#d6e2e6" opacity=".45"/>
      <rect x="1062" y="650" width="16" height="24" rx="3" fill="#d6e2e6" opacity=".45"/>`;

    if (ai) {
      // flowers + candles that were never there
      b += `<g class="decor">
        <path d="M784 640 Q778 600 790 572 L818 572 Q830 600 824 640 Z" fill="#d7e3ee"/>
        <path d="M790 590 Q804 598 818 590" stroke="#7d9cc0" stroke-width="3" fill="none"/>
        <path d="M800 574 Q790 530 770 500 M804 574 Q806 520 812 486 M808 574 Q826 530 846 506 M802 574 Q780 548 752 538" stroke="#4f7a3e" stroke-width="3.5" fill="none"/>
        <ellipse cx="760" cy="526" rx="14" ry="7" fill="#5f8a45" transform="rotate(-30 760 526)"/>
        <ellipse cx="840" cy="530" rx="14" ry="7" fill="#5f8a45" transform="rotate(30 840 530)"/>
        <circle cx="770" cy="496" r="15" fill="#e07a8a"/><circle cx="770" cy="496" r="6" fill="#f6c25a"/>
        <circle cx="812" cy="480" r="17" fill="#e85d5d"/><circle cx="812" cy="480" r="7" fill="#ffd36b"/>
        <circle cx="848" cy="502" r="14" fill="#f2b3c4"/><circle cx="848" cy="502" r="5" fill="#f6c25a"/>
        <circle cx="750" cy="536" r="12" fill="#f6d36b"/><circle cx="792" cy="520" r="11" fill="#c36ad0"/>
        <rect x="968" y="566" width="12" height="62" fill="#f3ead8"/><path d="M958 630 L990 630 L984 640 L964 640 Z" fill="#c9a35c"/>
        <rect x="1006" y="578" width="12" height="52" fill="#f3ead8"/><path d="M996 632 L1028 632 L1022 642 L1002 642 Z" fill="#c9a35c"/>
        <ellipse cx="974" cy="552" rx="22" ry="22" fill="#ffc861" opacity=".35" filter="url(#${u}-b8)"/>
        <ellipse cx="1012" cy="564" rx="22" ry="22" fill="#ffc861" opacity=".35" filter="url(#${u}-b8)"/>
        <ellipse cx="974" cy="556" rx="6" ry="12" fill="url(#${u}-flame)"/>
        <ellipse cx="1012" cy="568" rx="6" ry="12" fill="url(#${u}-flame)"/>
      </g>`;
      // grandfather gesturing (in front of table)
      b += `<g class="grandfather-arm">
        <path d="M548 574 Q604 562 614 474" stroke="#4c4e57" stroke-width="34" fill="none" stroke-linecap="round"/>
        <ellipse cx="616" cy="452" rx="17" ry="21" fill="#cf9f7f"/>
        <path d="M604 436 l-4 -16 M614 432 l0 -18 M624 434 l4 -16" stroke="#cf9f7f" stroke-width="7" stroke-linecap="round"/>
        <ellipse cx="596" cy="660" rx="22" ry="12" fill="#cf9f7f"/>
      </g>`;
    } else {
      b += `<g class="grandfather-hands">
        <path d="M548 590 Q560 640 586 662" stroke="#4c4e57" stroke-width="30" fill="none" stroke-linecap="round"/>
        <ellipse cx="600" cy="664" rx="22" ry="12" fill="#cf9f7f"/>
        <ellipse cx="612" cy="672" rx="20" ry="11" fill="#c08f70"/>
      </g>`;
    }

    // ---- Front row (backs towards camera) ----
    function back(x, hy, r) {
      return `
        <path d="M${x - 150} 1000 C${x - 150} 860 ${x - 80} ${hy + r + 10} ${x} ${hy + r + 10} C${x + 80} ${hy + r + 10} ${x + 150} 860 ${x + 150} 1000 Z" fill="#1d1511"/>
        <circle cx="${x}" cy="${hy}" r="${r}" fill="#160f0b"/>
        <path d="M${x - r * .8} ${hy - r * .6} A${r} ${r} 0 0 1 ${x + r * .9} ${hy - r * .4}" stroke="#d69b72" stroke-opacity=".5" stroke-width="3" fill="none"/>
        <path d="M${x - 120} ${hy + r + 40} Q${x} ${hy + r + 4} ${x + 120} ${hy + r + 40}" stroke="#d69b72" stroke-opacity=".28" stroke-width="3" fill="none"/>`;
    }
    b += back(790, 778, 48) + back(1104, 786, 50);

    // ---- Lamp ----
    b += `
      <line x1="820" y1="0" x2="820" y2="238" stroke="#140d08" stroke-width="4"/>
      <path d="M762 236 L878 236 L930 312 L710 312 Z" fill="#c5ad89"/>
      <path d="M762 236 L878 236 L886 248 L754 248 Z" fill="#a38a66"/>
      <path d="M710 312 L930 312 L920 320 L720 320 Z" fill="#8f7656"/>
      <ellipse cx="820" cy="320" rx="70" ry="12" fill="#fff1d2" filter="url(#${u}-b8)"/>
      <rect width="${W}" height="${H}" fill="url(#${u}-lamp)" opacity=".55" style="mix-blend-mode:screen"/>`;

    return wrap(u, mode, defs, b, Object.assign({ label: ai ? 'Reconstrucción por IA de una cena familiar' : 'Recuerdo original de una cena familiar' }, opts));
  }

  /* ======================================================================
     CASO 02 · LA CALLE DONDE CRECÍ
     ====================================================================== */
  function street(mode, opts) {
    const ai = mode === 'ai';
    const u = 'sc' + (++UID);

    const defs = `
      <linearGradient id="${u}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#34435d"/><stop offset=".42" stop-color="#8e8a8c"/>
        <stop offset=".72" stop-color="#d9ab84"/><stop offset="1" stop-color="#e9bb8e"/>
      </linearGradient>
      <radialGradient id="${u}-sun" cx="1500" cy="420" r="760" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffd6a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffd6a0" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="${u}-asph" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#5a5551"/><stop offset="1" stop-color="#2f2c2a"/>
      </linearGradient>
      <linearGradient id="${u}-marble" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f3eee5"/><stop offset=".5" stop-color="#dcd4c6"/><stop offset="1" stop-color="#efe9de"/>
      </linearGradient>
      <linearGradient id="${u}-glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#26394f"/><stop offset=".55" stop-color="#5b7f9f"/><stop offset="1" stop-color="#c9a88a"/>
      </linearGradient>
      <linearGradient id="${u}-gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#8f6d34"/><stop offset=".5" stop-color="#f0d38c"/><stop offset="1" stop-color="#a47c3c"/>
      </linearGradient>
      <linearGradient id="${u}-warm" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stop-color="#ffc48c" stop-opacity=".26"/><stop offset=".6" stop-color="#ffc48c" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="${u}-damp" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#2a2018" stop-opacity="0"/><stop offset="1" stop-color="#2a2018" stop-opacity=".32"/>
      </linearGradient>
      <linearGradient id="${u}-pod" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4f8fb"/><stop offset="1" stop-color="#a9b8c6"/>
      </linearGradient>
      <linearGradient id="${u}-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1b3a52"/><stop offset="1" stop-color="#3fb8d9"/>
      </linearGradient>
      <pattern id="${u}-awn" width="44" height="60" patternUnits="userSpaceOnUse">
        <rect width="22" height="60" fill="#c56f4c"/><rect x="22" width="22" height="60" fill="#e8dcc5"/>
      </pattern>`;

    const R = rng(20250);
    let b = `<rect width="${W}" height="760" fill="url(#${u}-sky)"/>
      <rect width="${W}" height="760" fill="url(#${u}-sun)"/>`;

    // Distant upper-district towers (left only, hazy)
    const far = [[40, 80, 80], [140, 64, 120], [228, 96, 60], [342, 70, 140], [440, 56, 100], [528, 104, 40], [646, 72, 130]];
    far.forEach((t) => {
      b += `<rect x="${t[0]}" y="${t[2]}" width="${t[1]}" height="${400 - t[2]}" fill="#77798b" opacity=".38"/>
        <line x1="${t[0] + t[1] / 2}" y1="${t[2]}" x2="${t[0] + t[1] / 2}" y2="${t[2] - 30}" stroke="#77798b" stroke-opacity=".4" stroke-width="3"/>`;
    });
    b += `<rect x="140" y="190" width="200" height="9" fill="#77798b" opacity=".42"/><rect x="528" y="170" width="190" height="9" fill="#77798b" opacity=".42"/>`;

    if (!ai) {
      b += `<g stroke="#3a3a44" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".75">
        <path d="M1040 130 q7 -7 14 0 q7 -7 14 0"/><path d="M1090 108 q6 -6 12 0 q6 -6 12 0"/><path d="M1130 140 q5 -5 10 0 q5 -5 10 0"/></g>`;
    }

    // ---- Buildings ----
    const BLD = [
      { x: 30, w: 380, top: 250, color: '#8d7c69', floors: 3, cols: 4, door: 196 },
      { x: 410, w: 420, top: 210, color: '#7b6b5d', floors: 4, cols: 5, door: 604 },
      { x: 830, w: 400, top: 300, color: '#9b8871', floors: 2, cols: 4, door: null },
      { x: 1230, w: 350, top: 260, color: '#857869', floors: 3, cols: 4, door: 1382 }
    ];
    b += `<rect x="-10" y="290" width="40" height="410" fill="#6a5d52"/><rect x="1580" y="300" width="30" height="400" fill="#6a5d52"/>`;

    BLD.forEach((B, bi) => {
      const top0 = B.top + 30, sh = (548 - top0) / B.floors, colW = B.w / B.cols;
      if (!ai) {
        b += `<rect x="${B.x}" y="${B.top}" width="${B.w}" height="${700 - B.top}" fill="${B.color}"/>
          <rect x="${B.x - 6}" y="${B.top - 10}" width="${B.w + 12}" height="14" fill="#5d5045"/>
          <rect x="${B.x}" y="${B.top + 4}" width="${B.w}" height="8" fill="#000" opacity=".12"/>`;
        // roof items
        b += `<line x1="${B.x + B.w * .25}" y1="${B.top - 10}" x2="${B.x + B.w * .25}" y2="${B.top - 60}" stroke="#4a4038" stroke-width="3"/>
          <line x1="${B.x + B.w * .25 - 18}" y1="${B.top - 48}" x2="${B.x + B.w * .25 + 18}" y2="${B.top - 48}" stroke="#4a4038" stroke-width="3"/>
          <rect x="${B.x + B.w * .7}" y="${B.top - 40}" width="34" height="30" fill="#5d5045"/>`;
        // windows
        for (let j = 0; j < B.floors; j++) {
          for (let i = 0; i < B.cols; i++) {
            const ww = Math.min(56, colW * .5), wh = sh * .6;
            const wx = B.x + colW * (i + .5) - ww / 2, wy = top0 + sh * j + (sh - wh) / 2 - 4;
            const r = R();
            const lit = r < .08, boarded = r > .95;
            b += `<rect x="${f(wx - 5)}" y="${f(wy - 5)}" width="${f(ww + 10)}" height="${f(wh + 10)}" fill="#cbbda3" opacity=".55"/>
              <rect x="${f(wx)}" y="${f(wy)}" width="${f(ww)}" height="${f(wh)}" fill="${lit ? '#e9b57a' : '#2b3039'}"/>
              <path d="M${f(wx)} ${f(wy + wh * .6)} L${f(wx + ww * .5)} ${f(wy)} L${f(wx + ww * .78)} ${f(wy)} L${f(wx)} ${f(wy + wh)} Z" fill="#fff" opacity=".07"/>
              <rect x="${f(wx + ww / 2 - 1.5)}" y="${f(wy)}" width="3" height="${f(wh)}" fill="#cbbda3" opacity=".7"/>
              <rect x="${f(wx - 7)}" y="${f(wy + wh + 3)}" width="${f(ww + 14)}" height="5" fill="#5e5146"/>
              <rect x="${f(wx + ww * .3)}" y="${f(wy + wh + 8)}" width="6" height="${f(20 + R() * 26)}" fill="#3a2d24" opacity=".14"/>`;
            if (r > .55 && r < .8) b += `<rect x="${f(wx + 2)}" y="${f(wy + 2)}" width="${f(ww * .36)}" height="${f(wh - 4)}" fill="#c9b38e" opacity=".75"/>`;
            if (boarded) b += `<path d="M${f(wx)} ${f(wy + 8)} L${f(wx + ww)} ${f(wy + 18)} M${f(wx)} ${f(wy + wh - 14)} L${f(wx + ww)} ${f(wy + wh - 4)}" stroke="#7a5a3c" stroke-width="7"/>`;
          }
        }
        // cracks, peeling, stains
        for (let k = 0; k < 3; k++) {
          let cx = B.x + 20 + R() * (B.w - 40), cy = B.top + 30 + R() * 260;
          let d = `M${f(cx)} ${f(cy)}`;
          for (let s = 0; s < 6; s++) { cx += (R() - .5) * 26; cy += 10 + R() * 16; d += ` L${f(cx)} ${f(cy)}`; }
          b += `<path d="${d}" stroke="#4a3d32" stroke-opacity=".6" stroke-width="2" fill="none"/>`;
        }
        for (let k = 0; k < 2; k++) {
          const px = B.x + 30 + R() * (B.w - 110), py = B.top + 60 + R() * 300;
          b += `<path d="M${f(px)} ${f(py)} l38 -6 l22 14 l-6 26 l-34 8 l-24 -16 Z" fill="#b29a80" opacity=".8"/>
            <path d="M${f(px + 10)} ${f(py + 6)} h20 M${f(px + 24)} ${f(py + 16)} h20 M${f(px + 8)} ${f(py + 26)} h20" stroke="#9a5a45" stroke-width="5" opacity=".7"/>`;
        }
        b += `<rect x="${B.x}" y="600" width="${B.w}" height="100" fill="url(#${u}-damp)"/>
          <rect x="${B.x + B.w - 18}" y="${B.top}" width="7" height="${700 - B.top}" fill="#5e544b"/>
          <rect x="${B.x}" y="552" width="${B.w}" height="8" fill="#5d5045"/>`;
        if (B.door) {
          b += `<rect x="${B.door - 10}" y="580" width="${86}" height="10" fill="#5d5045"/>
            <rect x="${B.door}" y="590" width="66" height="110" fill="#3b2c22"/>
            <rect x="${B.door + 6}" y="596" width="25" height="98" fill="#4b382b"/><rect x="${B.door + 35}" y="596" width="25" height="98" fill="#4b382b"/>
            <rect x="${B.door - 8}" y="696" width="82" height="8" fill="#6f6458"/>
            <rect x="${B.door - 110}" y="610" width="60" height="44" fill="#2b3039"/><path d="M${B.door - 110} 610 v44 M${B.door - 95} 610 v44 M${B.door - 80} 610 v44 M${B.door - 65} 610 v44" stroke="#4a4038" stroke-width="3"/>
            <rect x="${B.door + 116}" y="610" width="60" height="44" fill="#2b3039"/><path d="M${B.door + 131} 610 v44 M${B.door + 146} 610 v44 M${B.door + 161} 610 v44" stroke="#4a4038" stroke-width="3"/>`;
        }
        if (bi === 0) {
          // laundry line
          b += `<path d="M96 400 Q214 432 334 404" stroke="#3a3a3a" stroke-width="2" fill="none"/>
            <rect x="130" y="410" width="26" height="36" fill="#d69b72"/><rect x="170" y="418" width="34" height="26" fill="#e8dcc5"/>
            <rect x="222" y="420" width="22" height="40" fill="#5a7a8a"/><rect x="262" y="414" width="30" height="24" fill="#c5ad89"/>`;
        }
      } else {
        // AI: luxurious marble, glass and gold
        b += `<rect x="${B.x}" y="${B.top}" width="${B.w}" height="${700 - B.top}" fill="url(#${u}-marble)"/>
          <rect x="${B.x - 8}" y="${B.top - 20}" width="${B.w + 16}" height="24" fill="#2b2f36"/>
          <rect x="${B.x - 8}" y="${B.top + 2}" width="${B.w + 16}" height="5" fill="url(#${u}-gold)"/>`;
        for (let t = 0; t < 4; t++) {
          const tx = B.x + 30 + t * (B.w - 60) / 3;
          b += `<rect x="${f(tx - 2)}" y="${B.top - 42}" width="4" height="22" fill="#5a4632"/><circle cx="${f(tx)}" cy="${B.top - 48}" r="16" fill="#5f7f5a"/>`;
        }
        for (let j = 0; j < B.floors; j++) {
          for (let i = 0; i < B.cols; i++) {
            const gx = B.x + colW * i + 10, gy = top0 + sh * j + 4, gw = colW - 20, gh = sh - 14;
            b += `<rect x="${f(gx)}" y="${f(gy)}" width="${f(gw)}" height="${f(gh)}" fill="url(#${u}-glass)"/>
              <path d="M${f(gx + gw * .15)} ${f(gy + gh)} L${f(gx + gw * .6)} ${f(gy)} L${f(gx + gw * .8)} ${f(gy)} L${f(gx + gw * .35)} ${f(gy + gh)} Z" fill="#fff" opacity=".18"/>
              <rect x="${f(gx)}" y="${f(gy + gh - 18)}" width="${f(gw)}" height="14" fill="#e6f6ff" opacity=".22" stroke="#fff" stroke-opacity=".35"/>`;
          }
        }
        for (let i = 0; i <= B.cols; i++) {
          b += `<rect x="${f(B.x + colW * i - 3)}" y="${B.top + 8}" width="6" height="${548 - B.top}" fill="url(#${u}-gold)"/>`;
        }
        b += `<rect x="${B.x}" y="552" width="${B.w}" height="148" fill="#24282f"/>
          <rect x="${B.x}" y="552" width="${B.w}" height="5" fill="url(#${u}-gold)"/>`;
        if (B.door) {
          b += `<rect x="${B.door - 4}" y="582" width="74" height="118" fill="url(#${u}-gold)"/>
            <rect x="${B.door + 4}" y="590" width="58" height="110" fill="url(#${u}-glass)" opacity=".9"/>
            <rect x="${B.door - 120}" y="596" width="96" height="80" fill="url(#${u}-glass)" opacity=".7"/>
            <rect x="${B.door + 96}" y="596" width="96" height="80" fill="url(#${u}-glass)" opacity=".7"/>
            <rect x="${B.door - 34}" y="672" width="22" height="28" fill="#3a3f47"/><circle cx="${B.door - 23}" cy="660" r="16" fill="#5f7f5a"/>
            <rect x="${B.door + 78}" y="672" width="22" height="28" fill="#3a3f47"/><circle cx="${B.door + 89}" cy="660" r="16" fill="#5f7f5a"/>`;
        }
      }
    });

    // ---- Shop (ground floor of building C) ----
    if (!ai) {
      b += `<g class="shop">
        <rect x="830" y="560" width="400" height="140" fill="#9b8871"/>
        <rect x="870" y="518" width="320" height="38" fill="#3f5b4b" stroke="#2c3f35" stroke-width="3"/>
        <text x="1030" y="546" text-anchor="middle" font-family="Georgia, serif" font-size="26" letter-spacing="6" fill="#e8dcc5">ПРОДУКТЫ</text>
        <path d="M855 562 L1205 562 L1226 612 L834 612 Z" fill="url(#${u}-awn)"/>
        ${Array.from({ length: 13 }, (_, i) => `<circle cx="${849 + i * 30}" cy="612" r="15" fill="${i % 2 ? '#e8dcc5' : '#c56f4c'}"/>`).join('')}
        <rect x="858" y="626" width="196" height="70" fill="#2f3640"/>
        <rect x="858" y="626" width="196" height="70" fill="#e9b57a" opacity=".18"/>
        <rect x="1064" y="616" width="140" height="84" fill="#2a211b"/>
        <circle cx="1134" cy="626" r="5" fill="#ffe3b0"/><circle cx="1134" cy="632" r="34" fill="#ffcf8a" opacity=".3" filter="url(#${u}-b8)"/>
        <path d="M1110 700 L1112 664 Q1134 650 1156 664 L1158 700 Z" fill="#6d7a6a"/>
        <path d="M1118 700 L1120 668 L1148 668 L1150 700 Z" fill="#e2d5bc"/>
        <circle cx="1134" cy="648" r="12" fill="#c99a76"/>
        <path d="M1122 644 q12 -14 24 0" fill="#4a3a2c"/>
        <rect x="1070" y="676" width="128" height="24" fill="#6b4b33"/>
        <rect x="864" y="676" width="80" height="40" fill="#8a6340"/><rect x="952" y="676" width="80" height="40" fill="#8a6340"/>
        <path d="M864 690 h80 M864 702 h80 M952 690 h80 M952 702 h80" stroke="#5e4128" stroke-width="2"/>
        ${[[878, 672, '#e08a3c'], [896, 668, '#e08a3c'], [914, 672, '#e08a3c'], [930, 668, '#d4793a'], [966, 672, '#c4473a'], [984, 668, '#c4473a'], [1002, 672, '#8aa04a'], [1020, 668, '#8aa04a']].map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="10" fill="${p[2]}"/>`).join('')}
      </g>`;
    } else {
      b += `<g class="shop">
        <rect x="830" y="552" width="400" height="148" fill="#0e1620"/>
        <rect x="846" y="514" width="368" height="44" fill="#0e1620"/>
        <rect x="846" y="554" width="368" height="3" fill="#9be7ff"/>
        <text x="1030" y="544" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="700" font-size="24" letter-spacing="4" fill="#c8f6ff">AUTO·MARKET 24/7</text>
        <rect x="846" y="514" width="368" height="44" fill="#9be7ff" opacity=".12" filter="url(#${u}-b8)"/>
        <rect x="862" y="580" width="124" height="104" rx="6" fill="url(#${u}-screen)"/>
        <rect x="874" y="594" width="60" height="8" rx="3" fill="#dff8ff" opacity=".85"/><rect x="874" y="610" width="96" height="30" rx="4" fill="#dff8ff" opacity=".25"/>
        <rect x="874" y="648" width="44" height="22" rx="4" fill="#55ffd6" opacity=".7"/>
        <rect x="862" y="580" width="124" height="104" rx="6" fill="#7fe7ff" opacity=".2" filter="url(#${u}-b8)"/>
        ${Array.from({ length: 12 }, (_, i) => { const cx = 1004 + (i % 4) * 50, cy = 580 + Math.floor(i / 4) * 36; return `<rect x="${cx}" y="${cy}" width="44" height="30" rx="3" fill="#15232f" stroke="#9be7ff" stroke-opacity="${i % 3 ? .45 : .9}" stroke-width="2"/><circle cx="${cx + 36}" cy="${cy + 8}" r="3" fill="${i % 3 ? '#9be7ff' : '#55ffd6'}"/>`; }).join('')}
        <path d="M1150 520 L1150 506" stroke="#3a4655" stroke-width="3"/>
        <rect x="1122" y="494" width="56" height="12" rx="6" fill="#d7e2ea"/>
        <path d="M1110 496 h-18 M1190 496 h18" stroke="#d7e2ea" stroke-width="4"/>
        <ellipse cx="1092" cy="494" rx="16" ry="3" fill="#d7e2ea" opacity=".6"/><ellipse cx="1208" cy="494" rx="16" ry="3" fill="#d7e2ea" opacity=".6"/>
        <circle cx="1150" cy="510" r="4" fill="#55ffd6"/>
      </g>`;
    }

    // ---- Sidewalk & street ----
    b += `<rect y="700" width="${W}" height="58" fill="#9a8b77"/>
      <path d="M0 728 H1600" stroke="#857764" stroke-width="2" stroke-dasharray="80 4"/>
      <rect y="756" width="${W}" height="12" fill="#6f6458"/>
      <rect y="768" width="${W}" height="232" fill="url(#${u}-asph)"/>
      <path d="M0 900 H1600" stroke="#c9bfa8" stroke-opacity=".25" stroke-width="7" stroke-dasharray="70 70"/>
      <path d="M200 800 l40 18 l20 30 l-12 40 M980 820 l-30 22 l12 38 M1320 790 l26 30 l40 6" stroke="#252321" stroke-width="3" fill="none"/>
      <ellipse cx="880" cy="930" rx="150" ry="16" fill="#c9a88a" opacity=".22"/>`;

    // ---- People ----
    function fig(x, gy, h, o) {
      o = o || {};
      const r = h * .085, hy = gy - h + r, shY = hy + r + h * .04, hipY = gy - h * .46, sw = h * .12;
      let s = `<ellipse cx="${f(x - h * .42)}" cy="${gy}" rx="${f(h * .5)}" ry="${f(h * .045)}" fill="#2a1c12" opacity=".28"/>`;
      if (o.skirt) {
        s += `<path d="M${f(x - sw)} ${f(hipY)} L${f(x - sw * 1.3)} ${f(gy - h * .16)} L${f(x + sw * 1.3)} ${f(gy - h * .16)} L${f(x + sw)} ${f(hipY)} Z" fill="${o.skirt}"/>
          <rect x="${f(x - sw * .6)}" y="${f(gy - h * .16)}" width="${f(sw * .4)}" height="${f(h * .16)}" fill="${o.legs || '#3b3f4a'}"/><rect x="${f(x + sw * .2)}" y="${f(gy - h * .16)}" width="${f(sw * .4)}" height="${f(h * .16)}" fill="${o.legs || '#3b3f4a'}"/>`;
      } else {
        const sp = o.stride ? sw * .5 : 0;
        s += `<path d="M${f(x - sw * .7)} ${f(hipY)} L${f(x - sw * .7 - sp)} ${gy} L${f(x - sw * .15 - sp)} ${gy} L${f(x - sw * .05)} ${f(hipY)} Z" fill="${o.legs || '#3b3f4a'}"/>
          <path d="M${f(x + sw * .05)} ${f(hipY)} L${f(x + sw * .15 + sp)} ${gy} L${f(x + sw * .7 + sp)} ${gy} L${f(x + sw * .7)} ${f(hipY)} Z" fill="${o.legs || '#3b3f4a'}"/>`;
      }
      s += `<path d="M${f(x - sw)} ${f(hipY + 4)} L${f(x - sw * 1.05)} ${f(shY + r * .4)} Q${f(x - sw)} ${f(shY)} ${f(x - sw * .5)} ${f(shY)} L${f(x + sw * .5)} ${f(shY)} Q${f(x + sw)} ${f(shY)} ${f(x + sw * 1.05)} ${f(shY + r * .4)} L${f(x + sw)} ${f(hipY + 4)} Z" fill="${o.body}"/>`;
      const aw = f(sw * .42);
      if (o.armsUp) {
        s += `<path d="M${f(x - sw * .9)} ${f(shY + 4)} L${f(x - sw * 1.6)} ${f(shY - h * .16)}" stroke="${o.body}" stroke-width="${aw}" stroke-linecap="round"/>
          <path d="M${f(x + sw * .9)} ${f(shY + 4)} L${f(x + sw * 1.6)} ${f(shY - h * .16)}" stroke="${o.body}" stroke-width="${aw}" stroke-linecap="round"/>`;
      } else {
        const ex = o.gesture ? sw * 1.9 : sw * 1.15;
        s += `<path d="M${f(x - sw * .95)} ${f(shY + 4)} L${f(x - sw * 1.15)} ${f(hipY + 6)}" stroke="${o.body}" stroke-width="${aw}" stroke-linecap="round"/>
          <path d="M${f(x + sw * .95)} ${f(shY + 4)} L${f(x + ex)} ${f(o.gesture ? shY + h * .1 : hipY + 6)}" stroke="${o.body}" stroke-width="${aw}" stroke-linecap="round"/>`;
      }
      if (o.bag) s += `<rect x="${f(x + sw * 1.0)}" y="${f(hipY)}" width="${f(sw * 1.1)}" height="${f(h * .17)}" rx="3" fill="${o.bag}"/>`;
      if (o.cane) s += `<path d="M${f(x + sw * 1.4)} ${f(hipY - 4)} L${f(x + sw * 1.7)} ${gy}" stroke="#4a3426" stroke-width="3"/>`;
      s += `<circle cx="${x}" cy="${f(hy)}" r="${f(r)}" fill="${o.skin || '#c99a76'}"/>
        <path d="M${f(x - r)} ${f(hy)} A${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(hy)} Q${x} ${f(hy - r * .4)} ${f(x - r)} ${f(hy)} Z" fill="${o.hair || '#3a2a1c'}"/>
        <path d="M${f(x + sw * 1.02)} ${f(shY + r * .4)} L${f(x + sw)} ${f(hipY)}" stroke="#ffd6a0" stroke-opacity=".45" stroke-width="2.5"/>`;
      return s;
    }
    b += fig(160, 714, 70, { body: '#c56f4c', legs: '#3b3f4a', stride: true });
    b += `<circle cx="214" cy="704" r="9" fill="#e8dcc5"/><path d="M206 700 q8 6 16 0" stroke="#b04a3a" stroke-width="2.5" fill="none"/>`;
    b += fig(282, 716, 76, { body: '#4f7a8a', legs: '#2f3340', armsUp: true, hair: '#6b4a2a' });
    b += fig(574, 712, 62, { body: '#d6b45a', legs: '#45474f', hair: '#1f1712' });
    b += fig(712, 738, 66, { body: '#8a4f6a', skirt: '#5a3a4a', hair: '#2a1c14' });
    b += fig(744, 748, 124, { body: '#6d5a7a', skirt: '#4a3f58', hair: '#7a6a5c', bag: '#c5ad89' });
    b += fig(808, 750, 130, { body: '#4a5a48', legs: '#2e3138', gesture: true, hair: '#2a2420' });
    b += fig(1000, 752, 122, { body: '#8a6a4a', legs: '#33363e', bag: ai ? null : '#e8dcc5', gesture: ai, hair: '#3a2a1c' });
    b += fig(1460, 750, 116, { body: '#5a4b42', legs: '#2e2a28', cane: true, hair: '#d8d0c4' });

    // Foreground: an old parked car and children playing on the street
    b += `<ellipse cx="1240" cy="884" rx="200" ry="14" fill="#1e1a17" opacity=".45"/>
      <path d="M1080 878 L1084 830 Q1090 812 1120 808 L1170 806 L1210 764 Q1222 754 1250 754 L1330 754 Q1356 756 1368 772 L1398 808 Q1420 812 1424 836 L1426 878 Z" fill="#6f7d74"/>
      <path d="M1218 804 L1246 768 L1296 768 L1296 804 Z M1308 768 L1340 768 Q1352 770 1360 782 L1376 804 L1308 804 Z" fill="#2b333a"/>
      <path d="M1230 798 L1250 772 L1262 772 L1240 798 Z" fill="#fff" opacity=".12"/>
      <rect x="1080" y="846" width="346" height="8" fill="#56615a"/>
      <rect x="1404" y="822" width="18" height="12" rx="3" fill="#e9d7a6"/>
      <circle cx="1150" cy="880" r="26" fill="#1c1b1b"/><circle cx="1150" cy="880" r="11" fill="#8a8a86"/>
      <circle cx="1356" cy="880" r="26" fill="#1c1b1b"/><circle cx="1356" cy="880" r="11" fill="#8a8a86"/>
      <path d="M420 930 l46 0 M432 952 l46 0" stroke="#e8dcc5" stroke-opacity=".35" stroke-width="3"/>
      <rect x="420" y="912" width="40" height="40" fill="none" stroke="#e8dcc5" stroke-opacity=".3" stroke-width="3"/>
      <rect x="460" y="912" width="40" height="40" fill="none" stroke="#e8dcc5" stroke-opacity=".3" stroke-width="3"/>
      <rect x="500" y="912" width="40" height="40" fill="none" stroke="#e8dcc5" stroke-opacity=".3" stroke-width="3"/>`;
    b += fig(612, 948, 118, { body: '#d69b72', legs: '#2f3340', stride: true, armsUp: true, hair: '#5a3a22' });
    b += fig(700, 944, 104, { body: '#7a8e9a', skirt: '#4a5866', hair: '#2a1c14' });

    // ---- Air-transport cabins (AI only) ----
    if (ai) {
      const y = (x) => 58 + (x - 760) * 92 / 840;
      b += `<g class="cabins">
        <path d="M760 ${y(760)} L1600 ${y(1600)}" stroke="#2a3342" stroke-width="12"/>
        <path d="M760 ${y(760) - 6} L1600 ${y(1600) - 6}" stroke="#7d8ea3" stroke-width="2"/>`;
      [930, 1180, 1430].forEach((cx) => {
        const cy = y(cx);
        b += `<path d="M${cx} ${f(cy)} L${cx} ${f(cy + 26)}" stroke="#2a3342" stroke-width="5"/>
          <rect x="${cx - 48}" y="${f(cy + 26)}" width="96" height="56" rx="20" fill="url(#${u}-pod)"/>
          <rect x="${cx - 38}" y="${f(cy + 36)}" width="76" height="20" rx="8" fill="#2c4a62"/>
          <path d="M${cx - 30} ${f(cy + 38)} l20 0 l-10 16 l-20 0 Z" fill="#fff" opacity=".35"/>
          <circle cx="${cx}" cy="${f(cy + 76)}" r="4" fill="#55ffd6"/>
          <circle cx="${cx}" cy="${f(cy + 76)}" r="14" fill="#55ffd6" opacity=".35" filter="url(#${u}-b8)"/>`;
      });
      b += `</g>`;
    }

    b += `<rect width="${W}" height="${H}" fill="url(#${u}-warm)" style="mix-blend-mode:screen"/>`;
    return wrap(u, mode, defs, b, Object.assign({ label: ai ? 'Reconstrucción por IA de una calle de las zonas bajas de Moscú' : 'Recuerdo original de una calle de las zonas bajas de Moscú' }, opts));
  }

  /* ======================================================================
     CASO 03 · LA NOCHE SIN LUZ
     ====================================================================== */
  function blackout(mode, opts) {
    const ai = mode === 'ai';
    const u = 'sc' + (++UID);
    const R = rng(2043);

    const defs = `
      <linearGradient id="${u}-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#04080f"/><stop offset=".6" stop-color="#0c1627"/><stop offset="1" stop-color="#1a2740"/>
      </linearGradient>
      <linearGradient id="${u}-ad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff4f9a"/><stop offset="1" stop-color="#5a7bff"/>
      </linearGradient>
      <linearGradient id="${u}-ad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffb347"/><stop offset="1" stop-color="#ff5e3a"/>
      </linearGradient>
      <radialGradient id="${u}-lamp" cx="300" cy="830" r="420" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#ffbf7a" stop-opacity=".55"/><stop offset=".4" stop-color="#d69b72" stop-opacity=".18"/><stop offset="1" stop-color="#d69b72" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="${u}-ember" cx="50%" cy="70%" r="60%">
        <stop offset="0" stop-color="#f2b277" stop-opacity=".9"/><stop offset="1" stop-color="#3a2618" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="${u}-trail" x1="1" y1="0" x2="0" y2="0">
        <stop offset="0" stop-color="#8ff0ff" stop-opacity=".75"/><stop offset="1" stop-color="#8ff0ff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="${u}-pod" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#eef4f8"/><stop offset="1" stop-color="#9fb0bf"/>
      </linearGradient>`;

    let b = `<rect width="${W}" height="${H}" fill="url(#${u}-sky)"/>`;
    // stars (more visible in the blackout)
    for (let i = 0; i < 140; i++) {
      b += `<circle cx="${f(110 + R() * 1380)}" cy="${f(70 + R() * 420)}" r="${f(.6 + R() * 1.3)}" fill="#fff" opacity="${f(.2 + R() * .7)}"/>`;
    }
    b += `<circle cx="1362" cy="128" r="60" fill="#e9e2cf" opacity=".12" filter="url(#${u}-b20)"/>
      <circle cx="1362" cy="128" r="32" fill="#e9e2cf"/><circle cx="1376" cy="120" r="30" fill="#07101e"/>`;

    // far skyline
    for (let i = 0; i < 18; i++) {
      const x = 100 + i * 80 + R() * 20, w = 60 + R() * 50, top = 400 + R() * 170;
      b += `<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(860 - top)}" fill="#0f182a"/>`;
    }

    function towerWindows(x, w, top, bottom, seed, litChance) {
      const r = rng(seed);
      let s = '';
      for (let yy = top + 24; yy < bottom - 20; yy += 26) {
        for (let xx = x + 12; xx < x + w - 18; xx += 22) {
          const v = r();
          if (v < litChance) {
            s += `<rect x="${f(xx)}" y="${f(yy)}" width="12" height="15" fill="#c98a5c" opacity="${f(.45 + r() * .35)}"/><rect x="${f(xx - 4)}" y="${f(yy - 3)}" width="20" height="21" fill="#d69b72" opacity=".18" filter="url(#${u}-b3)"/>`;
          } else {
            s += `<rect x="${f(xx)}" y="${f(yy)}" width="12" height="15" fill="#162238" opacity=".85"/>`;
          }
        }
      }
      return s;
    }
    const towers = [
      [190, 330, 250, 11], [560, 200, 380, 23], [760, 140, 320, 31], [1140, 160, 210, 47], [1300, 190, 340, 59]
    ];
    towers.forEach((t) => {
      b += `<rect x="${t[0]}" y="${t[2]}" width="${t[1]}" height="${860 - t[2]}" fill="#0a1220"/>
        <rect x="${t[0]}" y="${t[2]}" width="3" height="${860 - t[2]}" fill="#30425f" opacity=".5"/>
        ${towerWindows(t[0], t[1], t[2], 860, t[3], .035)}`;
    });
    b += `<line x1="${1220}" y1="210" x2="1220" y2="150" stroke="#1a2740" stroke-width="4"/>`;
    // low block
    b += `<rect x="100" y="650" width="460" height="210" fill="#080d18"/>${towerWindows(100, 460, 650, 860, 77, .06)}`;

    // ---- Billboards ----
    if (!ai) {
      b += `<g class="ads">
        <rect x="250" y="330" width="230" height="130" fill="#0a111d" stroke="#1f2c40" stroke-width="3"/>
        <text x="365" y="408" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="800" font-size="40" fill="#111a2a">NOVA·2050</text>
        <path d="M262 470 v-10 M468 470 v-10" stroke="#1f2c40" stroke-width="4"/>
        <rect x="1172" y="250" width="64" height="250" fill="#0a111d" stroke="#1f2c40" stroke-width="3"/>
      </g>`;
    } else {
      b += `<g class="ads">
        <rect x="230" y="310" width="270" height="170" fill="#ff4f9a" opacity=".45" filter="url(#${u}-b20)"/>
        <rect x="250" y="330" width="230" height="130" fill="url(#${u}-ad1)"/>
        <text x="365" y="402" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="800" font-size="40" fill="#fff">NOVA·2050</text>
        <text x="365" y="434" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="16" letter-spacing="4" fill="#ffe3f1">VIVE EL CIELO</text>
        <rect x="1150" y="240" width="108" height="270" fill="#ff7a3a" opacity=".45" filter="url(#${u}-b20)"/>
        <rect x="1172" y="250" width="64" height="250" fill="url(#${u}-ad2)"/>
        ${'МОСКВА'.split('').map((ch, i) => `<text x="1204" y="${292 + i * 38}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-weight="800" font-size="30" fill="#fff">${ch}</text>`).join('')}
      </g>`;
    }

    // ---- Cable + cabins ----
    const cy = (x) => 168 + (x - 110) * 96 / 1380;
    b += `<path d="M110 ${cy(110)} L1490 ${cy(1490)}" stroke="#2a3548" stroke-width="3"/>`;
    b += `<g class="cabins">`;
    [640, 820, 1000].forEach((x) => {
      const yy = cy(x);
      if (ai) {
        b += `<path d="M${x - 40} ${f(yy + 40)} L${x - 190} ${f(yy + 30)} L${x - 190} ${f(yy + 52)} L${x - 40} ${f(yy + 62)} Z" fill="url(#${u}-trail)" opacity=".7"/>
          <path d="M${x - 50} ${f(yy + 70)} L${x - 150} ${f(yy + 63)}" stroke="#8ff0ff" stroke-width="2" opacity=".5"/>`;
      }
      b += `<path d="M${x} ${f(yy)} L${x} ${f(yy + 18)}" stroke="#2a3548" stroke-width="3"/>
        <rect x="${x - 38}" y="${f(yy + 18)}" width="76" height="46" rx="16" fill="${ai ? `url(#${u}-pod)` : '#141c2a'}" stroke="${ai ? 'none' : '#2d3a50'}" stroke-width="2"/>
        <rect x="${x - 30}" y="${f(yy + 26)}" width="60" height="16" rx="6" fill="${ai ? '#8ff0ff' : '#0d1420'}"/>`;
      if (ai) {
        b += `<rect x="${x - 30}" y="${f(yy + 26)}" width="60" height="16" rx="6" fill="#8ff0ff" opacity=".6" filter="url(#${u}-b8)"/>
          <circle cx="${x + 36}" cy="${f(yy + 48)}" r="4" fill="#fff"/><circle cx="${x + 36}" cy="${f(yy + 48)}" r="14" fill="#bff6ff" opacity=".5" filter="url(#${u}-b8)"/>`;
      } else {
        b += `<path d="M${x - 30} ${f(yy + 19)} Q${x} ${f(yy + 15)} ${x + 30} ${f(yy + 19)}" stroke="#8a9bb5" stroke-opacity=".35" stroke-width="2" fill="none"/>`;
      }
    });
    b += `</g>`;

    // ---- Near building with windows ----
    b += `<rect x="880" y="520" width="460" height="340" fill="#080c16"/><rect x="880" y="520" width="460" height="4" fill="#24324a"/>`;
    const lit = { '3,0': 1, '0,2': 1, '4,3': 1, '2,3': 1 };
    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < 5; i++) {
        const wx = 880 + 92 * i + 20, wy = 560 + j * 78, key = i + ',' + j;
        if (i === 1 && j === 1) {
          if (ai) {
            b += `<g class="white-window"><circle cx="${wx + 26}" cy="${wy + 20}" r="150" fill="#eaf6ff" opacity=".22" filter="url(#${u}-b20)"/>
              <rect x="${wx - 10}" y="${wy - 10}" width="72" height="60" fill="#eaf6ff" opacity=".9" filter="url(#${u}-b8)"/>
              <rect x="${wx}" y="${wy}" width="52" height="40" fill="#ffffff"/></g>`;
          } else {
            b += `<g class="white-window"><rect x="${wx}" y="${wy}" width="52" height="40" fill="url(#${u}-ember)"/>
              <circle cx="${wx + 30}" cy="${wy + 32}" r="12" fill="#f2b277" opacity=".55" filter="url(#${u}-b3)"/>
              <rect x="${wx + 26}" y="${wy + 26}" width="8" height="12" rx="2" fill="#ffd9a0"/></g>`;
          }
        } else if (lit[key]) {
          b += `<rect x="${wx}" y="${wy}" width="52" height="40" fill="url(#${u}-ember)" opacity=".75"/>`;
        } else {
          b += `<rect x="${wx}" y="${wy}" width="52" height="40" fill="#111a2b"/>`;
        }
        b += `<rect x="${wx}" y="${wy + 40}" width="52" height="4" fill="#1a2436"/>`;
      }
    }

    // ---- Streets in the dark ----
    b += `<rect x="100" y="836" width="1400" height="30" fill="#05080f"/>
      <rect x="300" y="826" width="54" height="16" rx="6" fill="#0d1320"/><rect x="760" y="828" width="60" height="16" rx="6" fill="#0d1320"/><rect x="1180" y="826" width="54" height="16" rx="6" fill="#0d1320"/>
      <path d="M620 840 L660 862 L640 866 Z" fill="#ffd9a0" opacity=".25"/><circle cx="620" cy="840" r="2" fill="#ffe7c0"/>
      <path d="M1040 838 L1000 862 L1022 866 Z" fill="#ffd9a0" opacity=".2"/><circle cx="1040" cy="838" r="2" fill="#ffe7c0"/>`;

    // ---- Interior window frame ----
    b += `<path d="M0 0 H1600 V1000 H0 Z M100 60 V860 H1500 V60 Z" fill="#0a0d14" fill-rule="evenodd"/>
      <rect x="100" y="60" width="1400" height="800" fill="none" stroke="#1e1a18" stroke-width="12"/>
      <rect x="1118" y="60" width="14" height="800" fill="#0d1018"/>
      <rect x="1118" y="60" width="2" height="800" fill="#2a2420"/>
      <rect x="70" y="858" width="1460" height="36" fill="#1a1512"/>
      <rect x="70" y="858" width="1460" height="3" fill="#5a4030"/>
      <rect y="894" width="${W}" height="106" fill="#0b0a0c"/>`;
    // emergency lamp, cup, plant on the sill
    b += `<rect x="286" y="808" width="44" height="52" rx="6" fill="#33302c"/>
      <rect x="292" y="816" width="32" height="34" rx="4" fill="#ffcf8a"/>
      <path d="M294 808 Q308 784 322 808" stroke="#33302c" stroke-width="5" fill="none"/>
      <circle cx="308" cy="832" r="40" fill="#ffcf8a" opacity=".5" filter="url(#${u}-b20)"/>
      <rect x="420" y="836" width="30" height="24" rx="4" fill="#2a2522"/><path d="M450 842 q10 2 0 12" stroke="#2a2522" stroke-width="4" fill="none"/>
      <path d="M1378 860 L1384 822 L1424 822 L1430 860 Z" fill="#2a2018"/>
      <path d="M1404 822 Q1380 770 1354 760 M1404 822 Q1400 760 1412 736 M1404 822 Q1432 776 1462 770" stroke="#121812" stroke-width="10" fill="none" stroke-linecap="round"/>
      <rect width="${W}" height="${H}" fill="url(#${u}-lamp)" style="mix-blend-mode:screen"/>
      <ellipse cx="330" cy="760" rx="40" ry="24" fill="#ffcf8a" opacity=".06"/>`;

    return wrap(u, mode, defs, b, Object.assign({ label: ai ? 'Reconstrucción por IA de la noche del apagón' : 'Recuerdo original de la noche del apagón' }, opts));
  }

  global.Scenes = { dinner, street, blackout, W, H };
})(window);
