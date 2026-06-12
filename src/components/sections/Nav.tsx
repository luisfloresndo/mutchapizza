import { useEffect, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { MpLogo } from '@/components/MpLogo'

const LINKS = [
  { name: 'La Rellena', url: '#especialidad' },
  { name: 'Promos', url: '#promos' },
  { name: 'Menú', url: '#menu' },
  { name: 'Sucursales', url: '#sucursales' },
]

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

export function Nav() {
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)

  useEffect(() => scrollY.on('change', (v) => setCompact(v > 80)), [scrollY])

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 border-b-4 border-mp-negro bg-mp-crema/95 backdrop-blur-sm"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
    >
      <div
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[padding] duration-300 sm:px-7"
        style={{ paddingBlock: compact ? '8px' : '14px' }}
      >
        <a href="#top" title="Ir al inicio">
          <MpLogo variant="horizontal" style={{ fontSize: compact ? 13 : 15 }} />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.name}
              href={l.url}
              className="group relative font-text text-[14.5px] font-semibold text-mp-negro transition-colors hover:text-mp-rojo"
            >
              {l.name}
              <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-mp-amarillo transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href={PIDE_DIRECTO}
            target="_blank"
            rel="noreferrer"
            className="border-3 border-mp-negro bg-mp-rojo px-5 py-2.5 font-head text-[13px] tracking-wide text-white shadow-stamp transition-[transform,box-shadow] duration-100 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_var(--mp-negro)]"
          >
            ORDENA AHORA
          </a>
        </div>

        {/* móvil: el CTA y los links viven en la barra inferior (MobileNav) */}
      </div>
    </motion.nav>
  )
}
