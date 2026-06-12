import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, Phone, Clock } from 'lucide-react'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

interface Sucursal {
  nombre: string
  municipio: string
  direccion?: string
  /** TODO cliente: confirmar teléfono por sucursal */
  telefono?: string
  /** Subruta PideDirecto confirmada (CONTEXTO §5: solo /metroplex) */
  slug?: string
}

// Sucursales detectadas en CONTEXTO-MUTCHA.md §1.
// TODO cliente: lista oficial con dirección, teléfono y horario por sucursal,
// y slugs de PideDirecto por sucursal. No se inventan datos.
const SUCURSALES: Sucursal[] = [
  { nombre: 'Monterrey Centro', municipio: 'Monterrey', direccion: 'Av. Morelos 359 Ote.' },
  { nombre: 'Contry', municipio: 'Monterrey' },
  { nombre: 'Solidaridad', municipio: 'Monterrey' },
  { nombre: 'La Rioja', municipio: 'Monterrey' },
  { nombre: 'Lincoln', municipio: 'Monterrey' },
  { nombre: 'Metroplex', municipio: 'Monterrey', slug: 'metroplex' },
  { nombre: 'Santa Rosa', municipio: 'Apodaca' },
  { nombre: 'Apodaca', municipio: 'Apodaca' },
  { nombre: 'García', municipio: 'García' },
  { nombre: 'Guadalupe', municipio: 'Guadalupe' },
  { nombre: 'San Nicolás', municipio: 'San Nicolás de los Garza' },
  { nombre: 'Juárez', municipio: 'Juárez', direccion: 'Av. Arturo B. de la Garza' },
  { nombre: 'Zuazua', municipio: 'General Zuazua' },
  { nombre: 'Allende', municipio: 'Allende', direccion: 'Carr. Allende–Monterrey km 16' },
]

const CANALES = ['Comedor', 'Para llevar', 'A domicilio', 'Uber Eats', 'Rappi', 'DiDi Food']

function mapsUrl(s: Sucursal) {
  const q = encodeURIComponent(`Mutcha Pizza ${s.nombre}, ${s.municipio}, Nuevo León`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

function Tarjeta({ s, abierta, onToggle, index }: { s: Sucursal; abierta: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      id={`sucursal-${s.nombre.toLowerCase().replace(/\s+/g, '-')}`}
      className={`border-3 border-mp-negro bg-white transition-shadow ${abierta ? 'shadow-[6px_6px_0_var(--mp-rojo)]' : 'shadow-[3px_3px_0_var(--mp-negro)]'}`}
      style={{ rotate: abierta ? '0deg' : index % 2 ? '0.5deg' : '-0.5deg' }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierta}
        className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="font-brand text-[16px] text-mp-negro">{s.nombre}</span>
        <span className={`font-head text-[14px] transition-transform ${abierta ? 'rotate-45 text-mp-rojo' : 'text-mp-cafe'}`}>+</span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: abierta ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t-3 border-mp-negro/15 px-4 py-3">
            <p className="flex items-start gap-2 font-text text-[13px] leading-snug text-mp-cafe">
              <MapPin size={14} className="mt-0.5 shrink-0 text-mp-rojo" />
              {s.direccion ? `${s.direccion}, ${s.municipio}, N.L.` : `${s.municipio}, N.L.`}
            </p>
            <p className="flex items-center gap-2 font-text text-[13px] text-mp-cafe">
              <Clock size={14} className="shrink-0 text-mp-rojo" />
              11:00 – 23:00 · todos los días
            </p>
            <p className="flex items-center gap-2 font-text text-[13px] text-mp-cafe">
              <Phone size={14} className="shrink-0 text-mp-rojo" />
              {s.telefono ?? 'Teléfono en tu app de entrega'}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={mapsUrl(s)}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-mp-negro bg-mp-amarillo px-3 py-1.5 font-head text-[11px] tracking-wide text-mp-negro"
              >
                CÓMO LLEGAR
              </a>
              <a
                href={s.slug ? `${PIDE_DIRECTO}${s.slug}` : PIDE_DIRECTO}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-mp-negro bg-mp-rojo px-3 py-1.5 font-head text-[11px] tracking-wide text-white"
              >
                ORDENA DE ESTA
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Sucursales() {
  const [abierta, setAbierta] = useState<number | null>(0)

  return (
    <section id="sucursales" className="border-t-4 border-mp-negro bg-mp-crema px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_380px]">
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
            <p className="mt-4 max-w-lg font-text text-[15.5px] leading-relaxed text-mp-cafe">
              Llámanos, visítanos o pide en línea. Tu pizza rellena siempre tiene una casa cerca.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {SUCURSALES.map((s, i) => (
                <Tarjeta key={s.nombre} s={s} index={i} abierta={abierta === i} onToggle={() => setAbierta(abierta === i ? null : i)} />
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

          <motion.div
            className="border-4 border-mp-negro shadow-[10px_10px_0_var(--mp-amarillo)] lg:sticky lg:top-24"
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
        </div>
      </div>
    </section>
  )
}
