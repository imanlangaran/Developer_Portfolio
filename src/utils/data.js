import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rocket,
  Heart,
  Coffee,
  BookOpen,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone,
  Zap
} from 'lucide-react';

import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

import PROJECT_IMG_1 from '../assets/images/project-1.png'
import PROJECT_IMG_2 from '../assets/images/project-2.png'
import PROJECT_IMG_3 from '../assets/images/project-3.png'
import PROJECT_IMG_4 from '../assets/images/project-4.png'
import PROJECT_IMG_5 from '../assets/images/project-5.png'
import PROJECT_IMG_6 from '../assets/images/project-6.png'
import PROJECT_IMG_7 from '../assets/images/project-7.png'

export const SKILLS_CATEGORY = [
  {
    title: 'Frontend',
    icon: Code2,
    description: 'Cafting beautifull, responsive user interfaces',
    skills: [
      { name: 'React', level: 95, color: 'bg-blue-500' },
      { name: 'TypesScrips', level: 90, color: 'bg-blue-600' },
      { name: 'Next.js', level: 80, color: 'bg-gray-800' },
      { name: 'Tailwind Css', level: 92, color: 'bg-cyan-500' },
      { name: 'Framer Morion', level: 85, color: 'bg-pink-500' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    description: 'Building robust server-side solutions',
    skills: [
      { name: 'Node.js', level: 90, color: 'bg-green-500' },
      { name: 'Express.js', level: 88, color: 'bg-gray-700' },
      { name: 'Python', level: 85, color: 'bg-yellow-500' },
      { name: 'GraphQL', level: 80, color: 'bg-pink-500' },
      { name: 'REST APIs', level: 82, color: 'bg-orange-500' },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    description: 'Managing and optimizing data storages',
    skills: [
      { name: 'MongoDB', level: 90, color: 'bg-green-600' },
      { name: 'Sql', level: 88, color: 'bg-blue-700' },
      { name: 'Redis', level: 85, color: 'bg-red-500' },
      { name: 'Prisma', level: 80, color: 'bg-indigo-600' },
      { name: 'Firebase', level: 82, color: 'bg-yellow-600' },
    ],
  },
  {
    title: 'DevOps',
    icon: Cloud,
    description: 'Developing and Scalling applications',
    skills: [
      { name: 'Docker', level: 90, color: 'bg-blue-600' },
      { name: 'AWS', level: 88, color: 'bg-orange-600' },
      { name: 'Vercel', level: 85, color: 'bg-gray-900' },
      { name: 'Git', level: 80, color: 'bg-orange-700' },
      { name: 'CI/CD', level: 82, color: 'bg-purple-600' },
    ],
  },
];

export const TECH_STACK = [
  'JavaScript',
  'HTML5',
  'CSS3',
  'Sass',
  'Webpack',
  'Vite',
  'Jest',
  'Cypress',
  'Figma',
  'Adobe XD',
  'Notion',
  'Slack',
];

export const STATS = [
  { number: '50+', label: 'Projects Completed' },
  { number: '3+', label: 'Years Experience' },
  { number: '20+', label: 'Technologies' },
  { number: '100%', label: 'Clients Satisfaction' },
];

// 9:28
export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with advanced filtering, payment integratior",
    image: PROJECT_IMG_1,
    tags: ["React", "Tailwind", "Framer motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
    category: "Full Stack",
  }, {
    id: 2,
    title: "Blog App with AI Post Generator",
    description:
      "A full-stack blog app using the MERN stack with full Markdown support, tag",
    image: PROJECT_IMG_2,
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "https://youtu.be/tUnGudIBBjQ",
    githubUrl: "#",
    featured: true,
    category: "Full Stack",
  }, {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative project management tool with real-time updates, team chat, and",
    image: PROJECT_IMG_3,
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
    liveUrl: "https://youtu.be/fZK57PXKC-0",
    githubUrl: "#",
    featured: true,
    category: "Web App",
  }, {
    id: 4,
    title: "AI-Powered Interview Prep App",
    description:
      "A smart AI-powered Interview Preparation App using the MERN stack along wit",
    image: PROJECT_IMG_4,
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
    liveUrl: "https://youtu.be/yKB90yM-ao4",
    githubUrl: "#",
    featured: false,
    category: "Web App",
  }, {
    id: 5,
    title: "Resume Builder App",
    description: "a fully functional Resume Builder App using the MERN stack along with Tailwir",
    image: PROJECT_IMG_5,
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
    liveUrl: "https://youtu.be/q3u_fpkjLk8",
    githubUrl: "#",
    featured: false,
    category: "Web App",
  },
  {
    id: 6,
    title: "Expense Tracker App",
    description:
      "This app includes user authentication with JWT, income and expense tracking",
    image: PROJECT_IMG_6,
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDb"],
    liveUrl: "https://youtu.be/PQnbtnsYUho",
    githubUrl: "#",
    featured: true,
    category: "Web App",
  }]

export const JOURNEY_STEPS = [
  {
    year: "2021",
    title: "Started Coding Journey",
    company: "Self-taught",
    description:
      "Began learning web development with HTML, CSS, and JavaScript. Built my firs",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    year: "2022",
    title: "First Internship",
    company: "TechStart Inc.",
    description:
      "Joined as a frontend intern, working with React and learning modern developm",
    icon: Briefcase,
    color: "bg-green-500",
  },
  {
    year: "2022",
    title: "Computer Science Degree",
    company: "University of Technology",
    description:
      "Graduated with honors, specializing in web technologies and software enginee",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    description:
      "Promoted to full-time developer role. Built end-to-end applications using ME",
    icon: Rocket,
    color: "bg-orange-500",
  },
  {
    year: "2024",
    title: "Freelance & Open Source",
    company: "Independent",
    description:
      "Started freelancing and contributing to open source projects. Launched 3 suc-",
    icon: Award,
    color: "bg-pink-500",
  },
  {
    year: "2025",
    title: "Senior Developer",
    company: "Present",
    description:
      "Currently building innovative solutions and exploring new technologies Like/",
    icon: Zap,
    color: "bg-cyan-500",
  }
]

export const PASSIONS = [
  {
    icon: Heart,
    title: 'User Experience',
    description: "Crafting intuitive interfaces that users love",
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: "Turning complex challenges into elegant solutions",
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: "Always exploring new technologies and best practices",
  },
]

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: FiGithub,
    url: '#',
    color: 'hover:text-gray-400',
    bgColor: 'hover:bg-gray-800',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    url: '#',
    color: 'hover:text-blue-400',
    bgColor: 'hover:bg-blue-500/10',
  },
  {
    name: 'Twitter',
    icon: FiTwitter,
    url: '#',
    color: 'hover:text-sky-400',
    bgColor: 'hover:bg-sky-500/10',
  },
  {
    name: 'Email',
    icon: Mail,
    url: '#',
    color: 'hover:text-green-400',
    bgColor: 'hover:bg-green-500/10',
  },
]

export const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Location',
    value: ' San Farncisco, CA'
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'testing@email.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567'
  },
]