import {
  Code2,
  GraduationCap,
  Briefcase,
  Award,
  Rochet,
  Heart,
  Coffee,
  BookOpen,
  Zap,
  Database,
  Server,
  Cloud,
  Mail,
  MapPin,
  Phone
} from 'lucid-react';

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
      { name: 'MongoDB', level: 88, color: 'bg-blue-700' },
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

  }
]

export const JOURNEY_STEPS = [
  {

  }
]

export const PASSIONS = [
  {
    icon: Heart,
    title: 'User Experience',
    description: '...'
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: '...'
  },
  {
    icon: BookOpen,
    title: 'Continuous Learning',
    description: '...'
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