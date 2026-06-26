// Admin contexts
export { AuthProvider, useAuth } from './contexts/AuthContext';
export { DataProvider, useData } from './contexts/DataContext';
export { ToastProvider, useToast } from './contexts/ToastContext';

// Types
export type {
  Profile,
  Education,
  Achievement,
  Experience,
  Project,
  Certification,
  Contact,
  AdminSettings,
  PortfolioData,
  ActivityLog,
  AppState
} from './types';

// Components
export { Modal, ConfirmDialog } from './components/Modal';
export { ProtectedRoute, SessionExpired } from './components/ProtectedRoute';

// Default data
export { defaultData, defaultState, STORAGE_KEY, SESSION_KEY } from './data/defaults';
