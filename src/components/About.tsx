import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const About = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
    <section id="about" className="section-padding bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Side - Personal Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-effect p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{t('about.title')} {t('about.me')}</h3>
                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {t('about.description')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {t('about.passion')}
                </p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.collaboration')}
                </p>
              </div>
            </motion.div>

            {/* Right Side - Facts & Stats */}
            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                <div className="glass-effect p-4 sm:p-6 rounded-xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-blue-500/20 rounded-lg flex-shrink-0">
                      <GraduationCap className="text-blue-400" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">{t('about.education')}</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">{t('about.degree')} - {t('about.specialization')}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {t('about.college')} • 2022-2025
                  </p>
                </div>

                <div className="glass-effect p-4 sm:p-6 rounded-xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-green-500/20 rounded-lg flex-shrink-0">
                      <MapPin className="text-green-400" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Location</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Ashdod, Israel</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Open to remote and international opportunities
                  </p>
                </div>

                <div className="glass-effect p-4 sm:p-6 rounded-xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-purple-500/20 rounded-lg flex-shrink-0">
                      <Award className="text-purple-400" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Experience</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Fresh graduate</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Software development and project management
                  </p>
                </div>

                <div className="glass-effect p-4 sm:p-6 rounded-xl">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-orange-500/20 rounded-lg flex-shrink-0">
                      <Calendar className="text-orange-400" size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white text-sm sm:text-base">Availability</h4>
                      <p className="text-gray-400 text-xs sm:text-sm">Immediate</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Ready for new challenges and opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Languages Section */}
          <motion.div variants={itemVariants} className="mt-12 sm:mt-16">
            <div className="glass-effect p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-white">{t('about.languages')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🇬🇧</div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{t('about.english')}</h4>
                  <p className="text-blue-400 text-sm">{t('about.fluent')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🇮🇱</div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{t('about.hebrew')}</h4>
                  <p className="text-green-400 text-sm">{t('about.fluent')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl mb-2">🇫🇷</div>
                  <h4 className="font-semibold text-white text-sm sm:text-base">{t('about.french')}</h4>
                  <p className="text-purple-400 text-sm">{t('about.native')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About 