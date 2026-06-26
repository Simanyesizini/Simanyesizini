import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppState, PortfolioData, ActivityLog, Education, Experience, Project, Certification } from '../types';
import { defaultState, STORAGE_KEY } from '../data/defaults';

interface DataContextType {
  data: PortfolioData;
  activities: ActivityLog[];
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  updateAbout: (about: Partial<PortfolioData['profile']['about']>) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  addAchievement: (achievement: Omit<PortfolioData['achievements'][0], 'id'>) => void;
  updateAchievement: (id: string, achievement: Partial<PortfolioData['achievements'][0]>) => void;
  deleteAchievement: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  updateContact: (contact: Partial<PortfolioData['contact']>) => void;
  exportData: () => string;
  importData: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function logActivity(
  action: ActivityLog['action'],
  section: string,
  item: string
): ActivityLog {
  return {
    id: generateId(),
    action,
    section,
    item,
    timestamp: new Date().toISOString()
  };
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultState,
          ...parsed,
          data: {
            ...defaultState.data,
            ...parsed.data,
            profile: { ...defaultState.data.profile, ...parsed.data?.profile },
            about: { ...defaultState.data.profile.about, ...parsed.data?.profile?.about }
          }
        };
      }
    } catch (e) {
      console.error('Failed to parse stored data:', e);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateProfile = useCallback((profile: Partial<PortfolioData['profile']>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        profile: { ...prev.data.profile, ...profile }
      },
      activities: [logActivity('update', 'Profile', profile.name || 'Profile'), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateAbout = useCallback((about: Partial<PortfolioData['profile']['about']>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        profile: {
          ...prev.data.profile,
          about: { ...prev.data.profile.about, ...about }
        }
      },
      activities: [logActivity('update', 'About', 'About Section'), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const addEducation = useCallback((education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        education: [...prev.data.education, newEducation]
      },
      activities: [logActivity('create', 'Education', education.title), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateEducation = useCallback((id: string, education: Partial<Education>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        education: prev.data.education.map(e => e.id === id ? { ...e, ...education } : e)
      },
      activities: [logActivity('update', 'Education', education.title || id), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const deleteEducation = useCallback((id: string) => {
    setState(prev => {
      const edu = prev.data.education.find(e => e.id === id);
      return {
        ...prev,
        data: {
          ...prev.data,
          education: prev.data.education.filter(e => e.id !== id)
        },
        activities: [logActivity('delete', 'Education', edu?.title || id), ...prev.activities].slice(0, 50)
      };
    });
  }, []);

  const reorderEducation = useCallback((startIndex: number, endIndex: number) => {
    setState(prev => {
      const items = [...prev.data.education];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return {
        ...prev,
        data: { ...prev.data, education: items }
      };
    });
  }, []);

  const addAchievement = useCallback((achievement: Omit<PortfolioData['achievements'][0], 'id'>) => {
    const newAchievement = { ...achievement, id: generateId() };
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        achievements: [...prev.data.achievements, newAchievement]
      },
      activities: [logActivity('create', 'Achievements', achievement.title), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateAchievement = useCallback((id: string, achievement: Partial<PortfolioData['achievements'][0]>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        achievements: prev.data.achievements.map(a => a.id === id ? { ...a, ...achievement } : a)
      },
      activities: [logActivity('update', 'Achievements', achievement.title || id), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const deleteAchievement = useCallback((id: string) => {
    setState(prev => {
      const ach = prev.data.achievements.find(a => a.id === id);
      return {
        ...prev,
        data: {
          ...prev.data,
          achievements: prev.data.achievements.filter(a => a.id !== id)
        },
        activities: [logActivity('delete', 'Achievements', ach?.title || id), ...prev.activities].slice(0, 50)
      };
    });
  }, []);

  const addExperience = useCallback((experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        experience: [...prev.data.experience, newExperience]
      },
      activities: [logActivity('create', 'Experience', experience.title), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateExperience = useCallback((id: string, experience: Partial<Experience>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        experience: prev.data.experience.map(e => e.id === id ? { ...e, ...experience } : e)
      },
      activities: [logActivity('update', 'Experience', experience.title || id), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const deleteExperience = useCallback((id: string) => {
    setState(prev => {
      const exp = prev.data.experience.find(e => e.id === id);
      return {
        ...prev,
        data: {
          ...prev.data,
          experience: prev.data.experience.filter(e => e.id !== id)
        },
        activities: [logActivity('delete', 'Experience', exp?.title || id), ...prev.activities].slice(0, 50)
      };
    });
  }, []);

  const reorderExperience = useCallback((startIndex: number, endIndex: number) => {
    setState(prev => {
      const items = [...prev.data.experience];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return {
        ...prev,
        data: { ...prev.data, experience: items }
      };
    });
  }, []);

  const addProject = useCallback((project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: generateId() };
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        projects: [...prev.data.projects, newProject]
      },
      activities: [logActivity('create', 'Projects', project.title), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateProject = useCallback((id: string, project: Partial<Project>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        projects: prev.data.projects.map(p => p.id === id ? { ...p, ...project } : p)
      },
      activities: [logActivity('update', 'Projects', project.title || id), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setState(prev => {
      const proj = prev.data.projects.find(p => p.id === id);
      return {
        ...prev,
        data: {
          ...prev.data,
          projects: prev.data.projects.filter(p => p.id !== id)
        },
        activities: [logActivity('delete', 'Projects', proj?.title || id), ...prev.activities].slice(0, 50)
      };
    });
  }, []);

  const addCertification = useCallback((certification: Omit<Certification, 'id'>) => {
    const newCertification = { ...certification, id: generateId() };
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        certifications: [...prev.data.certifications, newCertification]
      },
      activities: [logActivity('create', 'Certifications', certification.name), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const updateCertification = useCallback((id: string, certification: Partial<Certification>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        certifications: prev.data.certifications.map(c => c.id === id ? { ...c, ...certification } : c)
      },
      activities: [logActivity('update', 'Certifications', certification.name || id), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const deleteCertification = useCallback((id: string) => {
    setState(prev => {
      const cert = prev.data.certifications.find(c => c.id === id);
      return {
        ...prev,
        data: {
          ...prev.data,
          certifications: prev.data.certifications.filter(c => c.id !== id)
        },
        activities: [logActivity('delete', 'Certifications', cert?.name || id), ...prev.activities].slice(0, 50)
      };
    });
  }, []);

  const updateContact = useCallback((contact: Partial<PortfolioData['contact']>) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        contact: { ...prev.data.contact, ...contact }
      },
      activities: [logActivity('update', 'Contact', 'Contact Info'), ...prev.activities].slice(0, 50)
    }));
  }, []);

  const exportData = useCallback(() => {
    return JSON.stringify(state.data, null, 2);
  }, [state.data]);

  const importData = useCallback((jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      setState(prev => ({
        ...prev,
        data: {
          ...defaultState.data,
          ...parsed
        },
        activities: [logActivity('update', 'Data', 'Imported Data'), ...prev.activities].slice(0, 50)
      }));
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetToDefaults = useCallback(() => {
    setState({
      ...defaultState,
      activities: [logActivity('update', 'Data', 'Reset to Defaults')]
    });
  }, []);

  return (
    <DataContext.Provider value={{
      data: state.data,
      activities: state.activities,
      updateProfile,
      updateAbout,
      addEducation,
      updateEducation,
      deleteEducation,
      reorderEducation,
      addAchievement,
      updateAchievement,
      deleteAchievement,
      addExperience,
      updateExperience,
      deleteExperience,
      reorderExperience,
      addProject,
      updateProject,
      deleteProject,
      addCertification,
      updateCertification,
      deleteCertification,
      updateContact,
      exportData,
      importData,
      resetToDefaults
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
