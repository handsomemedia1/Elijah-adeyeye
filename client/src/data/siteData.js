/* ── All content from spec organized as exportable data ── */

export const siteConfig = {
  name: 'Elijah Adeyeye',
  title: 'Cybersecurity Researcher, Behavioral Scientist & Founder',
  tagline: 'Founder of Elitech Hub · Co-Author, Springer Nature & SAGE · APA 2026 Presenter',
  descriptor: "I study how humans behave under threat — then build systems that defend against it.",
  email: 'elijahadeyeye@proton.me',
  emailAlt: 'elijah@elitechub.com',
  phone: '+234 708 196 8062',
  location: 'Abuja, Nigeria',
  github: 'handsomemedia1',
  githubUrl: 'https://github.com/handsomemedia1',
  linkedin: 'https://linkedin.com/in/adeyeye-elijah',
  twitter: 'https://x.com/elijahadeyeye',
  telegram: 'https://t.me/Elitechub',
  threads: 'https://threads.net/@elijahadeyeye',
  facebook: 'https://facebook.com/elijahadeyeye',
  elitechUrl: 'https://elitechub.com',
  cvUrl: '/assets/docs/elijah_adeyeye_cv.pdf',
};

export const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/lab', label: 'Lab' },
  { path: '/numintel', label: 'NumIntel' },
  { path: '/publications', label: 'Publications' },
  { path: '/writing', label: 'Writing' },
  { path: '/research', label: 'Research' },
  { path: '/elitech', label: 'Elitech Hub' },
  { path: '/contact', label: 'Contact' },
];

export const stats = [
  { value: 50, suffix: '+', label: 'Students Trained' },
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 2, suffix: '', label: 'Peer-Reviewed Manuscripts' },
  { value: 1, suffix: '', label: 'APA 2026 Convention Session' },
];

export const biography = `Elijah Adeyeye is a cybersecurity researcher, behavioral scientist, and founder based in Abuja, Nigeria. He holds a Bachelor of Education in Guidance and Counselling with Mathematics from the University of Ibadan and is a certified Counselling Psychologist. His professional practice is built on a rare intersection: the technical depth of offensive and defensive security and the psychological insight of behavioral research.

He is the founder and CEO of Elitech Hub, a CAC and SMEDAN registered cybersecurity training company that trains security professionals with an emphasis on both technical and behavioral security competencies. Elitech Hub has trained 50+ students and maintains active programs in cybersecurity fundamentals, threat modeling, and digital forensics.

Elijah is a co-author on two peer-reviewed manuscripts currently under review at Springer Nature and SAGE Publications, and a co-author on a session accepted for the APA 2026 Annual Convention in Washington, D.C. His research work is conducted in collaboration with Dr. Olasunkanmi Kehinde at Norfolk State University.

Beyond research, Elijah is an active builder — developing autonomous AI systems, security tools, and digital infrastructure for organizations across Nigeria and internationally. He maintains deep expertise in low-level systems programming (assembly, C++, UEFI) and agentic AI development, and is fluent across the full web stack.`;

export const aboutSnippet = {
  headline: 'The Psychological Side of Cybersecurity',
  body: "With a background in Guidance and Counselling from the University of Ibadan and advanced certifications in cybersecurity, I approach digital security through a behavioral lens. Most breaches aren't technical failures — they're human ones. I build systems that account for both.",
  credentials: [
    'B.Ed University of Ibadan',
    'Certified Counselling Psychologist',
    'Elitech Hub Founder',
    'CAC/SMEDAN Registered',
  ],
};

export const researchCredentials = [
  {
    title: 'Can AI Express Empathy? Computational Insights from Mental Health Dialogues',
    journal: 'Journal of Technology in Behavioral Science — Springer Nature (Published May 2026)',
    status: 'Published',
    submitted: 'May 2026',
    coAuthors: 'O. Kehinde (Primary), Elijah Adeyeye, M. A. Ayanwale, Mubarak O. Mojoyinola',
    note: 'Primary Author: O. Kehinde, Norfolk State University',
  },
  {
    title: 'Online Trauma and Its Impact on Academic Outcomes of High School Students: A Machine Learning Analysis',
    journal: 'Trauma, Violence, & Abuse — SAGE Publications',
    manuscriptId: 'TVA-26-158',
    status: 'Under Review',
    submitted: 'March 2026',
    coAuthors: 'Dr. Olasunkanmi Kehinde (Primary), Elijah Adeyeye',
  },
  {
    title: 'Measurement Equivalence of Emotional Expression in AI and Human Therapy',
    journal: 'APA 2026 Annual Convention — Washington D.C. + Virtual',
    status: 'Accepted',
    date: 'August 6–8, 2026',
    abstractId: '2316',
    coAuthors: 'Dr. Olasunkanmi Kehinde (Primary), Elijah Adeyeye',
  },
];

