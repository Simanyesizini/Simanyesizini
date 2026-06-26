import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData } from '../admin/types';
import { defaultData, STORAGE_KEY } from '../admin/data/defaults';

interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.data) {
          setData({
            ...defaultData,
            ...parsed.data,
            profile: { ...defaultData.profile, ...parsed.data.profile },
            about: { ...defaultData.profile.about, ...parsed.data.profile?.about }
          });
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio data:', e);
    }
    setLoading(false);

    // Listen for storage changes (from admin panel)
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.data) {
            setData({
              ...defaultData,
              ...parsed.data,
              profile: { ...defaultData.profile, ...parsed.data.profile }
            });
          }
        }
      } catch (e) {
        console.error('Failed to sync portfolio data:', e);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab updates
    const handleCustomUpdate = () => {
      handleStorageChange();
    };
    window.addEventListener('portfolioUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('portfolioUpdated', handleCustomUpdate);
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
