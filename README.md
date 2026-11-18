# ¿Así lo recuerdas?

Experiencia web interactiva sobre **memoria, inteligencia artificial y reconstrucción del pasado**, situada en el Moscú de 2050.

El visitante explora tres recuerdos reconstruidos por una IA. En cada caso lee primero el testimonio de quien lo vivió, observa la imagen generada por la IA, busca las **tres diferencias** entre la reconstrucción y el recuerdo, y finalmente compara la reconstrucción con la versión original.

## Recorrido

| Sección | Contenido |
| --- | --- |
| 01 · Introducción | Pantalla de bienvenida con una fotografía en proceso de reconstrucción. |
| 02 · Exploración | Tres casos que pueden abrirse en cualquier orden. |
| 03 · Reconstrucción de la IA | Testimonio original en papel y generación de la imagen. |
| 04 · ¿Qué entendió la IA? | Juego de diferencias: contador 1/3 · 2/3 · 3/3, contornos turquesa y mensaje final. |
| 05 · La versión de quien lo vivió | Comparador deslizable reconstrucción / recuerdo y explicación de cada error. |
| 06 · Reflexión final | Cierre pausado sobre quién tiene la última palabra sobre nuestros recuerdos. |

## Casos

1. **Lo que permanece en la mesa** — Recuerdo familiar.
2. **La calle donde crecí** — Recuerdo urbano.
3. **La noche sin luz** — Acontecimiento colectivo (testimonio individual).

## Cómo verlo

Es un sitio estático, sin dependencias ni compilación. Basta con abrir `index.html` en el navegador o servir la carpeta:

```bash
python3 -m http.server 8000
```

y visitar `http://localhost:8000`.

## Estructura

```
index.html        Estructura de las seis secciones
css/styles.css    Sistema visual (paleta, tipografía, texturas, responsive)
js/scenes.js      Las tres escenas ilustradas en SVG, en versión IA y versión original
js/app.js         Contenido de los casos, navegación, juego de diferencias y comparador
```

## Imágenes

Las escenas son ilustraciones de ejemplo dibujadas por código (SVG). Cada una existe en dos versiones con la misma composición —la reconstrucción de la IA y el recuerdo original—, lo que permite que las zonas clicables y el comparador coincidan exactamente. Pueden sustituirse por imágenes definitivas manteniendo las coordenadas de las diferencias definidas en `js/app.js` (sobre un lienzo de 1600 × 1000).

## Diseño

- Paleta: azul espacial `#101A2B`, azul tecnológico `#24374B`, turquesa luminoso `#55D6D2`, papel arena `#E8DCC5`, arena tostada `#C5AD89`, terracota suave `#D69B72`.
- Tipografía: Cormorant Garamond (títulos) y Manrope (texto e interfaz).
- El azul y el turquesa representan la reconstrucción de la IA; el papel arena y la terracota, la memoria humana.
