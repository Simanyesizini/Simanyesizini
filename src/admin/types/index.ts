export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  photo: string;
  quote: string;
  about: {
    personalBackground: string;
    professionalBackground: string;
    vision: string;
    mission: string;
    careerGoals: string[];
    interests: { icon: string; title: string; desc: string }[];
    reflectiveMotivation: string;
    reflectiveImpact: string;
  };
}

export interface Education {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  type: string;
  role: string;
  overview: string;
  tags: string[];
  outcome: string;
  status: string;
  image?: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: string;
  type: string;
  description: string;
  hasCertificate: boolean;
  certificateUrl?: string;
}

export interface Contact {
  email: string;
  phone: string;
  linkedin: string;
  linkedinUrl: string;
  github?: string;
  twitter?: string;
  location: string;
}

export interface AdminSettings {
  accessCodeHash: string;
  lastCodeChange: string;
}

export interface PortfolioData {
  profile: Profile;
  education: Education[];
  achievements: Achievement[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  contact: Contact;
}

export interface ActivityLog {
  id: string;
  action: 'create' | 'update' | 'delete';
  section: string;
  item: string;
  timestamp: string;
}

export interface AppState {
  data: PortfolioData;
  activities: ActivityLog[];
  admin: AdminSettings;
}
