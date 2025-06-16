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
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-0">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1 space-y-4 sm:space-y-6"
          >
            <motion.div variants={itemVariants} className="mb-3 sm:mb-4 md:mb-6">
              <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs sm:text-sm font-semibold text-blue-300 border border-blue-500/30 backdrop-blur-sm">
                {t('hero.available')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight tracking-tight"
            >
              <span className="block sm:inline">{t('hero.greeting')}</span>{' '}
              <span className="gradient-text block sm:inline">Yoeli</span>
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-3 sm:mb-4 md:mb-6 font-light leading-relaxed"
            >
              <span className="block sm:inline">{t('hero.title')}</span>
              <span className="text-accent-400 block sm:inline"> {t('hero.subtitle')}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm xs:text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-xl lg:max-w-2xl leading-relaxed mx-auto lg:mx-0"
            >
              {t('hero.description')}{' '}
              <span className="text-accent-400 font-semibold">{t('hero.ml')}</span>,{' '}
              <span className="text-blue-400 font-semibold">{t('hero.web')}</span>, {t('hero.data') !== 'hero.data' ? 'and' : 'et'}{' '}
              <span className="text-purple-400 font-semibold">{t('hero.data')}</span>.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch xs:items-center"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center gap-2 justify-center py-3 px-4 sm:px-6 text-sm sm:text-base font-semibold min-h-[44px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>{t('hero.viewWork')}</span>
              </motion.a>
              
              <motion.a
                href="/CV_YoeliBarthel.pdf"
                download="CV_YoeliBarthel.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center gap-2 justify-center text-sm sm:text-base min-h-[44px] backdrop-blur-sm"
              >
                <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>{t('hero.downloadCV')}</span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 sm:mt-8 md:mt-12 grid grid-cols-3 xs:flex xs:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8"
            >
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">{t('hero.stat1')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1">3+</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">{t('hero.stat2')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg xs:text-xl sm:text-2xl font-bold text-white mb-1">2025</div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">{t('hero.stat3')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative h-48 xs:h-56 sm:h-72 md:h-80 lg:h-[450px] xl:h-[500px] order-1 lg:order-2 w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl backdrop-blur-sm border border-white/5"></div>
            
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="rounded-2xl"
            >
              <Suspense fallback={null}>
                <FloatingCube />
              </Suspense>
            </Canvas>
            
            {/* Floating Elements - Better positioned for mobile */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 xs:top-4 sm:top-6 md:top-10 left-2 xs:left-4 sm:left-6 md:left-10 glass-effect p-1.5 xs:p-2 sm:p-3 rounded-lg shadow-lg backdrop-blur-md"
            >
              <div className="text-xs text-blue-400 font-mono font-semibold">React</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-6 xs:top-8 sm:top-12 md:top-20 right-2 xs:right-4 sm:right-8 md:right-20 glass-effect p-1.5 xs:p-2 sm:p-3 rounded-lg shadow-lg backdrop-blur-md"
            >
              <div className="text-xs text-green-400 font-mono font-semibold">Python</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [-6, 12, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-6 xs:bottom-8 sm:bottom-12 md:bottom-20 left-2 xs:left-4 sm:left-8 md:left-20 glass-effect p-1.5 xs:p-2 sm:p-3 rounded-lg shadow-lg backdrop-blur-md"
            >
              <div className="text-xs text-purple-400 font-mono font-semibold">AI/ML</div>
            </motion.div>

            {/* Additional floating element for better visual balance */}
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-2 xs:bottom-4 sm:bottom-6 md:bottom-10 right-6 xs:right-8 sm:right-12 md:right-16 glass-effect p-1.5 xs:p-2 sm:p-3 rounded-lg shadow-lg backdrop-blur-md"
            >
              <div className="text-xs text-yellow-400 font-mono font-semibold">JS</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Better positioned for mobile */}
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5 backdrop-blur-sm"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={20} className="xs:w-6 xs:h-6 sm:w-8 sm:h-8" />
      </motion.button>
    </section>
  )
}

export default Hero 