export const publications = [
  {
    id: 'can-ai-express-empathy',
    slug: 'can-ai-express-empathy',
    title: 'Can AI Express Empathy? Computational Insights from Mental Health Dialogues',
    authors: ['O. Kehinde', 'Elijah Adeyeye', 'M. A. Ayanwale', 'Mubarak O. Mojoyinola'],
    highlightedAuthor: 'Elijah Adeyeye',
    journal: 'Journal of Technology in Behavioral Science',
    publisher: 'Springer Nature',
    status: 'Published',
    publishedDate: '2026-05-27',
    submitted: 'May 2026',
    abstract: 'This study investigates the capacity of artificial intelligence systems to express empathetic responses within the context of mental health dialogues. Using computational analysis of large-scale therapy conversation datasets, we examine the linguistic and emotional markers that distinguish empathetic AI responses from human therapist interactions. Our findings reveal nuanced patterns in how AI systems can approximate empathetic engagement while highlighting fundamental differences in emotional authenticity and contextual understanding.',
    keywords: ['AI empathy', 'mental health', 'NLP', 'computational psychology', 'human-AI interaction'],
    citation: 'Kehinde, O., Adeyeye, E., Ayanwale, M. A., & Mojoyinola, M. O. (2026). Can AI express empathy? Computational insights from mental health dialogues. Journal of Technology in Behavioral Science. Published.',
    type: 'journal',
  },
  {
    id: 'online-trauma-academic-outcomes',
    slug: 'online-trauma-academic-outcomes',
    title: 'Online Trauma and Its Impact on Academic Outcomes of High School Students: A Machine Learning Analysis',
    authors: ['Dr. Olasunkanmi Kehinde', 'Elijah Adeyeye'],
    highlightedAuthor: 'Elijah Adeyeye',
    journal: 'Trauma, Violence, & Abuse',
    publisher: 'SAGE Publications',
    manuscriptId: 'TVA-26-158',
    status: 'Under Review',
    submitted: 'March 2026',
    abstract: 'This research employs machine learning methodologies to analyze the relationship between online trauma exposure and academic performance among high school students. Through systematic analysis of survey data and academic records, we develop predictive models that identify key risk factors associated with online trauma-related academic decline. Our findings highlight the critical need for digital safety interventions in educational settings and provide actionable insights for school administrators and policymakers.',
    keywords: ['online trauma', 'academic outcomes', 'machine learning', 'high school students', 'digital violence'],
    citation: 'Kehinde, O., & Adeyeye, E. (2026). Online trauma and its impact on academic outcomes of high school students: A machine learning analysis. Trauma, Violence, & Abuse. Manuscript ID: TVA-26-158. [Under Review].',
    type: 'journal',
  },
  {
    id: 'measurement-equivalence-emotional-expression',
    slug: 'measurement-equivalence-emotional-expression',
    title: 'Measurement Equivalence of Emotional Expression in AI and Human Therapy',
    authors: ['Dr. Olasunkanmi Kehinde', 'Elijah Adeyeye'],
    highlightedAuthor: 'Elijah Adeyeye',
    journal: 'APA 2026 Annual Convention',
    publisher: 'American Psychological Association',
    status: 'Accepted',
    date: 'August 6–8, 2026',
    location: 'Washington D.C. + Virtual',
    abstractId: '2316',
    abstract: 'This presentation explores the measurement equivalence of emotional expression across AI-generated therapeutic responses and human therapist interactions. We examine whether established instruments for measuring emotional expression in therapy can be reliably applied to AI-generated content, and what adjustments may be necessary to ensure valid cross-modal comparisons. Our analysis contributes to the growing body of literature on AI in mental health by establishing methodological frameworks for fair comparison.',
    keywords: ['emotional expression', 'AI therapy', 'measurement equivalence', 'psychometrics', 'APA'],
    citation: 'Kehinde, O., & Adeyeye, E. (2026, August). Measurement equivalence of emotional expression in AI and human therapy. Session presented at the APA 2026 Annual Convention, Washington, D.C. Abstract ID: 2316.',
    type: 'conference',
    contact: 'elijahadeyeye@proton.me',
  },
];

