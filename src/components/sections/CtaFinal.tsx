import { motion } from 'motion/react'
import { MagnetizeButton } from '@/components/ui/magnetize-button'
import { ScrollVelocity } from '@/components/ui/scroll-velocity'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden border-y-4 border-mp-negro bg-mp-rojo py-24 sm:py-32">
      {/* marquee gigante de fondo */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-2 opacity-[0.14]" aria-hidden>
        <ScrollVelocity velocity={2} className="font-head text-[90px] uppercase text-mp-amarillo">
          {'ORDENA AHORA · MUTCHA PIZZA · '}
        </ScrollVelocity>
        <ScrollVelocity velocity={-2} className="font-head text-[90px] uppercase text-white">
          {'LA CASA DE LA PIZZA RELLENA · '}
        </ScrollVelocity>
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center">
        <motion.h2
          className="font-brand text-white"
          style={{ fontSize: 'clamp(32px, 5.5vw, 56px)', lineHeight: 1.12 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          ¿Antojo de a deveras?
          <br />
          <span className="text-mp-amarillo">Tu rellena ya quiere salir del horno.</span>
        </motion.h2>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
        >
          <MagnetizeButton
            particleCount={14}
            attractRadius={60}
            className="border-4 border-mp-negro bg-mp-amarillo px-12 py-7 font-head text-[18px] tracking-wide text-mp-negro shadow-[8px_8px_0_var(--mp-negro)] hover:bg-mp-amarillo"
            onClick={() => window.open(PIDE_DIRECTO, '_blank', 'noopener')}
          >
            ORDENA AHORA
          </MagnetizeButton>
        </motion.div>

        <p className="mt-8 font-text text-[14px] text-white">
          En comedor, para llevar o a domicilio · también en Uber Eats, Rappi y DiDi Food
        </p>
      </div>
    </section>
  )
}
