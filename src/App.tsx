import { useLenis } from '@/hooks/use-lenis'
import { Nav } from '@/components/sections/Nav'
import { MobileNav } from '@/components/sections/MobileNav'
import { Hero } from '@/components/sections/Hero'
import { Cinta } from '@/components/sections/Cinta'
import { Especialidad } from '@/components/sections/Especialidad'
import { Promos } from '@/components/sections/Promos'
import { Menu } from '@/components/sections/Menu'
import { Historia } from '@/components/sections/Historia'
import { Sucursales } from '@/components/sections/Sucursales'
import { Franquicias } from '@/components/sections/Franquicias'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Footer } from '@/components/sections/Footer'

function App() {
  useLenis()

  return (
    <>
      <Nav />
      <MobileNav />
      {/* pb en móvil: la barra inferior no debe tapar el cierre del footer */}
      <main className="pb-14 md:pb-0">
        <Hero />
        <Cinta />
        <Especialidad />
        <Promos />
        <Menu />
        <Historia />
        <Sucursales />
        <Franquicias />
        <CtaFinal />
        <Footer />
      </main>
    </>
  )
}

export default App
