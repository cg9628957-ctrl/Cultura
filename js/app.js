/* ==========================================================================
   ¿Así lo recuerdas? — Lógica de la experiencia
   ========================================================================== */
(function () {
  'use strict';

  const S = window.Scenes;
  const NS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     Contenido de los tres casos
     Las áreas (x, y, w, h) están en coordenadas del viewBox 1600×1000.
     --------------------------------------------------------------------- */
  const CASES = [
    {
      n: 1,
      code: 'EXP-01',
      scene: 'dinner',
      title: 'Lo que permanece en la mesa',
      category: 'Recuerdo familiar',
      desc: 'Una cena familiar en casa de los abuelos.',
      coords: '55.7338° N · 37.6270° E',
      testimony: 'Recuerdo las cenas en casa de mis abuelos, en Moscú. Toda la familia se reunía alrededor de una mesa sencilla de madera para comer y conversar. Mi abuela siempre se encargaba de preparar la comida y, sobre la mesa, solo estaban los platos y lo que ella había servido. Mi abuelo acostumbraba sentarse junto a la ventana. Casi nunca hablaba, prefería observarnos mientras compartíamos. Recuerdo especialmente ese lugar junto a la ventana porque, aunque no decía mucho, siempre estaba presente.',
      explanation: 'Esta es la versión de quien vivió ese momento. Aunque la reconstrucción parecía representar una reunión familiar, la IA modificó algunos detalles importantes de la experiencia, como la actitud del abuelo y los elementos que estaban presentes en la mesa.',
      diffs: [
        {
          areas: [{ x: 280, y: 185, w: 205, h: 270 }],
          label: 'El abuelo sonríe y conversa',
          ai: 'La IA muestra al abuelo de frente, sonriendo y participando en la conversación con todos.',
          real: 'En realidad, casi nunca hablaba: permanecía de perfil, en silencio, observando a su familia.',
          quote: 'Casi nunca hablaba, prefería observarnos mientras compartíamos.'
        },
        {
          areas: [{ x: 0, y: 0, w: 1075, h: 190 }, { x: 0, y: 190, w: 280, h: 290 }],
          label: 'La ventana ha desaparecido',
          ai: 'La reconstrucción omite la gran ventana y la sustituye por una pared empapelada con un cuadro y apliques de luz.',
          real: 'El abuelo acostumbraba sentarse junto a la ventana; era el lugar que mejor lo recordaba.',
          quote: 'Recuerdo especialmente ese lugar junto a la ventana porque, aunque no decía mucho, siempre estaba presente.'
        },
        {
          areas: [{ x: 782, y: 358, w: 247, h: 270 }, { x: 1045, y: 520, w: 125, h: 135 }],
          label: 'Flores y velas sobre la mesa',
          ai: 'La IA agrega un ramo de flores en un jarrón y dos velas encendidas que nunca estuvieron en la mesa.',
          real: 'Sobre la mesa solo estaban los platos y la comida que había preparado la abuela.',
          quote: 'Sobre la mesa, solo estaban los platos y lo que ella había servido.'
        }
      ]
    },
    {
      n: 2,
      code: 'EXP-02',
      scene: 'street',
      title: 'La calle donde crecí',
      category: 'Recuerdo urbano',
      desc: 'Una calle de las zonas bajas de Moscú antes de su transformación.',
      coords: '55.6812° N · 37.7104° E',
      testimony: 'Recuerdo las tardes en la calle donde crecí, en las zonas bajas de Moscú. Vivíamos en edificios pequeños, sencillos y algo deteriorados. Los niños jugábamos cerca de las entradas, mientras los vecinos conversaban en las aceras y algunas personas compraban en una pequeña tienda de barrio, atendida por su dueño. En aquella época todavía no existían las rutas de transporte aéreo que hoy atraviesan esa parte de la ciudad. Era un lugar humilde, pero siempre estaba lleno de vida. Hoy, en su lugar, se levantan enormes edificios y construcciones modernas.',
      explanation: 'Esta es la versión de quien vivió ese momento. Aunque la reconstrucción parecía representar aquella calle, la IA incorporó elementos propios de su época al intentar recrear el pasado, modificando pequeños detalles de cómo era realmente ese lugar.',
      diffs: [
        {
          areas: [{ x: 0, y: 0, w: 860, h: 292 }, { x: 858, y: 0, w: 196, h: 680 }, { x: 0, y: 612, w: 860, h: 296 }],
          label: 'Fachadas de lujo',
          ai: 'El edificio aparece con fachada de vidrio, remates dorados, mármol y un zócalo de granito pulido.',
          real: 'Eran edificios pequeños, sencillos y algo deteriorados, propios de las zonas bajas.',
          quote: 'Vivíamos en edificios pequeños, sencillos y algo deteriorados.'
        },
        {
          areas: [{ x: 104, y: 290, w: 626, h: 322 }],
          label: 'Una tienda automatizada',
          ai: 'La tienda «Хлеб · Продукты» se convierte en un quiosco automático abierto 24/7, sin nadie que lo atienda.',
          real: 'Era una pequeña tienda de pan y productos, en un edificio sencillo, atendida por su dueño.',
          quote: 'Algunas personas compraban en una pequeña tienda de barrio, atendida por su dueño.'
        },
        {
          areas: [{ x: 1000, y: 28, w: 600, h: 140 }],
          label: 'Cabinas sobre la calle',
          ai: 'Aparecen cabinas de transporte aéreo cruzando el cielo de la calle.',
          real: 'En aquella época esas estructuras todavía no existían: el cielo estaba despejado.',
          quote: 'En aquella época todavía no existían las rutas de transporte aéreo que hoy atraviesan esa parte de la ciudad.'
        }
      ]
    },
    {
      n: 3,
      code: 'EXP-03',
      scene: 'blackout',
      title: 'La noche sin luz',
      category: 'Acontecimiento colectivo (testimonio individual)',
      shortCategory: 'Acontecimiento colectivo',
      desc: 'Un apagón que dejó sin electricidad a un sector de Moscú.',
      coords: '55.7963° N · 37.5389° E',
      testimony: 'Recuerdo aquella noche en la que una falla eléctrica dejó sin luz nuestro sector de Moscú. Desde la ventana de mi apartamento podía ver los edificios y las calles a oscuras. Solo algunas ventanas conservaban una luz tenue, porque los vecinos habían encendido pequeñas lámparas de emergencia. Los grandes anuncios luminosos de los edificios se apagaron por completo y las cabinas del transporte aéreo dejaron de circular. Nunca había visto la ciudad así.',
      explanation: 'Esta es la versión de quien vivió esa noche. Aunque la IA logró representar el apagón, no interpretó correctamente sus efectos: mantuvo activos algunos sistemas de la ciudad y confundió la luz de emergencia con la iluminación eléctrica habitual.',
      diffs: [
        {
          areas: [{ x: 1095, y: 345, w: 210, h: 140 }, { x: 1145, y: 595, w: 280, h: 60 }],
          label: 'Luces publicitarias encendidas',
          ai: 'Las torres conservan sus coronas de luces LED y un letrero comercial sigue iluminado en plena falla eléctrica.',
          real: 'Durante el apagón, los grandes anuncios luminosos dejaron de funcionar.',
          quote: 'Los grandes anuncios luminosos de los edificios se apagaron por completo.'
        },
        {
          areas: [{ x: 1165, y: 495, w: 100, h: 85 }],
          label: 'Una ventana con luz eléctrica',
          ai: 'Una ventana aparece iluminada intensamente con luz blanca, como si tuviera electricidad normal.',
          real: 'La luz era tenue y cálida: provenía de una pequeña lámpara de emergencia.',
          quote: 'Solo algunas ventanas conservaban una luz tenue, porque los vecinos habían encendido pequeñas lámparas de emergencia.'
        },
        {
          areas: [{ x: 510, y: 175, w: 680, h: 100 }],
          label: 'Cabinas en circulación',
          ai: 'Las cabinas del transporte aéreo aparecen circulando, con luces y estelas de movimiento.',
          real: 'Durante el apagón, las cabinas quedaron detenidas y a oscuras.',
          quote: 'Las cabinas del transporte aéreo dejaron de circular.'
        }
      ]
    }
  ];

  const MISS_MSGS = [
    'Ese detalle parece coincidir con el testimonio. Sigue explorando.',
    'Nada extraño aquí. Observa la imagen con más atención.',
    'La reconstrucción parece fiel en esta zona. Busca en otra parte.',
    'Vuelve a pensar en el testimonio y sigue buscando.'
  ];

  /* ---------------------------------------------------------------------
     Utilidades
     --------------------------------------------------------------------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, '0');
  const caseHash = (n) => '#caso-' + pad(n);

  const KEY = 'asi-lo-recuerdas:explorados';
  const memDone = new Set();
  function getDone() {
    let arr = [];
    try { arr = JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { arr = []; }
    arr.forEach((n) => memDone.add(n));
    return memDone;
  }
  function markDone(n) {
    memDone.add(n);
    try { localStorage.setItem(KEY, JSON.stringify(Array.from(memDone))); } catch (e) { /* almacenamiento no disponible */ }
    updateProgress();
  }

  let toastTimer;
  function toast(msg, good) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.toggle('good', !!good);
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function renderScene(el, key, mode, opts) {
    el.innerHTML = S[key](mode, opts);
    return el.querySelector('svg');
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach((k) => el.setAttribute(k, attrs[k]));
    return el;
  }

  function ensureGlow(svg) {
    const id = svg.dataset.uid + '-glow';
    if (!svg.getElementById || !svg.querySelector('#' + id)) {
      const filter = svgEl('filter', { id: id, x: '-20%', y: '-20%', width: '140%', height: '140%' });
      filter.appendChild(svgEl('feGaussianBlur', { stdDeviation: '7', result: 'b' }));
      const merge = svgEl('feMerge');
      merge.appendChild(svgEl('feMergeNode', { in: 'b' }));
      merge.appendChild(svgEl('feMergeNode', { in: 'SourceGraphic' }));
      filter.appendChild(merge);
      svg.querySelector('defs').appendChild(filter);
    }
    return id;
  }

  /* Dibuja el contorno luminoso + número de una diferencia */
  function drawMark(svg, diff, index, variant) {
    const glow = ensureGlow(svg);
    const g = svgEl('g', { class: 'mark' + (variant ? ' mark-' + variant : '') });
    const color = variant === 'real' ? '#DED3BA' : '#00FFA7';
    const P = 10;
    // En pantallas pequeñas la imagen se reduce mucho: engrosamos contornos y números
    const w = svg.getBoundingClientRect().width || 900;
    const k = Math.min(2.6, Math.max(1, 820 / w));
    diff.areas.forEach((a) => {
      g.appendChild(svgEl('rect', {
        class: 'mark-outline', x: a.x - P, y: a.y - P, width: a.w + P * 2, height: a.h + P * 2,
        rx: 22, pathLength: 1, filter: variant === 'real' ? '' : 'url(#' + glow + ')',
        style: 'stroke-width:' + (5 * k).toFixed(1)
      }));
    });
    const a0 = diff.areas[0];
    const R = 26 * k;
    const cx = Math.max(R + 8, Math.min(1592 - R, a0.x - P + 4)), cy = Math.max(R + 8, Math.min(992 - R, a0.y - P + 4));
    const badge = svgEl('g', { class: 'mark-badge' });
    badge.appendChild(svgEl('circle', { cx: cx, cy: cy, r: R, fill: color }));
    const t = svgEl('text', {
      x: cx, y: cy + R * .35, 'text-anchor': 'middle', 'font-family': 'Manrope, sans-serif',
      'font-weight': '700', 'font-size': (26 * k).toFixed(1), fill: '#0E0F10'
    });
    t.textContent = String(index + 1);
    badge.appendChild(t);
    g.appendChild(badge);
    let layer = svg.querySelector('g.marks');
    if (!layer) { layer = svgEl('g', { class: 'marks' }); svg.appendChild(layer); }
    layer.appendChild(g);
  }

  function toSvgPoint(svg, evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    return pt.matrixTransform(ctm.inverse());
  }

  function hitTest(diffs, p, tol) {
    let best = null, bestArea = Infinity;
    diffs.forEach((d, i) => {
      d.areas.forEach((a) => {
        if (p.x >= a.x - tol && p.x <= a.x + a.w + tol && p.y >= a.y - tol && p.y <= a.y + a.h + tol) {
          const area = a.w * a.h;
          if (area < bestArea) { bestArea = area; best = i; }
        }
      });
    });
    return best;
  }

  /* ---------------------------------------------------------------------
     Vista principal
     --------------------------------------------------------------------- */
  function buildHome() {
    $$('[data-scene]').forEach((el) => renderScene(el, el.dataset.scene, el.dataset.mode, { fit: 'slice', aberration: false }));

    // Collage de recuerdos: posiciones de reposo en escritorio (x, y, w, r) y en móvil (mx, my, mw)
    const LAYOUT = [
      { x: '27%', y: '20%', w: '31%', r: '-4deg', mx: '2%', my: '3%', mw: '70%', z: 6 },
      { x: '50%', y: '4%', w: '29%', r: '3deg', mx: '28%', my: '20%', mw: '70%', z: 5 },
      { x: '62%', y: '44%', w: '29%', r: '6deg', mx: '6%', my: '38%', mw: '68%', z: 7 }
    ];
    const memos = $('#memos');
    memos.innerHTML = CASES.map((c, i) => {
      const L = LAYOUT[i];
      return `
      <button class="memo" type="button" data-case="${c.n}" aria-label="Caso ${pad(c.n)}: ${c.title}"
        style="--x:${L.x};--y:${L.y};--w:${L.w};--r:${L.r};--mx:${L.mx};--my:${L.my};--mw:${L.mw};--z:${L.z}">
        <span class="memo-flag" data-status="${c.n}" hidden>Explorado</span>
        <span class="memo-paper">
          <img src="${S.IMAGES[c.scene].ai}" alt="" loading="lazy">
          <span class="memo-cap mono"><span>${c.code} · ${c.shortCategory || c.category}</span><span>${c.coords.split(' · ')[0]}</span></span>
        </span>
      </button>`;
    }).join('');
    bindCollage();

    const sheet = $('#contact-sheet');
    sheet.innerHTML = CASES.map((c) => `
      <figure class="sheet-item"><div class="sheet-img memory"></div><figcaption>${c.code} · versión de quien lo vivió</figcaption></figure>`).join('');
    $$('.sheet-img', sheet).forEach((el, i) => renderScene(el, CASES[i].scene, 'real', { fit: 'slice' }));
  }

  /* Selección de recuerdos: la foto elegida pasa al frente y aparece la ficha */
  let activeMemo = null;
  function selectMemo(n) {
    const stage = $('#stage');
    const info = $('#info');
    activeMemo = n;
    $$('.memo', stage).forEach((m) => {
      const on = +m.dataset.case === n;
      m.classList.toggle('is-active', on);
      m.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    stage.classList.toggle('has-active', n !== null);
    if (n === null) {
      info.classList.remove('show');
      setTimeout(() => { if (activeMemo === null) info.hidden = true; }, 450);
      return;
    }
    const c = CASES[n - 1];
    $('#info-title').textContent = 'Caso ' + pad(c.n);
    $('#info-name').textContent = c.title;
    $('#info-desc').textContent = c.desc;
    $('#info-cat').textContent = c.category + '.';
    $('#info-meta').textContent = c.code + ' · ' + c.coords + (getDone().has(c.n) ? ' · explorado' : '');
    $('#info-open').href = caseHash(c.n);
    info.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => info.classList.add('show')));
  }

  function bindCollage() {
    const stage = $('#stage');
    $$('.memo', stage).forEach((m) => m.addEventListener('click', (e) => {
      e.stopPropagation();
      const n = +m.dataset.case;
      if (activeMemo === n) { location.hash = caseHash(n); return; }
      selectMemo(n);
    }));
    $('#info-close').addEventListener('click', (e) => { e.stopPropagation(); selectMemo(null); });
    $('#info').addEventListener('click', (e) => e.stopPropagation());
    stage.addEventListener('click', () => { if (activeMemo !== null) selectMemo(null); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && activeMemo !== null) selectMemo(null); });
  }

  function updateProgress() {
    const done = getDone();
    $('#progress-count').textContent = done.size;
    $$('[data-status]').forEach((el) => {
      el.hidden = !done.has(+el.dataset.status);
    });
    const rp = $('#reflection-progress');
    if (rp) {
      rp.textContent = done.size === 3
        ? 'Has explorado los tres recuerdos'
        : `Recuerdos explorados: ${done.size} de 3`;
    }
  }

  /* Revelado al hacer scroll */
  let io;
  function observeReveals(root) {
    const els = $$('.reveal:not(.in)', root);
    if (!('IntersectionObserver' in window) || reduceMotion) { els.forEach((e) => e.classList.add('in')); return; }
    if (!io) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    els.forEach((e) => io.observe(e));
  }

  /* ---------------------------------------------------------------------
     Vista de caso
     --------------------------------------------------------------------- */
  const state = { c: null, step: 1, reconstructed: false, found: new Set(), complete: false, misses: 0, reconTimer: null };

  function openCase(n) {
    const c = CASES[n - 1];
    state.c = c; state.reconstructed = false; state.found = new Set(); state.complete = false; state.misses = 0;
    clearInterval(state.reconTimer);

    $('#case-code').textContent = c.code;
    $('#case-bar-title').textContent = c.title;
    $('#t-code').textContent = 'Testimonio ' + pad(c.n) + '-A';
    $('#t-coords').textContent = c.coords;
    $('#t-case').textContent = 'Caso ' + pad(c.n);
    $('#t-title').textContent = c.title;
    $('#t-category').textContent = 'Categoría: ' + c.category + '.';
    playTestimony(c.testimony);

    // Reiniciar el panel de reconstrucción
    const frame = $('#recon-frame');
    frame.classList.remove('developing');
    const old = frame.querySelector('svg');
    if (old) old.remove();
    $('#recon-placeholder').hidden = false;
    $('#recon-status').hidden = true;
    $('#recon-fidelity').textContent = 'Esperando instrucciones';
    $('#recon-fidelity').classList.remove('ok');
    $('#btn-reconstruct').hidden = false;
    $('#btn-reconstruct').disabled = false;
    $('#btn-find').hidden = true;

    $('#home').hidden = true;
    const view = $('#case');
    view.hidden = false;
    view.style.animation = 'none'; void view.offsetWidth; view.style.animation = '';
    goStep(1, true);
    document.title = c.title + ' · ¿Así lo recuerdas?';
  }

  /* Testimonio escrito: el texto de quien lo vivió aparece en pantalla
     palabra a palabra, como un mensaje que se abre; al terminar queda fijo. */
  let entryTimer = null;
  function playTestimony(text) {
    const q = $('#t-quote');
    const entry = $('#entry');
    const words = ('«' + text + '»').split(' ');
    const step = reduceMotion ? 0 : 0.035;
    q.setAttribute('aria-label', '«' + text + '»');
    q.innerHTML = words.map((w, i) => `<span class="wd" aria-hidden="true" style="--i:${(i * step).toFixed(3)}s">${w}</span>`).join(' ');
    clearTimeout(entryTimer);
    entry.classList.remove('done');
    entry.classList.add('writing');
    entryTimer = setTimeout(() => { entry.classList.remove('writing'); entry.classList.add('done'); }, reduceMotion ? 0 : words.length * step * 1000 + 500);
  }

  function stepAllowed(n) {
    if (n === 1) return true;
    if (n === 2) return state.reconstructed;
    if (n === 3) return state.complete;
    return false;
  }

  function goStep(n, instant) {
    if (!stepAllowed(n)) return;
    state.step = n;
    $$('.case-view .step').forEach((s) => { s.hidden = +s.dataset.step !== n; });
    $$('#stepper li').forEach((li) => {
      const k = +li.dataset.step;
      li.classList.toggle('is-active', k === n);
      li.classList.toggle('is-done', k < n || (k === 2 && state.complete && n !== 2) || (k === 1 && state.reconstructed && n !== 1));
      li.classList.toggle('is-locked', !stepAllowed(k));
      li.querySelector('button').setAttribute('aria-current', k === n ? 'step' : 'false');
    });
    if (n === 2) startGame();
    if (n === 3) buildOriginal();
    window.scrollTo({ top: 0, behavior: instant || reduceMotion ? 'auto' : 'smooth' });
  }

  /* --- 03 · Reconstrucción --- */
  function reconstruct() {
    const c = state.c;
    const frame = $('#recon-frame');
    $('#btn-reconstruct').disabled = true;
    $('#recon-placeholder').hidden = true;
    const holder = document.createElement('div');
    holder.innerHTML = S[c.scene]('ai');
    const svg = holder.firstElementChild;
    frame.insertBefore(svg, frame.firstChild);
    frame.classList.add('developing');

    const phases = ['Analizando testimonio', 'Identificando elementos clave', 'Completando detalles faltantes', 'Renderizando escena'];
    const status = $('#recon-status');
    status.hidden = false;
    const dur = reduceMotion ? 1 : 3400, t0 = performance.now();
    clearInterval(state.reconTimer);
    state.reconTimer = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / dur);
      $('#recon-pct').textContent = Math.round(p * 100) + ' %';
      $('#recon-phase').textContent = phases[Math.min(phases.length - 1, Math.floor(p * phases.length))];
      if (p >= 1) {
        clearInterval(state.reconTimer);
        state.reconstructed = true;
        status.hidden = true;
        $('#recon-fidelity').textContent = 'Reconstrucción completada · fidelidad estimada 96,4 %';
        $('#recon-fidelity').classList.add('ok');
        $('#btn-reconstruct').hidden = true;
        $('#btn-find').hidden = false;
        $('#btn-find').focus({ preventScroll: true });
        $$('#stepper li')[1].classList.remove('is-locked');
        $$('#stepper li')[0].classList.add('is-done');
      }
    }, 60);
  }

  /* --- 04 · Encontrar diferencias --- */
  function startGame() {
    const c = state.c;
    const frame = $('#game-frame');
    frame.classList.remove('is-complete');
    const svg = renderScene(frame, c.scene, 'ai');
    // Redibujar las diferencias ya encontradas (si se vuelve a este paso)
    Array.from(state.found).forEach((i) => drawMark(svg, c.diffs[i], i, 'static'));

    renderFoundList();
    updateCounter(false);
    $('#complete').hidden = !state.complete;
    if (state.complete) frame.classList.add('is-complete');

    svg.addEventListener('click', onGameClick);
  }

  function onGameClick(evt) {
    if (state.complete) return;
    const svg = evt.currentTarget;
    const p = toSvgPoint(svg, evt);
    if (!p) return;
    const c = state.c;
    const tol = window.innerWidth < 640 ? 40 : 14;
    const i = hitTest(c.diffs, p, tol);
    if (i !== null && !state.found.has(i)) {
      state.found.add(i);
      drawMark(svg, c.diffs[i], i);
      renderFoundList(i);
      updateCounter(true);
      if (state.found.size === 3) {
        finish();
      } else {
        toast('Diferencia encontrada: ' + c.diffs[i].label + '.', true);
      }
    } else if (i !== null) {
      toast('Ya encontraste este detalle. Busca otro.');
    } else {
      const k = Math.min(2.6, Math.max(1, 820 / (svg.getBoundingClientRect().width || 900)));
      const ring = svgEl('circle', { class: 'miss', cx: p.x, cy: p.y, r: 46 * k, style: 'stroke-width:' + (3 * k).toFixed(1) });
      svg.appendChild(ring);
      setTimeout(() => ring.remove(), 1000);
      toast(MISS_MSGS[state.misses % MISS_MSGS.length]);
      state.misses++;
    }
  }

  function renderFoundList(justFound) {
    const c = state.c;
    $('#found-list').innerHTML = c.diffs.map((d, i) => {
      const on = state.found.has(i);
      return `<li class="${on ? 'on' : ''}"><b>${pad(i + 1)}</b><span>${on ? d.label : 'Diferencia por descubrir'}</span></li>`;
    }).join('');
    void justFound;
  }

  function updateCounter(bump) {
    const n = state.found.size;
    $('#count').textContent = n;
    $$('.counter-dots i').forEach((d, k) => d.classList.toggle('on', k < n));
    const counter = $('#counter');
    if (bump) { counter.classList.remove('bump'); void counter.offsetWidth; counter.classList.add('bump'); }
  }

  function finish() {
    state.complete = true;
    markDone(state.c.n);
    const frame = $('#game-frame');
    frame.classList.add('is-complete');
    $$('#stepper li')[2].classList.remove('is-locked');
    $$('#stepper li')[1].classList.add('is-done');
    toast('¡Has encontrado las tres diferencias!', true);
    setTimeout(() => {
      const box = $('#complete');
      box.hidden = false;
      box.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }, reduceMotion ? 0 : 900);
  }

  /* --- 05 · La versión de quien lo vivió --- */
  function buildOriginal() {
    const c = state.c;
    $('#orig-title').textContent = c.title;
    $('#orig-text').textContent = c.explanation;

    const aiSvg = renderScene($('#cmp-ai'), c.scene, 'ai', { aberration: false });
    const realSvg = renderScene($('#cmp-real'), c.scene, 'real');
    c.diffs.forEach((d, i) => { drawMark(aiSvg, d, i, 'static'); drawMark(realSvg, d, i, 'real'); });
    setPos(50);

    $('#errors').innerHTML = c.diffs.map((d, i) => `
      <article class="err">
        <div class="err-ai">
          <span class="err-num">${pad(i + 1)}</span>
          <h4>${d.label}</h4>
          <span class="err-tag">Lo que mostró la IA</span>
          <p>${d.ai}</p>
        </div>
        <div class="err-real paper">
          <span class="err-tag">Lo que recuerda quien lo vivió</span>
          <p>${d.real}</p>
          <blockquote>«${d.quote}»</blockquote>
        </div>
      </article>`).join('');

    const done = getDone();
    $('#mini-cases').innerHTML = CASES.map((k) => `
      <a href="${caseHash(k.n)}" class="${k.n === c.n ? 'is-current' : ''} ${done.has(k.n) ? 'is-done' : ''}"><b>${pad(k.n)}</b>${k.title}</a>`).join('');

    // Siguiente: el primer caso pendiente después del actual; si no queda ninguno, el siguiente en orden
    let next = null;
    for (let k = 1; k <= 3; k++) {
      const cand = ((c.n - 1 + k) % 3) + 1;
      if (!done.has(cand)) { next = cand; break; }
    }
    const btnNext = $('#btn-next');
    const allDone = next === null;
    if (allDone) next = (c.n % 3) + 1;
    btnNext.href = caseHash(next);
    btnNext.lastChild.textContent = allDone ? 'Revisar otro recuerdo' : 'Siguiente recuerdo: ' + CASES[next - 1].title;
    $('#btn-to-reflection').classList.toggle('btn-solid', allDone);
  }

  function setPos(p) {
    p = Math.max(0, Math.min(100, p));
    const cmp = $('#compare');
    cmp.style.setProperty('--pos', p + '%');
    cmp.setAttribute('aria-valuenow', Math.round(p));
    cmp.setAttribute('aria-valuetext', p > 66 ? 'Reconstrucción IA' : p < 34 ? 'Recuerdo original' : 'Comparación');
    $$('.cmp-controls button').forEach((b) => b.classList.toggle('is-on', +b.dataset.pos === Math.round(p)));
  }

  function bindCompare() {
    const cmp = $('#compare');
    let dragging = false;
    const fromEvt = (e) => {
      const r = cmp.getBoundingClientRect();
      setPos(((e.clientX - r.left) / r.width) * 100);
    };
    cmp.addEventListener('pointerdown', (e) => {
      dragging = true;
      try { cmp.setPointerCapture(e.pointerId); } catch (err) { /* noop */ }
      fromEvt(e);
    });
    cmp.addEventListener('pointermove', (e) => { if (dragging) fromEvt(e); });
    const stop = () => { dragging = false; };
    cmp.addEventListener('pointerup', stop);
    cmp.addEventListener('pointercancel', stop);
    cmp.addEventListener('keydown', (e) => {
      const cur = parseFloat(cmp.style.getPropertyValue('--pos')) || 50;
      if (e.key === 'ArrowLeft') { setPos(cur - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight') { setPos(cur + 5); e.preventDefault(); }
      if (e.key === 'Home') { setPos(0); e.preventDefault(); }
      if (e.key === 'End') { setPos(100); e.preventDefault(); }
    });
    $$('.cmp-controls button').forEach((b) => b.addEventListener('click', () => {
      cmp.classList.add('animating');
      setPos(+b.dataset.pos);
    }));
  }

  /* ---------------------------------------------------------------------
     Navegación
     --------------------------------------------------------------------- */
  function showHome(targetId) {
    const home = $('#home');
    const wasHidden = home.hidden;
    $('#case').hidden = true;
    home.hidden = false;
    document.title = '¿Así lo recuerdas? · Archivo de memoria · Moscú 2050';
    if (wasHidden) { home.style.animation = 'none'; void home.offsetWidth; home.style.animation = ''; }
    updateProgress();
    const target = targetId && document.getElementById(targetId);
    requestAnimationFrame(() => {
      if (target && targetId !== 'inicio') {
        target.scrollIntoView({ behavior: wasHidden || reduceMotion ? 'auto' : 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: wasHidden || reduceMotion ? 'auto' : 'smooth' });
      }
      observeReveals(home);
    });
  }

  function route() {
    const h = location.hash;
    const m = h.match(/^#caso-0?([1-3])$/);
    if (m) { openCase(+m[1]); return; }
    showHome(h ? h.slice(1) : null);
  }

  function bind() {
    window.addEventListener('hashchange', route);
    $('#btn-reconstruct').addEventListener('click', reconstruct);
    $('#btn-find').addEventListener('click', () => goStep(2));
    $('#btn-reveal').addEventListener('click', () => goStep(3));
    $$('#stepper li').forEach((li) => li.querySelector('button').addEventListener('click', () => {
      const k = +li.dataset.step;
      if (stepAllowed(k)) goStep(k);
      else toast(k === 2 ? 'Primero genera la reconstrucción de la IA.' : 'Encuentra las tres diferencias para desbloquear este paso.');
    }));
    // Enlaces a la misma ruta (p. ej. pulsar "Recuerdos" estando ya ahí) también deben desplazar
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === location.hash && !/^#caso-/.test(href)) { e.preventDefault(); route(); }
      if (href === location.hash && /^#caso-/.test(href)) { e.preventDefault(); route(); }
    });
    bindCompare();
  }

  /* ---------------------------------------------------------------------
     Portada animada: titular que aparece letra a letra, haz de luz,
     partículas y fragmentos de memoria y de la ciudad que flotan.
     --------------------------------------------------------------------- */
  const ICONS = {
    ventana: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18"/><path d="M12 3v18M4 12h16"/></svg>',
    cabina: '<svg viewBox="0 0 24 24"><path d="M2 4l20 3M12 5.5V9"/><rect x="6" y="9" width="12" height="10" rx="3"/><path d="M8 12h8"/></svg>',
    lampara: '<svg viewBox="0 0 24 24"><path d="M12 2v5M7 7h10l2 6H5z"/><path d="M10 16a2 2 0 0 0 4 0"/></svg>',
    edificio: '<svg viewBox="0 0 24 24"><path d="M5 21V5l7-3v19M12 9h7v12M8 8h1M8 12h1M8 16h1M15 13h1M15 17h1M3 21h18"/></svg>',
    camara: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="3.5"/><path d="M8 7l2-3h4l2 3"/></svg>',
    taza: '<svg viewBox="0 0 24 24"><path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 11h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3"/></svg>',
    llave: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M16 16l2-2M18 18l2-2"/></svg>',
    estrella: '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 6 6.4.6-4.8 4.3 1.4 6.3L12 17l-5.6 3.2 1.4-6.3L3 9.6 9.4 9z"/></svg>'
  };
  const FLOATERS = [
    { t: 'word', v: 'ПАМЯТЬ', x: 9, y: 30, fs: 26, o: .28, bl: 0, dz: 18 },
    { t: 'word', v: 'МОСКВА', x: 76, y: 18, fs: 20, o: .22, bl: 1, dz: 12 },
    { t: 'word', v: 'ДОМ', x: 84, y: 60, fs: 30, o: .2, bl: 2, dz: 24, pink: true },
    { t: 'word', v: 'УЛИЦА', x: 15, y: 66, fs: 18, o: .22, bl: 1, dz: 10 },
    { t: 'word', v: 'СВЕТ', x: 62, y: 80, fs: 22, o: .18, bl: 2, dz: 16 },
    { t: 'word', v: 'ОКНО', x: 30, y: 12, fs: 16, o: .2, bl: 1, dz: 8 },
    { t: 'icon', v: 'ventana', x: 22, y: 42, fs: 38, o: .32, bl: 0, dz: 22 },
    { t: 'icon', v: 'cabina', x: 70, y: 36, fs: 44, o: .3, bl: 0, dz: 26 },
    { t: 'icon', v: 'lampara', x: 88, y: 40, fs: 30, o: .26, bl: 1, dz: 14 },
    { t: 'icon', v: 'edificio', x: 6, y: 52, fs: 36, o: .24, bl: 1, dz: 12 },
    { t: 'icon', v: 'camara', x: 40, y: 84, fs: 30, o: .22, bl: 2, dz: 18 },
    { t: 'icon', v: 'taza', x: 80, y: 74, fs: 28, o: .22, bl: 1, dz: 20 },
    { t: 'icon', v: 'llave', x: 52, y: 10, fs: 24, o: .2, bl: 2, dz: 10 },
    { t: 'icon', v: 'estrella', x: 92, y: 12, fs: 18, o: .3, bl: 0, dz: 8 },
    { t: 'photo', v: 'img/caso1-real.jpg', x: 4, y: 14, fs: 120, o: .3, bl: 1, dz: 30, r: -8 },
    { t: 'photo', v: 'img/caso2-real.jpg', x: 82, y: 82, fs: 110, o: .26, bl: 2, dz: 28, r: 7 },
    { t: 'photo', v: 'img/caso3-real.jpg', x: 68, y: 6, fs: 96, o: .22, bl: 2, dz: 20, r: 4 },
    { t: 'tag', v: 'FRAGMENTO 0347', x: 26, y: 76, o: .55, bl: 0, dz: 14 },
    { t: 'tag', v: 'TESTIMONIO ESCRITO', x: 64, y: 54, o: .45, bl: 1, dz: 18 }
  ];

  function initHero() {
    const hero = $('#inicio');
    if (!hero) return;

    // 1. Titular dividido en palabras y letras
    const title = $('#hero-title');
    const words = title.textContent.trim().split(/\s+/);
    title.setAttribute('aria-label', title.textContent.trim());
    let i = 0;
    title.innerHTML = words.map((w, wi) => {
      const chars = Array.from(w).map((ch) => `<span class="ch" style="--i:${i++}">${ch}</span>`).join('');
      i += 2;
      return `<span class="w${wi === words.length - 1 ? ' pink' : ''}" aria-hidden="true">${chars}</span>`;
    }).join(' ');
    setTimeout(() => title.classList.add('glow'), reduceMotion ? 0 : 2400);

    // 2. Elementos flotantes
    const fl = $('#hero-float');
    fl.innerHTML = FLOATERS.map((f, k) => {
      let inner;
      if (f.t === 'word') inner = `<span class="fl-word${f.pink ? ' pink' : ''}">${f.v}</span>`;
      else if (f.t === 'icon') inner = `<span class="fl-icon">${ICONS[f.v]}</span>`;
      else if (f.t === 'photo') inner = `<span class="fl-photo"><img src="${f.v}" alt="" loading="lazy"></span>`;
      else inner = `<span class="fl-tag">${f.v}</span>`;
      const style = `--x:${f.x}%;--y:${f.y}%;--fs:${f.fs || 12}px;--o:${f.o};--bl:${f.bl}px;--dz:${(f.dz / 12).toFixed(2)};--rot:${f.r || (k % 2 ? 4 : -4)}deg;--fd:${(0.6 + (k % 7) * 0.22).toFixed(2)}s;--dur:${(6 + (k % 5) * 1.4).toFixed(1)}s`;
      return `<span class="fl" style="${style}">${inner}</span>`;
    }).join('');
    if (!reduceMotion) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        fl.style.setProperty('--px', (((e.clientX - r.left) / r.width) - .5) * -40);
        fl.style.setProperty('--py', (((e.clientY - r.top) / r.height) - .5) * -30);
      });
      hero.addEventListener('pointerleave', () => { fl.style.setProperty('--px', 0); fl.style.setProperty('--py', 0); });
    }

    // 3. Porcentaje del HUD
    const pct = $('#hud-pct');
    if (pct) {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / 2600);
        pct.textContent = Math.round(87 * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      reduceMotion ? (pct.textContent = 87) : requestAnimationFrame(tick);
    }

    // 4. Partículas de luz (polvo en el haz)
    const cv = $('#hero-dust');
    if (!cv || reduceMotion) return;
    const ctx = cv.getContext('2d');
    let W = 0, H = 0, dpr = 1, parts = [];
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = hero.clientWidth; H = hero.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(110, W / 12));
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anyY) => {
      const inBeam = Math.random() < .7;
      const x = inBeam ? W / 2 + (Math.random() - .5) * W * .45 : Math.random() * W;
      return { x, y: anyY ? Math.random() * H : H + 10, r: Math.random() * 1.6 + .3, vy: -(Math.random() * .35 + .08), vx: (Math.random() - .5) * .15, a: Math.random() * .6 + .2, tw: Math.random() * Math.PI * 2, pink: Math.random() < .45 };
    };
    let visible = true;
    new IntersectionObserver((en) => { visible = en[0].isIntersecting; }).observe(hero);
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, W, H);
        for (const p of parts) {
          p.x += p.vx; p.y += p.vy; p.tw += .04;
          if (p.y < -10) Object.assign(p, spawn(false));
          const a = p.a * (.55 + .45 * Math.sin(p.tw));
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.pink ? `rgba(0,255,167,${a})` : `rgba(237,239,242,${a})`;
          ctx.shadowColor = p.pink ? 'rgba(0,255,167,.9)' : 'rgba(237,239,242,.8)'; ctx.shadowBlur = 6;
          ctx.fill();
        }
      }
      requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(draw);
  }

  function startClock() {
    const el = $('#sys-clock');
    if (!el) return;
    const upd = () => { const d = new Date(); el.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':'); };
    upd(); setInterval(upd, 1000);
  }

  initHero();
  startClock();
  buildHome();
  bind();
  updateProgress();
  route();
})();
