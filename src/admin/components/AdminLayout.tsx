import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  GraduationCap,
  Briefcase,
  Folder,
  Award,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/profile', icon: User, label: 'Profile' },
  { to: '/admin/education', icon: GraduationCap, label: 'Education' },
  { to: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { to: '/admin/projects', icon: Folder, label: 'Projects' },
  { to: '/admin/certifications', icon: Award, label: 'Certifications' },
  { to: '/admin/contact', icon: Mail, label: 'Contact' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' }
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useAuth();
  const { data } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-neutral-800' : 'bg-white'} border-r ${darkMode ? 'border-neutral-700' : 'border-neutral-200'} shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-100">
                <img
                  src={data.profile.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  Admin Panel
                </h1>
                <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {data.profile.name.split(' ')[0]}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                  ? 'bg-primary-600 text-white'
                  : darkMode
                    ? 'text-neutral-300 hover:bg-neutral-700'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${darkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${darkMode ? 'text-neutral-300 hover:bg-neutral-700' : 'text-neutral-600 hover:bg-neutral-100'}`}
          >
            <ExternalLink className="w-5 h-5" />
            <span className="font-medium">View Site</span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className={`sticky top-0 z-30 ${darkMode ? 'bg-neutral-800' : 'bg-white'} border-b ${darkMode ? 'border-neutral-700' : 'border-neutral-200'} px-4 py-4`}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className={`flex-1 lg:hidden text-center ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              <span className="font-semibold">Admin Panel</span>
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-sm ${darkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </a>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet context={{ darkMode }} />
        </main>
      </div>
    </div>
  );
}
