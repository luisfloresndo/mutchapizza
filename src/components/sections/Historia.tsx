import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring, useTransform } from 'motion/react'
import { ImageStack, type ImageData } from '@/components/ui/polaroid-flick-through'

const POLAROIDS: ImageData[] = [
  { id: 'horno', src: '/images/polaroids/polaroid-01.webp', alt: 'El horno original, 1998' },
  { id: 'equipo', src: '/images/polaroids/polaroid-02.webp', alt: 'El equipo de siempre' },
  { id: 'sucursal', src: '/images/polaroids/polaroid-03.webp', alt: 'La primera sucursal' },
  { id: 'familia', src: '/images/polaroids/polaroid-04.webp', alt: 'Pa’ la familia entera' },
]

/** Contador animado con spring — solo transform/opacity fuera, texto via MotionValue. */
function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) spring.set(value)
  }, [inView, spring, value])

  useEffect(
    () =>
      display.on('change', (v) => {
        if (ref.current) ref.current.textContent = v
      }),
    [display],
  )

  return (
    <span ref={ref} className="font-head leading-none text-mp-rojo" style={{ fontSize: 'clamp(54px, 7vw, 88px)' }}>
      {prefix}0{suffix}
    </span>
  )
}

const DATOS = [
  { value: 1998, label: 'nace en Monterrey, N.L.', prefix: '' },
  { value: 17, label: 'sucursales en la zona metro', prefix: '' },
  { value: 2, label: 'kilos de antojo por rellena', prefix: '+' },
]

export function Historia() {
  return (
    <section id="historia" className="overflow-hidden bg-mp-masa px-5 py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo">Desde 1998</p>
          <h2 className="mt-2 font-brand text-mp-negro" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.15 }}>
            La de toda la vida
          </h2>
          <p className="mt-5 max-w-lg font-text text-[16px] leading-relaxed text-mp-cafe">
            No somos una pizzería gourmet ni una franquicia fría: somos la de
            confianza. La que sabe qué vas a pedir antes de que hables. Casi
            tres décadas horneando la misma receta — con mutcho orgullo.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6">
            {DATOS.map((d, i) => (
              <motion.div
                key={d.label}
                className="border-t-4 border-mp-rojo pt-3"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <Counter value={d.value} prefix={d.prefix} />
                <p className="mt-2 font-text text-[13px] leading-snug text-mp-cafe">{d.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Polaroids: pásalas con el dedo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageStack images={POLAROIDS} maxRotation={14} />
          <p className="mt-4 text-center font-brand text-[14px] text-mp-cafe">
            el álbum de la casa — pásalas con el dedo
          </p>
        </motion.div>
      </div>
    </section>
  )
}