export const timeline = [
  {
    title: 'Cybersecurity Career Development Mentor',
    company: 'Next App Initiative',
    period: 'Apr 2025 – Present',
    description: 'Mentoring early-career cybersecurity practitioners to define actionable career paths, emphasising role-specific challenges, opportunities, and long-term professional growth.',
    current: true,
  },
  {
    title: 'Volunteer Program & Workforce Development Manager',
    company: 'Optimistic Concept',
    period: 'Nov 2024 – Present',
    description: 'Managing end-to-end volunteer recruitment, training, and retention programs, growing workforce capacity by 70% and directly overseeing a team of 40 volunteers/staff.',
    current: true,
  },
  {
    title: 'Marketing Communication Officer',
    company: 'Optimistic Concept Services',
    period: 'Apr 2024 – Present',
    description: 'Creating impactful media services to amplify narratives of individuals and organizations. Developing cutting-edge research tools and methodologies.',
    current: true,
  },
  {
    title: 'Founder & CEO',
    company: 'Elitech Hub',
    period: '2021 – Present',
    description: 'Founded a CAC and SMEDAN registered cybersecurity training company that trains security professionals with emphasis on technical and behavioral security competencies.',
    current: true,
    highlight: true,
  },
  {
    title: 'Statistical Analyst',
    company: 'University of Ibadan',
    period: 'Jun 2021 – Nov 2023',
    description: 'Conducted in-depth statistical analysis for research projects across various academic disciplines. Advised and mentored students on data interpretation.',
  },
  {
    title: 'Student Counsellor',
    company: "St Bernardine Girl's School",
    period: 'Jun 2022 – Aug 2022',
    description: 'Provided one-on-one counseling sessions for students. Organized career days and workshops on stress management, study skills, and mental health awareness.',
  },
  {
    title: 'Emarketing Specialist',
    company: 'HANDSOMEMEDIA',
    period: 'Mar 2017 – Oct 2019',
    description: 'Developed and executed E-marketing strategies across digital channels. Managed WhatsApp campaigns resulting in 70% sales increase.',
  },
];

export const education = [
  {
    degree: 'B.Ed Guidance and Counselling with Mathematics',
    institution: 'University of Ibadan',
    period: '2019 – 2023',
    icon: '🎓',
  },
];

export const certifications = [
  { name: 'Certified Counselling Psychologist', issuer: '', icon: '🧠' },
  { name: 'Quantum Computing Fundamentals with Microsoft Azure Quantum', issuer: 'Microsoft Learn', year: '2025', icon: '⚛️' },
  { name: 'Computer Forensics and Digital Forensics Masterclass PRO+', issuer: 'Udemy', year: '2025', icon: '🔍' },
  { name: 'Business Analytics with Excel: Elementary to Advanced', issuer: 'Coursera', year: '2025', icon: '📊' },
  { name: 'Ethical Hacking: Crypto 101', issuer: 'Udemy', year: '2025', icon: '🔐' },
  { name: 'Cybersecurity for Everyone', issuer: 'University of Maryland', year: '2023', icon: '🛡️' },
  { name: 'Google Colab Tutorial 2025', issuer: 'Udemy', year: '2025', icon: '☁️' },
];

