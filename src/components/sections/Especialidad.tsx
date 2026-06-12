import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ImageComparison } from '@/components/ui/image-comparison-slider'

const CHECKS = [
  'Masa hecha desde cero, todos los días',
  'Mediana y Jumbo, con tus ingredientes favoritos',
  'En comedor, para llevar o a domicilio',
]

/**
 * La foto de la rellena crece hasta llenar la pantalla conforme scrolleas
 * (expansión dirigida por scroll: sticky + useScroll — compatible con Lenis).
 */
function ExpansionRellena() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const width = useTransform(scrollYProgress, [0, 0.85], ['min(420px, 80vw)', '100vw'])
  const height = useTransform(scrollYProgress, [0, 0.85], ['min(300px, 46vh)', '100vh'])
  const radius = useTransform(scrollYProgress, [0, 0.85], [16, 0])
  const xLeft = useTransform(scrollYProgress, [0, 0.7], ['0vw', '-38vw'])
  const xRight = useTransform(scrollYProgress, [0, 0.7], ['0vw', '38vw'])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 0.15])

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* fondo: horno y masa */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.6], [1, 0.25]) }}
          aria-hidden
        >
          <img src="/images/horno-masa.webp" alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-mp-negro/60" />
        </motion.div>

        {/* la rellena creciendo */}
        <motion.div
          className="relative z-10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,.45)]"
          style={{ width, height, borderRadius: radius }}
        >
          <img src="/images/rellena-corte.webp" alt="Pizza rellena recién cortada" className="h-full w-full object-cover" />
          <motion.div className="absolute inset-0 bg-mp-negro" style={{ opacity: overlayOpacity }} aria-hidden />
        </motion.div>

        {/* título que se abre */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-center">
          <motion.h2
            className="font-brand text-mp-crema drop-shadow-[0_2px_12px_rgba(0,0,0,.6)]"
            style={{ x: xLeft, fontSize: 'clamp(34px, 6vw, 72px)' }}
          >
            La original
          </motion.h2>
          <motion.h2
            className="font-brand text-mp-amarillo drop-shadow-[0_2px_12px_rgba(0,0,0,.6)]"
            style={{ x: xRight, fontSize: 'clamp(34px, 6vw, 72px)' }}
          >
            Pizza Rellena
          </motion.h2>
          <motion.p className="mt-4 font-brand text-[15px] tracking-[.15em] text-mp-crema/80" style={{ opacity: hintOpacity }}>
            sigue bajando ↓
          </motion.p>
        </div>
      </div>
    </div>
  )
}

export function Especialidad() {
  return (
    <section id="especialidad" className="bg-mp-negro">
      <ExpansionRellena />

      {/* contenido: copy + comparador por fuera / por dentro */}
      <div className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-amarillo">
              La especialidad de la casa
            </p>
            <h3 className="mt-3 font-brand text-mp-crema" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.15 }}>
              Más de dos kilos de antojo
            </h3>
            <p className="mt-5 font-text text-[16px] leading-relaxed text-mp-crema/80">
              Jamón, salami, carne boloñesa, pimiento verde, cebolla,
              champiñones, queso mozzarella e italianísima salsa de tomate.
              Para compartir — o no.
            </p>
            <ul className="mt-7 space-y-3">
              {CHECKS.map((c, i) => (
                <motion.li
                  key={c}
                  className="flex items-baseline gap-3 font-text text-[15px] text-mp-crema/90"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <span className="font-head text-[12px] text-mp-verde">SÍ</span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="border-4 border-mp-crema/20 bg-mp-negro p-1 shadow-[10px_10px_0_var(--mp-rojo)]">
              <ImageComparison
                beforeImage="/images/rellena-entera-cerrada.webp"
                afterImage="/images/rellena-corte.webp"
                altBefore="Pizza rellena por fuera"
                altAfter="Pizza rellena por dentro: dos pisos de masa y relleno"
              />
            </div>
            <p className="mt-3 text-center font-brand text-[14px] text-mp-crema/60">
              ← arrastra: por fuera / por dentro →
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
