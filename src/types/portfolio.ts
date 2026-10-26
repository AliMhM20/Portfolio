export type Language = 'fa' | 'en';
export type Theme = 'dark' | 'light';

export interface ProjectItem {
  id: string;
  number: string; // e.g. "01", "02"
  title: string;
  subtitle: string;
  description: string;
  fullDetails?: string;
  category: 'flagship' | 'software' | 'hardware' | 'web';
  tags: string[];
  featured?: boolean;
  role?: string;
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  accentColor?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  code: string; // e.g. "SEC_01"
  skills: {
    name: string;
    level?: string;
    proficiency: number;
    tag?: string;
  }[];
}

export interface SiteContent {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    education?: string;
    contact: string;
    statusBadge: string;
    cta: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    highlightWord: string;
    headlinePart2: string;
    subheadlineEditorial: string;
    inputPlaceholder: string;
    actionButton: string;
    microNote: string;
    portraitLabel: string;
    stats: { number: string; label: string }[];
  };
  about: {
    sectionNum: string;
    title: string;
    tagline?: string;
    bioParagraph1: string;
    bioParagraph2: string;
    manifestoQuote?: string;
    manifestoAuthor?: string;
    facts: { key: string; val: string }[];
  };
  skills: {
    sectionNum: string;
    title: string;
    subtitle: string;
    categories: SkillCategory[];
  };
  projects: {
    sectionNum: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterFlagship: string;
    filterSoftware: string;
    filterHardware: string;
    viewLive: string;
    viewGithub: string;
    detailsBtn: string;
    items: ProjectItem[];
  };
  education: {
    sectionNum: string;
    title: string;
    subtitle: string;
    degree: string;
    field: string;
    institution: string;
    period: string;
    location: string;
    description: string;
    courses: string[];
  };
  contact: {
    sectionNum: string;
    title: string;
    subtitle: string;
    leadText: string;
    email: string;
    copyEmail: string;
    copied: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      sending: string;
      sent: string;
    };
  };
  footer: {
    signature: string;
    copyright: string;
    backToTop: string;
  };
}
