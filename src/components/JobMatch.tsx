import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, Brain, CheckCircle2, Loader2, Sparkles, Target, XCircle } from 'lucide-react'
import { analyzeJobPost, MatchResult } from '../data/profileMatchData'
import { useLanguage } from '../contexts/LanguageContext'

interface AiInsight {
  summary: string
  recommendation: 'yes' | 'maybe' | 'no'
  strongPoints: string[]
  gaps: string[]
  suggestion: string
}

const exampleJobPost = `We are looking for a junior full-stack developer with React, TypeScript and Node.js experience. The role includes building responsive interfaces, REST APIs, database integrations, debugging production issues and collaborating with a product team. Experience with SaaS products, dashboards or AI projects is a plus.`

const sanitizeAiInsight = (insight: AiInsight, jobPost: string): AiInsight => {
  const normalizedJob = jobPost.toLowerCase()
  const requiresNativeMobile = /native|ios|android|appium|device farm|mobile app|application mobile/i.test(normalizedJob)
  const explicitlyMandatoryInternalSystem = /mandatory|required|must have|hands-on|experience with.*(פנינה|דלפי|אודם)/i.test(jobPost)

  const gaps = insight.gaps.filter((gap) => {
    const normalizedGap = gap.toLowerCase()
    const isInternalSystemGap = /פנינה|דלפי|אודם|internal core system|proprietary|company-specific/i.test(gap)
    const isGenericMobileGap = /mobile/i.test(normalizedGap)
    const isSoftGap = /high-pressure|pressure|deadline|tight|years? not specified|exact qa years/i.test(normalizedGap)

    if (isInternalSystemGap && !explicitlyMandatoryInternalSystem) return false
    if (isGenericMobileGap && !requiresNativeMobile) return false
    if (isSoftGap) return false
    return true
  })

  const summary = !explicitlyMandatoryInternalSystem && /internal core systems|פנינה|דלפי|אודם/i.test(insight.summary)
    ? insight.summary.replace(/(?:He|Yoeli) lacks direct experience with the specified internal core systems\.?/i, 'Specific internal systems can be handled as onboarding items.')
    : insight.summary

  return {
    ...insight,
    summary,
    gaps,
    recommendation: gaps.length === 0 && insight.recommendation === 'maybe'
      ? 'yes'
      : insight.recommendation
  }
}

const getVerdictLevel = (score: number): MatchResult['verdictLevel'] => {
  if (score >= 75) return 'strong'
  if (score >= 55) return 'good'
  if (score >= 35) return 'partial'
  return 'low'
}

const alignScoreWithAi = (result: MatchResult, insight: AiInsight): MatchResult => {
  const minimumScore = insight.recommendation === 'yes'
    ? 78
    : insight.recommendation === 'maybe'
      ? 58
      : 0
  const score = Math.max(result.score, minimumScore)

  return {
    ...result,
    score,
    verdictLevel: getVerdictLevel(score)
  }
}

const verdictClasses = {
  strong: 'text-green-400 border-green-500/30 bg-green-500/10',
  good: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  partial: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  low: 'text-red-400 border-red-500/30 bg-red-500/10'
}

const recommendationIcon = {
  yes: CheckCircle2,
  maybe: Target,
  no: XCircle
}

