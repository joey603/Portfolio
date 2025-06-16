import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Code2, 
  Globe, 
  Database, 
  Settings,
  Brain,
  Users,
  MessageCircle,
  Zap,
  Target,
  FileText,
  Bug,
  GitBranch
} from 'lucide-react'

// Import des logos officiels
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiC,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiMui,
  SiPostgresql,
  SiMongodb,
  SiSqlite,
  SiGit,
  SiGithub,
  SiJira,
  SiTrello,
  SiConfluence,
  SiCloudinary
} from 'react-icons/si'
import { FaLock, FaLink, FaJava } from 'react-icons/fa'

const Skills = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      title: t('skills.programming'),
      color: "blue",
      icon: Code2,
      skills: [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
        { name: "C++", icon: SiCplusplus, color: "#00599C" },
        { name: "Java", icon: FaJava, color: "#ED8B00" },
        { name: "C", icon: SiC, color: "#A8B9CC" }
      ]
    },
    {
      title: t('skills.web'),
      color: "green",
      icon: Globe,
      skills: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
        { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
        { name: "CSS3", icon: SiCss3, color: "#1572B6" },
        { name: "Material-UI", icon: SiMui, color: "#007FFF" }
      ]
    },
    {
      title: t('skills.database'),
      color: "purple",
      icon: Database,
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "SQLite", icon: SiSqlite, color: "#003B57" },
        { name: "REST API", icon: FaLink, color: "#FF6B6B" },
        { name: "OAuth", icon: FaLock, color: "#4285F4" }
      ]
    },
    {
      title: t('skills.tools'),
      color: "orange",
      icon: Settings,
      skills: [
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#181717" },
        { name: "Jira", icon: SiJira, color: "#0052CC" },
        { name: "Trello", icon: SiTrello, color: "#0079BF" },
        { name: "Confluence", icon: SiConfluence, color: "#172B4D" },
        { name: "Cloudinary", icon: SiCloudinary, color: "#3448C5" }
      ]
    }
  ]

  const softSkills = [
    { name: t('skills.problemSolving'), icon: Brain },
    { name: t('skills.teamwork'), icon: Users },
    { name: t('skills.communication'), icon: MessageCircle },
    { name: t('skills.adaptability'), icon: Zap },
    { name: t('skills.leadership'), icon: Target },
    { name: t('skills.projectManagement'), icon: FileText },
    { name: "Testing & Debugging", icon: Bug },
    { name: "CI/CD", icon: GitBranch }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        gradient: "from-blue-500 to-blue-600",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        hover: "hover:bg-blue-500/20 hover:border-blue-400/50"
      },
      green: {
        gradient: "from-green-500 to-green-600",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        text: "text-green-400",
        hover: "hover:bg-green-500/20 hover:border-green-400/50"
      },
      purple: {
        gradient: "from-purple-500 to-purple-600",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        hover: "hover:bg-purple-500/20 hover:border-purple-400/50"
      },
      orange: {
        gradient: "from-orange-500 to-orange-600",
        bg: "bg-orange-500/10",
        border: "border-orange-500/30",
        text: "text-orange-400",
        hover: "hover:bg-orange-500/20 hover:border-orange-400/50"
      }
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="skills" className="section-padding">
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
              {t('skills.title')} <span className="gradient-text">{t('skills.subtitle')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </motion.div>

          {/* Technical Skills */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {skillCategories.map((category, index) => {
              const colorClasses = getColorClasses(category.color)
              return (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className="glass-effect p-6 sm:p-8 rounded-xl"
                >
                  <div className={`flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 ${colorClasses.bg} rounded-lg border ${colorClasses.border}`}>
                    <category.icon className={`${colorClasses.text} w-5 h-5 sm:w-6 sm:h-6`} />
                    <h3 className={`text-lg sm:text-xl font-bold ${colorClasses.text}`}>
                      {category.title}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 ${colorClasses.hover} transition-all duration-300 cursor-pointer`}
                      >
                        <div className="flex flex-col items-center text-center space-y-2">
                          <skill.icon 
                            size={24} 
                            className="sm:w-8 sm:h-8"
                            style={{ color: skill.color }} 
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-300">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Soft Skills */}
          <motion.div variants={itemVariants} className="glass-effect p-6 sm:p-8 rounded-xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
              <Brain className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
              <h3 className="text-lg sm:text-xl font-bold text-purple-400">
                {t('skills.soft')}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={skillVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <skill.icon className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-xs sm:text-sm font-medium text-gray-300">
                      {skill.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-8 sm:mt-12 text-center">
            <div className="glass-effect p-6 sm:p-8 rounded-xl">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">
                {t('skills.summary')}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-2">6+</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('skills.languages')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">6+</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('skills.frameworks')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">5+</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('skills.databases')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-orange-400 mb-2">6+</div>
                  <div className="text-xs sm:text-sm text-gray-400">{t('skills.tools')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 