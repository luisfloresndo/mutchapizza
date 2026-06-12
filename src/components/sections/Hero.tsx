import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { TextRotate } from '@/components/ui/text-rotate'
import Floating, { FloatingElement } from '@/components/ui/parallax-floating'
import { MpLogo } from '@/components/MpLogo'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

const INGREDIENTES = [
  { src: '/images/ingredients/ing-pepperoni.webp', depth: 1.2, cls: 'top-[12%] right-[6%] w-24 sm:w-32 lg:w-44 rotate-12', dx: 220, dy: -160 },
  { src: '/images/ingredients/ing-albahaca.webp', depth: 0.8, cls: 'top-[8%] left-[42%] w-16 sm:w-20 lg:w-28 -rotate-6', dx: -60, dy: -220 },
  { src: '/images/ingredients/ing-pimiento.webp', depth: 2, cls: 'bottom-[18%] right-[16%] w-20 sm:w-28 lg:w-36 rotate-3', dx: 260, dy: 120 },
  { src: '/images/ingredients/ing-champinon.webp', depth: 1.5, cls: 'bottom-[6%] left-[55%] w-20 sm:w-24 lg:w-32 -rotate-12 hidden sm:block', dx: -40, dy: 240 },
  { src: '/images/ingredients/ing-queso.webp', depth: 0.6, cls: 'top-[40%] right-[38%] w-16 lg:w-24 rotate-6 hidden lg:block', dx: 120, dy: -120 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  // Salida coreografiada: al scrollear, los ingredientes se dispersan
  // hacia afuera y el contenido hace un scale/fade sutil.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <header id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-mp-negro">
      {/* Foto hero con presencia — degradado solo para legibilidad del bloque izquierdo */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }} aria-hidden>
        <img
          src="/images/hero-rellena.webp"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(31,20,16,.92) 0%, rgba(31,20,16,.72) 38%, rgba(31,20,16,.15) 70%, rgba(31,20,16,.35) 100%)',
        }}
        aria-hidden
      />

      {/* Ingredientes: parallax al mouse + dispersión al scroll */}
      <Floating sensitivity={-1} className="absolute inset-0 z-10">
        {INGREDIENTES.map((ing, i) => (
          <FloatingElement key={i} depth={ing.depth} className={ing.cls}>
            <Disperso progress={scrollYProgress} dx={ing.dx} dy={ing.dy}>
              <motion.img
                src={ing.src}
                alt=""
                loading="lazy"
                className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,.5)]"
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 16, delay: 0.9 + i * 0.12 }}
                draggable={false}
              />
            </Disperso>
          </FloatingElement>
        ))}
      </Floating>

      {/* Contenido */}
      <motion.div
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-28 sm:px-8"
        style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <MpLogo variant="stacked" tagline taglineColor="var(--mp-crema)" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)' }} />
        </motion.div>

        <motion.h1
          className="mt-8 max-w-3xl font-brand text-mp-crema"
          style={{ fontSize: 'clamp(34px, 6vw, 72px)', lineHeight: 1.08 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          Dos pisos de masa,
          <br />
          <span className="inline-flex flex-wrap items-baseline gap-x-4">
            mutcho
            <TextRotate
              texts={['relleno', 'queso', 'sabor', 'antojo']}
              rotationInterval={2600}
              mainClassName="inline-flex overflow-hidden bg-mp-amarillo px-3 pb-1 pt-2 text-mp-rojo"
              staggerDuration={0.02}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            />
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl font-text text-[17px] leading-relaxed text-mp-crema/85"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          Desde 1998 en Monterrey. Somos los creadores de la pizza rellena:
          masa recién hecha todos los días y relleno hasta el borde.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <a
            href={PIDE_DIRECTO}
            target="_blank"
            rel="noreferrer"
            className="border-3 border-mp-negro bg-mp-rojo px-8 py-4 font-head text-[15px] tracking-wide text-white shadow-[6px_6px_0_var(--mp-amarillo)] transition-[transform,box-shadow] duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--mp-amarillo)]"
          >
            ORDENA A DOMICILIO
          </a>
          <a
            href="#sucursales"
            className="border-3 border-mp-negro bg-mp-amarillo px-8 py-4 font-head text-[15px] tracking-wide text-mp-negro shadow-stamp transition-[transform,box-shadow] duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--mp-negro)]"
          >
            ENCUENTRA TU SUCURSAL
          </a>
        </motion.div>
      </motion.div>

      {/* indicador de scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 font-brand text-[13px] tracking-[.2em] text-mp-crema/60"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        aria-hidden
      >
        ↓ baja con hambre
      </motion.div>
    </header>
  )
}

/** Dispersión scroll-driven de un ingrediente hacia (dx, dy). */
function Disperso({
  progress,
  dx,
  dy,
  children,
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  dx: number
  dy: number
  children: React.ReactNode
}) {
  const x = useTransform(progress, [0, 1], [0, dx])
  const y = useTransform(progress, [0, 1], [0, dy])
  const opacity = useTransform(progress, [0, 0.8], [1, 0])
  return <motion.div style={{ x, y, opacity }}>{children}</motion.div>
}
