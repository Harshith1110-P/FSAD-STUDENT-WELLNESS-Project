import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './components/layouts/AdminLayout';
import StudentLayout from './components/layouts/StudentLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentsPage from './pages/admin/StudentsPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AppointmentsPage from './pages/student/AppointmentsPage';
import WellnessPage from './pages/student/WellnessPage';
import HealthRecordsPage from './pages/student/HealthRecordsPage';

// Placeholder pages for routes not yet implemented
const PlaceholderPage = ({ title }) => (
  <div className="card">
    <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
    <p className="text-gray-500">This page is under construction.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="appointments" element={<PlaceholderPage title="Appointments Management" />} />
            <Route path="health-records" element={<PlaceholderPage title="Health Records Management" />} />
            <Route path="medications" element={<PlaceholderPage title="Medications Management" />} />
            <Route path="wellness" element={<PlaceholderPage title="Wellness Programs" />} />
            <Route path="reports" element={<PlaceholderPage title="Reports & Analytics" />} />
            <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          </Route>
          
          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="health-records" element={<HealthRecordsPage />} />
            <Route path="wellness" element={<WellnessPage />} />
            <Route path="resources" element={<PlaceholderPage title="Health Resources" />} />
            <Route path="counseling" element={<PlaceholderPage title="Counseling Services" />} />
            <Route path="emergency" element={<PlaceholderPage title="Emergency Contacts" />} />
            <Route path="profile" element={<PlaceholderPage title="My Profile" />} />
          </Route>
          
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
