// gitprofile.config.ts

const CONFIG = {
    github: {
        username: 'akhandagrwl-29', // Your GitHub org/user name.(This is the only required config)
    },

    base: '/',
    projects: {
        github: {
            display: true, // Display GitHub projects?
            header: 'Github Projects',
            mode: 'manual', // Mode can be: 'automatic' or 'manual'
            automatic: {
                sortBy: 'stars', // Sort projects by 'stars' or 'updated'
                limit: 4, // How many projects to display.
                exclude: {
                    forks: true, // Forked projects will not be displayed if set to true.
                    projects: [], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
                },
            },
            manual: {
                // Properties for manually specifying projects
                projects: ['akhandagrwl-29/pnr-status-change-notifier', 'akhandagrwl-29/ask-chotu', 'akhandagrwl-29/video-transcript-ingester', 'akhandagrwl-29/real-time-leaderboard'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
            },
        },
        external: {
            header: 'My Projects',
            // To hide the `External Projects` section, keep it empty.
            projects: [
                {
                    title: 'Xtreme by Zomato',
                    description:
                        'Xtreme by Zomato empowers merchants to deliver packages effortlessly. A groundbreaking logistics platform that revolutionizes package delivery for merchants.',
                    imageUrl:
                        'https://play-lh.googleusercontent.com/mKHYI6yfSLMcoLzVO7QtBe3GPnyLw-dM8x0BKeUrtVwoHFkjt0q4315lH0MUKxihzq4=w480-h960-rw',
                    link: 'https://play.google.com/store/apps/details?id=com.application.zomato.xtreme&hl=en_US',
                },
                {
                    title: 'Credit Card EMI conversion',
                    description:
                        'Successfully implemented credit card EMI conversion feature, enabling customers to convert their purchases into affordable monthly installments.',
                    imageUrl:
                        'https://fi.money/assets/credit-card/webp/intro.webp',
                    link: 'https://fi.money/credit-cards/amplifi',
                },
            ],
        },
    },
    seo: { title: 'Portfolio of Akhand Agarwal', description: '', imageURL: '' },
    social: {
        linkedin: 'akhandagarwal',
        x: '',
        mastodon: '',
        researchGate: '',
        facebook: '',
        instagram: '',
        reddit: '',
        threads: '',
        youtube: '',
        udemy: '',
        dribbble: '',
        behance: '',
        medium: '',
        dev: '',
        stackoverflow: '',
        discord: '',
        telegram: '',
        website: '',
        phone: '+91 7985834518',
        email: 'coding.akhandagarwal6174@gmail.com',
    },
    resume: {
        fileUrl:
            'https://drive.google.com/file/d/1-NgVVampRU92VBlSLsey4jeUZUmRIWNk/view?usp=sharing', // Empty fileUrl will hide the `Download Resume` button.
    },
    skills: [
        'Go',
        'Python',
        'AWS',
        'MongoDB',
        'MySQL',
        'DynamoDB',
        'Temporal',
        'gRPC',
        'Redis',
        'Grafana',
        'Go-Kratos',
        'Kafka',
    ],
    experiences: [
        {
            company: 'Allen Digital',
            position: 'Software Engineer II',
            from: 'March 2024',
            to: 'Present',
            companyLink: 'https://www.linkedin.com/company/weareallendigital/',
        },
        {
            company: 'Zomato',
            position: 'Software Engineer I',
            from: 'June 2023',
            to: 'February 2024',
            companyLink: 'https://www.zomato.com/',
        },
        {
            company: 'Fi Money',
            position: 'Tech Intern',
            from: 'October 2022',
            to: 'April 2023',
            companyLink: 'https://fi.money/',
        },
    ],
    certifications: [
        {
            name: 'Codechef CCDSA',
            body: 'Codechef advanced level certificate for Data Structures and Algorithms',
            year: 'April 2022',
            link: 'https://www.codechef.com/certificates/public/8f71f3c',
        },
        {
            name: 'ACM-ICPC Regionals',
            body: 'ICPC - International Collegiate Programming Contest',
            year: 'June 2021',
            link: 'https://drive.google.com/file/d/1UTYx03Lxo32h-e4wtAbR2WOmINT9b8R2/view',
        },
        {
            name: 'Google Kickstart',
            body: 'Google Coding Competitions',
            year: 'December 2022',
            link: 'https://drive.google.com/file/d/1sNbEf5-wuKyy8VSvBrdE5J-F5whKCeW3/view',
        }
    ],
    educations: [
        {
            institution: 'Institute of Engineering and Technology, Lucknow',
            degree: 'Bachelor of Technology',
            from: '2019',
            to: '2023',
        },
    ],
    publications: [
        {
            title: 'BFF vs API Gateway',
            conferenceName: '',
            journalName: 'Backend for frontend(BFF) pattern vs API gateway',
            authors: 'Akhand Agarwal',
            link: 'https://www.linkedin.com/pulse/backend-frontendbff-pattern-vs-api-gateway-akhand-agarwal-0djnc/',
            description:
                'When designing microservices, two key patterns often come into play: BFF (Backend for Frontend) and API Gateway. In this article, we delve into the basics of these patterns, exploring their purpose and comparing their roles in simplifying complex microservices architectures.',
        },
        {
            title: 'Method Sets in Golang',
            conferenceName: '',
            journalName: 'Method Sets in Go - Rules for Interface implementation',
            authors: 'Akhand Agarwal',
            link: 'https://www.linkedin.com/pulse/method-sets-go-rules-interface-implementation-akhand-agarwal-w0vic/',
            description:
                `Method sets help you to understand the rules around interface compliance. There are two types of method sets -
                    Values method sets (used with value type receiver in Go)
                    Pointer method sets (used with pointer type receiver in Go)
                `,
        },
    ],
    // Display articles from your medium or dev account. (Optional)
    blog: {
        source: 'dev', // medium | dev
        username: '', // to hide blog section, keep it empty
        limit: 2, // How many articles to display. Max is 10.
    },
    googleAnalytics: {
        id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
    },
    // Track visitor interaction and behavior. https://www.hotjar.com
    hotjar: { id: '', snippetVersion: 6 },
    themeConfig: {
        defaultTheme: 'dark',

        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,

        // Should use the prefers-color-scheme media-query,
        // using user system preferences, instead of the hardcoded defaultTheme
        respectPrefersColorScheme: false,

        // Display the ring in Profile picture
        displayAvatarRing: true,

        // Available themes. To remove any theme, exclude from here.
        themes: [
            'light',
            'dark',
            // 'cupcake',
            // 'bumblebee',
            // 'emerald',
            // 'corporate',
            // 'synthwave',
            // 'retro',
            // 'cyberpunk',
            // 'valentine',
            // 'halloween',
            // 'garden',
            // 'forest',
            // 'aqua',
            // 'lofi',
            // 'pastel',
            // 'fantasy',
            // 'wireframe',
            // 'black',
            // 'luxury',
            // 'dracula',
            // 'cmyk',
            // 'autumn',
            // 'business',
            // 'acid',
            // 'lemonade',
            // 'night',
            // 'coffee',
            // 'winter',
            // 'dim',
            // 'nord',
            // 'sunset',
            // 'caramellatte',
            // 'abyss',
            // 'silk',
            // 'procyon',
        ],
    },

    // Optional Footer. Supports plain text or HTML.
    footer: `Made with ❤️ by Akhand Agarwal`,

    enablePWA: true,
};

export default CONFIG;
