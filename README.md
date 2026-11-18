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
js/scenes.js      Carga las fotografías de cada caso (versión IA y versión original)
js/app.js         Contenido de los casos, navegación, juego de diferencias y comparador
```

## Imágenes

Cada caso usa una **fotografía real** (el recuerdo original) y un **fotomontaje** hecho a partir de ella (la reconstrucción de la IA, que contiene las tres diferencias). Ambas imágenes miden 1600 × 1000 y comparten encuadre, de modo que las zonas clicables definidas en `js/app.js` y el comparador coinciden exactamente. Están en `img/`.

| Caso | Recuerdo original | Elementos añadidos por la «IA» |
| --- | --- | --- |
| 01 | Cena familiar, URSS, 1973 | El mismo abuelo de frente (otra foto de esa cena), pared con un cuadro de Shishkin en lugar de la ventana, flores y velas |
| 02 | Tienda «Хлеб · Продукты», plaza Jitrovskaya, Moscú | Fachada de vidrio y granito, quiosco automático «Всё сам» de Moscú, cabinas del teleférico de Moscú |
| 03 | Kutúzovski prospekt de noche, Moscú (oscurecida para representar el apagón) | Luces LED y letrero encendidos, una ventana con luz blanca, cabinas iluminadas en movimiento |

### Créditos (Wikimedia Commons)

- [«Семейный праздничный ужин», URSS, 1973](https://commons.wikimedia.org/wiki/File:%D0%A1%D0%A1%D0%A1%D0%A0,_1973,_%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2-%D0%BD%D0%B0-%D0%94%D0%BE%D0%BD%D1%83,_%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9_%D0%A1%D0%BE%D1%8E%D0%B7,_%D0%A1%D0%B5%D0%BC%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9_%D0%BF%D1%80%D0%B0%D0%B7%D0%B4%D0%BD%D0%B8%D1%87%D0%BD%D1%8B%D0%B9_%D1%83%D0%B6%D0%B8%D0%BD,_Soviet_Union.jpg) y [«Семейный ужин»](https://commons.wikimedia.org/wiki/File:%D0%A1%D0%A1%D0%A1%D0%A0,_1973,_%D0%A0%D0%BE%D1%81%D1%82%D0%BE%D0%B2-%D0%BD%D0%B0-%D0%94%D0%BE%D0%BD%D1%83,_%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9_%D0%A1%D0%BE%D1%8E%D0%B7,_%D0%A1%D0%B5%D0%BC%D0%B5%D0%B9%D0%BD%D1%8B%D0%B9_%D1%83%D0%B6%D0%B8%D0%BD,_Soviet_Union.jpg) — Vyacheslav Argenberg, CC BY 4.0 (Rostov del Don)
- [Bouquet de fleurs dans un vase](https://commons.wikimedia.org/wiki/File:Bouquet_de_fleurs_dans_un_vase_-_btv1b530787820.jpg) — Agence Rol, dominio público
- [Kerze 2007k](https://commons.wikimedia.org/wiki/File:Kerze_2007k.JPG) — Duftkerze, dominio público
- [Mañana en un bosque de pinos](https://commons.wikimedia.org/wiki/File:Shishkin,_Ivan_-_Morning_in_a_Pine_Forest.jpg) — Iván Shishkin y Konstantín Savitski, dominio público
- [Tienda de pan en la plaza Jitrovskaya](https://commons.wikimedia.org/wiki/File:%D0%A5%D0%BB%D0%B5%D0%B1%D0%BD%D1%8B%D0%B9_%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD_%D0%BD%D0%B0_%D0%A1%D0%B5%D0%B2%D0%B5%D1%80%D0%BE-%D0%97%D0%B0%D0%BF%D0%B0%D0%B4%D0%BD%D0%BE%D0%BC_%D1%83%D0%B3%D0%BB%D1%83_%D0%A5%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B9_%D0%BF%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D0%B8_%D0%BD%D0%B0_%D0%A5%D0%B8%D1%82%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%BC_%D0%BF%D0%B5%D1%80%D0%B5%D1%83%D0%BB%D0%BA%D0%B5_-_panoramio_(1).jpg) — krassotkin, CC BY 3.0
- [Moscow, vending machines near Severyaninsky Bridge](https://commons.wikimedia.org/wiki/File:Moscow,_vending_machines_near_Severyaninsky_Bridge_(20624822954).jpg) — Gennady Grachev, CC BY 2.0
- [Business Center B01, STMK](https://commons.wikimedia.org/wiki/File:Business_Center_B01,_STMK.jpg) — Ivan Shalenko, CC BY-SA 4.0
- [Sparrow Hills Cableway 2018 Aug (3598)](https://commons.wikimedia.org/wiki/File:Sparrow_Hills_Cableway_2018_Aug_(3598).jpg) — Alexey V. Kurochkin, CC BY-SA 4.0
- [Kutuzov prospectus, look from the window at night, Moscow](https://commons.wikimedia.org/wiki/File:Kutuzov_prospectus,_Look_from_the_window_at_night,_Moscow_-_panoramio.jpg) — Pavel Shulekin, CC BY 3.0

Los fotomontajes son obras derivadas con fines educativos; los que incorporan material CC BY-SA (casos 02 y 03) se comparten bajo CC BY-SA 4.0.

## Diseño

- Paleta: azul espacial `#101A2B`, azul tecnológico `#24374B`, turquesa luminoso `#55D6D2`, papel arena `#E8DCC5`, arena tostada `#C5AD89`, terracota suave `#D69B72`.
- Tipografía: Cormorant Garamond (títulos) y Manrope (texto e interfaz).
- El azul y el turquesa representan la reconstrucción de la IA; el papel arena y la terracota, la memoria humana.
