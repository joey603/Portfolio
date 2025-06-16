import React, { createContext, useContext, useState, ReactNode } from 'react'

export type Language = 'en' | 'fr' | 'he'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.available': '👋 Available for new opportunities',
    'hero.greeting': 'Hi, I\'m',
    'hero.title': 'Software Engineer',
    'hero.subtitle': '& AI Specialist',
    'hero.description': 'Recent graduate with a passion for building innovative solutions that matter. Specialized in',
    'hero.ml': 'machine learning',
    'hero.web': 'web development',
    'hero.data': 'data analysis',
    'hero.viewWork': 'View My Work',
    'hero.downloadCV': 'Download CV',
    'hero.stat1': 'Projects Completed',
    'hero.stat2': 'Technologies Mastered',
    'hero.stat3': 'Fresh graduate',
    
    // About Section
    'about.title': 'About',
    'about.me': 'Me',
    'about.subtitle': 'Passionate about technology and innovation',
    'about.description': 'Recent graduate in Software Engineering with AI specialization from Sami Shamoon College of Engineering. I combine technical expertise with creativity to develop innovative solutions.',
    'about.passion': 'My passion lies in creating applications that solve real problems and improve people\'s lives. I particularly enjoy working on AI/ML projects and modern web applications.',
    'about.collaboration': 'I believe in continuous learning and collaboration. Always ready to take on new challenges and contribute to exciting projects.',
    'about.education': 'Education',
    'about.degree': 'B.Sc. Software Engineering',
    'about.specialization': 'AI Specialization',
    'about.college': 'Sami Shamoon College of Engineering',
    'about.languages': 'Languages',
    'about.french': 'French',
    'about.english': 'English',
    'about.hebrew': 'Hebrew',
    'about.native': 'Native',
    'about.fluent': 'Fluent',
    
    // Skills Section
    'skills.title': 'My',
    'skills.subtitle': 'Skills',
    'skills.description': 'Technologies and tools I work with',
    'skills.programming': 'Programming Languages',
    'skills.web': 'Web Development',
    'skills.database': 'Databases & Backend',
    'skills.tools': 'Tools & Technologies',
    'skills.professional': 'Professional Skills',
    'skills.problemSolving': 'Problem Solving',
    'skills.teamwork': 'Teamwork',
    'skills.communication': 'Communication',
    'skills.projectManagement': 'Project Management',
    'skills.adaptability': 'Adaptability',
    'skills.leadership': 'Leadership',
    
    // Projects Section
    'projects.title': 'My',
    'projects.subtitle': 'Projects',
    'projects.description': 'Some of my recent work and achievements',
    'projects.viewSource': 'View Source',
    'projects.liveDemo': 'Live Demo',
    'projects.features': 'Key Features:',
    
    // Project Details
    'project.surveyflow.title': 'SurveyFlow - Survey Platform',
    'project.surveyflow.description': 'Development of a comprehensive online platform allowing users to create, share and analyze static or dynamic surveys intuitively.',
    'project.surveyflow.period': '2024-2025',
    'project.surveyflow.feature1': 'Intuitive drag-and-drop survey builder',
    'project.surveyflow.feature2': 'Real-time analytics and reporting',
    'project.surveyflow.feature3': 'Multi-language support',
    'project.surveyflow.feature4': 'Advanced question types and logic',
    
    'project.sidour.title': 'SIDOUR AVODA - Schedule Manager',
    'project.sidour.description': 'Innovative desktop application designed to optimize and manage work schedules in security environments, with advanced optimization algorithms.',
    'project.sidour.period': '2025',
    'project.sidour.feature1': 'Advanced scheduling algorithms',
    'project.sidour.feature2': 'Conflict detection and resolution',
    'project.sidour.feature3': 'Employee availability management',
    'project.sidour.feature4': 'Automated report generation',
    
    'project.divespot.title': 'DIVESPOT - Social Network',
    'project.divespot.description': 'Social platform dedicated to diving enthusiasts, allowing them to share experiences, discover dive sites and connect with the community.',
    'project.divespot.period': '2024',
    'project.divespot.feature1': 'Interactive dive site mapping',
    'project.divespot.feature2': 'Community sharing and reviews',
    'project.divespot.feature3': 'Dive log management',
    'project.divespot.feature4': 'Real-time chat and messaging',
    
    // Experience Section
    'experience.title': 'My',
    'experience.subtitle': 'Background',
    'experience.description': 'My educational and professional journey',
    'experience.stat1': 'Fresh Graduate',
    'experience.stat2': 'Major Projects',
    'experience.stat3': 'Ready to Start',
    'experience.profileSummary': 'Profile Summary',
    'experience.freshGraduate': 'Fresh Graduate',
    'experience.peopleManaged': 'People Managed',
    'experience.majorProjects': 'Major Projects',
    'experience.readyToStart': 'Ready to Start',
    
    // Experience Details
    'exp.education.title': 'B.Sc. Software Engineering',
    'exp.education.subtitle': 'AI Specialization',
    'exp.education.company': 'Sami Shamoon College of Engineering',
    'exp.education.period': '2022-2025',
    'exp.education.desc1': 'Comprehensive software engineering curriculum with AI focus',
    'exp.education.desc2': 'Specialized in machine learning and data analysis',
    'exp.education.desc3': 'Developed multiple full-stack applications',
    'exp.education.desc4': 'Strong foundation in algorithms and system design',
    
    'exp.security.title': 'Security Guard Manager',
    'exp.security.company': 'CHEVRON | G-ONE',
    'exp.security.period': '2024',
    'exp.security.desc1': 'Team leadership and coordination',
    'exp.security.desc2': 'Security protocol implementation',
    'exp.security.desc3': 'Incident reporting and management',
    'exp.security.desc4': 'Training and supervision of security personnel',
    
    'exp.military.title': 'Military Optic/Optronic Technician',
    'exp.military.company': 'TSAHAL (IDF)',
    'exp.military.period': '2019-2021',
    'exp.military.desc1': 'Advanced technical equipment maintenance',
    'exp.military.desc2': 'Precision instrument calibration',
    'exp.military.desc3': 'Technical problem-solving under pressure',
    'exp.military.desc4': 'Team collaboration in critical environments',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.me': 'Me',
    'contact.subtitle': 'Ready to collaborate? Don\'t hesitate to reach out to discuss your projects',
    'contact.info': 'Contact Information',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Social Networks',
    'contact.availability': 'Availability',
    'contact.available': 'Available for new projects',
    'contact.availableDesc': 'I\'m currently looking for exciting opportunities in software development, AI/ML, or project management. Contact me to discuss!',
    'contact.downloadCV': 'Download My CV',
    'contact.form.title': 'Send Me a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Message',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectPlaceholder': 'Subject of your message',
    'contact.form.messagePlaceholder': 'Your message...',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.available': '👋 Disponible pour de nouvelles opportunités',
    'hero.greeting': 'Salut, je suis',
    'hero.title': 'Ingénieur Logiciel',
    'hero.subtitle': '& Spécialiste IA',
    'hero.description': 'Récent diplômé passionné par la création de solutions innovantes qui comptent. Spécialisé en',
    'hero.ml': 'apprentissage automatique',
    'hero.web': 'développement web',
    'hero.data': 'analyse de données',
    'hero.viewWork': 'Voir Mon Travail',
    'hero.downloadCV': 'Télécharger CV',
    'hero.stat1': 'Projets Terminés',
    'hero.stat2': 'Technologies Maîtrisées',
    'hero.stat3': 'Diplômé récent',
    
    // About Section
    'about.title': 'À propos',
    'about.me': 'de Moi',
    'about.subtitle': 'Passionné par la technologie et l\'innovation',
    'about.description': 'Récent diplômé en Génie Logiciel avec spécialisation IA du Collège d\'Ingénierie Sami Shamoon. Je combine expertise technique et créativité pour développer des solutions innovantes.',
    'about.passion': 'Ma passion réside dans la création d\'applications qui résolvent de vrais problèmes et améliorent la vie des gens. J\'aime particulièrement travailler sur des projets IA/ML et des applications web modernes.',
    'about.collaboration': 'Je crois en l\'apprentissage continu et la collaboration. Toujours prêt à relever de nouveaux défis et contribuer à des projets passionnants.',
    'about.education': 'Formation',
    'about.degree': 'B.Sc. Génie Logiciel',
    'about.specialization': 'Spécialisation IA',
    'about.college': 'Collège d\'Ingénierie Sami Shamoon',
    'about.languages': 'Langues',
    'about.french': 'Français',
    'about.english': 'Anglais',
    'about.hebrew': 'Hébreu',
    'about.native': 'Natif',
    'about.fluent': 'Courant',
    
    // Skills Section
    'skills.title': 'Mes',
    'skills.subtitle': 'Compétences',
    'skills.description': 'Technologies et outils avec lesquels je travaille',
    'skills.programming': 'Langages de Programmation',
    'skills.web': 'Développement Web',
    'skills.database': 'Bases de Données & Backend',
    'skills.tools': 'Outils & Technologies',
    'skills.professional': 'Compétences Professionnelles',
    'skills.problemSolving': 'Résolution de Problèmes',
    'skills.teamwork': 'Travail d\'Équipe',
    'skills.communication': 'Communication',
    'skills.projectManagement': 'Gestion de Projet',
    'skills.adaptability': 'Adaptabilité',
    'skills.leadership': 'Leadership',
    
    // Projects Section
    'projects.title': 'Mes',
    'projects.subtitle': 'Projets',
    'projects.description': 'Quelques-uns de mes travaux récents et réalisations',
    'projects.viewSource': 'Voir le Code',
    'projects.liveDemo': 'Démo Live',
    'projects.features': 'Fonctionnalités Clés :',
    
    // Project Details
    'project.surveyflow.title': 'SurveyFlow - Plateforme de Sondages',
    'project.surveyflow.description': 'Développement d\'une plateforme en ligne complète permettant aux utilisateurs de créer, partager et analyser des sondages statiques ou dynamiques de manière intuitive.',
    'project.surveyflow.period': '2024-2025',
    'project.surveyflow.feature1': 'Constructeur de sondages intuitif par glisser-déposer',
    'project.surveyflow.feature2': 'Analyses et rapports en temps réel',
    'project.surveyflow.feature3': 'Support multi-langues',
    'project.surveyflow.feature4': 'Types de questions avancés et logique',
    
    'project.sidour.title': 'SIDOUR AVODA - Gestionnaire d\'Horaires',
    'project.sidour.description': 'Application de bureau innovante conçue pour optimiser et gérer les horaires de travail dans les environnements de sécurité, avec des algorithmes d\'optimisation avancés.',
    'project.sidour.period': '2025',
    'project.sidour.feature1': 'Algorithmes de planification avancés',
    'project.sidour.feature2': 'Détection et résolution de conflits',
    'project.sidour.feature3': 'Gestion de la disponibilité des employés',
    'project.sidour.feature4': 'Génération automatique de rapports',
    
    'project.divespot.title': 'DIVESPOT - Réseau Social',
    'project.divespot.description': 'Plateforme sociale dédiée aux passionnés de plongée, leur permettant de partager des expériences, découvrir des sites de plongée et se connecter avec la communauté.',
    'project.divespot.period': '2024',
    'project.divespot.feature1': 'Cartographie interactive des sites de plongée',
    'project.divespot.feature2': 'Partage communautaire et avis',
    'project.divespot.feature3': 'Gestion du carnet de plongée',
    'project.divespot.feature4': 'Chat et messagerie en temps réel',
    
    // Experience Section
    'experience.title': 'Mon',
    'experience.subtitle': 'Parcours',
    'experience.description': 'Mon parcours éducatif et professionnel',
    'experience.stat1': 'Diplômé Récent',
    'experience.stat2': 'Projets Majeurs',
    'experience.stat3': 'Prêt à Commencer',
    'experience.profileSummary': 'Résumé de Profil',
    'experience.freshGraduate': 'Diplômé Récent',
    'experience.peopleManaged': 'Personnes Gérées',
    'experience.majorProjects': 'Projets Majeurs',
    'experience.readyToStart': 'Prêt à Commencer',
    
    // Experience Details
    'exp.education.title': 'B.Sc. Génie Logiciel',
    'exp.education.subtitle': 'Spécialisation IA',
    'exp.education.company': 'Collège d\'Ingénierie Sami Shamoon',
    'exp.education.period': '2022-2025',
    'exp.education.desc1': 'Cursus complet en génie logiciel avec focus IA',
    'exp.education.desc2': 'Spécialisé en apprentissage automatique et analyse de données',
    'exp.education.desc3': 'Développé plusieurs applications full-stack',
    'exp.education.desc4': 'Base solide en algorithmes et conception de systèmes',
    
    'exp.security.title': 'Responsable Sécurité',
    'exp.security.company': 'CHEVRON | G-ONE',
    'exp.security.period': '2024',
    'exp.security.desc1': 'Leadership et coordination d\'équipe',
    'exp.security.desc2': 'Mise en œuvre des protocoles de sécurité',
    'exp.security.desc3': 'Rapport et gestion d\'incidents',
    'exp.security.desc4': 'Formation et supervision du personnel de sécurité',
    
    'exp.military.title': 'Technicien Optique/Optronique Militaire',
    'exp.military.company': 'TSAHAL (FDI)',
    'exp.military.period': '2019-2021',
    'exp.military.desc1': 'Maintenance d\'équipements techniques avancés',
    'exp.military.desc2': 'Calibration d\'instruments de précision',
    'exp.military.desc3': 'Résolution de problèmes techniques sous pression',
    'exp.military.desc4': 'Collaboration d\'équipe dans des environnements critiques',
    
    // Contact Section
    'contact.title': 'Me',
    'contact.me': 'Contacter',
    'contact.subtitle': 'Prêt à collaborer ? N\'hésitez pas à me contacter pour discuter de vos projets',
    'contact.info': 'Informations de Contact',
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.social': 'Réseaux Sociaux',
    'contact.availability': 'Disponibilité',
    'contact.available': 'Disponible pour de nouveaux projets',
    'contact.availableDesc': 'Je recherche actuellement des opportunités passionnantes en développement logiciel, IA/ML, ou gestion de projet. Contactez-moi pour en discuter !',
    'contact.downloadCV': 'Télécharger Mon CV',
    'contact.form.title': 'Envoyez-moi un Message',
    'contact.form.name': 'Nom Complet',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Sujet',
    'contact.form.message': 'Message',
    'contact.form.send': 'Envoyer le Message',
    'contact.form.namePlaceholder': 'Votre nom',
    'contact.form.emailPlaceholder': 'votre@email.com',
    'contact.form.subjectPlaceholder': 'Sujet de votre message',
    'contact.form.messagePlaceholder': 'Votre message...',
  },
  
  he: {
    // Navigation
    'nav.home': 'בית',
    'nav.about': 'אודות',
    'nav.skills': 'כישורים',
    'nav.projects': 'פרויקטים',
    'nav.experience': 'ניסיון',
    'nav.contact': 'צור קשר',
    
    // Hero Section
    'hero.available': '👋 זמין להזדמנויות חדשות',
    'hero.greeting': 'היי, אני',
    'hero.title': 'מהנדס תוכנה',
    'hero.subtitle': 'ומומחה בינה מלאכותית',
    'hero.description': 'בוגר טרי עם תשוקה לבניית פתרונות חדשניים שחשובים. מתמחה ב',
    'hero.ml': 'למידת מכונה',
    'hero.web': 'פיתוח אתרים',
    'hero.data': 'ניתוח נתונים',
    'hero.viewWork': 'צפה בעבודות שלי',
    'hero.downloadCV': 'הורד קורות חיים',
    'hero.stat1': 'פרויקטים שהושלמו',
    'hero.stat2': 'טכנולוגיות שנלמדו',
    'hero.stat3': 'בוגר טרי',
    
    // About Section
    'about.title': 'אודות',
    'about.me': 'עליי',
    'about.subtitle': 'נלהב מטכנולוגיה וחדשנות',
    'about.description': 'בוגר טרי בהנדסת תוכנה עם התמחות בבינה מלאכותית ממכללת סמי שמעון להנדסה. אני משלב מומחיות טכנית עם יצירתיות לפיתוח פתרונות חדשניים.',
    'about.passion': 'התשוקה שלי טמונה ביצירת אפליקציות שפותרות בעיות אמיתיות ומשפרות את חיי האנשים. אני נהנה במיוחד לעבוד על פרויקטי בינה מלאכותית ואפליקציות אינטרנט מודרניות.',
    'about.collaboration': 'אני מאמין בלמידה מתמשכת ושיתוף פעולה. תמיד מוכן לקחת על עצמי אתגרים חדשים ולתרום לפרויקטים מרגשים.',
    'about.education': 'השכלה',
    'about.degree': 'תואר ראשון בהנדסת תוכנה',
    'about.specialization': 'התמחות בבינה מלאכותית',
    'about.college': 'מכללת סמי שמעון להנדסה',
    'about.languages': 'שפות',
    'about.french': 'צרפתית',
    'about.english': 'אנגלית',
    'about.hebrew': 'עברית',
    'about.native': 'שפת אם',
    'about.fluent': 'שוטף',
    
    // Skills Section
    'skills.title': 'הכישורים',
    'skills.subtitle': 'שלי',
    'skills.description': 'טכנולוגיות וכלים שאני עובד איתם',
    'skills.programming': 'שפות תכנות',
    'skills.web': 'פיתוח אתרים',
    'skills.database': 'מסדי נתונים ושרתים',
    'skills.tools': 'כלים וטכנולוגיות',
    'skills.professional': 'כישורים מקצועיים',
    'skills.problemSolving': 'פתרון בעיות',
    'skills.teamwork': 'עבודת צוות',
    'skills.communication': 'תקשורת',
    'skills.projectManagement': 'ניהול פרויקטים',
    'skills.adaptability': 'הסתגלות',
    'skills.leadership': 'מנהיגות',
    
    // Projects Section
    'projects.title': 'הפרויקטים',
    'projects.subtitle': 'שלי',
    'projects.description': 'כמה מהעבודות וההישגים האחרונים שלי',
    'projects.viewSource': 'צפה בקוד',
    'projects.liveDemo': 'דמו חי',
    'projects.features': 'תכונות מרכזיות:',
    
    // Project Details
    'project.surveyflow.title': 'SurveyFlow - פלטפורמת סקרים',
    'project.surveyflow.description': 'פיתוח פלטפורמה מקוונת מקיפה המאפשרת למשתמשים ליצור, לשתף ולנתח סקרים סטטיים או דינמיים באופן אינטואיטיבי.',
    'project.surveyflow.period': '2024-2025',
    'project.surveyflow.feature1': 'בונה סקרים אינטואיטיבי בגרירה ושחרור',
    'project.surveyflow.feature2': 'ניתוח ודיווח בזמן אמת',
    'project.surveyflow.feature3': 'תמיכה בריבוי שפות',
    'project.surveyflow.feature4': 'סוגי שאלות מתקדמים ולוגיקה',
    
    'project.sidour.title': 'SIDOUR AVODA - מנהל משמרות',
    'project.sidour.description': 'אפליקציית שולחן עבודה חדשנית המיועדת לייעל ולנהל לוחות זמנים של עבודה בסביבות אבטחה, עם אלגוריתמי אופטימיזציה מתקדמים.',
    'project.sidour.period': '2025',
    'project.sidour.feature1': 'אלגוריתמי תכנון מתקדמים',
    'project.sidour.feature2': 'זיהוי ופתרון קונפליקטים',
    'project.sidour.feature3': 'ניהול זמינות עובדים',
    'project.sidour.feature4': 'יצירת דוחות אוטומטית',
    
    'project.divespot.title': 'DIVESPOT - רשת חברתית',
    'project.divespot.description': 'פלטפורמה חברתית המוקדשת לחובבי צלילה, המאפשרת להם לשתף חוויות, לגלות אתרי צלילה ולהתחבר עם הקהילה.',
    'project.divespot.period': '2024',
    'project.divespot.feature1': 'מיפוי אינטראקטיבי של אתרי צלילה',
    'project.divespot.feature2': 'שיתוף קהילתי וביקורות',
    'project.divespot.feature3': 'ניהול יומן צלילה',
    'project.divespot.feature4': 'צ\'אט והודעות בזמן אמת',
    
    // Experience Section
    'experience.title': 'הרקע',
    'experience.subtitle': 'שלי',
    'experience.description': 'המסע החינוכי והמקצועי שלי',
    'experience.stat1': 'בוגר טרי',
    'experience.stat2': 'פרויקטים מרכזיים',
    'experience.stat3': 'מוכן להתחיל',
    'experience.profileSummary': 'סיכום פרופיל מקצועי',
    'experience.freshGraduate': 'בוגר טרי',
    'experience.peopleManaged': 'אנשים בניהול',
    'experience.majorProjects': 'פרויקטים מרכזיים',
    'experience.readyToStart': 'מוכן להתחיל',
    
    // Experience Details
    'exp.education.title': 'תואר ראשון בהנדסת תוכנה',
    'exp.education.subtitle': 'התמחות בבינה מלאכותית',
    'exp.education.company': 'מכללת סמי שמעון להנדסה',
    'exp.education.period': '2022-2025',
    'exp.education.desc1': 'תכנית לימודים מקיפה בהנדסת תוכנה עם דגש על בינה מלאכותית',
    'exp.education.desc2': 'התמחות בלמידת מכונה וניתוח נתונים',
    'exp.education.desc3': 'פיתוח מספר אפליקציות full-stack',
    'exp.education.desc4': 'בסיס חזק באלגוריתמים ועיצוב מערכות',
    
    'exp.security.title': 'מנהל אבטחה',
    'exp.security.company': 'CHEVRON | G-ONE',
    'exp.security.period': '2024',
    'exp.security.desc1': 'מנהיגות וקואורדינציה של צוות',
    'exp.security.desc2': 'יישום פרוטוקולי אבטחה',
    'exp.security.desc3': 'דיווח וניהול אירועים',
    'exp.security.desc4': 'הכשרה ופיקוח על צוות האבטחה',
    
    'exp.military.title': 'טכנאי אופטיקה/אופטרוניקה צבאי',
    'exp.military.company': 'צה"ל',
    'exp.military.period': '2019-2021',
    'exp.military.desc1': 'תחזוקת ציוד טכני מתקדם',
    'exp.military.desc2': 'כיול מכשירי דיוק',
    'exp.military.desc3': 'פתרון בעיות טכניות תחת לחץ',
    'exp.military.desc4': 'שיתוף פעולה בצוות בסביבות קריטיות',
    
    // Contact Section
    'contact.title': 'צור',
    'contact.me': 'קשר',
    'contact.subtitle': 'מוכן לשתף פעולה? אל תהסס לפנות אליי כדי לדון בפרויקטים שלך',
    'contact.info': 'פרטי קשר',
    'contact.email': 'אימייל',
    'contact.phone': 'טלפון',
    'contact.location': 'מיקום',
    'contact.social': 'רשתות חברתיות',
    'contact.availability': 'זמינות',
    'contact.available': 'זמין לפרויקטים חדשים',
    'contact.availableDesc': 'אני מחפש כרגע הזדמנויות מרגשות בפיתוח תוכנה, בינה מלאכותית/למידת מכונה, או ניהול פרויקטים. צור קשר לדיון!',
    'contact.downloadCV': 'הורד את קורות החיים שלי',
    'contact.form.title': 'שלח לי הודעה',
    'contact.form.name': 'שם מלא',
    'contact.form.email': 'אימייל',
    'contact.form.subject': 'נושא',
    'contact.form.message': 'הודעה',
    'contact.form.send': 'שלח הודעה',
    'contact.form.namePlaceholder': 'השם שלך',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subjectPlaceholder': 'נושא ההודעה שלך',
    'contact.form.messagePlaceholder': 'ההודעה שלך...',
  }
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    const translation = translations[language] as Record<string, string>
    return translation[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 