export const skills = {
  'Cybersecurity': ['Threat Modeling', 'Digital Forensics', 'Ethical Hacking', 'Behavioral Phishing Detection', 'Security Awareness', 'Incident Response'],
  'Research & Data': ['Python', 'R', 'SPSS', 'Machine Learning', 'NLP', 'Statistical Analysis', 'Power BI', 'Tableau'],
  'Development': ['React.js', 'Node.js', 'Express', 'Go', 'Python', 'C++', 'Assembly', 'UEFI', 'Telegram Mini Apps', 'PocketBase'],
  'AI/ML': ['Agentic AI', 'Security Automation', 'Multi-model Pipelines', 'NLP', 'Threat Pattern Recognition'],
  'Psychology': ['Counselling Psychology', 'Behavioral Profiling', 'Attacker Persona Development', 'Human Factors in Security'],
  'Tools & Platforms': ['GitHub', 'Azure', 'EnCase', 'FTK', 'PowerShell', 'SQL', 'Google Colab', 'VS Code', 'Jupyter'],
};

export const skillIcons = {
  'Cybersecurity': '🛡️',
  'Research & Data': '📊',
  'Development': '💻',
  'AI/ML': '🤖',
  'Psychology': '🧠',
  'Tools & Platforms': '🔧',
};

export const testimonials = [
  {
    "id": 1,
    "name": "Awolowo Olaoluwa",
    "role": "Adolescent and Youth Counsellor, Life Counselling Initiative.",
    "content": "Elijah Adeyeye is an exception Researcher with excellent skills in understanding depth and delivery of service having worked together for years now. I can say he is the best at what he does",
    "image": "/assets/images/testimonials/testimonial-1.jpg"
  },
  {
    "id": 2,
    "name": "AbdulRasheed Sodiq O.",
    "role": "Counsellor Unique",
    "content": "I won't lie you make me to have more interest in carrying out research on my own, with the way you make corrections if there's any point to be corrected and perform many task like it's nothing really impressed me so much To let you know how effective your service is, I am truly impressed and make me want to challenge myself! Well done boss 🙇‍♂",
    "image": "/assets/images/testimonials/testimonial-2.jpg"
  },
  {
    "id": 3,
    "name": "Folake Adebayo",
    "role": "Security Analyst, Technology reserve Solutions",
    "content": "As a student in Elijah's cybersecurity program at Elitech Hub, I gained not just technical skills but a completely new way of thinking about security. His behavioral approach to cybersecurity has been invaluable in my career.",
    "image": "/assets/images/testimonials/testimonial-3.jpg"
  },
  {
    "id": 4,
    "name": "Umar Abba",
    "role": "Cyber security/Forensics Analyst",
    "content": "Elijah Adeyeye Sir, demonstrates a rare blend of passion, discipline, and curiosity that defines a promising cybersecurity professional. His dedication to mastering both technical and strategic aspects of cybersecurity is evident in every project he undertakes. Elijah Adeyeye Sir services reflect a commitment to excellence, thorough research, and practical problem solving. As a cybersecurity mentee under the mentorship of Elijah Adeyeye Sir, I, Umar Abba, go beyond just teaching; he empowers others with the mindset and tools needed to think critically, act ethically, and adapt in an ever-evolving threat landscape. His ability to simplify complex concepts while staying current with industry trends makes him a valuable guide for those entering the field. Elijah Adeyeye Sir drive to make a real impact in cybersecurity is not only admirable, it's inspiring.",
    "image": "/assets/images/testimonials/testimonial-4.jpg"
  },
  {
    "id": 5,
    "name": "Chukwuemeka Noble Odoh.",
    "role": "ICS/OI Cybersecurity",
    "content": "I must confess that the few days of coming under your mentorship has left me better with clarity and direction than I have ever been in my Cybersecurity journey. It has always looked painful for me to completely abandon my engineering profession for my love for cybersecurity, but within a few days of coming under your mentorship, I was able to find a perfect balance between my Engineering profession and love for protecting Civilization and national critical infrastructure (ICS/OT Cybersecurity). This is just the beginning, and I look forward to seeing more of you, Sir Elijah Adeyeye. Aka Lordhandsome",
    "image": "/assets/images/testimonials/testimonial-5.jpg"
  },
  {
    "id": 6,
    "name": "Royal Rickson",
    "role": "Security Analyst",
    "content": "I'm truly happy to have you as my mentor, because I can't imagine an alternative to you sir. I see the practicality of your role in play, raging from the expertise of practicing your role with high professionality and so much competence. Your method and forms of engagement has made me discover purpose with in my career of Cyber Security. I appreciate all your selfless services sir. Thank You Adeyeye Elijah @LordHandsome.",
    "image": "/assets/images/testimonials/testimonial-6.jpg"
  },
  {
    "id": 7,
    "name": "Prof. Emmanuel Adejumo",
    "role": "Research Director, Institute for Data Innovation",
    "content": "Elijah's data analysis work for our research project exceeded all expectations. His statistical expertise combined with clear visualizations made our findings accessible to both academic and general audiences. His business analytics skills translated complex patterns into actionable insights that directly informed our organizational strategy.",
    "image": "/assets/images/testimonials/testimonial-7.jpg"
  },
  {
    "id": 8,
    "name": "Ogunwale Mercy",
    "role": "Public Health Analyst, Founder of CEE writing Services",
    "content": "Elijah Adeyeye is one person I can trust with my work, and he won’t disappoint. I’ve seen what he can do with clean data, build high-converting landing pages, and craft personal brands that stand out. Every single time, he delivers. His expertise and diversity in different fields are something that amazes me. He’s not just good at one thing; he masters them. Super talented, dedicated, hardworking and most importantly, a problem solver who cracks tough challenges like nothing. When you meet Elijah, you have met the genius who can solve your problems using code. Need automation? He’s got it. Need a sleek website? Done. Need data to make sense? He’ll break it down. No challenge is too big for him. If you need real solutions, Elijah is the guy. Fast, reliable, and always ahead of the game. Trust me, you won’t regret working with him.",
    "image": "/assets/images/testimonials/testimonial-8.jpg"
  }
];

