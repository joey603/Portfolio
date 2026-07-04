import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

const AiMatchFab = () => {
  const scrollToJobMatch = () => {
    document.getElementById('job-match')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.button
      type="button"
      onClick={scrollToJobMatch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="AI Match"
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-slate-950/90 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 backdrop-blur-md transition hover:border-blue-300/60 hover:shadow-blue-500/30"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-inner">
        <Bot size={16} />
      </span>
      AI Match
    </motion.button>
  )
}

export default AiMatchFab
