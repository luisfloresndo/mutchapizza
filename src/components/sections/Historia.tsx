import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ImageStack, type ImageData } from '@/components/ui/polaroid-flick-through'

const POLAROIDS: ImageData[] = [
  { id: 'horno', src: '/images/polaroids/polaroid-01.webp', alt: 'El horno original, 1998' },
  { id: 'equipo', src: '/images/polaroids/polaroid-02.webp', alt: 'El equipo de siempre' },
  { id: 'sucursal', src: '/images/polaroids/polaroid-03.webp', alt: 'La primera sucursal' },
  { id: 'familia', src: '/images/polaroids/polaroid-04.webp', alt: 'Pa’ la familia entera' },
]

/** Beats narrativos: [inicio, fin] en progreso de scroll. */
const BEATS = [
  { range: [0.05, 0.38], kicker: '1998', titulo: 'Nace en Monterrey', texto: 'Una pizzería de barrio con horno propio y una idea fija: que nadie se quedara con hambre.' },
  { range: [0.38, 0.68], kicker: 'La inventamos nosotros', titulo: 'La pizza rellena', texto: 'Dos pisos de masa, relleno hasta el borde. La especialidad que convirtió la casa en La Casa.' },
  { range: [0.68, 0.97], kicker: 'Hoy', titulo: '28 sucursales', texto: 'De Monterrey pa’ todo Nuevo León — y ya también Coahuila. La de confianza, la de toda la vida.' },
] as const

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

/** Año gigante 1998 → 2026 conducido por el progreso del scroll. */
function Anio({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null)
  const year = useTransform(progress, [0.05, 0.85], [1998, 2026], { clamp: true })
  useEffect(
    () =>
      year.on('change', (v) => {
        if (ref.current) ref.current.textContent = String(Math.round(v))
      }),
    [year],
  )
  return (
    <span
      ref={ref}
      className="block select-none font-head leading-none text-mp-rojo"
      style={{ fontSize: 'clamp(90px, 11vw, 170px)', letterSpacing: '-0.03em' }}
    >
      1998
    </span>
  )
}

function Beat({ progress, range, kicker, titulo, texto }: { progress: MotionValue<number>; range: readonly [number, number]; kicker: string; titulo: string; texto: string }) {
  const [a, b] = range
  const fade = 0.05
  const opacity = useTransform(progress, [a, a + fade, b - fade, b], [0, 1, 1, 0])
  const y = useTransform(progress, [a, a + fade], [22, 0])
  return (
    <motion.div className="absolute inset-x-0 bottom-0" style={{ opacity, y }}>
      <p className="font-brand text-[16px] text-mp-rojo-oscuro">{kicker}</p>
      <h3 className="mt-1 font-brand text-mp-negro" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
        {titulo}
      </h3>
      <p className="mt-3 max-w-md font-text text-[15.5px] leading-relaxed text-mp-cafe">{texto}</p>
    </motion.div>
  )
}

/** Fotos por beat: horno (1998) · equipo (la rellena) · familia (hoy). */
const BEAT_FOTOS = [POLAROIDS[0], POLAROIDS[1], POLAROIDS[3]]

/** Polaroid de la escena pinned — entra/sale con su beat, con rotación propia. */
function PolaroidBeat({ progress, range, foto, rotate }: { progress: MotionValue<number>; range: readonly [number, number]; foto: ImageData; rotate: number }) {
  const [a, b] = range
  const fade = 0.05
  const opacity = useTransform(progress, [a, a + fade, b - fade, b], [0, 1, 1, 0])
  const r = useTransform(progress, [a, b], [rotate - 4, rotate])
  const y = useTransform(progress, [a, a + fade], [26, 0])
  return (
    <motion.figure
      className="absolute inset-0 m-0 flex items-center justify-center"
      style={{ opacity, rotate: r, y }}
    >
      <div className="w-full max-w-[340px] border border-mp-negro/10 bg-white p-3 pb-4 shadow-[0_18px_40px_rgba(31,20,16,.25)]">
        <img src={foto.src} alt={foto.alt} className="block aspect-square w-full object-cover" loading="lazy" />
        <figcaption className="mt-3 text-center font-brand text-[15px] text-mp-cafe">{foto.alt}</figcaption>
      </div>
    </motion.figure>
  )
}

function Desde1998() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-2">
          <div>
            <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo-oscuro">Desde 1998</p>
            <Anio progress={scrollYProgress} />
            {/* Beats superpuestos — uno visible a la vez */}
            <div className="relative mt-6 h-[190px]">
              {BEATS.map((b) => (
                <Beat key={b.kicker} progress={scrollYProgress} range={b.range} kicker={b.kicker} titulo={b.titulo} texto={b.texto} />
              ))}
            </div>
          </div>

          <div className="relative hidden h-[460px] lg:block">
            {BEAT_FOTOS.map((f, i) => (
              <PolaroidBeat key={f.id} progress={scrollYProgress} range={BEATS[i].range} foto={f} rotate={i % 2 ? 2.5 : -3} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Versión móvil / reduced-motion. */
function Desde1998Simple() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo-oscuro">Desde 1998</p>
      <h2 className="mt-2 font-brand text-mp-negro" style={{ fontSize: 'clamp(30px, 7vw, 46px)', lineHeight: 1.15 }}>
        La de toda la vida
      </h2>
      <div className="mt-8 space-y-8">
        {BEATS.map((b, i) => (
          <motion.div
            key={b.kicker}
            className="border-t-4 border-mp-rojo pt-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <p className="font-brand text-[15px] text-mp-rojo-oscuro">{b.kicker}</p>
            <h3 className="mt-1 font-brand text-[24px] text-mp-negro">{b.titulo}</h3>
            <p className="mt-2 font-text text-[15px] leading-relaxed text-mp-cafe">{b.texto}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-12">
        <ImageStack images={POLAROIDS} maxRotation={14} />
        <p className="mt-4 text-center font-brand text-[14px] text-mp-cafe">el álbum de la casa — pásalas con el dedo</p>
      </div>
    </div>
  )
}

export function Historia() {
  const pinned = usePinnedCapable()
  return (
    <section id="historia" className="overflow-clip bg-mp-masa">
      {pinned ? <Desde1998 /> : <Desde1998Simple />}
    </section>
  )
}
