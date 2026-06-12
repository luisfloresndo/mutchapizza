import { ScrollVelocity } from '@/components/ui/scroll-velocity'

/**
 * Cinta de marca a dos líneas — reactivas a la velocidad del scroll,
 * direcciones opuestas, estilo sello (bordes negros gruesos).
 */
export function Cinta() {
  return (
    <div className="border-y-[6px] border-mp-negro bg-mp-rojo" aria-hidden>
      <ScrollVelocity
        velocity={4}
        className="py-2 font-brand text-[26px] tracking-[.05em] text-mp-amarillo sm:text-[32px]"
      >
        {'mutcho sabor · mutcho queso · mutcha pizza · '}
      </ScrollVelocity>
      <div className="border-t-[3px] border-mp-negro/40">
        <ScrollVelocity
          velocity={-4}
          className="py-2 font-brand text-[26px] tracking-[.05em] text-mp-crema sm:text-[32px]"
        >
          {'la casa de la pizza rellena · desde 1998 · monterrey · '}
        </ScrollVelocity>
      </div>
    </div>
  )
}
