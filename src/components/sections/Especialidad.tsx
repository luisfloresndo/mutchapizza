import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ImageComparison } from '@/components/ui/image-comparison-slider'

const GANCHO = ['Dos', 'pisos', 'de', 'masa,', 'relleno', 'hasta', 'el', 'borde.']

const CHECKS = [
  'Masa hecha desde cero, todos los días',
  'Mediana y Jumbo, con tus ingredientes favoritos',
  'En comedor, para llevar o a domicilio',
]

/** true si conviene la escena pinned (desktop con pantalla suficiente y sin reduced-motion) */
function usePinnedCapable() {
  const [capable, setCapable] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia(
      '(min-width: 768px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)',
    )
    const update = () => setCapable(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return capable
}

/** Palabra del gancho que se revela según el progreso. */
function Palabra({ progress, index, total, children }: { progress: MotionValue<number>; index: number; total: number; children: string }) {
  const start = 0.04 + (index / total) * 0.16
  const opacity = useTransform(progress, [start, start + 0.03], [0.4, 1])
  const y = useTransform(progress, [start, start + 0.03], [14, 0])
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {children}&nbsp;
    </motion.span>
  )
}

/** Bullet que entra sincronizado con el progreso. */
function Check({ progress, index, children }: { progress: MotionValue<number>; index: number; children: string }) {
  const start = 0.55 + index * 0.11
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1])
  const x = useTransform(progress, [start, start + 0.06], [-24, 0])
  return (
    <motion.li className="flex items-baseline gap-3 font-text text-[15px] text-mp-crema/90 sm:text-[16px]" style={{ opacity, x }}>
      <span className="font-head text-[12px] text-mp-verde">SÍ</span>
      {children}
    </motion.li>
  )
}

/** Escena pinned: el scroll "abre" la pizza — de entera al corte. */
function ElCorte() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // La línea de corte barre de izquierda a derecha entre 0.25 y 0.62
  const reveal = useTransform(scrollYProgress, [0.25, 0.62], [0, 100])
  const clip = useTransform(reveal, (v) => `inset(0 ${100 - v}% 0 0)`)
  const lineLeft = useTransform(reveal, (v) => `${v}%`)
  const lineOpacity = useTransform(scrollYProgress, [0.22, 0.28, 0.6, 0.68], [0, 1, 1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const panelOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-stretch overflow-hidden">
        {/* Imagen base: la rellena entera */}
        <div className="absolute inset-0">
          <img src="/images/rellena-entera-cerrada.webp" alt="Pizza rellena entera" className="h-full w-full object-cover" decoding="async" />
        </div>
        {/* Encima: el corte, revelado por el barrido del scroll */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <img src="/images/rellena-corte.webp" alt="Pizza rellena por dentro: dos pisos de masa y relleno" className="h-full w-full object-cover" decoding="async" />
        </motion.div>
        {/* Línea de corte */}
        <motion.div
          className="absolute inset-y-0 z-10 w-[3px] bg-mp-amarillo shadow-[0_0_24px_rgba(255,233,0,.8)]"
          style={{ left: lineLeft, opacity: lineOpacity }}
          aria-hidden
        />
        {/* Velo para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-mp-negro/85 via-mp-negro/30 to-transparent" aria-hidden />

        {/* Texto */}
        <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col justify-center px-6 sm:px-10">
          <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-amarillo">La especialidad de la casa</p>
          <h2 className="mt-4 max-w-2xl font-brand text-mp-crema" style={{ fontSize: 'clamp(30px, 4.6vw, 56px)', lineHeight: 1.18 }}>
            {GANCHO.map((w, i) => (
              <Palabra key={i} progress={scrollYProgress} index={i} total={GANCHO.length}>
                {w}
              </Palabra>
            ))}
          </h2>

          <motion.div style={{ opacity: panelOpacity }}>
            <p className="mt-6 max-w-lg font-text text-[16px] leading-relaxed text-mp-crema/80">
              Jamón, salami, carne boloñesa, pimiento verde, cebolla, champiñones,
              queso mozzarella e italianísima salsa de tomate. Más de dos kilos de
              antojo — para compartir, o no.
            </p>
            <ul className="mt-7 space-y-3">
              {CHECKS.map((c, i) => (
                <Check key={c} progress={scrollYProgress} index={i}>
                  {c}
                </Check>
              ))}
            </ul>
          </motion.div>

          <motion.p className="mt-10 font-brand text-[14px] tracking-[.15em] text-mp-crema/70" style={{ opacity: hintOpacity }}>
            sigue bajando para abrirla ↓
          </motion.p>
        </div>
      </div>
    </div>
  )
}

/** Versión móvil / reduced-motion: layout simple con el comparador por drag. */
function ElCorteSimple() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-amarillo">La especialidad de la casa</p>
      <h2 className="mt-3 font-brand text-mp-crema" style={{ fontSize: 'clamp(28px, 7vw, 44px)', lineHeight: 1.18 }}>
        Dos pisos de masa, relleno hasta el borde.
      </h2>
      <p className="mt-5 font-text text-[16px] leading-relaxed text-mp-crema/80">
        Jamón, salami, carne boloñesa, pimiento verde, cebolla, champiñones,
        queso mozzarella e italianísima salsa de tomate. Más de dos kilos de antojo.
      </p>
      <ul className="mt-6 space-y-3">
        {CHECKS.map((c) => (
          <li key={c} className="flex items-baseline gap-3 font-text text-[15px] text-mp-crema/90">
            <span className="font-head text-[12px] text-mp-verde">SÍ</span>
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <div className="border-4 border-mp-crema/20 bg-mp-negro p-1 shadow-[8px_8px_0_var(--mp-rojo)]">
          <ImageComparison
            beforeImage="/images/rellena-entera-cerrada.webp"
            afterImage="/images/rellena-corte.webp"
            altBefore="Pizza rellena por fuera"
            altAfter="Pizza rellena por dentro: dos pisos de masa y relleno"
          />
        </div>
        <p className="mt-3 text-center font-brand text-[14px] text-mp-crema/60">← arrastra: por fuera / por dentro →</p>
      </div>
    </div>
  )
}

export function Especialidad() {
  const pinned = usePinnedCapable()
  return (
    <section id="especialidad" className="bg-mp-negro">
      {pinned ? <ElCorte /> : <ElCorteSimple />}
    </section>
  )
}
