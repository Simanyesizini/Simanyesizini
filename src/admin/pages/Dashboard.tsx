import { useOutletContext } from 'react-router-dom';
import {
  GraduationCap,
  Briefcase,
  Folder,
  Award,
  Clock,
  TrendingUp,
  Download
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface OutletContext {
  darkMode: boolean;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  darkMode: boolean;
}

function StatCard({ icon: Icon, label, value, color, darkMode }: StatCardProps) {
  return (
    <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>{label}</p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { data, activities, exportData } = useData();

  const stats = [
    { icon: GraduationCap, label: 'Education Entries', value: data.education.length, color: 'bg-blue-500' },
    { icon: Award, label: 'Achievements', value: data.achievements.length, color: 'bg-green-500' },
    { icon: Briefcase, label: 'Experience Entries', value: data.experience.length, color: 'bg-purple-500' },
    { icon: Folder, label: 'Projects', value: data.projects.length, color: 'bg-orange-500' },
    { icon: Award, label: 'Certifications', value: data.certifications.length, color: 'bg-teal-500' },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'text-green-600 bg-green-100';
      case 'update':
        return 'text-blue-600 bg-blue-100';
      case 'delete':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-neutral-600 bg-neutral-100';
    }
  };

  const handleExport = () => {
    const jsonData = exportData();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Dashboard
          </h1>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Overview of your portfolio content
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Backup
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            color={stat.color}
            darkMode={darkMode}
          />
        ))}
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Preview */}
        <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-100">
              <img
                src={data.profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.profile.name}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {data.profile.tagline}
              </p>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'} line-clamp-3`}>
            {data.profile.bio}
          </p>
        </div>

        {/* Quick Stats */}
        <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-xl p-6 shadow-sm border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
          <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Quick Overview
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Email</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.contact.email}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Phone</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.contact.phone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Location</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.contact.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className={`${darkMode ? 'bg-neutral-800' : 'bg-white'} rounded-xl shadow-sm border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}`}>
        <div className="p-6 border-b ${darkMode ? 'border-neutral-700' : 'border-neutral-200'}">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Recent Activity
            </h3>
          </div>
        </div>
        <div className="divide-y ${darkMode ? 'divide-neutral-700' : 'divide-neutral-200'}">
          {activities.length === 0 ? (
            <div className="p-6 text-center">
              <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-neutral-600' : 'text-neutral-300'}`} />
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                No recent activity. Start editing your content!
              </p>
            </div>
          ) : (
            activities.slice(0, 10).map((activity) => (
              <div key={activity.id} className="p-4 flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActionColor(activity.action)}`}>
                  {activity.action}
                </span>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {activity.section}: {activity.item}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {formatDate(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
