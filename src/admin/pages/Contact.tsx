import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, Phone, Linkedin, Github, Twitter, MapPin, Save } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

interface OutletContext {
  darkMode: boolean;
}

export default function ContactManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { data, updateContact } = useData();
  const { showToast } = useToast();

  const [form, setForm] = useState(data.contact);
  const [saving, setSaving] = useState(false);

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  const handleSave = async () => {
    setSaving(true);
    try {
      updateContact(form);
      showToast('Contact information updated successfully', 'success');
    } catch {
      showToast('Failed to update contact information', 'error');
    }
    setSaving(false);
  };

  const contactFields = [
    { key: 'email', icon: Mail, label: 'Email Address', placeholder: 'your.email@example.com', type: 'email' },
    { key: 'phone', icon: Phone, label: 'Phone Number', placeholder: '+27 XX XXX XXXX', type: 'tel' },
    { key: 'linkedinUrl', icon: Linkedin, label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/yourprofile', type: 'url' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn Display Name', placeholder: 'Your Name', type: 'text' },
    { key: 'github', icon: Github, label: 'GitHub URL', placeholder: 'https://github.com/yourusername', type: 'url' },
    { key: 'twitter', icon: Twitter, label: 'Twitter Handle', placeholder: '@yourhandle', type: 'text' },
    { key: 'location', icon: MapPin, label: 'Location', placeholder: 'City, Country', type: 'text' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Contact Information
        </h1>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Manage your contact details and social links
        </p>
      </div>

      {/* Contact Fields */}
      <div className={cardClasses}>
        <div className="space-y-6">
          {contactFields.map((field) => (
            <div key={field.key} className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-neutral-700' : 'bg-neutral-100'}`}>
                <field.icon className={`w-5 h-5 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`} />
              </div>
              <div className="flex-1">
                <label className={labelClasses}>{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form] || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className={inputClasses}
                  placeholder={field.placeholder}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className={cardClasses}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Contact Preview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {form.email && (
            <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
              <Mail className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Email</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{form.email}</p>
            </div>
          )}
          {form.phone && (
            <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
              <Phone className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>Phone</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{form.phone}</p>
            </div>
          )}
          {form.linkedin && (
            <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
              <Linkedin className={`w-6 h-6 mx-auto mb-2 ${darkMode ? 'text-primary-400' : 'text-primary-600'}`} />
              <p className={`text-xs ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>LinkedIn</p>
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{form.linkedin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
