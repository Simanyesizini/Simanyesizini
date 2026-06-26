import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, Upload, Image } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Project } from '../types';

interface OutletContext {
  darkMode: boolean;
}

export default function ProjectsManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { data, addProject, updateProject, deleteProject } = useData();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: '',
    type: '',
    role: '',
    overview: '',
    tags: '',
    outcome: '',
    status: 'Completed',
    image: ''
  });

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditing(project);
      setForm({
        title: project.title,
        type: project.type,
        role: project.role,
        overview: project.overview,
        tags: project.tags.join(', '),
        outcome: project.outcome,
        status: project.status,
        image: project.image || ''
      });
    } else {
      setEditing(null);
      setForm({
        title: '',
        type: '',
        role: '',
        overview: '',
        tags: '',
        outcome: '',
        status: 'Completed',
        image: ''
      });
    }
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image must be less than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!form.title || !form.type || !form.role) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const projectData = {
      title: form.title,
      type: form.type,
      role: form.role,
      overview: form.overview,
      tags: form.tags.split(',').map(t => t.trim()).filter(t => t),
      outcome: form.outcome,
      status: form.status,
      image: form.image
    };

    if (editing) {
      updateProject(editing.id, projectData);
      showToast('Project updated successfully', 'success');
    } else {
      addProject(projectData);
      showToast('Project added successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteProject(deleteId);
    showToast('Project deleted successfully', 'success');
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
            Projects
          </h1>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Manage your portfolio projects
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {/* Projects Grid */}
      <div className={cardClasses}>
        {data.projects.length === 0 ? (
          <div className={`text-center py-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            No projects yet. Click "Add Project" to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg overflow-hidden ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-medium opacity-80">{project.type}</span>
                      <h3 className="font-semibold">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${project.status === 'Completed' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                      <span className="text-xs">{project.status}</span>
                    </div>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-4">
                  {project.image && (
                    <div className="mb-4 rounded-lg overflow-hidden h-32 bg-neutral-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-600'} mb-3 line-clamp-2`}>
                    {project.overview}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-neutral-600 text-neutral-300' : 'bg-neutral-200 text-neutral-700'}`}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className={`px-2 py-1 text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className={`p-2 rounded-lg hover:bg-neutral-200 ${darkMode ? 'hover:bg-neutral-600 text-neutral-400' : 'text-neutral-500'}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(project.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Edit Project' : 'Add Project'}
        size="lg"
      >
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className={labelClasses}>Project Image</label>
            <div className="flex items-start gap-4">
              {form.image ? (
                <div className="w-32 h-24 rounded-lg overflow-hidden bg-neutral-100">
                  <img
                    src={form.image}
                    alt="Project preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-32 h-24 rounded-lg flex items-center justify-center ${darkMode ? 'bg-neutral-600' : 'bg-neutral-100'}`}>
                  <Image className={`w-8 h-8 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`} />
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-neutral-50"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                className={inputClasses}
                placeholder="Project title"
              />
            </div>
            <div>
              <label className={labelClasses}>Type *</label>
              <input
                type="text"
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Web Application, Mobile App"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Role *</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm(prev => ({ ...prev, role: e.target.value }))}
                className={inputClasses}
                placeholder="Your role in the project"
              />
            </div>
            <div>
              <label className={labelClasses}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                className={inputClasses}
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Planned">Planned</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Overview</label>
            <textarea
              value={form.overview}
              onChange={(e) => setForm(prev => ({ ...prev, overview: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="Brief description of the project"
            />
          </div>

          <div>
            <label className={labelClasses}>Technologies/Tags (comma-separated)</label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
              className={inputClasses}
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div>
            <label className={labelClasses}>Outcome & Impact</label>
            <textarea
              value={form.outcome}
              onChange={(e) => setForm(prev => ({ ...prev, outcome: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="What was achieved and the impact"
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
