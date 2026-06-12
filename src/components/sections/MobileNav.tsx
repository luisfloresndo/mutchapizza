import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Pizza, Tag, BookOpen, MapPin } from 'lucide-react'

const PIDE_DIRECTO = 'https://mutchapizza.pidedirecto.mx/'

const TABS = [
  { id: 'especialidad', label: 'La Rellena', Icon: Pizza },
  { id: 'promos', label: 'Promos', Icon: Tag },
  { id: 'menu', label: 'Menú', Icon: BookOpen },
  { id: 'sucursales', label: 'Sucursales', Icon: MapPin },
]

/**
 * Barra inferior móvil: tabs de sección con indicador activo animado
 * + CTA "ORDENA" siempre visible (el botón que paga el sitio).
 */
export function MobileNav() {
  const [activa, setActiva] = useState<string | null>(null)

  // Resalta la sección visible (scroll-spy ligero)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActiva(e.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px' },
    )
    TABS.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t-4 border-mp-negro bg-mp-crema md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Navegación móvil"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activa === id
        return (
          <a
            key={id}
            href={`#${id}`}
            className="relative flex flex-1 flex-col items-center gap-0.5 px-1 pb-2 pt-2.5"
            aria-current={isActive ? 'true' : undefined}
          >
            {isActive && (
              <motion.span
                layoutId="tab-activa"
                className="absolute inset-x-1 top-0 h-1 bg-mp-rojo"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <Icon size={18} strokeWidth={2.4} className={isActive ? 'text-mp-rojo' : 'text-mp-cafe'} />
            <span className={`font-text text-[10px] font-semibold ${isActive ? 'text-mp-negro' : 'text-mp-cafe'}`}>
              {label}
            </span>
          </a>
        )
      })}
      <a
        href={PIDE_DIRECTO}
        target="_blank"
        rel="noreferrer"
        className="flex items-center border-l-4 border-mp-negro bg-mp-rojo px-4 font-head text-[12px] tracking-wide text-white"
      >
        ORDENA
      </a>
    </nav>
  )
}
