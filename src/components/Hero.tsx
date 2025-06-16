import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import FloatingCube from './3D/FloatingCube'
import { ChevronDown, Download, Eye } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()
  
  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-sm font-semibold text-blue-300 border border-blue-500/30">
                {t('hero.available')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              {t('hero.greeting')}{' '}
              <span className="gradient-text">Yoeli</span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-3xl text-gray-300 mb-6 font-light"
            >
              {t('hero.title')}
              <span className="text-accent-400"> {t('hero.subtitle')}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-8 max-w-2xl leading-relaxed"
            >
              {t('hero.description')}{' '}
              <span className="text-accent-400 font-semibold">{t('hero.ml')}</span>,{' '}
              <span className="text-blue-400 font-semibold">{t('hero.web')}</span>, {t('hero.data') !== 'hero.data' ? 'and' : 'et'}{' '}
              <span className="text-purple-400 font-semibold">{t('hero.data')}</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
                              <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Eye size={20} />
                  {t('hero.viewWork')}
                </motion.a>
                
                <motion.a
                  href="/CV_YoeliBarthel.pdf"
                  download="CV_YoeliBarthel.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Download size={20} />
                  {t('hero.downloadCV')}
                </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center lg:justify-start gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5+</div>
                <div className="text-sm text-gray-400">{t('hero.stat1')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-sm text-gray-400">{t('hero.stat2')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2025</div>
                <div className="text-sm text-gray-400">{t('hero.stat3')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-96 lg:h-[500px]"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <FloatingCube />
              </Suspense>
            </Canvas>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 glass-effect p-3 rounded-lg"
            >
              <div className="text-xs text-blue-400 font-mono">React</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-20 glass-effect p-3 rounded-lg"
            >
              <div className="text-xs text-green-400 font-mono">Python</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 left-20 glass-effect p-3 rounded-lg"
            >
              <div className="text-xs text-purple-400 font-mono">AI/ML</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  )
}

export default Hero 