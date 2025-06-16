import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Projects from './components/Projects.tsx'
import Experience from './components/Experience.tsx'
import Contact from './components/Contact.tsx'
import BackgroundScene from './components/3D/BackgroundScene.tsx'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fallback">
        {/* Background 3D Scene */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 bg-fallback">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ background: 'transparent' }}
            gl={{ alpha: true, antialias: true }}
          >
            <Suspense fallback={null}>
              <BackgroundScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </motion.div>
      </div>
    </LanguageProvider>
  )
}

export default App 