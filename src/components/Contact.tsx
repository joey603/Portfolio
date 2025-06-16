import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, Phone, MapPin, Github, Linkedin, Send, User, MessageSquare, Download } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Contact = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const contactInfo = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: "yoelibarthel603@gmail.com",
      href: "mailto:yoelibarthel603@gmail.com",
      color: "blue"
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: "+972 58-506-0398",
      href: "tel:+972585060398",
      color: "green"
    },
    {
      icon: MapPin,
      label: t('contact.location'),
      value: "Ashdod, Israel",
      href: "https://maps.google.com/?q=Ashdod,Israel",
      color: "purple"
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/joey603",
      color: "gray"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yoeli-barthel/",
      color: "blue"
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Contact from portfolio')
    const body = encodeURIComponent(
      `Hello Yoeli,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
    )
    window.location.href = `mailto:yoelibarthel603@gmail.com?subject=${subject}&body=${body}`
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "text-blue-400 bg-blue-500/20 border-blue-500/30",
      green: "text-green-400 bg-green-500/20 border-green-500/30",
      purple: "text-purple-400 bg-purple-500/20 border-purple-500/30",
      gray: "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section id="contact" className="section-padding bg-slate-900/50">
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
              {t('contact.title')} <span className="gradient-text">{t('contact.me')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
              <div className="glass-effect p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{t('contact.info')}</h3>
                <div className="space-y-4 sm:space-y-6">
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className={`p-2 sm:p-3 rounded-lg border ${getColorClasses(info.color)} flex-shrink-0`}>
                        <info.icon size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-gray-400 text-xs sm:text-sm">{info.label}</div>
                        <div className="text-white font-semibold group-hover:text-accent-400 transition-colors text-sm sm:text-base break-all">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{t('contact.social')}</h3>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 sm:p-4 rounded-lg border ${getColorClasses(social.color)} hover:bg-white/5 transition-colors`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="sm:w-6 sm:h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="glass-effect p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{t('contact.availability')}</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
                    <span className="text-green-400 font-semibold text-sm sm:text-base">{t('contact.available')}</span>
                  </div>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {t('contact.availableDesc')}
                  </p>
                  <motion.a
                    href="/CV_YoeliBarthel.pdf"
                    download="CV_YoeliBarthel.pdf"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-all duration-300 font-semibold text-sm sm:text-base"
                  >
                    <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                    {t('contact.downloadCV')}
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2">
                  <MessageSquare size={20} className="sm:w-6 sm:h-6" />
                  {t('contact.form')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.name')}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors text-sm sm:text-base"
                        placeholder={t('contact.namePlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors text-sm sm:text-base"
                        placeholder={t('contact.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors text-sm sm:text-base"
                      placeholder={t('contact.subjectPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-colors resize-none text-sm sm:text-base"
                      placeholder={t('contact.messagePlaceholder')}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Send size={18} />
                    {t('contact.send')}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact 