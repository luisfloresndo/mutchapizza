import { motion } from 'motion/react'

// TODO cliente: correo real del área de franquicias
const MAILTO =
  'mailto:franquicias@mutchapizza.com.mx?subject=Quiero%20una%20franquicia%20Mutcha%20Pizza&body=Hola%2C%20me%20interesa%20conocer%20el%20programa%20de%20franquicias.%20Mi%20ciudad%20de%20inter%C3%A9s%20es%3A%20'

const RAZONES = [
  {
    titulo: 'Producto con nombre propio',
    texto: 'La pizza rellena es nuestra especialidad insignia desde 1998 — una categoría que la competencia no tiene.',
  },
  {
    titulo: 'Operación probada',
    texto: '28 años de operación y 17 sucursales funcionando en comedor, para llevar y a domicilio.',
  },
  {
    titulo: 'Marca de barrio querida',
    texto: 'Clientela de toda la vida y promociones que llenan mesas entre semana, no solo los fines.',
  },
]

export function Franquicias() {
  return (
    <section id="franquicias" className="border-t-4 border-mp-negro bg-mp-masa px-5 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-head text-[13px] uppercase tracking-[.18em] text-mp-rojo-oscuro">Franquicias</p>
            <h2 className="mt-2 font-brand text-mp-negro" style={{ fontSize: 'clamp(28px, 4.2vw, 44px)', lineHeight: 1.18 }}>
              28 años haciendo pizza rellena.
              <br />
              17 sucursales lo respaldan.
            </h2>
            <p className="mt-5 max-w-xl font-text text-[16px] leading-relaxed text-mp-cafe">
              Si quieres llevar La Casa de la Pizza Rellena a tu colonia,
              hablemos. Sin promesas infladas: te contamos cómo opera el
              negocio y tú decides.
            </p>

            <div className="mt-8 space-y-5">
              {RAZONES.map((r, i) => (
                <motion.div
                  key={r.titulo}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="mt-1 grid size-9 shrink-0 place-items-center border-3 border-mp-negro bg-mp-amarillo font-head text-[13px]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-text text-[16px] font-bold text-mp-negro">{r.titulo}</h3>
                    <p className="mt-1 font-text text-[14.5px] leading-relaxed text-mp-cafe">{r.texto}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href={MAILTO}
              className="mt-10 inline-block border-3 border-mp-negro bg-mp-rojo px-8 py-4 font-head text-[14px] tracking-wide text-white shadow-stamp transition-[transform,box-shadow] duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_var(--mp-negro)]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              QUIERO UNA FRANQUICIA
            </motion.a>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="border-4 border-mp-negro shadow-[10px_10px_0_var(--mp-rojo)]">
              <img src="/images/horno-masa.webp" alt="Pizzero estirando masa fresca en cocina Mutcha Pizza" loading="lazy" className="block h-auto w-full" />
            </div>
            <p className="mt-3 text-center font-brand text-[14px] text-mp-cafe">la masa se hace en casa, todos los días</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
