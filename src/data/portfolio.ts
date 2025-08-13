import { Project, Skill, SocialLink, NavItem } from '../types';

// Navigation items
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: '#hero', ariaLabel: 'Go to home section' },
  { id: 'about', label: 'About', href: '#about', ariaLabel: 'Go to about section' },
  { id: 'projects', label: 'Projects', href: '#projects', ariaLabel: 'Go to projects section' },
  { id: 'contact', label: 'Contact', href: '#contact', ariaLabel: 'Go to contact section' },
];

// Social media links
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin',
    ariaLabel: 'Visit my LinkedIn profile',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter',
    ariaLabel: 'Visit my Twitter profile',
  },
  {
    id: 'email',
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'email',
    ariaLabel: 'Send me an email',
  },
];

// Skills data
export const skills: Skill[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', level: 'expert', icon: 'react' },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'advanced', icon: 'typescript' },
  { id: 'javascript', name: 'JavaScript', category: 'frontend', level: 'expert', icon: 'javascript' },
  { id: 'html', name: 'HTML5', category: 'frontend', level: 'expert', icon: 'html5' },
  { id: 'css', name: 'CSS3', category: 'frontend', level: 'expert', icon: 'css3' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'advanced', icon: 'nextjs' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', level: 'intermediate', icon: 'vue' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'advanced', icon: 'nodejs' },
  { id: 'python', name: 'Python', category: 'backend', level: 'advanced', icon: 'python' },
  { id: 'express', name: 'Express.js', category: 'backend', level: 'advanced', icon: 'express' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', level: 'intermediate', icon: 'fastapi' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', level: 'advanced', icon: 'postgresql' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', level: 'intermediate', icon: 'mongodb' },
  { id: 'redis', name: 'Redis', category: 'database', level: 'intermediate', icon: 'redis' },
  
  // Tools
  { id: 'git', name: 'Git', category: 'tools', level: 'expert', icon: 'git' },
  { id: 'docker', name: 'Docker', category: 'tools', level: 'advanced', icon: 'docker' },
  { id: 'aws', name: 'AWS', category: 'tools', level: 'intermediate', icon: 'aws' },
  { id: 'figma', name: 'Figma', category: 'tools', level: 'intermediate', icon: 'figma' },
];

// Projects data
export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with React, Node.js, and PostgreSQL',
    longDescription: 'A comprehensive e-commerce solution featuring user authentication, product catalog, shopping cart, payment processing, and admin dashboard. Built with modern technologies and best practices.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    imageAlt: 'E-commerce platform screenshot showing product catalog',
    demoUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
    category: 'web',
    completedAt: '2024-01-15',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    longDescription: 'A productivity app that helps teams manage tasks, set deadlines, and collaborate effectively. Features real-time updates, drag-and-drop interface, and comprehensive reporting.',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Express.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    imageAlt: 'Task management app interface with kanban board',
    demoUrl: 'https://demo-tasks.example.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: true,
    category: 'web',
    completedAt: '2023-11-20',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts',
    longDescription: 'An intuitive weather application providing current conditions, 7-day forecasts, and weather maps. Features geolocation, search functionality, and beautiful data visualizations.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    imageUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    imageAlt: 'Weather dashboard showing current conditions and forecast',
    demoUrl: 'https://demo-weather.example.com',
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    featured: false,
    category: 'web',
    completedAt: '2023-09-10',
  },
  {
    id: 'mobile-fitness-app',
    title: 'Fitness Tracking App',
    description: 'A React Native mobile app for fitness tracking and workout planning',
    longDescription: 'A comprehensive fitness app that helps users track workouts, monitor progress, and achieve their fitness goals. Includes workout plans, progress analytics, and social features.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    imageAlt: 'Mobile fitness app screenshots showing workout tracking',
    demoUrl: 'https://apps.apple.com/app/fitness-tracker',
    githubUrl: 'https://github.com/yourusername/fitness-app',
    featured: true,
    category: 'mobile',
    completedAt: '2023-12-05',
  },
];

// Personal information
export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  subtitle: 'Building modern web applications with passion and precision',
  bio: `I'm a passionate full-stack developer with over 5 years of experience creating 
        modern, scalable web applications. I specialize in React, TypeScript, and Node.js, 
        with a strong focus on user experience and performance optimization.`,
  location: 'Your City, Country',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  resumeUrl: '/resume.pdf',
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  profileImageAlt: 'Professional headshot of Your Name',
};

// SEO metadata
export const seoData = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: `${personalInfo.name} is a ${personalInfo.title.toLowerCase()} specializing in modern web development. View my portfolio and get in touch.`,
  keywords: [
    'web developer',
    'full stack developer',
    'react developer',
    'typescript',
    'javascript',
    'portfolio',
    personalInfo.name.toLowerCase().replace(' ', '-'),
  ],
  ogImage: '/images/og-image.jpg',
  canonicalUrl: 'https://yourportfolio.com',
};
