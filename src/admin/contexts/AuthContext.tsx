import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SESSION_KEY, ATTEMPTS_KEY, STORAGE_KEY, defaultState } from '../data/defaults';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (code: string) => { success: boolean; error?: string; cooldown?: number };
  logout: () => void;
  updateAccessCode: (currentCode: string, newCode: string) => { success: boolean; error?: string };
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

interface LoginAttempt {
  count: number;
  lockedUntil: number;
}

function getStoredAttempts(): LoginAttempt {
  try {
    const stored = localStorage.getItem(ATTEMPTS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore
  }
  return { count: 0, lockedUntil: 0 };
}

function setStoredAttempts(attempts: LoginAttempt) {
  localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
}

function getAccessCode(): string {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.admin?.accessCodeHash) {
        return atob(parsed.admin.accessCodeHash);
      }
    }
  } catch {
    // ignore
  }
  return 'Simanye2026';
}

interface Session {
  expires: number;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const session: Session = JSON.parse(stored);
        if (session.expires > Date.now()) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check session expiry every 30 seconds
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
          const session: Session = JSON.parse(stored);
          if (session.expires <= Date.now()) {
            logout();
          }
        }
      } catch {
        logout();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const login = useCallback((code: string): { success: boolean; error?: string; cooldown?: number } => {
    const attempts = getStoredAttempts();

    // Check if locked out
    if (attempts.lockedUntil > Date.now()) {
      const remaining = Math.ceil((attempts.lockedUntil - Date.now()) / 1000);
      return {
        success: false,
        error: 'Too many failed attempts. Please wait.',
        cooldown: remaining
      };
    }

    // Reset attempts if lockout has expired
    if (attempts.lockedUntil > 0 && attempts.lockedUntil <= Date.now()) {
      attempts.count = 0;
      attempts.lockedUntil = 0;
    }

    const correctCode = getAccessCode();

    if (code === correctCode) {
      // Reset attempts on successful login
      setStoredAttempts({ count: 0, lockedUntil: 0 });

      // Create session
      const session: Session = {
        expires: Date.now() + SESSION_DURATION
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      return { success: true };
    } else {
      // Increment attempts
      attempts.count += 1;

      if (attempts.count >= 3) {
        attempts.lockedUntil = Date.now() + 30000; // 30 second cooldown
        setStoredAttempts(attempts);
        return {
          success: false,
          error: 'Too many failed attempts. Please wait 30 seconds.',
          cooldown: 30
        };
      }

      setStoredAttempts(attempts);
      return {
        success: false,
        error: `Invalid access code. Please try again. (${3 - attempts.count} attempts remaining)`
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  }, []);

  const updateAccessCode = useCallback((currentCode: string, newCode: string): { success: boolean; error?: string } => {
    const correctCode = getAccessCode();

    if (currentCode !== correctCode) {
      return { success: false, error: 'Current access code is incorrect.' };
    }

    if (newCode.length < 6) {
      return { success: false, error: 'New access code must be at least 6 characters.' };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let data = defaultState;
      if (stored) {
        data = { ...defaultState, ...JSON.parse(stored) };
      }
      data.admin = {
        accessCodeHash: btoa(newCode),
        lastCodeChange: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to update access code.' };
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      updateAccessCode,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
