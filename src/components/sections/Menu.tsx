import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ImageTrail } from '@/components/ui/image-trail'

/**
 * Selector interactivo de categorías del menú.
 * Mecánica de paneles expandibles tomada de interactive-selector (21st.dev),
 * re-construida con tokens de marca y contenido real.
 */

interface Categoria {
  titulo: string
  desc: string
  imagen: string
  precio: string
}

const CATEGORIAS: Categoria[] = [
  {
    titulo: 'Pizzas Rellenas',
    desc: 'La especialidad: dos pisos de masa, relleno hasta el borde. Mediana y Jumbo.',
    imagen: '/images/rellena-corte.webp',
    precio: 'desde $199',
  },
  {
    titulo: 'Clásicas',
    desc: 'Pepperoni, hawaiana, mexicana y más. Mediana 12" y Xtra Grande 14".',
    imagen: '/images/clasica.webp',
    precio: 'desde $129',
  },
  {
    titulo: 'Chicago Style',
    desc: 'La 5 estrellas de Mutcha: borde alto en sartén y salsa encima.',
    imagen: '/images/chicago-style.webp',
    precio: 'desde $179',
  },
  {
    titulo: 'Promos',
    desc: 'Dos Xtra Grandes, Duo de Tres, Rosca Rellena. Pa’ la familia entera.',
    imagen: '/images/promo-xtragrande.webp',
    precio: 'desde $159',
  },
]

const TRAIL_FOTOS = [
  '/images/rellena-corte.webp',
  '/images/chicago-style.webp',
  '/images/clasica.webp',
  '/images/promo-xtragrande.webp',
]

export function Menu() {
  const [activa, setActiva] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [conCursor, setConCursor] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)')
    const update = () => setConCursor(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <section id="menu" ref={sectionRef} className="relative bg-mp-crema px-5 py-20 sm:py-24">
      {/* Estela de pizzas siguiendo el cursor */}
      {conCursor && (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <ImageTrail containerRef={sectionRef as React.RefObject<HTMLElement>} rotationRange={12} interval={140}>
            {TRAIL_FOTOS.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                loading="lazy"
                className="size-24 border-3 border-mp-negro object-cover shadow-[4px_4px_0_var(--mp-negro)]"
              />
            ))}
          </ImageTrail>
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo">El menú</p>
        <h2 className="mt-2 font-brand text-mp-negro" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)' }}>
          ¿De cuál traes antojo hoy?
        </h2>

        {/* Paneles expandibles — flex-grow anima el panel activo */}
        <motion.div
          className="mt-12 flex h-[420px] flex-col gap-3 overflow-hidden sm:h-[440px] sm:flex-row"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {CATEGORIAS.map((cat, i) => {
            const isActive = activa === i
            return (
              <button
                key={cat.titulo}
                type="button"
                onClick={() => setActiva(i)}
                onMouseEnter={() => setActiva(i)}
                aria-expanded={isActive}
                className="relative flex cursor-pointer flex-col justify-end overflow-hidden border-4 border-mp-negro text-left outline-none transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:ring-4 focus-visible:ring-mp-rojo"
                style={{
                  flexGrow: isActive ? 6 : 1,
                  flexBasis: 0,
                  boxShadow: isActive ? '8px 8px 0 var(--mp-rojo)' : '4px 4px 0 var(--mp-negro)',
                }}
              >
                <img
                  src={cat.imagen}
                  alt={cat.titulo}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                  style={{ transform: isActive ? 'scale(1)' : 'scale(1.15)' }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(31,20,16,.92) 0%, rgba(31,20,16,.25) 55%, transparent 100%)',
                    opacity: isActive ? 1 : 0.75,
                  }}
                />
                <div className="relative z-10 p-5">
                  <span
                    className="block font-brand text-mp-amarillo transition-all duration-500"
                    style={{
                      fontSize: isActive ? 'clamp(20px, 2.6vw, 28px)' : '15px',
                      writingMode: undefined,
                    }}
                  >
                    {cat.titulo}
                  </span>
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500"
                    style={{ gridTemplateRows: isActive ? '1fr' : '0fr', opacity: isActive ? 1 : 0 }}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 max-w-md font-text text-[14px] leading-relaxed text-mp-crema/90">{cat.desc}</p>
                      <span className="mt-3 inline-block border-3 border-mp-negro bg-mp-amarillo px-3 py-1 font-head text-[13px] text-mp-negro">
                        {cat.precio}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </motion.div>

        <p className="mt-6 font-text text-[14px] text-mp-cafe">
          Palitos de pan, alitas, rollos de canela y bebidas en tu sucursal o en{' '}
          <a
            href="https://mutchapizza.pidedirecto.mx/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-mp-rojo underline decoration-mp-amarillo decoration-2 underline-offset-4"
          >
            pidedirecto
          </a>
          .
        </p>
      </div>
    </section>
  )
}