const JobMatch = () => {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [jobPost, setJobPost] = useState('')
  const [result, setResult] = useState<MatchResult | null>(null)
  const [aiInsight, setAiInsight] = useState<AiInsight | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiStatus, setAiStatus] = useState<'idle' | 'ai' | 'error'>('idle')

  const canAnalyze = jobPost.trim().length >= 40
  const verdictText = result ? t(`jobMatch.verdict.${result.verdictLevel}`) : ''
  const RecommendationIcon = aiInsight ? recommendationIcon[aiInsight.recommendation] : Sparkles

  const resultSummary = useMemo(() => {
    if (!result) return ''
    if (aiInsight?.summary) return aiInsight.summary
    return t(`jobMatch.summary.${result.verdictLevel}`)
  }, [aiInsight, result, t])

  const handleAnalyze = async () => {
    if (!canAnalyze) return

    setResult(null)
    setAiInsight(null)
    setAiStatus('idle')
    setIsAnalyzing(true)

    try {
      const response = await fetch('/api/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobPost })
      })

      if (!response.ok) {
        throw new Error('AI analysis failed')
      }

      const data = sanitizeAiInsight(await response.json() as AiInsight, jobPost)
      const localResult = analyzeJobPost(jobPost)

      setResult(alignScoreWithAi(localResult, data))
      setAiInsight(data)
      setAiStatus('ai')
    } catch {
      setResult(null)
      setAiInsight(null)
      setAiStatus('error')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section id="job-match" className="section-padding bg-slate-950/40">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-semibold mb-5">
              <Bot size={16} />
              {t('jobMatch.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('jobMatch.title')} <span className="gradient-text">{t('jobMatch.titleAccent')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              {t('jobMatch.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_0.95fr] gap-6 lg:gap-8 items-start">
            <motion.div
              whileHover={{ y: -3 }}
              className="glass-effect p-5 sm:p-7 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t('jobMatch.inputTitle')}</h3>
                  <p className="text-sm text-gray-400">{t('jobMatch.inputHelp')}</p>
                </div>
              </div>

              <textarea
                value={jobPost}
                onChange={(event) => setJobPost(event.target.value)}
                placeholder={t('jobMatch.placeholder')}
                className="w-full min-h-[260px] resize-y rounded-xl border border-white/10 bg-slate-950/80 p-4 text-sm sm:text-base text-gray-100 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAnalyze}
                  disabled={!canAnalyze || isAnalyzing}
                  className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                  {isAnalyzing ? t('jobMatch.analyzing') : t('jobMatch.analyze')}
                </button>
                <button
                  type="button"
                  onClick={() => setJobPost(exampleJobPost)}
                  className="px-4 sm:px-6 py-3 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base"
                >
                  {t('jobMatch.example')}
                </button>
              </div>

              {!canAnalyze && jobPost.length > 0 && (
                <p className="mt-3 text-sm text-yellow-300">{t('jobMatch.minLength')}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={result || aiStatus === 'error' ? { opacity: 1, scale: 1 } : { opacity: 0.8, scale: 1 }}
              className="glass-effect p-5 sm:p-7 rounded-2xl min-h-[420px]"
            >
              {aiStatus === 'error' ? (
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center">
                  <div className="p-5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 mb-5">
                    <XCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t('jobMatch.errorTitle')}</h3>
                  <p className="text-gray-400 max-w-sm">{t('jobMatch.errorText')}</p>
                </div>
              ) : !result ? (
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center">
                  <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 mb-5">
                    <Sparkles size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{t('jobMatch.emptyTitle')}</h3>
                  <p className="text-gray-400 max-w-sm">{t('jobMatch.emptyText')}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">{t('jobMatch.scoreLabel')}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-black text-white">{result.score}</span>
                        <span className="text-gray-400 mb-2">/100</span>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold ${verdictClasses[result.verdictLevel]}`}>
                      <RecommendationIcon size={18} />
                      {aiInsight ? t(`jobMatch.recommendation.${aiInsight.recommendation}`) : verdictText}
                    </div>
                  </div>

                  <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>

                  <p className="text-gray-300 leading-relaxed">{resultSummary}</p>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-300 mb-3">
                      <Bot size={16} />
                      {t('jobMatch.aiPowered')}
                    </div>
                    <p className="text-sm text-gray-400">
                      {aiInsight?.suggestion}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-3">{t('jobMatch.matchedSkills')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills.length > 0 ? result.matchedSkills.map((skill) => (
                        <span key={skill} className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm">
                          {skill}
                        </span>
                      )) : (
                        <span className="text-sm text-gray-400">{t('jobMatch.none')}</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-white mb-3">{t('jobMatch.relevantProjects')}</h4>
                    <div className="space-y-3">
                      {result.relevantProjects.length > 0 ? result.relevantProjects.map((project) => (
                        <div key={project.name} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                          <div className="font-semibold text-white">{project.name}</div>
                          <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.highlights.map((highlight) => (
                              <span key={highlight} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )) : (
                        <p className="text-sm text-gray-400">{t('jobMatch.noProjects')}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold text-white mb-3">{t('jobMatch.strengths')}</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {(aiInsight?.strongPoints?.length ? aiInsight.strongPoints : result.strengths).slice(0, 4).map((item) => (
                          <li key={item} className="flex gap-2">
                            <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-3">{t('jobMatch.gaps')}</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        {(aiInsight?.gaps?.length ? aiInsight.gaps : result.missingSkills).slice(0, 4).map((item) => (
                          <li key={item} className="flex gap-2">
                            <Target size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                        {!aiInsight?.gaps?.length && result.missingSkills.length === 0 && (
                          <li className="text-gray-400">{t('jobMatch.noMajorGaps')}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JobMatch
