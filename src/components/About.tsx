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
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('about.title')} <span className="gradient-text">{t('about.me')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Personal Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-effect p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-white">{t('about.title')} {t('about.me')}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('about.description')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('about.passion')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('about.collaboration')}
                </p>
              </div>
            </motion.div>

            {/* Right Side - Facts & Stats */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid gap-6">
                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <GraduationCap className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{t('about.education')}</h4>
                      <p className="text-gray-400">{t('about.degree')} - {t('about.specialization')}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {t('about.college')} • 2022-2025
                  </p>
                </div>

                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-500/20 rounded-lg">
                      <MapPin className="text-green-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-gray-400">Ashdod, Israel</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Open to remote and international opportunities
                  </p>
                </div>

                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Award className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Experience</h4>
                      <p className="text-gray-400">Fresh graduate</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Software development and project management
                  </p>
                </div>

                <div className="glass-effect p-6 rounded-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-orange-500/20 rounded-lg">
                      <Calendar className="text-orange-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Availability</h4>
                      <p className="text-gray-400">Immediate</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Ready for new challenges and opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Languages Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="glass-effect p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center text-white">{t('about.languages')}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🇬🇧</div>
                  <h4 className="font-semibold text-white">{t('about.english')}</h4>
                  <p className="text-blue-400">{t('about.fluent')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🇮🇱</div>
                  <h4 className="font-semibold text-white">{t('about.hebrew')}</h4>
                  <p className="text-green-400">{t('about.fluent')}</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🇫🇷</div>
                  <h4 className="font-semibold text-white">{t('about.french')}</h4>
                  <p className="text-purple-400">{t('about.native')}</p>
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