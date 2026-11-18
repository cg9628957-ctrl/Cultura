/* ==========================================================================
   ¿Así lo recuerdas? — Escenas fotográficas
   Cada caso usa una fotografía real (el recuerdo) y un fotomontaje hecho a
   partir de ella (la reconstrucción de la IA, con las tres diferencias).
   Ambas imágenes miden 1600×1000 y comparten encuadre, de modo que las zonas
   clicables y el comparador coinciden exactamente.
   Créditos y licencias: ver README.md y el pie de página.
   ========================================================================== */
(function (global) {
  'use strict';

  let UID = 0;
  const W = 1600, H = 1000;

  const IMAGES = {
    dinner: { ai: 'img/caso1-ia.jpg', real: 'img/caso1-real.jpg' },
    street: { ai: 'img/caso2-ia.jpg', real: 'img/caso2-real.jpg' },
    blackout: { ai: 'img/caso3-ia.jpg', real: 'img/caso3-real.jpg' }
  };

  const LABELS = {
    dinner: { ai: 'Reconstrucción por IA de una cena familiar', real: 'Fotografía original de una cena familiar' },
    street: { ai: 'Reconstrucción por IA de una calle de Moscú', real: 'Fotografía original de una calle de Moscú' },
    blackout: { ai: 'Reconstrucción por IA de la noche del apagón', real: 'La noche del apagón, tal como la recuerda quien la vivió' }
  };

  function scene(key) {
    return function (mode, opts) {
      opts = opts || {};
      const u = 'sc' + (++UID);
      const par = opts.fit === 'slice' ? 'xMidYMid slice' : 'xMidYMid meet';
      const href = IMAGES[key][mode === 'ai' ? 'ai' : 'real'];
      const label = LABELS[key][mode === 'ai' ? 'ai' : 'real'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="${par}" data-uid="${u}" data-mode="${mode}" role="img" aria-label="${label}" focusable="false"><defs></defs><image href="${href}" x="0" y="0" width="${W}" height="${H}" preserveAspectRatio="none"/></svg>`;
    };
  }

  global.Scenes = { dinner: scene('dinner'), street: scene('street'), blackout: scene('blackout'), W, H, IMAGES };
})(window);
