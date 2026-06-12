import { useLenis } from '@/hooks/use-lenis'
import { Nav } from '@/components/sections/Nav'
import { Hero } from '@/components/sections/Hero'
import { Cinta } from '@/components/sections/Cinta'
import { Especialidad } from '@/components/sections/Especialidad'
import { Promos } from '@/components/sections/Promos'
import { Menu } from '@/components/sections/Menu'
import { Historia } from '@/components/sections/Historia'
import { Sucursales } from '@/components/sections/Sucursales'
import { CtaFinal } from '@/components/sections/CtaFinal'
import { Footer } from '@/components/sections/Footer'

function App() {
  useLenis()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Cinta />
        <Especialidad />
        <Promos />
        <Menu />
        <Historia />
        <Sucursales />
        <CtaFinal />
        <Footer />
      </main>
    </>
  )
}

export default App
