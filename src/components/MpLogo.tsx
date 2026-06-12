/**
 * Logotipo Mutcha Pizza — porte React de Branding/brand/logo.js.
 * Bloques tipográficos con borde irregular "sello de hule" (feTurbulence).
 * El tamaño se controla con fontSize del contenedor.
 */
import { useEffect } from 'react'

type Variant = 'stacked' | 'horizontal' | 'isotipo'
type Scheme = 'full' | 'negro' | 'blanco' | 'rojo'

interface MpLogoProps {
  variant?: Variant
  scheme?: Scheme
  tagline?: boolean
  /** Color del tagline cuando el fondo lo exige (p. ej. crema sobre oscuro) */
  taglineColor?: string
  className?: string
  style?: React.CSSProperties
}

const TAGLINE = 'La Casa de la Pizza Rellena'

/* Filtro SVG global — se inyecta una sola vez */
function useRoughFilter() {
  useEffect(() => {
    if (document.getElementById('mp-rough-filter')) return
    const holder = document.createElement('div')
    holder.id = 'mp-rough-filter'
    holder.setAttribute('aria-hidden', 'true')
    holder.innerHTML =
      '<svg width="0" height="0" style="position:absolute">' +
      '<filter id="mp-rough" x="-5%" y="-5%" width="110%" height="110%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="n"></feTurbulence>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="5"></feDisplacementMap>' +
      '</filter></svg>'
    document.body.appendChild(holder)
  }, [])
}

const SCHEMES: Record<
  Scheme,
  { tabBg: string; tabInk: string; b1Bg: string; b1Ink: string; b2Bg: string; b2Ink: string; ink: string; tagInk: string }
> = {
  full: {
    tabBg: 'var(--mp-amarillo)',
    tabInk: 'var(--mp-negro)',
    b1Bg: 'var(--mp-rojo)',
    b1Ink: 'var(--mp-amarillo)',
    b2Bg: 'var(--mp-amarillo)',
    b2Ink: 'var(--mp-rojo)',
    ink: 'var(--mp-negro)',
    tagInk: 'var(--mp-negro)',
  },
  negro: {
    tabBg: '#fff', tabInk: 'var(--mp-negro)', b1Bg: '#fff', b1Ink: 'var(--mp-negro)',
    b2Bg: '#fff', b2Ink: 'var(--mp-negro)', ink: 'var(--mp-negro)', tagInk: 'var(--mp-negro)',
  },
  blanco: {
    tabBg: 'transparent', tabInk: '#fff', b1Bg: 'transparent', b1Ink: '#fff',
    b2Bg: 'transparent', b2Ink: '#fff', ink: '#fff', tagInk: '#fff',
  },
  rojo: {
    tabBg: 'transparent', tabInk: 'var(--mp-rojo)', b1Bg: 'transparent', b1Ink: 'var(--mp-rojo)',
    b2Bg: 'transparent', b2Ink: 'var(--mp-rojo)', ink: 'var(--mp-rojo)', tagInk: 'var(--mp-rojo)',
  },
}

export function MpLogo({ variant = 'stacked', scheme = 'full', tagline = false, taglineColor, className, style }: MpLogoProps) {
  useRoughFilter()
  const c = SCHEMES[scheme]
  const rough = { filter: 'url(#mp-rough)' } as const
  const isH = variant === 'horizontal'

  const tab = (
    <span
      style={{
        ...rough,
        display: 'block',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontSize: variant === 'isotipo' ? '1em' : '.5em',
        background: c.tabBg,
        color: c.tabInk,
        border: `${variant === 'isotipo' ? '.075em' : '.13em'} solid ${c.ink}`,
        padding: variant === 'isotipo' ? '.28em .55em .14em' : '.22em .6em .1em',
        letterSpacing: '.08em',
        WebkitTextStroke: `${variant === 'isotipo' ? '.045em' : '.04em'} currentColor`,
        zIndex: 3,
        transform: `rotate(${isH ? -2 : variant === 'isotipo' ? -1 : -0.6}deg)`,
        position: 'relative',
        ...(variant === 'stacked' ? { marginBottom: '-.32em' } : {}),
        ...(isH ? { marginRight: '-.5em' } : {}),
      }}
    >
      MP
    </span>
  )

  const b1 = (
    <span
      style={{
        ...rough,
        display: 'block',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontSize: '1em',
        background: c.b1Bg,
        color: c.b1Ink,
        border: `.068em solid ${c.ink}`,
        padding: '.3em .6em .26em',
        zIndex: 2,
        transform: `rotate(${isH ? -1 : -1.8}deg)`,
        WebkitTextStroke: '.022em currentColor',
        position: 'relative',
      }}
    >
      Mutcha
    </span>
  )

  const b2 = (
    <span
      style={{
        ...rough,
        display: 'block',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontSize: isH ? '1em' : '1.45em',
        background: c.b2Bg,
        color: c.b2Ink,
        border: `${isH ? '.068em' : '.05em'} solid ${c.ink}`,
        padding: isH ? '.3em .55em .26em' : '.24em .55em .2em',
        zIndex: 1,
        transform: `rotate(${isH ? 1.2 : 1.1}deg)`,
        WebkitTextStroke: `${isH ? '.03em' : '.024em'} currentColor`,
        position: 'relative',
        ...(variant === 'stacked' ? { marginTop: '-.14em' } : {}),
        ...(isH ? { marginLeft: '-.28em' } : {}),
      }}
    >
      Pizza
    </span>
  )

  const tag = tagline ? (
    <span
      style={{
        fontSize: '.3em',
        letterSpacing: '.08em',
        marginTop: isH ? '.7em' : '1em',
        color: taglineColor ?? c.tagInk,
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      {TAGLINE}
    </span>
  ) : null

  return (
    <span
      className={className}
      role="img"
      aria-label={tagline ? 'Mutcha Pizza — La Casa de la Pizza Rellena' : 'Mutcha Pizza'}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, fontFamily: 'var(--font-brand)', ...style }}
    >
      {/* contenido visual del logotipo — el nombre accesible vive en el aria-label del contenedor */}
      <span aria-hidden="true" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        {variant === 'isotipo' ? (
          tab
        ) : (
          <span style={{ display: 'inline-flex', flexDirection: isH ? 'row' : 'column', alignItems: 'center' }}>
            {tab}
            {b1}
            {b2}
          </span>
        )}
        {tag}
      </span>
    </span>
  )
}
