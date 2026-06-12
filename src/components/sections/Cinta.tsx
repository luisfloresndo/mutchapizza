import { ScrollVelocity } from '@/components/ui/scroll-velocity'

/** Cinta marquee de marca — acelera con la velocidad del scroll. */
export function Cinta({ texto = 'mutcho sabor · mutcho queso · mutcha pizza · ' }: { texto?: string }) {
  return (
    <div className="border-y-4 border-mp-negro bg-mp-rojo py-3" aria-hidden>
      <ScrollVelocity
        velocity={3}
        className="font-brand text-[20px] tracking-[.05em] text-mp-amarillo"
      >
        {texto}
      </ScrollVelocity>
    </div>
  )
}
