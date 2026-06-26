import { AppState, PortfolioData, AdminSettings } from '../types';

const defaultProfile = {
  name: 'Simanye Tevin Sizini',
  tagline: 'IT Support Technician / IT Support Graduate',
  bio: 'I am Simanye Tevin Sizini, a young IT professional who has recently completed a Diploma in IT Support Services. I am passionate about technology, problem-solving, and providing practical IT support solutions. I am currently gaining hands-on industry experience through the CAPACITI program.',
  photo: 'https://i.postimg.cc/qM6NP6FV/IMG-20260416-WA0080.jpg',
  quote: 'Passionate about solving technical problems and supporting efficient digital environments.',
  about: {
    personalBackground: 'I am Simanye Tevin Sizini, a motivated and passionate young IT professional from South Africa. My journey into technology began with a genuine curiosity about how systems work and a desire to help others solve technical problems. I believe that technology should empower people, not frustrate them. This belief drives my commitment to providing practical, user-friendly IT support that makes a real difference in people\'s daily work. My background has taught me the value of perseverance, continuous learning, and adapting to new challenges—qualities that I bring to every technical problem I encounter.',
    professionalBackground: 'My professional foundation is built on solid academic training in IT support services. Through my studies at Nelson Mandela University, I developed a comprehensive understanding of IT infrastructure, troubleshooting methodologies, and user support principles. Currently, I am enhancing my practical skills through the CAPACITI program, where I am gaining hands-on experience in technical support, workplace readiness, and collaborative problem-solving in real IT environments.',
    vision: 'To become a skilled IT Support professional who contributes to efficient IT environments, helping organizations optimize their technology infrastructure and enabling users to work productively without technical barriers.',
    mission: 'To continuously improve my technical and problem-solving skills while delivering reliable IT support. I am committed to learning, growing, and providing solutions that make technology work for people.',
    careerGoals: [
      'Entry-Level IT Support - Build foundational experience in technical support and user assistance',
      'Systems Support - Advance to managing and supporting complex IT systems and infrastructure',
      'IT Specialist - Specialize in a focused area of IT with deep expertise and leadership'
    ],
    interests: [
      { icon: 'Briefcase', title: 'IT Support', desc: 'Helping users solve technical issues' },
      { icon: 'Heart', title: 'Troubleshooting', desc: 'Diagnosing and resolving problems' },
      { icon: 'Target', title: 'Networking', desc: 'Understanding connected systems' },
      { icon: 'Eye', title: 'End-user Support', desc: 'Empowering people with technology' }
    ],
    reflectiveMotivation: 'I am motivated by the challenge of solving problems and the satisfaction of helping others. When a user struggles with technology, I see an opportunity to make their day better. The constant evolution of technology keeps me learning and growing, which excites me about the future.',
    reflectiveImpact: 'I want to be the IT professional who makes technology accessible and frustration-free. My goal is to contribute to organizations where IT systems enable productivity rather than create barriers. I aspire to grow into a role where I can mentor others and drive improvements in IT service delivery.'
  }
};

const defaultEducation = [
  {
    id: '1',
    year: '2025',
    title: 'Diploma in IT Support Services',
    institution: 'Nelson Mandela University',
    description: 'Comprehensive program covering IT infrastructure, technical support, systems administration, and user support methodologies.'
  },
  {
    id: '2',
    year: '2022',
    title: 'Higher Certificate in IT User Support Services',
    institution: 'Nelson Mandela University',
    description: 'Foundation program focusing on IT user support fundamentals, hardware and software basics, and introductory networking concepts.'
  },
  {
    id: '3',
    year: '2019',
    title: 'National Senior Certificate (Matric)',
    institution: 'Jali High School',
    description: 'Completed secondary education with a focus on subjects that laid the groundwork for IT studies.'
  }
];

