import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  FileText,
  Heart,
  Activity,
  Clock,
  Bell,
  ChevronRight,
  Pill,
  Stethoscope,
  Brain,
  Apple,
  Phone,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  BookOpen,
  MessageCircle
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  const upcomingAppointments = [
    { id: 1, type: 'General Checkup', doctor: 'Dr. Priya Sharma', date: 'Feb 25, 2024', time: '10:00 AM', location: 'Room 102' },
    { id: 2, type: 'Dental Checkup', doctor: 'Dr. Rajesh Kumar', date: 'Mar 5, 2024', time: '2:30 PM', location: 'Dental Wing' },
  ];

  const healthMetrics = [
    { label: 'BMI', value: '22.5', status: 'normal', unit: 'kg/m²' },
    { label: 'Blood Pressure', value: '120/80', status: 'normal', unit: 'mmHg' },
    { label: 'Heart Rate', value: '72', status: 'normal', unit: 'bpm' },
    { label: 'Last Checkup', value: '15 days ago', status: 'info', unit: '' },
  ];

  const quickServices = [
    { icon: Calendar, label: 'Book Appointment', color: 'primary', link: '/student/appointments' },
    { icon: FileText, label: 'Health Records', color: 'wellness', link: '/student/health-records' },
    { icon: MessageCircle, label: 'Counseling', color: 'purple', link: '/student/counseling' },
    { icon: Phone, label: 'Emergency', color: 'red', link: '/student/emergency' },
  ];

  const wellnessTips = [
    { icon: Brain, title: 'Mental Wellness', tip: 'Practice 10 minutes of meditation daily', color: 'purple' },
    { icon: Apple, title: 'Nutrition', tip: 'Stay hydrated - drink 8 glasses of water', color: 'green' },
    { icon: Activity, title: 'Physical Activity', tip: 'Take a 30-minute walk every day', color: 'blue' },
  ];

  const recentActivity = [
    { id: 1, action: 'Prescription renewed', details: 'Vitamin D supplements', date: 'Feb 20, 2024', icon: Pill },
    { id: 2, action: 'Lab results available', details: 'Blood work - All normal', date: 'Feb 18, 2024', icon: FileText },
    { id: 3, action: 'Appointment completed', details: 'General checkup with Dr. Priya Sharma', date: 'Feb 15, 2024', icon: CheckCircle },
  ];

  const notifications = [
    { id: 1, message: 'Your appointment is tomorrow at 10:00 AM', time: '2 hours ago', unread: true },
    { id: 2, message: 'Flu vaccination drive on Feb 28', time: '1 day ago', unread: true },
    { id: 3, message: 'Lab results are now available', time: '2 days ago', unread: false },
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: { bg: 'bg-primary-100', text: 'text-primary-600', icon: 'text-primary-500' },
      wellness: { bg: 'bg-wellness-100', text: 'text-wellness-600', icon: 'text-wellness-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-500' },
      red: { bg: 'bg-red-100', text: 'text-red-600', icon: 'text-red-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', icon: 'text-green-500' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', icon: 'text-blue-500' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-wellness-500 to-primary-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Student'}! 👋</h2>
            <p className="text-wellness-100">Your health is our priority. Stay healthy, stay happy!</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/student/appointments"
              className="px-4 py-2 bg-white text-wellness-600 rounded-lg font-medium hover:bg-wellness-50 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Services */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickServices.map((service, index) => {
          const colorClasses = getColorClasses(service.color);
          return (
            <Link
              key={index}
              to={service.link}
              className="card hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className={`p-3 rounded-xl ${colorClasses.bg} w-fit group-hover:scale-110 transition-transform`}>
                <service.icon className={`w-6 h-6 ${colorClasses.icon}`} />
              </div>
              <p className="mt-3 font-medium text-gray-900">{service.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
              <Link to="/student/appointments" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary-100 rounded-xl">
                        <Stethoscope className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.type}</p>
                        <p className="text-sm text-gray-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.date}</p>
                      <p className="text-sm text-gray-500">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>

          {/* Health Metrics */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Health Metrics</h3>
              <Link to="/student/health-records" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {healthMetrics.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-500">{metric.label}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                    metric.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {metric.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <activity.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.details}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Notifications & Wellness */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">2 new</span>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${notification.unread ? 'bg-primary-50 border-l-4 border-primary-500' : 'bg-gray-50'}`}
                >
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Tips */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wellness Tips</h3>
            <div className="space-y-3">
              {wellnessTips.map((tip, index) => {
                const colorClasses = getColorClasses(tip.color);
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                      <tip.icon className={`w-4 h-4 ${colorClasses.icon}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{tip.title}</p>
                      <p className="text-sm text-gray-500">{tip.tip}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card bg-red-50 border-red-200">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Emergency Contact</h3>
            </div>
            <p className="text-sm text-red-700 mb-3">For medical emergencies, contact:</p>
            <div className="space-y-2">
              <p className="font-medium text-red-900">Campus Health Center: +91 98765 43210</p>
              <p className="font-medium text-red-900">Emergency: 112</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;