import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { MpLogo } from '@/components/MpLogo'

const LINKS = [
  { name: 'La Pizza Rellena', url: '#especialidad' },
  { name: 'Promociones', url: '#promos' },
  { name: 'Menú', url: '#menu' },
  { name: 'Sucursales', url: '#sucursales' },
  { name: 'Franquicias', url: '#franquicias' },
  // TODO cliente: URL del portal de facturación
  { name: 'Facturación', url: '#' },
]

const SOCIAL = [
  { name: 'Facebook', url: 'https://www.facebook.com/mpmutchapizza/', Icon: FaFacebookF },
  { name: 'Instagram', url: 'https://www.instagram.com/mpmutchapizza_/', Icon: FaInstagram },
]

/**
 * Footer con reveal sticky: la página "se levanta" y debajo aparece
 * el cierre con el nombre gigante (técnica de sticky-footer · 21st.dev).
 */
export function Footer() {
  return (
    <footer
      className="relative h-[560px] w-full sm:h-[520px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div className="fixed bottom-0 h-[560px] w-full bg-mp-negro sm:h-[520px]">
        <div className="sticky top-[calc(100vh-560px)] flex h-full flex-col justify-between px-5 pt-14 sm:top-[calc(100vh-520px)] sm:px-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
            <MpLogo variant="stacked" tagline style={{ fontSize: 30 }} />

            <nav className="grid grid-cols-2 gap-x-12 gap-y-2.5" aria-label="Enlaces del pie">
              {LINKS.map((l) => (
                <a
                  key={l.name}
                  href={l.url}
                  className="font-text text-[14px] text-mp-crema/75 transition-colors hover:text-mp-amarillo"
                >
                  {l.name}
                </a>
              ))}
            </nav>

            <div className="flex gap-3">
              {SOCIAL.map(({ name, url, Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="grid size-11 place-items-center border-3 border-mp-crema/30 text-mp-crema transition-all hover:border-mp-amarillo hover:bg-mp-amarillo hover:text-mp-negro"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-6xl">
            <p className="mb-2 text-center font-text text-[11.5px] tracking-[.12em] text-mp-crema/45">
              MUTCHAPIZZA.VERCEL.APP · MONTERREY, N.L. · DESDE 1998 · PRECIOS DE REFERENCIA, APLICAN RESTRICCIONES
            </p>
            {/* Nombre gigante — el cierre */}
            <div
              aria-hidden
              className="select-none text-center font-head uppercase leading-[0.82] text-mp-rojo"
              style={{ fontSize: 'clamp(72px, 13.5vw, 210px)', letterSpacing: '-0.02em' }}
            >
              MUTCHA
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
