import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Calendar, Users, Code, Database } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Projects = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: t('project.surveyflow.title'),
      description: t('project.surveyflow.description'),
      period: t('project.surveyflow.period'),
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Material-UI", "OAuth", "REST API"],
      features: [
        t('project.surveyflow.feature1'),
        t('project.surveyflow.feature2'),
        t('project.surveyflow.feature3'),
        t('project.surveyflow.feature4')
      ],
      links: {
        github: "https://github.com/joey603/SurveyPro.git",
        demo: "https://www.surveyflow.co/"
      },
      category: "Web Development",
      color: "blue"
    },
    {
      title: t('project.sidour.title'),
      description: t('project.sidour.description'),
      period: t('project.sidour.period'),
      technologies: ["Python", "Tkinter", "SQLite", "Pandas", "PyInstaller"],
      features: [
        t('project.sidour.feature1'),
        t('project.sidour.feature2'),
        t('project.sidour.feature3'),
        t('project.sidour.feature4')
      ],
      links: {
        github: "https://github.com/joey603/Sidour-avoda-Tzora-chevron"
      },
      category: "Desktop Application",
      color: "green"
    },
    {
      title: t('project.divespot.title'),
      description: t('project.divespot.description'),
      period: t('project.divespot.period'),
      technologies: ["MongoDB", "React", "Node.js", "Confluence", "Jira", "CI/CD"],
      features: [
        t('project.divespot.feature1'),
        t('project.divespot.feature2'),
        t('project.divespot.feature3'),
        t('project.divespot.feature4')
      ],
      links: {
        github: "https://github.com/joey603/Client_DiveExplore_official.git",
        demo: "https://client-diveexplore.onrender.com/"
      },
      category: "Team Project",
      color: "purple"
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 text-blue-400 border-blue-500/30",
      green: "from-green-500 to-green-600 text-green-400 border-green-500/30",
      purple: "from-purple-500 to-purple-600 text-purple-400 border-purple-500/30",
      orange: "from-orange-500 to-orange-600 text-orange-400 border-orange-500/30"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="projects" className="section-padding bg-slate-900/50">
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
              {t('projects.title')} <span className="gradient-text">{t('projects.subtitle')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('projects.description')}
            </p>
          </motion.div>

          <div className="space-y-8 sm:space-y-12">
            {projects.map((project, _) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="glass-effect p-6 sm:p-8 rounded-xl"
              >
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Project Info */}
                  <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getColorClasses(project.color)} bg-${project.color}-500/10 self-start sm:self-auto`}>
                        {project.category}
                      </span>
                    </div>

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {project.description}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        <span>{project.period}</span>
                      </div>
                      {project.title.includes("équipe") && (
                        <div className="flex items-center gap-2">
                          <Users size={14} className="sm:w-4 sm:h-4" />
                          <span>Équipe de 5</span>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Code size={16} className="sm:w-[18px] sm:h-[18px]" />
                        {t('projects.features')}
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start gap-2 text-sm sm:text-base">
                            <span className="text-accent-400 mt-1 flex-shrink-0">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technologies & Links */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Database size={16} className="sm:w-[18px] sm:h-[18px]" />
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 sm:px-3 sm:py-1 bg-slate-700/50 text-gray-300 rounded-full text-xs sm:text-sm border border-slate-600/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base sm:text-lg font-semibold text-white">Links</h4>
                      <div className="flex flex-col gap-3">
                        <motion.a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Github size={18} className="text-gray-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm sm:text-base">{t('projects.viewSource')}</span>
                        </motion.a>
                        {project.links.demo && (
                          <motion.a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-3 p-3 glass-effect rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <ExternalLink size={18} className="text-gray-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm sm:text-base">{t('projects.viewDemo')}</span>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 