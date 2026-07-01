import { useEffect, useState } from 'react'
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'

    const savedTheme = window.localStorage.getItem('theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      const savedTheme = window.localStorage.getItem('theme')
      if (savedTheme === 'light' || savedTheme === 'dark') return
      setTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    handleSystemThemeChange()
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
  }, [])

  

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink transition-colors duration-300">
      <PageLoader />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
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
