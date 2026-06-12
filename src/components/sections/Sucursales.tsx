import { motion } from 'motion/react'
import { LocationMap } from '@/components/ui/expand-map'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

const SUCURSALES = [
  'Centro', 'Contry', 'Solidaridad', 'La Rioja', 'Lincoln', 'Metroplex',
  'Santa Rosa', 'Apodaca', 'García', 'Guadalupe', 'San Nicolás', 'Juárez',
  'Zuazua', 'Allende',
]

const CANALES = ['Comedor', 'Para llevar', 'A domicilio', 'Uber Eats', 'Rappi', 'DiDi Food']

export function Sucursales() {
  return (
    <section id="sucursales" className="border-t-4 border-mp-negro bg-mp-crema px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-2">
          <div>
            <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo">Sucursales</p>
            <div className="mt-1 flex items-baseline gap-4">
              <span className="font-head leading-none text-mp-rojo" style={{ fontSize: 'clamp(72px, 10vw, 128px)' }}>
                17
              </span>
              <h2 className="max-w-xs font-brand text-mp-negro" style={{ fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.2 }}>
                sucursales en la zona metro de Monterrey
              </h2>
            </div>
            <p className="mt-5 max-w-lg font-text text-[16px] leading-relaxed text-mp-cafe">
              Llámanos, visítanos o pide en línea. Tu pizza rellena siempre
              tiene una casa cerca. Horario típico: 11:00 – 23:00, todos los días.
            </p>

            {/* chips de sucursal estilo sello */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SUCURSALES.map((s, i) => (
                <motion.a
                  key={s}
                  href={PIDE_DIRECTO}
                  target="_blank"
                  rel="noreferrer"
                  className="border-3 border-mp-negro bg-white px-3.5 py-1.5 font-brand text-[14px] text-mp-negro transition-colors hover:bg-mp-amarillo"
                  style={{ rotate: i % 2 ? '0.8deg' : '-0.8deg' }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: i * 0.04 }}
                >
                  {s}
                </motion.a>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {CANALES.map((c) => (
                <span key={c} className="bg-mp-negro px-3 py-1.5 font-head text-[11px] tracking-wide text-mp-crema">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* foto fachada con marco de marca */}
            <motion.div
              className="border-4 border-mp-negro shadow-[10px_10px_0_var(--mp-amarillo)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <img
                src="/images/sucursal-fachada.webp"
                alt="Fachada de sucursal Mutcha Pizza de noche"
                loading="lazy"
                className="block h-auto w-full"
              />
            </motion.div>

            {/* mapa interactivo — click para expandir */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <LocationMap location="Mutcha Pizza · Monterrey Centro" coordinates="Av. Morelos 359 Ote." />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
