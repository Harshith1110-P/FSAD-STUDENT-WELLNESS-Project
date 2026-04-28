import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authApi from '../api/authApi';
import { 
  Heart, 
  Mail, 
  Lock, 
  User, 
  BookOpen, 
  GraduationCap, 
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    studentId: '',
    course: '',
    year: '1'
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errors = { ...fieldErrors };

    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) errors.email = 'Email is required';
        else if (!emailRegex.test(value)) errors.email = 'Please enter a valid email address';
        else delete errors.email;
        break;
      case 'password':
        if (!value) errors.password = 'Password is required';
        else if (value.length < 6) errors.password = 'Password must be at least 6 characters';
        else delete errors.password;
        break;
      case 'name':
        if (!value) errors.name = 'Full name is required';
        else delete errors.name;
        break;
      case 'studentId':
        if (!value) errors.studentId = 'Student ID is required';
        else delete errors.studentId;
        break;
      default:
        break;
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Final validation check
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    if (!isValid || Object.keys(fieldErrors).length > 0) {
      setError('Please fix the errors before submitting.');
      return;
    }

    setLoading(true);

    try {
      const result = await authApi.register(formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              email: formData.email, 
              password: formData.password,
              message: 'Registration successful! Please sign in.' 
            } 
          });
        }, 2000);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration Error details:', err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center card p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">Your account has been created. Redirecting to login...</p>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 animate-progress" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-wellness-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-wellness-500 rounded-2xl shadow-lg mb-4 animate-float">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join the Wellness Hub</h1>
          <p className="text-gray-600 mt-2">Create your student health account</p>
        </div>

        {/* Back to Login */}
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Signup Card */}
        <div className="glass-card rounded-2xl p-8 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 ${fieldErrors.name ? 'border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="John Doe"
                  required
                />
              </div>
              {fieldErrors.name && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field pl-10 ${fieldErrors.email ? 'border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="john@university.edu"
                  required
                />
              </div>
              {fieldErrors.email && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{fieldErrors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className={`input-field pl-10 ${fieldErrors.studentId ? 'border-red-500 focus:ring-red-200' : ''}`}
                    placeholder="STU2024..."
                    required
                  />
                </div>
                {fieldErrors.studentId && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{fieldErrors.studentId}</p>}
              </div>
              {/* Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="input-field pl-10 appearance-none"
                    required
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="e.g. Computer Science"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`input-field pl-10 pr-10 ${fieldErrors.password ? 'border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>Create Account</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