export const blogPosts = [
  {
    id: 'cyber-psychologists',
    slug: 'cyber-psychologists-secret-agents-security',
    title: 'Cyber Psychologists: The Secret Agents of Security',
    excerpt: "Discover how psychology stops 95% of breaches caused by phishing, scams, and employee mistakes. Turn your team into a 'human firewall'—no tech degree required!",
    date: '2025-04-29',
    readTime: '5 min read',
    tags: ['Cybersecurity', 'Psychology'],
    type: 'linkedin',
    linkedinUrl: 'https://www.linkedin.com/posts/adeyeye-elijah_cyber-psychologists-dont-fight-hackers-with-activity-7321676100198146049-s-WW',
    featured: true,
    content: `Cyber Psychologists don't fight hackers with code — they fight them with behavior.

While most cybersecurity professionals focus on firewalls, encryption, and endpoint security, Cyber Psychologists take a radically different approach. They study WHY people click on phishing links, WHY employees reuse passwords, and WHY social engineering attacks are still the #1 threat vector in 2025.

Here's the thing: 95% of cybersecurity breaches are caused by human error. Not zero-day exploits. Not sophisticated malware. Human decisions.

That's where Cyber Psychologists come in. They:
• Design security awareness training that actually changes behavior
• Build psychological profiles of potential insider threats
• Develop phishing simulations based on cognitive biases
• Create "human firewalls" through behavioral conditioning
• Advise on UI/UX designs that reduce security errors

The demand for this role is skyrocketing. Organizations are realizing that you can have the best technology in the world — but if your humans are the weakest link, none of it matters.

If you're interested in cybersecurity but don't want to spend your life staring at logs and writing scripts, Cyber Psychology might be your calling. It's where behavioral science meets digital defense.

The future of security isn't just technical. It's psychological.`,
  },
  {
    id: 'hidden-cybersecurity-careers',
    slug: 'hidden-cybersecurity-careers',
    title: '10 Hidden Cybersecurity Careers You\'ve Never Heard Of',
    excerpt: 'Think Cybersecurity = Just Hacking? Think Again! Discover 10 Secret Roles with Salaries Up to $200K—No Coding Needed.',
    date: '2025-04-22',
    readTime: '8 min read',
    tags: ['Cybersecurity', 'Education'],
    type: 'linkedin',
    linkedinUrl: 'https://www.linkedin.com/pulse/10-hidden-cybersecurity-careers-youve-never-heard-how-elijah-adeyeye-xg6df',
    content: `When most people hear "cybersecurity," they picture a hooded figure typing furiously in a dark room. But the reality? Cybersecurity is one of the most diverse career fields on the planet.

Here are 10 roles you probably didn't know existed:

1. **Cyber Psychologist** — Studies human behavior in digital environments to prevent social engineering attacks
2. **Security Awareness Director** — Designs training programs that transform employee security behavior
3. **Digital Forensics Examiner** — The detective of the cyber world, recovering and analyzing digital evidence
4. **Cybersecurity Policy Analyst** — Shapes government and corporate security regulations
5. **Threat Intelligence Analyst** — Monitors the dark web and threat actor communities for emerging risks
6. **Privacy Engineer** — Builds privacy protections into products and platforms from the ground up
7. **Security UX Designer** — Creates user interfaces that are both intuitive AND secure
8. **Cyber Insurance Underwriter** — Assesses cyber risk for insurance purposes
9. **Red Team Social Engineer** — Gets paid to psychologically manipulate employees (ethically) to test defenses
10. **OT/ICS Security Specialist** — Protects critical infrastructure like power grids and water treatment plants

Most of these don't require deep coding skills. What they DO require is critical thinking, communication, and a willingness to learn.

The cybersecurity talent gap is projected at 3.5 million unfilled positions globally. Your niche is waiting.`,
  },
  {
    id: 'job-scams',
    slug: 'job-scams-how-i-almost-got-caught',
    title: "Let's Talk About Job Scams: How I Almost Got Caught",
    excerpt: "Scammers are levelling up, and even those with cybersecurity training aren't immune. I nearly fell for a \"legit\" job offer. Here's how it unfolded...",
    date: '2025-04-15',
    readTime: '6 min read',
    tags: ['Cybersecurity', 'Psychology'],
    type: 'linkedin',
    linkedinUrl: 'https://www.linkedin.com/posts/adeyeye-elijah_cybersecurityawareness-jobscamalerts-phishingfails-activity-7322282592207028224-LsRy',
    content: `Let's get real for a sec: scammers are levelling up, and even those with cybersecurity training aren't immune.

I nearly fell for a "legit" job offer last month. Here's how it unfolded:

The Setup:
A professional-looking message landed in my inbox — clean formatting, real company name, competitive salary. They'd "reviewed my LinkedIn profile" and were impressed with my cybersecurity background.

The Red Flags I Almost Missed:
• The email domain was close to the real company, but one letter off
• They wanted to "fast-track" me — no formal interview, just a quick chat
• The "HR manager" had a LinkedIn profile with 23 connections and was created 2 weeks ago
• They asked for personal details before any contract discussion

What Saved Me:
• I searched the company's actual website and found no such job posting
• Cross-referenced the "recruiter" on the real company's team page — didn't exist
• Called the company directly — they confirmed it was a scam

The Lesson:
Social engineering doesn't just happen to "naive" people. Scammers are using AI to generate perfect-looking emails, building fake LinkedIn profiles with AI headshots, and exploiting the urgency of job seekers.

Stay vigilant. Verify everything. Trust your instincts.

If something feels too easy, it probably is.`,
  },
];

