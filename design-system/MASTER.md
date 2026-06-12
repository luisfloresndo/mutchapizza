# MUTCHA PIZZA — Sistema de Diseño MASTER
> Fuente de verdad visual: `Branding/Manual de Identidad.html` + `Branding/brand/brand.css`.
> Este archivo se lee al inicio de cada sesión antes de tocar UI.

## Identidad
- "La Casa de la Pizza Rellena" · Monterrey · desde 1998 · pizzería de barrio, familiar, generosa.
- NO gourmet, NO pretencioso, NO gritadera con emojis. Recurso verbal "mutcho/mutcha": **una vez por pieza, donde más pese**.
- Estética: retro-stamp (sello de hule), bordes negros gruesos, sombras duras, rotaciones sutiles (-2° a 2°).

## Color (tokens en src/index.css, @theme)
| Token | Hex | Uso |
|---|---|---|
| `mp-rojo` | #DB0E1C | Primario, promos, CTA |
| `mp-amarillo` | #FFE900 | Acentos, indicadores, hover |
| `mp-negro` | #1F1410 | Bordes, texto, fondos drama |
| `mp-crema` | #FAF3E2 | Fondo principal (38% de la página) |
| `mp-masa` | #F0E3C5 | Fondos alternos |
| `mp-verde` | #2F7D4F | Acentos frescos, "SÍ", badges nuevo |
| `mp-cafe` | #5C3D24 | Texto secundario sobre crema |
| `mp-rojo-oscuro` | #A50B15 | Hover/sombra del rojo |

Proporción del manual: **Crema 38 · Rojo 25 · Amarillo 20 · Negro 12 · apoyo 5**.
Prohibido: gradientes azul→morado, glassmorphism decorativo, colores fuera de paleta.

## Tipografía
- `font-brand` **Special Elite** — el gancho. Titulares y frases mutchas. Nunca <14px ni párrafos largos.
- `font-head` **Archivo Black** — el dato duro: precios, números, CTAs. Mayúsculas.
- `font-text` **Archivo** — explicación: cuerpo 400, subtítulos 600–700.
- Jerarquía por sección: gancho (brand) → dato (head) → explicación (text).
- Fluid type con `clamp()` en todos los tamaños display.

## Logotipo
- Assets en `Branding/assets/`. Variantes: apilado (principal), horizontal (nav), isotipo MP (favicon, mín 24px).
- Área de protección = altura de etiqueta "MP". Sobre amarillo → monocromo negro. Nunca sobre foto sin caja blanca.

## Animación (Framer Motion / `motion` — única librería)
- Solo `transform` y `opacity`. Springs, nunca ease lineal en hovers.
- Durations: feedback 150–200ms · nav 300–500ms · reveals 600–1200ms.
- Scroll reveals: `whileInView` + `viewport={{ once: true }}`. `prefers-reduced-motion` respetado.
- Lenis para smooth scroll global.

## Sombras de marca
- `shadow-stamp` 6px 6px 0 negro · `shadow-stamp-rojo` · `shadow-stamp-amarillo` (cards/CTAs, hover las reduce a 2-3px con translate).

## Imágenes
- `public/images/*.webp` (fotos), `public/images/ingredients/*.webp` (PNG→WebP con alfa para parallax), `public/images/polaroids/`.
- Falta: `rosca-rellena.webp` (pendiente del cliente).
