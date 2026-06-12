import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, Phone, Clock } from 'lucide-react'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

interface Sucursal {
  nombre: string
  /** Referencia de ubicación tal como la publica la marca */
  ref?: string
  telefono: string
  /** Subruta PideDirecto confirmada (CONTEXTO §5: solo /metroplex) */
  slug?: string
}

// Lista OFICIAL de la marca (imagen del placeholder mutchapizza.com.mx, jun 2026):
// 28 sucursales con teléfono. No se agregan ubicaciones que no estén aquí.
const SUCURSALES: Sucursal[] = [
  { nombre: 'Allende', ref: 'Allende, N.L.', telefono: '81 3541 3333' },
  { nombre: 'Anzúres', telefono: '81 3067 2047' },
  { nombre: 'Ciudadela', ref: 'Juárez, N.L.', telefono: '81 8233 2270' },
  { nombre: 'Ciénega de Flores', ref: 'Ciénega de Flores, N.L.', telefono: '81 3541 4766' },
  { nombre: 'Contry', ref: 'Soriana', telefono: '81 8358 0101' },
  { nombre: 'Diego Díaz', ref: 'San Nicolás', telefono: '81 8383 1212' },
  { nombre: 'García', ref: 'Sor Juana, García N.L.', telefono: '81 8283 2050' },
  { nombre: 'Galeana', ref: 'Galeana, N.L.', telefono: '82 6296 9814' },
  { nombre: 'Huinalá', ref: 'Soriana', telefono: '81 1158 9933' },
  { nombre: 'La Rioja', ref: 'Plaza Las Vistas', telefono: '81 1358 3399' },
  { nombre: 'Las Margaritas', ref: 'Mi Tienda del Ahorro', telefono: '81 8341 4434' },
  { nombre: 'Linares', ref: 'Linares, N.L.', telefono: '82 1219 9507' },
  { nombre: 'Linda Vista', ref: 'Av. Linda Vista', telefono: '81 8158 1822' },
  { nombre: 'Metroplex', ref: 'Mi Tienda del Ahorro', telefono: '81 8302 9887', slug: 'metroplex' },
  { nombre: 'Pablo Livas', ref: 'HEB', telefono: '81 8393 1313' },
  { nombre: 'Plaza Berneses', ref: 'San Nicolás', telefono: '81 3541 4700' },
  { nombre: 'Plaza México', ref: 'Food Court', telefono: '81 1101 8719' },
  { nombre: 'Ramos Arizpe', ref: 'Ramos Arizpe, Coah.', telefono: '84 4754 0444' },
  { nombre: 'Raúl Salinas', ref: 'Escobedo, M.T.A.', telefono: '81 8307 2520' },
  { nombre: 'Salinas Victoria', ref: 'Soriana', telefono: '81 1159 9199' },
  { nombre: 'Saltillo', ref: 'Mi Tienda del Ahorro, Coah.', telefono: '844 754 0004' },
  { nombre: 'San Francisco', ref: 'Juárez, N.L.', telefono: '81 2674 0758' },
  { nombre: 'Santa Rosa', ref: 'Soriana', telefono: '81 8148 5008' },
  { nombre: 'Solidaridad', ref: 'Bodega Aurrera', telefono: '81 8306 2323' },
  { nombre: 'Topo Chico', ref: 'Soriana', telefono: '81 3496 3431' },
  { nombre: 'Valle Santa María', ref: 'Mi Tienda del Ahorro', telefono: '81 8359 6901' },
  { nombre: 'Vistas del Río', ref: 'Juárez, N.L.', telefono: '81 3541 4424' },
  { nombre: 'Zuazua', ref: 'Mi Tienda del Ahorro', telefono: '82 5107 0055' },
]

const CANALES = ['Comedor', 'Para llevar', 'A domicilio', 'Uber Eats', 'Rappi', 'DiDi Food']

function mapsUrl(s: Sucursal) {
  const q = encodeURIComponent(`Mutcha Pizza ${s.nombre}${s.ref ? ' ' + s.ref : ''}`)
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

function telHref(t: string) {
  return `tel:+52${t.replace(/\D/g, '')}`
}

function Tarjeta({ s, abierta, onToggle, index }: { s: Sucursal; abierta: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div
      id={`sucursal-${s.nombre.toLowerCase().replace(/\s+/g, '-')}`}
      className={`border-3 border-mp-negro bg-white transition-shadow ${abierta ? 'shadow-[6px_6px_0_var(--mp-rojo)]' : 'shadow-[3px_3px_0_var(--mp-negro)]'}`}
      style={{ rotate: abierta ? '0deg' : index % 2 ? '0.4deg' : '-0.4deg' }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.04 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={abierta}
        className="flex w-full cursor-pointer items-center justify-between gap-2 px-3.5 py-2.5 text-left"
      >
        <span className="min-w-0">
          <span className="block truncate font-brand text-[15px] leading-tight text-mp-negro">{s.nombre}</span>
          {s.ref && <span className="block truncate font-text text-[11.5px] text-mp-cafe">{s.ref}</span>}
        </span>
        <span className={`shrink-0 font-head text-[14px] transition-transform ${abierta ? 'rotate-45 text-mp-rojo' : 'text-mp-cafe'}`}>+</span>
      </button>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: abierta ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 border-t-3 border-mp-negro/15 px-3.5 py-3">
            <a href={telHref(s.telefono)} className="flex items-center gap-2 font-text text-[13.5px] font-semibold text-mp-negro hover:text-mp-rojo">
              <Phone size={14} className="shrink-0 text-mp-rojo" />
              {s.telefono}
            </a>
            <p className="flex items-center gap-2 font-text text-[12.5px] text-mp-cafe">
              <Clock size={14} className="shrink-0 text-mp-rojo" />
              {/* TODO cliente: confirmar horario por sucursal */}
              11:00 – 23:00 · todos los días
            </p>
            <div className="flex flex-wrap gap-2 pt-1.5">
              <a
                href={mapsUrl(s)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border-2 border-mp-negro bg-mp-amarillo px-2.5 py-1.5 font-head text-[10.5px] tracking-wide text-mp-negro"
              >
                <MapPin size={11} /> CÓMO LLEGAR
              </a>
              <a
                href={s.slug ? `${PIDE_DIRECTO}${s.slug}` : PIDE_DIRECTO}
                target="_blank"
                rel="noreferrer"
                className="border-2 border-mp-negro bg-mp-rojo px-2.5 py-1.5 font-head text-[10.5px] tracking-wide text-white"
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
  const [abierta, setAbierta] = useState<number | null>(null)

  return (
    <section id="sucursales" className="border-t-4 border-mp-negro bg-mp-crema px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo-oscuro">Sucursales</p>
            <div className="mt-1 flex items-baseline gap-4">
              <span className="font-head leading-none text-mp-rojo" style={{ fontSize: 'clamp(72px, 10vw, 128px)' }}>
                28
              </span>
              <h2 className="max-w-xs font-brand text-mp-negro" style={{ fontSize: 'clamp(22px, 3vw, 32px)', lineHeight: 1.2 }}>
                sucursales en Nuevo León y Coahuila
              </h2>
            </div>
            <p className="mt-4 max-w-lg font-text text-[15.5px] leading-relaxed text-mp-cafe">
              Si andas con hambre, tranqui: hay una sucursal cerca para
              salvarte. Llámale directo o pide en línea.
            </p>

            <div className="mt-8 grid items-start gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
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
