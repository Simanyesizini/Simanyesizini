import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Key, Download, Upload, Shield, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { ConfirmDialog } from '../components/Modal';

interface OutletContext {
  darkMode: boolean;
}

export default function Settings() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { updateAccessCode } = useAuth();
  const { exportData, importData, resetToDefaults } = useData();
  const { showToast } = useToast();

  const [showChangeCode, setShowChangeCode] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [newCode, setNewCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [, setConfirmAction] = useState<'reset' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const handleChangeCode = () => {
    if (!currentCode || !newCode || !confirmCode) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (newCode !== confirmCode) {
      showToast('New codes do not match', 'error');
      return;
    }

    if (newCode.length < 6) {
      showToast('Access code must be at least 6 characters', 'error');
      return;
    }

    const result = updateAccessCode(currentCode, newCode);
    if (result.success) {
      showToast('Access code updated successfully', 'success');
      setCurrentCode('');
      setNewCode('');
      setConfirmCode('');
      setShowChangeCode(false);
    } else {
      showToast(result.error || 'Failed to update access code', 'error');
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
    showToast('Data exported successfully', 'success');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importData(content)) {
        showToast('Data imported successfully', 'success');
      } else {
        showToast('Failed to import data. Invalid format.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    resetToDefaults();
    showToast('Data reset to defaults', 'success');
    setShowConfirmation(false);
    setConfirmAction(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Settings
        </h1>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Manage access code and backup your data
        </p>
      </div>

      {/* Access Code Management */}
      <div className={cardClasses}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Access Code
            </h2>
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Change your admin access code
            </p>
          </div>
        </div>

        {!showChangeCode ? (
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
                <span className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Access code is set and active
                </span>
              </div>
              <button
                onClick={() => setShowChangeCode(true)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Change Code
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg flex items-start gap-2 ${darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-50 text-yellow-700'}`}>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Warning</p>
                <p>Changing the access code will require you to use the new code for future logins.</p>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Current Access Code</label>
              <input
                type="password"
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                className={inputClasses}
                placeholder="Enter current code"
              />
            </div>

            <div>
              <label className={labelClasses}>New Access Code</label>
              <input
                type="password"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className={inputClasses}
                placeholder="Enter new code (min 6 characters)"
              />
            </div>

            <div>
              <label className={labelClasses}>Confirm New Access Code</label>
              <input
                type="password"
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
                className={inputClasses}
                placeholder="Confirm new code"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowChangeCode(false)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleChangeCode}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                <Check className="w-4 h-4" />
                Update Code
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backup & Restore */}
      <div className={cardClasses}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Download className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Backup & Restore
            </h2>
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Export or import your portfolio data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Export Data
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Download all your portfolio data as a JSON backup file.
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Export Backup
            </button>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
            <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              Import Data
            </h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Restore from a previous backup file.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Upload className="w-4 h-4" />
              Import Backup
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className={`${cardClasses} border-red-200`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className={`font-semibold text-red-600`}>
              Danger Zone
            </h2>
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Irreversible actions
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'}`}>
          <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Reset to Defaults
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            This will reset all your portfolio content to the default values. This action cannot be undone.
          </p>
          <button
            onClick={() => {
              setConfirmAction('reset');
              setShowConfirmation(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-4 h-4" />
            Reset All Data
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmation}
        onClose={() => {
          setShowConfirmation(false);
          setConfirmAction(null);
        }}
        onConfirm={handleReset}
        title="Reset All Data"
        message="Are you sure you want to reset all portfolio data to defaults? This will delete all your custom content and cannot be undone."
        confirmText="Yes, Reset Everything"
        variant="danger"
      />
    </div>
  );
}
