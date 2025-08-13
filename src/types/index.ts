// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  imageAlt: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: ProjectCategory;
  completedAt: string; // ISO date string
}

export type ProjectCategory = 'web' | 'mobile' | 'desktop' | 'api' | 'other';

// Skill interface
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon?: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'other';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Contact form interface
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Social media links
export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

// Navigation item
export interface NavItem {
  id: string;
  label: string;
  href: string;
  ariaLabel?: string;
}

// SEO Meta data
export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

// Theme context
export interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isDark: boolean;
}

// Error boundary state
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Form validation
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T> {
  values: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

// Animation variants for framer-motion (if used)
export interface AnimationVariants {
  initial: object;
  animate: object;
  exit?: object;
}

// Lazy loading image props
export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}
