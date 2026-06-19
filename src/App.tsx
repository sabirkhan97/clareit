import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ClientStrip from '@/components/ClientStrip'
import Services from '@/components/Services'
import StatsBand from '@/components/StatsBand'
import Work from '@/components/Work'
import Process from '@/components/Process'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import CtaBand from '@/components/CtaBand'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import PageLoader from '@/components/PageLoader'

function App() {
  return (
    <div className="relative min-h-screen bg-paper">
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ClientStrip />
        <Services />
        <StatsBand />
        <Work />
        <Process />
        <About />
        <Testimonials />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
    </div>
  )
}

export default App
