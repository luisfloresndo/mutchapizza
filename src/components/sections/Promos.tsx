import { motion } from 'motion/react'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

interface Promo {
  nombre: string
  precio: string
  desc: string
  destacada?: boolean
  rotate: string
}

const PROMOS: Promo[] = [
  {
    nombre: '2 Xtra Grandes',
    precio: '$159',
    desc: 'Dos pizzas de 14" horneadas a la perfección, con el ingrediente de tu elección, cubiertas de queso.',
    rotate: '-1.2deg',
  },
  {
    nombre: 'Duo de Tres',
    precio: '$199',
    desc: 'Dos Xtra Grandes de tres ingredientes: pepperoni, jamón y salami. El duo que aquí es de tres.',
    destacada: true,
    rotate: '0.8deg',
  },
  {
    nombre: 'Rosca Rellena',
    precio: '$199',
    desc: 'El anillo relleno de queso con tus tres ingredientes a elegir. Disponible en todas las sucursales.',
    rotate: '-0.6deg',
  },
]

export function Promos() {
  return (
    <section id="promos" className="border-y-4 border-mp-negro bg-mp-amarillo px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo">Promociones</p>
        <h2 className="mt-2 font-brand text-mp-negro" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)' }}>
          Las de siempre, a precio de amigos
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {PROMOS.map((p, i) => (
            <motion.a
              key={p.nombre}
              href={PIDE_DIRECTO}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col gap-3 border-4 border-mp-negro p-7 transition-[transform,box-shadow] duration-150 ${
                p.destacada
                  ? 'bg-mp-rojo text-white shadow-[8px_8px_0_var(--mp-negro)]'
                  : 'bg-white text-mp-negro shadow-[7px_7px_0_var(--mp-negro)]'
              } hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[3px_3px_0_var(--mp-negro)]`}
              style={{ rotate: p.rotate }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 90, damping: 16, delay: i * 0.12 }}
            >
              {p.destacada && (
                <span className="-mt-10 self-start border-3 border-mp-negro bg-mp-amarillo px-3 py-1 font-brand text-[14px] text-mp-negro">
                  la consentida
                </span>
              )}
              <span className={`font-brand text-[22px] ${p.destacada ? 'text-mp-amarillo' : ''}`}>{p.nombre}</span>
              <span
                className={`font-head leading-none ${p.destacada ? 'text-white' : 'text-mp-rojo'}`}
                style={{ fontSize: 'clamp(48px, 6vw, 64px)' }}
              >
                {p.precio}
              </span>
              <p className={`flex-1 font-text text-[14px] leading-relaxed ${p.destacada ? 'text-white/85' : 'text-mp-cafe'}`}>
                {p.desc}
              </p>
              <span className={`font-head text-[12px] tracking-wide ${p.destacada ? 'text-mp-amarillo' : 'text-mp-rojo'}`}>
                PEDIR ESTA →
              </span>
            </motion.a>
          ))}
        </div>

        <p className="mt-8 font-text text-[12px] tracking-wide text-mp-cafe">
          Precios de referencia · aplican restricciones · consulta tu sucursal
        </p>
      </div>
    </section>
  )
}