const defaultAchievements = [
  {
    id: '1',
    icon: 'BookOpen',
    title: 'IT Academic Projects',
    description: 'Participated in various IT academic projects throughout studies, applying theoretical knowledge to practical scenarios.'
  },
  {
    id: '2',
    icon: 'Award',
    title: 'Special Exam Application System',
    description: 'Successfully completed the Special Exam Application System project as a final year project, demonstrating practical development skills.'
  },
  {
    id: '3',
    icon: 'Users',
    title: 'CAPACITI Training Program',
    description: 'Active participation in ongoing professional development through the CAPACITI program since April 2026.'
  },
  {
    id: '4',
    icon: 'Trophy',
    title: 'Academic Involvement',
    description: 'Consistent engagement with coursework and collaborative learning throughout academic career.'
  }
];

const defaultExperience = [
  {
    id: '1',
    title: 'Intern at CAPACITI',
    organization: 'CAPACITI Program',
    period: 'April 2026 – Present',
    type: 'Training Program',
    description: 'Structured IT training program focused on technical support, workplace readiness, teamwork, and real-world IT systems exposure.',
    highlights: [
      'Developing practical technical support skills',
      'Gaining exposure to real IT systems',
      'Building workplace readiness and professionalism',
      'Collaborating with teams on IT projects'
    ]
  }
];

const defaultProjects = [
  {
    id: '1',
    title: 'Special Exam Application System',
    type: 'Final Year Project',
    role: 'Developer / Student Project Contributor',
    overview: 'A web-based system designed for students to apply for special exams digitally, streamlining the administrative process between students and academic departments.',
    tags: ['Web Application', 'Academic System', 'Student Portal'],
    outcome: 'Improved efficiency by digitizing the application process, reducing paperwork, and creating a streamlined workflow between students and administrators.',
    status: 'Completed'
  }
];

const defaultCertifications = [
  {
    id: '1',
    name: 'Diploma in IT Support Services',
    institution: 'Nelson Mandela University',
    year: '2025',
    type: 'Diploma',
    description: 'Comprehensive qualification covering IT infrastructure support, systems administration, troubleshooting methodologies, and professional IT practices.',
    hasCertificate: true,
    certificateUrl: '/certificates/diploma-it-support.pdf'
  },
  {
    id: '2',
    name: 'Higher Certificate in IT User Support Services',
    institution: 'Nelson Mandela University',
    year: '2022',
    type: 'Certificate',
    description: 'Foundation-level qualification focusing on essential IT support skills, hardware and software basics, and introductory networking concepts.',
    hasCertificate: true,
    certificateUrl: '/certificates/higher-certificate-it.pdf'
  },
  {
    id: '3',
    name: 'CAPACITI Training Program',
    institution: 'CAPACITI',
    year: '2026 – Present',
    type: 'Professional Development',
    description: 'Ongoing structured IT training program focused on technical support, workplace readiness, teamwork, and real-world IT systems exposure.',
    hasCertificate: false
  }
];

const defaultContact = {
  email: 'Simanyetevin@gmail.com',
  phone: '064 095 1511',
  linkedin: 'Simanye Sizini',
  linkedinUrl: 'https://www.linkedin.com/in/simanye-sizini',
  github: '',
  twitter: '',
  location: 'South Africa'
};

const defaultAdmin: AdminSettings = {
  accessCodeHash: btoa('Simanye2026'),
  lastCodeChange: new Date().toISOString().split('T')[0]
};

export const defaultData: PortfolioData = {
  profile: defaultProfile,
  education: defaultEducation,
  achievements: defaultAchievements,
  experience: defaultExperience,
  projects: defaultProjects,
  certifications: defaultCertifications,
  contact: defaultContact
};

export const defaultState: AppState = {
  data: defaultData,
  activities: [],
  admin: defaultAdmin
};

export const STORAGE_KEY = 'portfolio_data';
export const SESSION_KEY = 'admin_session';
export const ATTEMPTS_KEY = 'login_attempts';
