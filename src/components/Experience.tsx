import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Shield, Users, Award, MapPin, Calendar, GraduationCap } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Experience = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      title: t('exp.education.title'),
      subtitle: t('exp.education.subtitle'),
      company: t('exp.education.company'),
      location: "Israel",
      period: t('exp.education.period'),
      type: t('about.education'),
      description: t('exp.education.desc1'),
      responsibilities: [
        t('exp.education.desc1'),
        t('exp.education.desc2'),
        t('exp.education.desc3'),
        t('exp.education.desc4')
      ],
      skills: ["Software Development", "AI/ML", "Full-Stack Development", "Problem Solving", "Team Collaboration"],
      icon: GraduationCap,
      color: "purple"
    },
    {
      title: t('exp.security.title'),
      company: t('exp.security.company'),
      location: "Israel",
      period: t('exp.security.period'),
      type: "Leadership",
      description: t('exp.security.desc1'),
      responsibilities: [
        t('exp.security.desc1'),
        t('exp.security.desc2'),
        t('exp.security.desc3'),
        t('exp.security.desc4')
      ],
      skills: ["Leadership", "Team Management", "Problem Solving", "Communication", "Responsibility"],
      icon: Shield,
      color: "blue"
    },
    {
      title: t('exp.military.title'),
      company: t('exp.military.company'),
      location: "Israel",
      period: t('exp.military.period'),
      type: "Technical Service",
      description: t('exp.military.desc1'),
      responsibilities: [
        t('exp.military.desc1'),
        t('exp.military.desc2'),
        t('exp.military.desc3'),
        t('exp.military.desc4')
      ],
      skills: ["Technical Precision", "Analytical Thinking", "Attention to Detail", "Diagnostics", "Documentation"],
      icon: Award,
      color: "green"
    }
  ]

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 bg-blue-500/20 border-blue-500/30 text-blue-400",
      green: "from-green-500 to-green-600 bg-green-500/20 border-green-500/30 text-green-400",
      purple: "from-purple-500 to-purple-600 bg-purple-500/20 border-purple-500/30 text-purple-400"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="experience" className="section-padding">
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
              {t('experience.title')} <span className="gradient-text">{t('experience.subtitle')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('experience.description')}
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line - Hidden on mobile */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-green-500 hidden md:block" />

            <div className="space-y-8 sm:space-y-12">
              {experiences.map((exp, _) => (
                <motion.div
                  key={exp.title}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline Dot - Adjusted for smaller screens */}
                  <div className="absolute left-4 sm:left-6 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 sm:border-4 border-slate-900 hidden md:block" />
                  
                  <div className="md:ml-16 lg:ml-20 glass-effect p-4 sm:p-6 lg:p-8 rounded-xl">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 sm:gap-6">
                      {/* Left Column - Basic Info */}
                      <div className="lg:w-1/3 space-y-3 sm:space-y-4">
                        <div className={`inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border text-sm sm:text-base ${getColorClasses(exp.color)}`}>
                          <exp.icon size={16} className="sm:w-5 sm:h-5" />
                          <span className="font-semibold">{exp.type}</span>
                        </div>

                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.title}</h3>
                          <h4 className="text-base sm:text-lg font-semibold text-accent-400 mb-3 sm:mb-4">{exp.company}</h4>
                        </div>

                        <div className="space-y-2 text-xs sm:text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                            <span>{exp.location}</span>
                          </div>
                          {exp.title.includes("Manager") && (
                            <div className="flex items-center gap-2">
                              <Users size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                              <span>Team of 5 people</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Details */}
                      <div className="lg:w-2/3 space-y-4 sm:space-y-6">
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                          {exp.description}
                        </p>

                        <div>
                          <h5 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                            <Briefcase size={16} className="sm:w-[18px] sm:h-[18px]" />
                            {exp.type === "Education" ? "Key Achievements" : "Main Responsibilities"}
                          </h5>
                          <ul className="space-y-2">
                            {exp.responsibilities.map((resp, idx) => (
                              <li key={idx} className="text-gray-300 flex items-start gap-2 text-sm sm:text-base">
                                <span className="text-accent-400 mt-1 flex-shrink-0">•</span>
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-base sm:text-lg font-semibold text-white mb-3">Skills Developed</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium border ${getColorClasses(exp.color)} bg-${exp.color}-500/10`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="mt-8 sm:mt-12">
            <div className="glass-effect p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-white">
                {t('experience.summary')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">3</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('experience.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">5+</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('experience.team')}</div>
                </div>
                <div className="text-center col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">100%</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('experience.dedication')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 