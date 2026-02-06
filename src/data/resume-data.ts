export const resumeData = {
    personal: {
        name: "Ali Hassan",
        title: "Creative Technology Director",
        subtitle: "Software Engineer",
        tagline: "Bridging Technology, Creativity, and Human Experience",
        location: "Giza, Egypt",
        email: "alihassancut@gmail.com",
        phone: "+20 106 550 3400",
        links: {
            linkedin: "https://linkedin.com/in/alizidanjr",
            github: "https://github.com/alizidanjr",
            portfolio: typeof window !== 'undefined' ? window.location.origin : "https://alihassanportfolio.com"
        }
    },

    about: {
        summary: "Remote-first Software Engineer and Full Stack Developer with experience building scalable web applications and validating AI-generated code. Proficient in Python, TypeScript, and React with a strong focus on system architecture and RESTful API integration. Proven ability to work in distributed teams to benchmark algorithms, ensure technical accuracy, and deliver high-quality software solutions.",
        vision: "I believe in creating technology that doesn't just function—it inspires. By merging technical precision with creative storytelling, I build digital experiences that bridge the gap between human creativity and computational power.",
        philosophy: "Technology should amplify creativity, not replace it. My approach combines rigorous engineering with artistic vision to create solutions that are both technically sound and emotionally resonant."
    },

    experience: [
        {
            role: "Creative Technology Director",
            company: "BIN ASSAF",
            location: "Cairo, Egypt",
            period: "Jan 2026 - Present",
            current: true,
            description: "Leading creative direction and technical innovation for a luxury jewelry brand, integrating AI technologies with traditional craftsmanship.",
            achievements: [
                "Provided creative direction for visual content and brand strategy",
                "Executed professional photography and videography production",
                "Integrated Generative AI technologies to enhance creative output, including benchmarking algorithms for creative correctness and technical consulting solutions",
                "Ensured scalability of web applications and implementation feasibility",
                "Optimized project delivery and efficiency through technical process improvements, leveraging Agile methodologies within a cross-functional team structure"
            ],
            tech: ["Generative AI", "Agile", "Web Applications", "Technical Consulting"],
            type: "fulltime"
        },
        {
            role: "Full-Stack Developer",
            company: "FAN-FIX",
            location: "Remote",
            period: "Contract 2025",
            current: false,
            description: "Developed a scalable QR-enabled web platform for secure user verification with geolocation features.",
            achievements: [
                "Developed a scalable QR-enabled web platform for secure user verification using React and Python back-end services",
                "Designed a creative UI/UX to bridge physical scans with digital content",
                "Implemented 'scan-to-access' logic to gate exclusive information, conducting extensive debugging for complex edge cases",
                "Integrated geolocation features to reveal specific location data upon success",
                "Engineered the system architecture to handle real-time QR processing, integrating RESTful APIs and focusing on security correctness",
                "Streamlined the user journey from physical QR code to digital interface, creating detailed technical documentation to support deployment"
            ],
            tech: ["React", "Python", "RESTful APIs", "Geolocation", "QR Processing"],
            type: "freelance"
        },
        {
            role: "Full-Stack Developer",
            company: "TFP MODELS",
            location: "Remote",
            period: "Contract 2025",
            current: false,
            description: "Architected a scalable full-stack SaaS platform with live booking and real-time communication features.",
            achievements: [
                "Architected a scalable full-stack SaaS platform using Supabase, focusing on system architecture with secure multi-role authentication",
                "Engineered a live booking system featuring instant availability updates and embedded video conferencing capabilities",
                "Integrated one-click email automations to streamline booking confirmations and transactional notifications",
                "Built real-time communication tools, including in-app messaging, collaborating with a distributed team to design and ship features using TypeScript",
                "Developed automated lead tracking pipelines, validating algorithms for data capture technical accuracy and correctness"
            ],
            tech: ["Supabase", "TypeScript", "Real-time Systems", "Video Conferencing", "Email Automation"],
            type: "freelance"
        },
        {
            role: "Data Analyst Intern",
            company: "Khatib & Alami",
            location: "Cairo, Egypt",
            period: "June 2024 - Aug 2024",
            current: false,
            description: "Assisted in data collection, cleaning, and GIS analysis.",
            achievements: [
                "Assisted in data collection, cleaning, and GIS analysis"
            ],
            tech: ["GIS", "Data Analysis"],
            type: "internship"
        },
        {
            role: "Creative Producer",
            company: "MSFTS & Maddi Town Records",
            location: "Remote",
            period: "Contract 2022 - 2025",
            current: false,
            description: "Collaborated with artists and producers on content creation, delivering creative projects on tight deadlines.",
            achievements: [
                "Collaborated with artists and producers on content creation",
                "Managed production timelines, delivering 6 album covers"
            ],
            tech: ["Creative Production", "Project Management"],
            type: "freelance"
        }
    ],

    projects: [
        {
            title: "AliOS - Interactive Portfolio",
            category: "Creative Coding",
            description: "Desktop OS-themed portfolio built with Next.js 15, featuring draggable windows, taskbar navigation, and terminal emulator. Showcases innovation in web UX design.",
            tech: ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS v4", "Framer Motion"],
            images: [],
            github: "https://github.com/alizidanjr/ALI-CV",
            demo: typeof window !== 'undefined' ? window.location.origin : "#",
            featured: true,
            impact: "Showcases interactive desktop OS experience in browser, demonstrating creative coding and UX innovation"
        },
        {
            title: "FAN-FIX QR Platform",
            category: "Web Platforms",
            description: "Secure QR-enabled verification platform with geolocation features, bridging physical and digital experiences.",
            tech: ["React", "Python", "RESTful APIs", "Geolocation", "QR Processing"],
            images: [],
            github: "#",
            demo: "#",
            featured: true,
            impact: "Streamlined physical-to-digital user journeys with secure gating and location-based reveals"
        },
        {
            title: "TFP MODELS SaaS Platform",
            category: "Web Platforms",
            description: "Full-stack booking platform with live availability, video conferencing, and automated lead tracking.",
            tech: ["Supabase", "TypeScript", "Real-time Systems", "Video Conferencing"],
            images: [],
            github: "#",
            demo: "https://tfp-agency.vercel.app/",
            featured: true,
            impact: "Enabled seamless booking workflows with real-time updates and automated client communications"
        }
    ],

    skills: {
        technical: {
            languages: ["TypeScript", "JavaScript", "Python", "C#", "C++", "Java"],
            frontend: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
            backend: ["Node.js", "Express", "Python", "Supabase", "Firebase", "RESTful APIs"],
            database: ["SQL", "MySQL", "Database Management"],
            tools: ["Git", "Figma", "Antigravity IDE", "VS Code"],
            creative: ["UI/UX Design", "Creative Coding", "Photography", "Videography"],
            ai: ["AI Agent Frameworks", "Generative AI", "Automation Scripting", "MCP"]
        },
        methodologies: ["Agile", "SOLID Principles", "OOP", "System Architecture", "API Integration"],
        leadership: ["Creative Direction", "Project Management", "Cross-functional Teams", "Technical Consulting"],
        languages: {
            arabic: "Native",
            english: "Proficient"
        }
    },

    education: {
        degree: "Bachelor of Computer Science",
        institution: "Arab Academy for Science, Technology & Maritime Transport",
        location: "Cairo, Egypt",
        period: "2022 - 2025",
        gpa: "3.1 (V.Good)",
        dualDegree: {
            institution: "University of Northampton",
            location: "United Kingdom"
        }
    },

    certifications: [
        // Add any certifications from CV or leave empty for now
    ]
} as const

export type ResumeData = typeof resumeData
