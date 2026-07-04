import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Hero = () => {
  const { t } = useLanguage()
  

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6"
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
            className="text-sm xs:text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl leading-relaxed mx-auto"
          >
            {t('hero.description')}{' '}
            <span className="text-accent-400 font-semibold">{t('hero.ml')}</span>,{' '}
            <span className="text-blue-400 font-semibold">{t('hero.web')}</span>, {t('hero.data') !== 'hero.data' ? 'and' : 'et'}{' '}
            <span className="text-purple-400 font-semibold">{t('hero.data')}</span>.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-stretch xs:items-center"
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
              href="/CV_Yoeli Barthel.pdf?v=20250927"
              download="CV_Yoeli Barthel.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 py-3 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 inline-flex items-center gap-2 justify-center text-sm sm:text-base min-h-[44px] backdrop-blur-sm"
            >
              <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span>{t('hero.downloadCV')}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