export const featuredProjects = [
  {
    name: 'Behavioral Phishing Detection',
    description: 'AI model that analyzes linguistic patterns to detect phishing attempts with 94% accuracy. Uses NLP and machine learning to identify social engineering tactics in email content.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Scikit-learn'],
    github: 'https://github.com/handsomemedia1/Behavioral-Phishing-Detection',
    category: 'Cybersecurity',
  },
  {
    name: 'Cross-Platform Fraud Detection System',
    description: 'Real-time suspicious activity monitoring system using PowerShell, enabling cross-system correlation with 90% faster incident detection compared to manual auditing.',
    tech: ['PowerShell', 'SQL', 'Real-time Monitoring'],
    github: 'https://github.com/handsomemedia1/FraudAnalysis-',
    category: 'Cybersecurity',
  },
  {
    name: 'Elitech Hub Platform',
    description: 'Full-stack cybersecurity training platform with blog system, research portal, and community features. Built with modern web technologies.',
    tech: ['React', 'Node.js', 'Vercel'],
    github: 'https://github.com/handsomemedia1/Elitech-Hub',
    demo: 'https://elitech-hub.vercel.app',
    category: 'Web Dev',
  },
];

export const researchInterests = [
  {
    title: 'Behavioral Cybersecurity',
    description: 'Understanding the human factors that contribute to security breaches and developing interventions that address behavioral vulnerabilities in digital environments.',
    icon: '🧠',
  },
  {
    title: 'AI and Mental Health',
    description: 'Investigating the capacity of AI systems to provide empathetic therapeutic responses and the implications for scaling mental health services globally.',
    icon: '🤖',
  },
  {
    title: 'Machine Learning in Social Science',
    description: 'Applying machine learning methodologies to social science research questions, particularly in education and trauma research.',
    icon: '📈',
  },
  {
    title: 'Human Factors in Security',
    description: 'Studying the cognitive biases, decision-making patterns, and psychological profiles that make individuals and organizations vulnerable to cyber threats.',
    icon: '🔒',
  },
];

