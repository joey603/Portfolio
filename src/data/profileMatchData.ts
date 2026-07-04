export type MatchCategory = 'technical' | 'responsibility' | 'project' | 'softSkill'

export interface ProfileSignal {
  id: string
  label: string
  category: MatchCategory
  weight: number
  keywords: string[]
}

export interface ProfileProject {
  name: string
  description: string
  keywords: string[]
  highlights: string[]
}

export interface MatchResult {
  score: number
  verdictLevel: 'strong' | 'good' | 'partial' | 'low'
  matchedSkills: string[]
  missingSkills: string[]
  relevantProjects: Array<ProfileProject & { matches: number }>
  strengths: string[]
  improvementTips: string[]
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const hasKeyword = (text: string, keyword: string) => {
  const normalizedKeyword = normalize(keyword)
  const escapedKeyword = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(^|[^a-z0-9+#])${escapedKeyword}([^a-z0-9+#]|$)`, 'i').test(text)
}

const categoryWeights: Record<MatchCategory, number> = {
  technical: 45,
  responsibility: 25,
  project: 20,
  softSkill: 10
}

const categoryMultipliers: Record<MatchCategory, number> = {
  technical: 1.8,
  responsibility: 1.6,
  project: 1,
  softSkill: 1.3
}

export const profileSignals: ProfileSignal[] = [
  {
    id: 'react',
    label: 'React',
    category: 'technical',
    weight: 9,
    keywords: ['react', 'react.js', 'reactjs', 'frontend', 'front-end']
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    category: 'technical',
    weight: 8,
    keywords: ['next', 'next.js', 'nextjs']
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    category: 'technical',
    weight: 9,
    keywords: ['typescript', 'ts']
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    category: 'technical',
    weight: 7,
    keywords: ['javascript', 'js', 'es6']
  },
  {
    id: 'node',
    label: 'Node.js',
    category: 'technical',
    weight: 8,
    keywords: ['node', 'node.js', 'nodejs', 'express', 'backend', 'back-end']
  },
  {
    id: 'python',
    label: 'Python',
    category: 'technical',
    weight: 8,
    keywords: ['python', 'pandas', 'tkinter']
  },
  {
    id: 'ai',
    label: 'AI / Machine Learning',
    category: 'technical',
    weight: 9,
    keywords: ['ai', 'ia', 'artificial intelligence', 'machine learning', 'ml', 'data analysis', 'analyse de donnees']
  },
  {
    id: 'databases',
    label: 'Databases',
    category: 'technical',
    weight: 7,
    keywords: ['postgresql', 'postgres', 'mongodb', 'sqlite', 'sql', 'database', 'base de donnees', 'supabase', 'prisma']
  },
  {
    id: 'api',
    label: 'REST API / OAuth',
    category: 'technical',
    weight: 6,
    keywords: ['api', 'rest', 'oauth', 'authentication', 'authentification']
  },
  {
    id: 'qa-testing',
    label: 'QA / Software Testing',
    category: 'technical',
    weight: 9,
    keywords: ['qa', 'quality assurance', 'software quality', 'test', 'testing', 'manual testing', 'functional testing', 'regression testing', 'test cases', 'bug report', 'bug reporting', 'assurance qualite', 'qualite logicielle', 'tests fonctionnels', 'tests de regression']
  },
  {
    id: 'jest',
    label: 'Jest',
    category: 'technical',
    weight: 7,
    keywords: ['jest', 'unit testing', 'unit tests', 'tests unitaires']
  },
  {
    id: 'playwright',
    label: 'Playwright',
    category: 'technical',
    weight: 7,
    keywords: ['playwright', 'e2e', 'end-to-end testing', 'end to end testing', 'browser automation', 'test automation', 'automated tests', 'tests automatises']
  },
  {
    id: 'postman',
    label: 'Postman / API testing',
    category: 'technical',
    weight: 7,
    keywords: ['postman', 'api testing', 'api test', 'tests api', 'rest client', 'endpoint testing']
  },
  {
    id: 'git',
    label: 'Git / GitHub',
    category: 'technical',
    weight: 7,
    keywords: ['git', 'github', 'version control', 'pull request', 'pull requests', 'code review', 'source control']
  },
  {
    id: 'cicd',
    label: 'CI/CD / Deployments',
    category: 'technical',
    weight: 6,
    keywords: ['ci/cd', 'cicd', 'ci cd', 'continuous integration', 'deployment', 'deploy', 'vercel', 'github actions', 'pipeline']
  },
  {
    id: 'computer-engineering',
    label: 'Computer / Software Engineering Curriculum',
    category: 'technical',
    weight: 8,
    keywords: ['computer engineering', 'software engineering', 'ingenieur informatique', 'ingenierie logicielle', 'computer science', 'sce', 'b.sc', 'degree', 'diploma']
  },
  {
    id: 'core-cs',
    label: 'Core CS foundations',
    category: 'technical',
    weight: 8,
    keywords: ['data structures', 'algorithms', 'complexity', 'randomized algorithms', 'programming languages', 'operating systems', 'distributed systems', 'cloud computing', 'network security', 'networks reliability', 'cybersecurity', 'mathematics', 'structures de donnees', 'algorithmes', 'systemes distribues', 'securite reseau']
  },
  {
    id: 'fullstack',
    label: 'Full-stack product development',
    category: 'responsibility',
    weight: 9,
    keywords: ['full stack', 'full-stack', 'frontend and backend', 'front et back', 'end-to-end']
  },
  {
    id: 'responsive',
    label: 'Responsive UI / UX',
    category: 'responsibility',
    weight: 7,
    keywords: ['responsive', 'ui', 'ux', 'user experience', 'mobile', 'accessibility', 'accessibilite']
  },
  {
    id: 'debugging',
    label: 'Debugging and code quality',
    category: 'responsibility',
    weight: 6,
    keywords: ['debug', 'bug fixing', 'fix bugs', 'code quality', 'quality', 'tests', 'testing']
  },
  {
    id: 'qa-process',
    label: 'QA process and validation',
    category: 'responsibility',
    weight: 7,
    keywords: ['validation', 'verify', 'verification', 'reproduce bugs', 'reproduction', 'acceptance criteria', 'test plan', 'test strategy', 'quality evaluation', 'software quality evaluation', 'recette', 'plan de test']
  },
  {
    id: 'mobile-testing',
    label: 'Responsive and mobile QA',
    category: 'responsibility',
    weight: 6,
    keywords: ['mobile testing', 'mobile qa', 'responsive testing', 'cross-browser', 'cross browser', 'ios', 'android', 'device testing', 'tests mobile', 'tests responsive']
  },
  {
    id: 'high-pressure',
    label: 'High-pressure delivery',
    category: 'softSkill',
    weight: 5,
    keywords: ['high pressure', 'tight deadlines', 'urgent', 'production issues', 'critical environment', 'under pressure', 'delais serres', 'pression', 'environnement critique']
  },
  {
    id: 'product',
    label: 'Product and client delivery',
    category: 'responsibility',
    weight: 6,
    keywords: ['client', 'delivery', 'deliver', 'product', 'saas', 'crm', 'admin panel']
  },
  {
    id: 'agile',
    label: 'Agile / Scrum / Jira',
    category: 'responsibility',
    weight: 7,
    keywords: ['agile', 'scrum', 'jira', 'sprint', 'sprints', 'kanban', 'ticket', 'tickets', 'backlog', 'standup']
  },
  {
    id: 'team',
    label: 'Teamwork and leadership',
    category: 'softSkill',
    weight: 6,
    keywords: ['team', 'collaboration', 'leadership', 'management', 'gestion', 'communication']
  },
  {
    id: 'problem-solving',
    label: 'Problem solving',
    category: 'softSkill',
    weight: 5,
    keywords: ['problem solving', 'problem-solving', 'analytical', 'resolution de problemes', 'autonomous', 'autonome']
  },
  {
    id: 'languages',
    label: 'French / Hebrew / English',
    category: 'softSkill',
    weight: 5,
    keywords: ['french', 'hebrew', 'english', 'bilingual', 'multilingual', 'francais', 'anglaisrit', 'anglaislish', 'ivrit']
  }
]

export const profileProjects: ProfileProject[] = [
  {
    name: 'SurveyFlow',
    description: 'Survey platform with builder, sharing, analytics, OAuth and REST API.',
    keywords: ['survey', 'analytics', 'react', 'next', 'next.js', 'node', 'mongodb', 'oauth', 'api', 'saas', 'dashboard', 'qa', 'testing', 'test cases', 'git', 'github'],
    highlights: ['React / Next.js / Node.js', 'Real-time analytics', 'QA validation and REST API']
  },
  {
    name: 'Sidour Avoda',
    description: 'Desktop and SaaS scheduling app used in security environments.',
    keywords: ['schedule', 'planning', 'python', 'next', 'next.js', 'react', 'typescript', 'postgresql', 'saas', 'security', 'algorithm', 'qa', 'regression testing', 'test scenarios', 'git'],
    highlights: ['Scheduling algorithms', 'Desktop and SaaS versions', 'QA scenarios for complex workflows']
  },
  {
    name: 'Elsa Fitness',
    description: 'Fitness website with booking system and admin panel.',
    keywords: ['booking', 'admin', 'react', 'typescript', 'material-ui', 'backend', 'reservation', 'qa', 'testing'],
    highlights: ['Course booking', 'Admin panel', 'Responsive UI and functional testing']
  },
  {
    name: 'DiveSpot',
    description: 'Social network for diving enthusiasts with community and dive-site features.',
    keywords: ['social', 'community', 'react', 'node', 'mongodb', 'map', 'chat', 'team project', 'qa', 'bug reports'],
    highlights: ['Community features', 'MongoDB / React / Node.js', 'Team QA and bug reporting']
  },
  {
    name: 'Opetitsoins',
    description: 'Bilingual healthcare showcase website with service presentation and contact flows.',
    keywords: ['healthcare', 'website', 'react', 'typescript', 'responsive', 'bilingual', 'forms', 'qa', 'functional testing'],
    highlights: ['Bilingual FR/HE', 'Professional showcase', 'Responsive QA checks']
  },
  {
    name: 'Julius Agency CRM',
    description: 'CRM feature development and backend bug fixing with TypeScript, Node.js, Prisma and Supabase.',
    keywords: ['crm', 'typescript', 'node', 'backend', 'prisma', 'supabase', 'debug', 'api', 'qa', 'bug reproduction', 'validation', 'test scenarios', 'jira', 'agile', 'git', 'github', 'postman'],
    highlights: ['Backend features', 'Bug fixing', 'QA validation and Prisma / Supabase']
  }
]

const expectedSkillKeywords = [
  'react',
  'typescript',
  'node',
  'python',
  'database',
  'api',
  'ai',
  'testing',
  'qa',
  'jest',
  'playwright',
  'responsive',
  'backend',
  'algorithms',
  'data structures',
  'git',
  'jira',
  'next.js',
  'postman'
]

const buildImprovementTips = (normalizedPost: string, matchedSignalIds: Set<string>) => {
  const tips: string[] = []

  if (['git', 'github', 'version control', 'pull request', 'code review'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Highlight Git/GitHub workflows, pull requests and code reviews from Julius Agency and personal projects.')
  }

  if (['agile', 'scrum', 'jira', 'sprint', 'ticket', 'backlog'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Mention Agile/Scrum collaboration and Jira ticket work during Julius Agency and freelance delivery.')
  }

  if (['next', 'next.js', 'nextjs'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Put Next.js front and center with SurveyFlow and Sidour Avoda as concrete proof.')
  }

  if (['postman', 'api testing', 'api test', 'endpoint'].some((keyword) => hasKeyword(normalizedPost, keyword))
    || (hasKeyword(normalizedPost, 'api') && hasKeyword(normalizedPost, 'test'))) {
    tips.push('Emphasize Postman and API testing alongside REST/OAuth work on SurveyFlow and Julius CRM.')
  }

  if (['qa', 'testing', 'quality assurance', 'test cases'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('State QA periods clearly: freelance 2024-2025, Julius Agency 2025-present, personal projects and the final engineering project.')
  }

  if (['jest', 'playwright', 'unit test', 'e2e', 'test automation'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Call out Jest and Playwright explicitly in the application summary for this role.')
  }

  if (['ci/cd', 'cicd', 'deployment', 'deploy', 'vercel', 'github actions', 'pipeline'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Mention modern web deployments (including Vercel) and basic CI/CD exposure from project delivery.')
  }

  if (['french', 'hebrew', 'english', 'bilingual', 'multilingual', 'language'].some((keyword) => hasKeyword(normalizedPost, keyword))) {
    tips.push('Mention French, Hebrew and English communication skills when relevant to the team or clients.')
  }

  if (matchedSignalIds.has('qa-testing') && tips.length === 0) {
    tips.push('Lead with QA plus full-stack delivery so the profile reads as both builder and quality-focused.')
  }

  return tips.slice(0, 4)
}

export const analyzeJobPost = (jobPost: string): MatchResult => {
  const normalizedPost = normalize(jobPost)
  const matchedSignals = profileSignals.filter((signal) =>
    signal.keywords.some((keyword) => hasKeyword(normalizedPost, keyword))
  )

  const scoresByCategory = Object.keys(categoryWeights).reduce((acc, category) => {
    const typedCategory = category as MatchCategory
    const categoryMatched = matchedSignals.filter((signal) => signal.category === typedCategory)
    const matchedWeight = categoryMatched.reduce((sum, signal) => sum + signal.weight, 0)

    acc[typedCategory] = Math.min(
      categoryWeights[typedCategory],
      matchedWeight * categoryMultipliers[typedCategory]
    )
    return acc
  }, {} as Record<MatchCategory, number>)

  const relevantProjects = profileProjects
    .map((project) => ({
      ...project,
      matches: project.keywords.filter((keyword) => hasKeyword(normalizedPost, keyword)).length
    }))
    .filter((project) => project.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 3)

  const projectBonus = Math.min(categoryWeights.project, relevantProjects.reduce((sum, project) => sum + project.matches * 4, 0))
  const totalScore = Math.round(Math.min(100, scoresByCategory.technical + scoresByCategory.responsibility + scoresByCategory.softSkill + projectBonus))

  const matchedSkillLabels = Array.from(new Set(matchedSignals.map((signal) => signal.label))).slice(0, 10)
  const missingSkills = expectedSkillKeywords
    .filter((keyword) => hasKeyword(normalizedPost, keyword))
    .filter((keyword) => !matchedSignals.some((signal) => signal.keywords.includes(keyword)))
    .map((keyword) => keyword.charAt(0).toUpperCase() + keyword.slice(1))
    .slice(0, 5)

  const matchedSignalIds = new Set(matchedSignals.map((signal) => signal.id))

  const strengths = [
    matchedSignals.some((signal) => signal.id === 'react' || signal.id === 'typescript' || signal.id === 'nextjs')
      ? 'Modern front-end experience with React, TypeScript and Next.js.'
      : '',
    matchedSignals.some((signal) => signal.id === 'node' || signal.id === 'databases')
      ? 'Backend and database exposure through CRM and full-stack projects.'
      : '',
    matchedSignals.some((signal) => signal.id === 'ai' || signal.id === 'python')
      ? 'AI, data and Python foundation from studies and projects.'
      : '',
    matchedSignals.some((signal) => signal.id === 'qa-testing' || signal.id === 'jest' || signal.id === 'playwright' || signal.id === 'postman')
      ? 'QA experience across freelance work (2024-2025), Julius Agency (2025-present), personal projects and the final engineering project, including Jest, Playwright and Postman/API testing.'
      : '',
    matchedSignals.some((signal) => signal.id === 'git' || signal.id === 'agile' || signal.id === 'cicd')
      ? 'Team delivery with Git/GitHub, Agile/Jira collaboration and modern web deployments.'
      : '',
    matchedSignals.some((signal) => signal.id === 'mobile-testing')
      ? 'Responsive and cross-device QA experience through modern web projects.'
      : '',
    matchedSignals.some((signal) => signal.id === 'high-pressure')
      ? 'High-pressure experience from security leadership, military technical service and production bug fixing.'
      : '',
    matchedSignals.some((signal) => signal.id === 'languages')
      ? 'Communication in French, Hebrew and English.'
      : '',
    matchedSignals.some((signal) => signal.id === 'computer-engineering' || signal.id === 'core-cs')
      ? 'Computer engineering background covering core CS courses, algorithms, software quality and system foundations.'
      : '',
    relevantProjects.length > 0
      ? `Relevant proof through ${relevantProjects.map((project) => project.name).join(', ')}.`
      : ''
  ].filter(Boolean)

  const verdictLevel =
    totalScore >= 75 ? 'strong' :
    totalScore >= 55 ? 'good' :
    totalScore >= 35 ? 'partial' :
    'low'

  return {
    score: totalScore,
    verdictLevel,
    matchedSkills: matchedSkillLabels,
    missingSkills,
    relevantProjects,
    strengths,
    improvementTips: buildImprovementTips(normalizedPost, matchedSignalIds)
  }
}
