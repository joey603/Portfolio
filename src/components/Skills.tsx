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
              {t('skills.title')} <span className="gradient-text">{t('skills.subtitle')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('skills.description')}
            </p>
          </motion.div>

          {/* Technical Skills */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-effect p-8 rounded-xl"
              >
                <div className={`inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border ${getColorClasses(category.color).border} ${getColorClasses(category.color).bg}`}>
                  <category.icon size={20} className={getColorClasses(category.color).text} />
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={skillVariants}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      className={`
                        p-4 rounded-lg border transition-all duration-300 cursor-pointer
                        ${getColorClasses(category.color).bg} 
                        ${getColorClasses(category.color).border}
                        ${getColorClasses(category.color).hover}
                        group
                      `}
                    >
                      <div className="text-center space-y-2">
                        <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                          <skill.icon 
                            size={32} 
                            style={{ color: skill.color }}
                            className="drop-shadow-lg"
                          />
                        </div>
                        <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                          {skill.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Soft Skills */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect p-8 rounded-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('skills.professional')}</h3>
                <p className="text-gray-400">{t('skills.description')}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {softSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                    className="
                      p-4 rounded-lg border transition-all duration-300 cursor-pointer
                      bg-slate-700/30 border-slate-600/30 hover:bg-slate-600/40 hover:border-slate-500/50
                      group text-center
                    "
                  >
                    <skill.icon 
                      size={24} 
                      className="mx-auto mb-2 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" 
                    />
                    <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-12">
            <div className="glass-effect p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-6 text-white">Skills Overview</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-400">6+</div>
                  <div className="text-gray-400">Programming Languages</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-400">6+</div>
                  <div className="text-gray-400">Web Technologies</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-400">5+</div>
                  <div className="text-gray-400">Database Systems</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-400">6+</div>
                  <div className="text-gray-400">Development Tools</div>
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