export const activeProjects = [
  {
    title: 'AI Empathy in Mental Health Dialogues',
    status: 'Published',
    collaborator: 'O. Kehinde, M. A. Ayanwale, M. O. Mojoyinola',
    institution: 'Norfolk State University',
    description: 'Computational analysis of empathy expression in AI vs. human therapy conversations.',
  },
  {
    title: 'Online Trauma & Academic Performance',
    status: 'Under Review',
    collaborator: 'Dr. Olasunkanmi Kehinde',
    institution: 'Norfolk State University',
    description: 'Machine learning analysis of the impact of online trauma on high school academic outcomes.',
  },
  {
    title: 'APA 2026 Convention Presentation',
    status: 'Accepted',
    collaborator: 'Dr. Olasunkanmi Kehinde',
    institution: 'Norfolk State University',
    description: 'Measurement equivalence of emotional expression in AI and human therapy. Abstract ID: 2316.',
  },
];

export const collaborators = [
  {
    name: 'Dr. Olasunkanmi Kehinde',
    role: 'Primary Author / Research Collaborator',
    institution: 'Norfolk State University',
    description: 'Lead researcher on all three current research projects. Expert in computational psychology, AI in mental health, and psychometric measurement.',
  },
];

export const elitechPrograms = [
  {
    title: 'Cybersecurity Fundamentals',
    description: 'Comprehensive foundation in cybersecurity principles, threat landscapes, and defensive strategies. Built for beginners with a psychology-driven approach.',
    duration: '8 weeks',
    icon: '🛡️',
  },
  {
    title: 'Ethical Hacking',
    description: 'Hands-on offensive security training covering penetration testing, vulnerability assessment, and responsible disclosure practices.',
    duration: '12 weeks',
    icon: '⚔️',
  },
  {
    title: 'Digital Forensics',
    description: 'Evidence acquisition, preservation, and analysis using industry-standard tools. Covers network forensics, mobile forensics, and malware analysis.',
    duration: '10 weeks',
    icon: '🔍',
  },
  {
    title: 'Security Awareness Training',
    description: 'Build a "human firewall" in your organization. Behavioral psychology-based training that actually changes how employees respond to threats.',
    duration: '4 weeks',
    icon: '🧠',
  },
  {
    title: 'Career Mentorship',
    description: 'One-on-one mentorship for individuals transitioning into cybersecurity. Career path planning, certification guidance, and job readiness coaching.',
    duration: 'Ongoing',
    icon: '🚀',
  },
];

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com/in/adeyeye-elijah', icon: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/handsomemedia1', icon: 'github' },
  { name: 'X / Twitter', url: 'https://x.com/elijahadeyeye', icon: 'twitter' },
  { name: 'Telegram', url: 'https://t.me/Elitechub', icon: 'telegram' },
  { name: 'Threads', url: 'https://threads.net/@elijahadeyeye', icon: 'threads' },
  { name: 'Facebook', url: 'https://facebook.com/elijahadeyeye', icon: 'facebook' },
];

export const contactSubjects = [
  'Consulting',
  'Speaking',
  'Collaboration',
  'Research',
  'General',
];

export const languageColors = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  HTML: '#E34F26',
  CSS: '#1572B6',
  'C++': '#00599C',
  Go: '#00ADD8',
  Assembly: '#6E4C13',
  Shell: '#89E051',
  PowerShell: '#012456',
  Rust: '#DEA584',
  Java: '#B07219',
  Ruby: '#CC342D',
};
