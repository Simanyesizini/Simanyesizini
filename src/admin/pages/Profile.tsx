import { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Upload,
  Save,
  Target,
  Eye
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../contexts/ToastContext';

interface OutletContext {
  darkMode: boolean;
}

export default function ProfileManagement() {
  const { darkMode } = useOutletContext<OutletContext>();
  const { data, updateProfile, updateAbout } = useData();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState(data.profile);
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image must be less than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      updateProfile({
        name: profile.name,
        tagline: profile.tagline,
        bio: profile.bio,
        photo: profile.photo,
        quote: profile.quote
      });
      showToast('Profile updated successfully', 'success');
    } catch {
      showToast('Failed to update profile', 'error');
    }
    setSaving(false);
  };

  const handleSaveAbout = async () => {
    setSaving(true);
    try {
      updateAbout(profile.about);
      showToast('About section updated successfully', 'success');
    } catch {
      showToast('Failed to update about section', 'error');
    }
    setSaving(false);
  };

  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${darkMode ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300 text-neutral-900'}`;
  const labelClasses = `block text-sm font-medium mb-2 ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`;
  const cardClasses = `${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'} rounded-xl shadow-sm border p-6`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Profile Settings
        </h1>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          Manage your profile information and photo
        </p>
      </div>

      {/* Photo Section */}
      <div className={cardClasses}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Profile Photo
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-primary-100 border-4 border-primary-200">
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors"
            >
              <Upload className="w-5 h-5 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Upload a professional photo. Recommended size: 400x400px.
              <br />
              Supported formats: JPG, PNG. Max size: 5MB.
            </p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className={cardClasses}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          Basic Information
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className={inputClasses}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className={labelClasses}>Tagline</label>
            <input
              type="text"
              value={profile.tagline}
              onChange={(e) => setProfile(prev => ({ ...prev, tagline: e.target.value }))}
              className={inputClasses}
              placeholder="Your professional title"
            />
          </div>
          <div>
            <label className={labelClasses}>Quote</label>
            <input
              type="text"
              value={profile.quote}
              onChange={(e) => setProfile(prev => ({ ...prev, quote: e.target.value }))}
              className={inputClasses}
              placeholder="A personal or professional quote"
            />
          </div>
          <div>
            <label className={labelClasses}>Short Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder="A brief introduction about yourself"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className={cardClasses}>
        <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
          About Section Details
        </h2>

        <div className="space-y-4">
          {/* Personal Background */}
          <div>
            <label className={labelClasses}>Personal Background</label>
            <textarea
              value={profile.about.personalBackground}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                about: { ...prev.about, personalBackground: e.target.value }
              }))}
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder="Your personal background and story"
            />
          </div>

          {/* Professional Background */}
          <div>
            <label className={labelClasses}>Professional Background</label>
            <textarea
              value={profile.about.professionalBackground}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                about: { ...prev.about, professionalBackground: e.target.value }
              }))}
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder="Your professional background and experience"
            />
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                <Eye className="w-4 h-4 inline mr-1" />
                Vision
              </label>
              <textarea
                value={profile.about.vision}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  about: { ...prev.about, vision: e.target.value }
                }))}
                className={`${inputClasses} resize-none`}
                rows={3}
                placeholder="Your professional vision"
              />
            </div>
            <div>
              <label className={labelClasses}>
                <Target className="w-4 h-4 inline mr-1" />
                Mission
              </label>
              <textarea
                value={profile.about.mission}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  about: { ...prev.about, mission: e.target.value }
                }))}
                className={`${inputClasses} resize-none`}
                rows={3}
                placeholder="Your professional mission"
              />
            </div>
          </div>

          {/* Career Goals */}
          <div>
            <label className={labelClasses}>Career Goals (one per line)</label>
            <textarea
              value={profile.about.careerGoals.join('\n')}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                about: { ...prev.about, careerGoals: e.target.value.split('\n').filter(g => g.trim()) }
              }))}
              className={`${inputClasses} resize-none`}
              rows={4}
              placeholder="Goal 1 - Description&#10;Goal 2 - Description&#10;Goal 3 - Description"
            />
          </div>

          {/* Professional Interests */}
          <div>
            <label className={labelClasses}>Professional Interests</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.about.interests.map((interest, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-neutral-700' : 'bg-neutral-50'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <select
                      value={interest.icon}
                      onChange={(e) => {
                        const newInterests = [...profile.about.interests];
                        newInterests[index] = { ...newInterests[index], icon: e.target.value };
                        setProfile(prev => ({
                          ...prev,
                          about: { ...prev.about, interests: newInterests }
                        }));
                      }}
                      className={`${inputClasses} py-1 text-sm`}
                    >
                      <option value="Briefcase">Briefcase</option>
                      <option value="Heart">Heart</option>
                      <option value="Target">Target</option>
                      <option value="Eye">Eye</option>
                      <option value="User">User</option>
                      <option value="Code">Code</option>
                      <option value="Server">Server</option>
                      <option value="Users">Users</option>
                    </select>
                    <input
                      type="text"
                      value={interest.title}
                      onChange={(e) => {
                        const newInterests = [...profile.about.interests];
                        newInterests[index] = { ...newInterests[index], title: e.target.value };
                        setProfile(prev => ({
                          ...prev,
                          about: { ...prev.about, interests: newInterests }
                        }));
                      }}
                      className={`${inputClasses} py-1 flex-1`}
                      placeholder="Title"
                    />
                  </div>
                  <input
                    type="text"
                    value={interest.desc}
                    onChange={(e) => {
                      const newInterests = [...profile.about.interests];
                      newInterests[index] = { ...newInterests[index], desc: e.target.value };
                      setProfile(prev => ({
                        ...prev,
                        about: { ...prev.about, interests: newInterests }
                      }));
                    }}
                    className={inputClasses}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setProfile(prev => ({
                  ...prev,
                  about: {
                    ...prev.about,
                    interests: [...prev.about.interests, { icon: 'Briefcase', title: '', desc: '' }]
                  }
                }));
              }}
              className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add Interest
            </button>
          </div>

          {/* Reflective Questions */}
          <div>
            <label className={labelClasses}>What motivates you?</label>
            <textarea
              value={profile.about.reflectiveMotivation}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                about: { ...prev.about, reflectiveMotivation: e.target.value }
              }))}
              className={`${inputClasses} resize-none`}
              rows={3}
            />
          </div>

          <div>
            <label className={labelClasses}>What impact do you want to make?</label>
            <textarea
              value={profile.about.reflectiveImpact}
              onChange={(e) => setProfile(prev => ({
                ...prev,
                about: { ...prev.about, reflectiveImpact: e.target.value }
              }))}
              className={`${inputClasses} resize-none`}
              rows={3}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveAbout}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save About Section'}
          </button>
        </div>
      </div>
    </div>
  );
}
