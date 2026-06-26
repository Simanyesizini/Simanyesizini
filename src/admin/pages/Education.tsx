import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, Award, BookOpen, Trophy, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Education as EducationType, Achievement } from '../types';

interface OutletContext {
  darkMode: boolean;
}

export default function EducationManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const {
    data,
    addEducation,
    updateEducation,
    deleteEducation,
    addAchievement,
    updateAchievement,
    deleteAchievement
  } = useData();
  const { showToast } = useToast();

  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteType, setDeleteType] = useState<'education' | 'achievement'>('education');
  const [deleteId, setDeleteId] = useState('');

  const [educationForm, setEducationForm] = useState({
    year: '',
    title: '',
    institution: '',
    description: ''
  });

  const [achievementForm, setAchievementForm] = useState({
    icon: 'Award',
    title: '',
    description: ''
  });

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const iconOptions = [
    { value: 'BookOpen', label: 'Book', icon: BookOpen },
    { value: 'Award', label: 'Award', icon: Award },
    { value: 'Trophy', label: 'Trophy', icon: Trophy },
    { value: 'Users', label: 'Users', icon: Users }
  ];

  const handleOpenEducationModal = (education?: EducationType) => {
    if (education) {
      setEditingEducation(education);
      setEducationForm({
        year: education.year,
        title: education.title,
        institution: education.institution,
        description: education.description
      });
    } else {
      setEditingEducation(null);
      setEducationForm({ year: '', title: '', institution: '', description: '' });
    }
    setShowEducationModal(true);
  };

  const handleSaveEducation = () => {
    if (!educationForm.year || !educationForm.title || !educationForm.institution) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingEducation) {
      updateEducation(editingEducation.id, educationForm);
      showToast('Education updated successfully', 'success');
    } else {
      addEducation(educationForm);
      showToast('Education added successfully', 'success');
    }
    setShowEducationModal(false);
  };

  const handleOpenAchievementModal = (achievement?: Achievement) => {
    if (achievement) {
      setEditingAchievement(achievement);
      setAchievementForm({
        icon: achievement.icon,
        title: achievement.title,
        description: achievement.description
      });
    } else {
      setEditingAchievement(null);
      setAchievementForm({ icon: 'Award', title: '', description: '' });
    }
    setShowAchievementModal(true);
  };

  const handleSaveAchievement = () => {
    if (!achievementForm.title || !achievementForm.description) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (editingAchievement) {
      updateAchievement(editingAchievement.id, achievementForm);
      showToast('Achievement updated successfully', 'success');
    } else {
      addAchievement(achievementForm);
      showToast('Achievement added successfully', 'success');
    }
    setShowAchievementModal(false);
  };

  const handleDelete = () => {
    if (deleteType === 'education') {
      deleteEducation(deleteId);
      showToast('Education deleted successfully', 'success');
    } else {
      deleteAchievement(deleteId);
      showToast('Achievement deleted successfully', 'success');
    }
    setShowDeleteDialog(false);
    setDeleteId('');
  };

  const confirmDelete = (type: 'education' | 'achievement', id: string) => {
    setDeleteType(type);
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(o => o.value === iconName);
    return option?.icon || Award;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Education & Achievements
          </h1>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Manage your educational background and achievements
          </p>
        </div>
      </div>

      {/* Education Section */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Education
          </h2>
          <button
            onClick={() => handleOpenEducationModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>

        <div className="space-y-4">
          {data.education.length === 0 ? (
            <div className={`text-center py-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              No education entries. Click "Add Education" to get started.
            </div>
          ) : (
            data.education.map((edu) => (
              <div
                key={edu.id}
                className={`p-4 rounded-lg flex items-start gap-4 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${darkMode ? 'bg-primary-900 text-primary-300' : 'bg-primary-100 text-primary-700'}`}>
                      {edu.year}
                    </span>
                  </div>
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {edu.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                    {edu.institution}
                  </p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {edu.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEducationModal(edu)}
                    className={`p-2 rounded-lg hover:bg-neutral-200 ${darkMode ? 'hover:bg-neutral-600 text-neutral-400' : 'text-neutral-500'}`}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete('education', edu.id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Achievements Section */}
      <div className={cardClasses}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Achievements
          </h2>
          <button
            onClick={() => handleOpenAchievementModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.achievements.length === 0 ? (
            <div className={`text-center py-8 col-span-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              No achievements. Click "Add Achievement" to get started.
            </div>
          ) : (
            data.achievements.map((ach) => {
              const IconComp = getIconComponent(ach.icon);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${darkMode ? 'bg-primary-900' : 'bg-primary-100'}`}>
                      <IconComp className={`w-6 h-6 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {ach.title}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {ach.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleOpenAchievementModal(ach)}
                        className={`p-2 rounded-lg hover:bg-neutral-200 ${darkMode ? 'hover:bg-neutral-600 text-neutral-400' : 'text-neutral-500'}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => confirmDelete('achievement', ach.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Education Modal */}
      <Modal
        isOpen={showEducationModal}
        onClose={() => setShowEducationModal(false)}
        title={editingEducation ? 'Edit Education' : 'Add Education'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Year *</label>
            <input
              type="text"
              value={educationForm.year}
              onChange={(e) => setEducationForm(prev => ({ ...prev, year: e.target.value }))}
              className={inputClasses}
              placeholder="e.g., 2025"
            />
          </div>
          <div>
            <label className={labelClasses}>Title *</label>
            <input
              type="text"
              value={educationForm.title}
              onChange={(e) => setEducationForm(prev => ({ ...prev, title: e.target.value }))}
              className={inputClasses}
              placeholder="e.g., Diploma in IT Support"
            />
          </div>
          <div>
            <label className={labelClasses}>Institution *</label>
            <input
              type="text"
              value={educationForm.institution}
              onChange={(e) => setEducationForm(prev => ({ ...prev, institution: e.target.value }))}
              className={inputClasses}
              placeholder="e.g., Nelson Mandela University"
            />
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              value={educationForm.description}
              onChange={(e) => setEducationForm(prev => ({ ...prev, description: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="Brief description of the program"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowEducationModal(false)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEducation}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Achievement Modal */}
      <Modal
        isOpen={showAchievementModal}
        onClose={() => setShowAchievementModal(false)}
        title={editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Icon</label>
            <select
              value={achievementForm.icon}
              onChange={(e) => setAchievementForm(prev => ({ ...prev, icon: e.target.value }))}
              className={inputClasses}
            >
              {iconOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClasses}>Title *</label>
            <input
              type="text"
              value={achievementForm.title}
              onChange={(e) => setAchievementForm(prev => ({ ...prev, title: e.target.value }))}
              className={inputClasses}
              placeholder="Achievement title"
            />
          </div>
          <div>
            <label className={labelClasses}>Description *</label>
            <textarea
              value={achievementForm.description}
              onChange={(e) => setAchievementForm(prev => ({ ...prev, description: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="Describe the achievement"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowAchievementModal(false)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAchievement}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title={`Delete ${deleteType === 'education' ? 'Education' : 'Achievement'}`}
        message={`Are you sure you want to delete this ${deleteType}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
