const profileContext = `
Yoeli Barthel is a software engineer specialized in AI and modern web development.
Core skills: React, TypeScript, JavaScript, Node.js, Python, REST APIs, OAuth, MongoDB, PostgreSQL, SQLite, Prisma, Supabase, responsive UI/UX, debugging, CRM features, QA, manual testing, functional testing, regression testing, test cases, bug reports, Jest, Playwright, client delivery and team leadership.
Projects:
- SurveyFlow: survey platform with React, Next.js, Node.js, MongoDB, OAuth, REST API, analytics and QA validation.
- Sidour Avoda: Python desktop app and Next.js SaaS for scheduling, role management and complex sites, used by Chevron / G-One, with workflow testing and regression checks.
- Elsa Fitness: TypeScript/React fitness site with course booking, admin panel, backend and functional QA.
- DiveSpot: React/Node/MongoDB social network with community features and team QA/bug reporting.
- Opetitsoins: bilingual healthcare website with responsive UI, forms and functional testing.
- Julius Agency CRM: TypeScript, Node.js, Prisma and Supabase backend work, CRM features, bug fixing, QA validation and issue reproduction.
Experience: B.Sc. Software Engineering / computer engineering background with AI specialization, completed QA training, freelance web developer, full-stack/backend work, QA on personal projects, QA at Julius Agency, QA in freelance projects, QA on final engineering project, security team leadership, military technical service.
QA seniority rule: count QA experience across freelance work (2024-2025), Julius Agency full-stack/backend work (2025-current), personal projects, and the final engineering project. Do not say "exact QA years not specified"; say that QA experience spans those periods instead.
Mobile/high-pressure context: Yoeli has responsive and cross-device web QA experience. He also has high-pressure experience from security leadership, military technical service, production bug fixing and urgent delivery contexts.
Specific internal systems rule: proprietary/core systems such as פנינה, דלפי, אודם, or company-specific tools should not significantly reduce the score. Do not put them in gaps unless the job explicitly says prior hands-on experience with that exact system is mandatory. Treat them as onboarding items in the suggestion.
Mobile testing rule: treat responsive and cross-device web QA as relevant mobile testing experience. Do not put mobile testing in gaps unless the job explicitly requires native iOS/Android app testing, Appium, device farms, or mobile-store release QA.
SCE engineering curriculum context: strong foundations in mathematics, programming languages, data structures, algorithms, randomized algorithms, complexity, database systems, software development methodologies, advanced software project management, software quality evaluation, final projects, distributed systems, cloud computing, network reliability, network security, cybersecurity, artificial intelligence and data science.
`

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
    const isSoftGap = /high-pressure|pressure|deadline|tight|years? not specified|exact qa years/i.test(normalizedGap)

    if (isInternalSystemGap && !explicitlyMandatoryInternalSystem) return false
    if (isGenericMobileGap && !requiresNativeMobile) return false
    if (isSoftGap) return false
    return true
  })

  const summary = !explicitlyMandatoryInternalSystem && /internal core systems|פנינה|דלפי|אודם/i.test(String(insight.summary || ''))
    ? String(insight.summary).replace(/(?:He|Yoeli) lacks direct experience with the specified internal core systems\.?/i, 'Specific internal systems can be handled as onboarding items.')
    : insight.summary

  return {
    ...insight,
    summary,
    gaps: filteredGaps,
    recommendation: filteredGaps.length === 0 && insight.recommendation === 'maybe'
      ? 'yes'
      : insight.recommendation
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const jobPost = String(req.body?.jobPost || '').trim()
  if (jobPost.length < 40) {
    return res.status(400).json({ error: 'Job post is too short.' })
  }

  const prompt = `
You are an honest recruiting assistant for a portfolio website.
Analyze whether Yoeli matches the job post below using only the profile context.
Prioritize hard technical requirements in the score. Do not over-penalize soft skills, domain-specific internal systems, or vague experience wording.
Only put items in "gaps" if they are mandatory hard technical requirements clearly not covered by the profile. For soft skills, mobile testing, pressure/deadlines, years wording, or proprietary systems, prefer mentioning them in "suggestion" as onboarding/clarification items. Never include "exact QA years not specified", proprietary systems, high-pressure work, or generic mobile testing as gaps.
Return strict JSON with this shape:
{
  "summary": "2 short sentences",
  "recommendation": "yes | maybe | no",
  "strongPoints": ["..."],
  "gaps": ["..."],
  "suggestion": "one practical sentence for the recruiter or candidate"
}

Profile context:
${profileContext}

Job post:
${jobPost}
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
        max_tokens: 700
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
