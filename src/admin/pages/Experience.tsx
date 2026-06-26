import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Experience as ExperienceType } from '../types';

interface OutletContext {
  darkMode: boolean;
}

export default function ExperienceManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const {
    data,
    addExperience,
    updateExperience,
    deleteExperience
  } = useData();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ExperienceType | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [form, setForm] = useState({
    title: '',
    organization: '',
    period: '',
    type: '',
    description: '',
    highlights: ''
  });

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const handleOpenModal = (experience?: ExperienceType) => {
    if (experience) {
      setEditing(experience);
      setForm({
        title: experience.title,
        organization: experience.organization,
        period: experience.period,
        type: experience.type,
        description: experience.description,
        highlights: experience.highlights.join('\n')
      });
    } else {
      setEditing(null);
      setForm({
        title: '',
        organization: '',
        period: '',
        type: '',
        description: '',
        highlights: ''
      });
    }
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title || !form.organization || !form.period) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const experienceData = {
      title: form.title,
      organization: form.organization,
      period: form.period,
      type: form.type,
      description: form.description,
      highlights: form.highlights.split('\n').filter(h => h.trim())
    };

    if (editing) {
      updateExperience(editing.id, experienceData);
      showToast('Experience updated successfully', 'success');
    } else {
      addExperience(experienceData);
      showToast('Experience added successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteExperience(deleteId);
    showToast('Experience deleted successfully', 'success');
    setShowDeleteDialog(false);
    setDeleteId('');
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Work Experience
          </h1>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Manage your work experience and training
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {/* Experience List */}
      <div className={cardClasses}>
        <div className="space-y-4">
          {data.experience.length === 0 ? (
            <div className={`text-center py-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              No experience entries. Click "Add Experience" to get started.
            </div>
          ) : (
            data.experience.map((exp) => (
              <div
                key={exp.id}
                className={`p-4 rounded-lg border-l-4 border-primary-500 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {exp.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${darkMode ? 'bg-primary-900 text-primary-300' : 'bg-primary-100 text-primary-700'}`}>
                        {exp.period}
                      </span>
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-primary-400' : 'text-primary-600'}`}>
                      {exp.organization} {exp.type && `• ${exp.type}`}
                    </p>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {exp.description}
                    </p>
                    {exp.highlights.length > 0 && (
                      <ul className={`mt-3 space-y-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(exp)}
                      className={`p-2 rounded-lg hover:bg-neutral-200 ${darkMode ? 'hover:bg-neutral-600 text-neutral-400' : 'text-neutral-500'}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(exp.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Edit Experience' : 'Add Experience'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Job Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., IT Support Technician"
              />
            </div>
            <div>
              <label className={labelClasses}>Organization *</label>
              <input
                type="text"
                value={form.organization}
                onChange={(e) => setForm(prev => ({ ...prev, organization: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Company Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Period *</label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm(prev => ({ ...prev, period: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Jan 2024 - Present"
              />
            </div>
            <div>
              <label className={labelClasses}>Type</label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Full-time, Internship"
              />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="Brief description of your role and responsibilities"
            />
          </div>

          <div>
            <label className={labelClasses}>Key Highlights (one per line)</label>
            <textarea
              value={form.highlights}
              onChange={(e) => setForm(prev => ({ ...prev, highlights: e.target.value }))}
              className={`${inputClasses} resize-none font-mono`}
              rows={4}
              placeholder="Developed practical technical support skills&#10;Gained exposure to real IT systems&#10;Built workplace readiness"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-neutral-600 text-white' : 'bg-neutral-200 text-neutral-700'}`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
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
        title="Delete Experience"
        message="Are you sure you want to delete this experience entry? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
