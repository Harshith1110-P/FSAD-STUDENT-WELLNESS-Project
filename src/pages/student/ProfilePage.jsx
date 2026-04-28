import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import authApi from '../../api/authApi';
import { 
  User, 
  Mail, 
  BookOpen, 
  Calendar, 
  Save, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Camera,
  Shield,
  CreditCard
} from 'lucide-react';

const ProfilePage = () => {
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    course: user?.course || '',
    year: user?.year || 1
  });

  const validateField = (name, value) => {
    let errors = { ...fieldErrors };
    if (name === 'name' && !value) errors.name = 'Name is required';
    else if (name === 'name') delete errors.name;
    
    if (name === 'course' && !value) errors.course = 'Course is required';
    else if (name === 'course') delete errors.course;
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Final check
    const isValid = ['name', 'course'].every(key => validateField(key, formData[key]));
    if (!isValid) {
      setError('Please fix the errors before saving.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await authApi.updateProfile(formData);
      if (response.success) {
        setSuccess('Profile updated successfully!');
        // Refresh local session
        const storedUser = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...storedUser, ...formData }));
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500">Manage your personal and academic information</p>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Badges */}
        <div className="space-y-6">
          <div className="card text-center p-8">
            <div className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer">
              <div className="w-full h-full rounded-full bg-wellness-100 flex items-center justify-center border-4 border-white shadow-md">
                <User className="w-16 h-16 text-wellness-600" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{user?.course || 'No course'}</p>
            <div className="flex justify-center gap-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">Student</span>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-wellness-500" />
              Account Security
            </h3>
            <p className="text-xs text-gray-500">Email: {user?.email}</p>
            <button className="btn-outline w-full text-sm">Change Password</button>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="card p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`input-field ${fieldErrors.name ? 'border-red-500 focus:ring-red-200' : ''}`}
                />
                {fieldErrors.name && <p className="text-xs text-red-500 mt-1 font-medium">{fieldErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" /> Student ID
                </label>
                <input
                  type="text"
                  value={formData.studentId}
                  disabled
                  className="input-field bg-gray-50 cursor-not-allowed opacity-70"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" /> Course/Major
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className={`input-field ${fieldErrors.course ? 'border-red-500 focus:ring-red-200' : ''}`}
                />
                {fieldErrors.course && <p className="text-xs text-red-500 mt-1 font-medium">{fieldErrors.course}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" /> Academic Year
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5].map(y => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 px-8"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
