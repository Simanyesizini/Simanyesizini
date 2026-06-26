import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, Upload, Award, FileText } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';
import { Modal, ConfirmDialog } from '../components/Modal';
import { Certification } from '../types';

interface OutletContext {
  darkMode: boolean;
}

export default function CertificationsManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { data, addCertification, updateCertification, deleteCertification } = useData();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Certification | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    institution: '',
    year: '',
    type: '',
    description: '',
    hasCertificate: false,
    certificateUrl: ''
  });

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const handleOpenModal = (cert?: Certification) => {
    if (cert) {
      setEditing(cert);
      setForm({
        name: cert.name,
        institution: cert.institution,
        year: cert.year,
        type: cert.type,
        description: cert.description,
        hasCertificate: cert.hasCertificate,
        certificateUrl: cert.certificateUrl || ''
      });
    } else {
      setEditing(null);
      setForm({
        name: '',
        institution: '',
        year: '',
        type: '',
        description: '',
        hasCertificate: false,
        certificateUrl: ''
      });
    }
    setShowModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('File must be less than 10MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({
          ...prev,
          certificateUrl: reader.result as string,
          hasCertificate: true
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!form.name || !form.institution || !form.year || !form.type) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    const certData = {
      name: form.name,
      institution: form.institution,
      year: form.year,
      type: form.type,
      description: form.description,
      hasCertificate: form.hasCertificate,
      certificateUrl: form.certificateUrl || undefined
    };

    if (editing) {
      updateCertification(editing.id, certData);
      showToast('Certification updated successfully', 'success');
    } else {
      addCertification(certData);
      showToast('Certification added successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteCertification(deleteId);
    showToast('Certification deleted successfully', 'success');
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
            Certifications
          </h1>
          <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Manage your certifications and qualifications
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {/* Certifications List */}
      <div className={cardClasses}>
        <div className="space-y-4">
          {data.certifications.length === 0 ? (
            <div className={`text-center py-8 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              No certifications yet. Click "Add Certification" to get started.
            </div>
          ) : (
            data.certifications.map((cert) => (
              <div
                key={cert.id}
                className={`flex flex-col md:flex-row items-stretch gap-0 rounded-lg overflow-hidden ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}
              >
                {/* Type Badge */}
                <div className="bg-primary-600 text-white p-6 md:p-8 flex items-center justify-center text-center md:w-36">
                  <div className="flex flex-col items-center">
                    <Award className="w-8 h-8 mb-2" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {cert.type}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {cert.name}
                    </h3>
                    <div className={`flex flex-wrap items-center gap-3 mt-1 text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      <span>{cert.institution}</span>
                      <span>•</span>
                      <span>{cert.year}</span>
                    </div>
                    <p className={`text-sm mt-2 line-clamp-2 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {cert.description}
                    </p>
                    {cert.hasCertificate && (
                      <span className={`inline-flex items-center gap-1 mt-2 text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        <FileText className="w-3 h-3" />
                        Certificate available
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(cert)}
                      className={`p-2 rounded-lg hover:bg-neutral-200 ${darkMode ? 'hover:bg-neutral-600 text-neutral-400' : 'text-neutral-500'}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(cert.id)}
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

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={cardClasses}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.certifications.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Total Certifications
              </p>
            </div>
          </div>
        </div>

        <div className={cardClasses}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.certifications.filter(c => c.hasCertificate).length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                With Certificates
              </p>
            </div>
          </div>
        </div>

        <div className={cardClasses}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {data.certifications.filter(c => c.type === 'Diploma').length} Diplomas
              </p>
              <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                {data.certifications.filter(c => c.type === 'Certificate').length} Certificates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? 'Edit Certification' : 'Add Certification'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Diploma in IT Support"
              />
            </div>
            <div>
              <label className={labelClasses}>Institution *</label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) => setForm(prev => ({ ...prev, institution: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., Nelson Mandela University"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Year *</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm(prev => ({ ...prev, year: e.target.value }))}
                className={inputClasses}
                placeholder="e.g., 2025 or 2024 - Present"
              />
            </div>
            <div>
              <label className={labelClasses}>Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value }))}
                className={inputClasses}
              >
                <option value="">Select type</option>
                <option value="Diploma">Diploma</option>
                <option value="Certificate">Certificate</option>
                <option value="Professional Development">Professional Development</option>
                <option value="Course">Course</option>
                <option value="Training">Training</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={3}
              placeholder="Brief description of the certification"
            />
          </div>

          <div>
            <label className={`${labelClasses} flex items-center gap-2`}>
              <input
                type="checkbox"
                checked={form.hasCertificate}
                onChange={(e) => setForm(prev => ({ ...prev, hasCertificate: e.target.checked }))}
                className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              Has certificate/document
            </label>
          </div>

          {form.hasCertificate && (
            <div>
              <label className={labelClasses}>Certificate/Document</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-neutral-50"
                >
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,image/*"
                  className="hidden"
                />
                {form.certificateUrl && (
                  <span className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    File uploaded
                  </span>
                )}
              </div>
              <p className={`text-xs mt-1 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Supports PDF and images. Max size: 10MB
              </p>
            </div>
          )}

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
        title="Delete Certification"
        message="Are you sure you want to delete this certification? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
