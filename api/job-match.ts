const fallbackResponse = {
  error: 'AI provider is temporarily unavailable. Falling back to local matching.'
}

const parseJson = (value: string) => {
  const cleaned = value.replace(/```json|```/g, '').trim()
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error('AI response did not contain JSON.')
  }

  return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
}

const sanitizeInsight = (insight: any, jobPost: string) => {
  const normalizedJob = jobPost.toLowerCase()
  const requiresNativeMobile = /native|ios|android|appium|device farm|mobile app|application mobile/i.test(normalizedJob)
  const explicitlyMandatoryInternalSystem = /mandatory|required|must have|hands-on|experience with.*(פנינה|דלפי|אודם)/i.test(jobPost)

  const gaps = Array.isArray(insight.gaps) ? insight.gaps : []
  const filteredGaps = gaps.filter((gap: string) => {
    const normalizedGap = gap.toLowerCase()
    const isInternalSystemGap = /פנינה|דלפי|אודם|internal core system|proprietary|company-specific/i.test(gap)
    const isGenericMobileGap = /mobile/i.test(normalizedGap)
    const isSoftGap = /high-pressure|pressure|deadline|tight|years? not specified|exact qa years|years of experience|2 years|3 years|experience years/i.test(normalizedGap)
    const isCoveredProcessGap = /git|github|jira|agile|scrum|postman|ci\/?cd|vercel|next\.?js|language|french|hebrew|english|html|css|javascript|\bphp\b|laravel|wordpress/i.test(normalizedGap)

    if (isInternalSystemGap && !explicitlyMandatoryInternalSystem) return false
    if (isGenericMobileGap && !requiresNativeMobile) return false
    if (isSoftGap) return false
    if (isCoveredProcessGap) return false
    return true
  })

  const tips = Array.isArray(insight.tips)
    ? insight.tips.filter((tip: unknown) => typeof tip === 'string' && tip.trim().length > 0).slice(0, 4)
    : []

  const summary = !explicitlyMandatoryInternalSystem && /internal core systems|פנינה|דלפי|אודם/i.test(String(insight.summary || ''))
    ? String(insight.summary).replace(/(?:He|Yoeli) lacks direct experience with the specified internal core systems\.?/i, 'Specific internal systems can be handled as onboarding items.')
    : insight.summary

  return {
    ...insight,
    summary,
    gaps: filteredGaps,
    tips,
    recommendation: filteredGaps.length <= 1 && insight.recommendation !== 'no'
      ? 'yes'
      : insight.recommendation
  }
}

const parseRequestBody = (req: any) => {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseRequestBody(req)
  const jobPost = String(body?.jobPost || '').trim()
  if (jobPost.length < 40) {
    return res.status(400).json({ error: 'Job post is too short.' })
  }

  const compactProfile = `Yoeli Barthel, software engineer, ~2-3 years experience.
Skills: HTML, CSS, JavaScript, React, Next.js, TypeScript, Node.js, Python, REST, MongoDB, PostgreSQL, Prisma, Supabase, QA, Jest, Playwright, Postman, Git, Jira, Agile.
Projects: Sportivis, The Lion Vault, SurveyFlow, Sidour Avoda (G1), Elsa Fitness, DiveSpot, Julius CRM.
No PHP expertise. Treat missing PHP as a tip/onboarding item if HTML/CSS/JS match.
Prefer yes when most requirements match; be generous for junior 1-3 year roles.`

  const prompt = `Match Yoeli to this job. Be generous if most skills overlap. Missing one secondary skill (e.g. PHP) must not tank the score.
Return ONLY JSON:
{"summary":"2 sentences","recommendation":"yes|maybe|no","strongPoints":["..."],"gaps":["..."],"suggestion":"...","tips":["..."]}

Profile:
${compactProfile}

Job:
${jobPost.slice(0, 2500)}
`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'system',
            content: 'You are a strict JSON API. Return only valid JSON, no markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 500
      })
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const details = await response.text()
      return res.status(response.status).json({ ...fallbackResponse, details })
    }

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content
    if (!text) {
      return res.status(502).json(fallbackResponse)
    }

    return res.status(200).json(sanitizeInsight(parseJson(text), jobPost))
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Unexpected AI analysis error.'
    })
  }
}
