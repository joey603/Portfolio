import { motion } from 'framer-motion'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import About from './components/About.tsx'
import Skills from './components/Skills.tsx'
import Projects from './components/Projects.tsx'
import JobMatch from './components/JobMatch.tsx'
import Experience from './components/Experience.tsx'
import Contact from './components/Contact.tsx'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative bg-slate-950">
        {/* Modern CSS background: aurora glows + subtle grid */}
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
          <div className="bg-grid absolute inset-0" />
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
            <JobMatch />
            <Experience />
            <Contact />
          </main>
        </motion.div>
      </div>
    </LanguageProvider>
  )
}

export default App
