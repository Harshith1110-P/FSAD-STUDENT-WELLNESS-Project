import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import adminApi from '../../api/adminApi';
import {
  ArrowLeft,
  Save,
  User,
  FileText,
  Stethoscope,
  Activity,
  AlertCircle,
  Clock,
  CheckCircle2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const AddRecordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    type: 'General Checkup',
    title: '',
    date: new Date().toISOString().split('T')[0],
    doctor: 'Dr. Johnson',
    status: 'completed',
    summary: '',
    conditions: '',
    notes: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await adminApi.getAllStudents();
        setStudents(data);
      } catch (err) {
        console.error('Failed to fetch students:', err);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      // If studentId changes, find and set the studentName automatically
      if (name === 'studentId') {
        const student = students.find(s => s.studentId === value);
        if (student) {
          newData.studentName = student.name;
        }
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.createHealthRecord(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      alert('Error creating record: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Consultation</h1>
            <p className="text-sm text-gray-500">Create a new student health record</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5" />
          <p className="font-medium">Record saved successfully! Redirecting...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Student Selection Section */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
            <User className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg font-semibold text-gray-900">Student Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Student</label>
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.studentId}>
                    {student.name} ({student.studentId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                readOnly
                className="input-field bg-gray-50 cursor-not-allowed"
                placeholder="Select student above..."
              />
            </div>
          </div>
        </div>

        {/* Record Details Section */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
            <FileText className="w-5 h-5 text-wellness-500" />
            <h3 className="text-lg font-semibold text-gray-900">Consultation Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="General Checkup">General Checkup</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Sports Physical">Sports Physical</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Emergency">Emergency</option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Record Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g. Seasonal Flu Consultation"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor/Specialist</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="input-field"
                placeholder="Dr. Name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="completed">Completed</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Notes Section */}
        <div className="card">
          <div className="flex items-center gap-2 mb-6 pb-2 border-b border-gray-100">
            <Stethoscope className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">Clinical Observations</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Primary complaint and clinical findings..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Conditions Detected</label>
                <input
                  type="text"
                  name="conditions"
                  value={formData.conditions}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Mild Hypertension, Common Cold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="e.g. Required follow-up in 2 weeks"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pb-12">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-xl hover:bg-primary-700 transition-all flex items-center gap-2 shadow-lg shadow-primary-200 disabled:opacity-50 disabled:scale-95"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Health Record
          </button>
        </div>
      </form>
    </div>
  );
};

// Simple loader icon since lucide-react name is different or missing
const Loader2 = ({ className }) => (
  <Activity className={className} />
);

export default AddRecordPage;
