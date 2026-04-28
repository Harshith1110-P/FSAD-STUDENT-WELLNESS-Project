import { useState } from 'react';
import {
  Users,
  Calendar,
  FileText,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  ArrowRight,
  Heart,
  Pill,
  Stethoscope,
  User
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      label: 'Total Students',
      value: '12,458',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'primary',
    },
    {
      label: 'Appointments Today',
      value: '48',
      change: '+8%',
      trend: 'up',
      icon: Calendar,
      color: 'wellness',
    },
    {
      label: 'Active Cases',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: Activity,
      color: 'orange',
    },
    {
      label: 'Pending Reviews',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: FileText,
      color: 'purple',
    },
  ];

  const recentAppointments = [
    { id: 1, student: 'Priya Patel', type: 'General Checkup', time: '09:00 AM', status: 'completed' },
    { id: 2, student: 'Arjun Singh', type: 'Sports Physical', time: '09:30 AM', status: 'in-progress' },
    { id: 3, student: 'Ananya Sharma', type: 'Mental Health', time: '10:00 AM', status: 'scheduled' },
    { id: 4, student: 'Rohan Gupta', type: 'Vaccination', time: '10:30 AM', status: 'scheduled' },
    { id: 5, student: 'Deepika Nair', type: 'Follow-up', time: '11:00 AM', status: 'scheduled' },
  ];

  const healthAlerts = [
    { id: 1, type: 'Flu Cases', count: 23, trend: 'up', severity: 'warning' },
    { id: 2, type: 'Mental Health Referrals', count: 15, trend: 'up', severity: 'info' },
    { id: 3, type: 'COVID-19 Cases', count: 2, trend: 'down', severity: 'success' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Flu Vaccination Drive', date: 'Feb 28, 2024', time: '9:00 AM - 4:00 PM', attendees: 245 },
    { id: 2, title: 'Mental Health Workshop', date: 'Mar 5, 2024', time: '2:00 PM - 5:00 PM', attendees: 78 },
    { id: 3, title: 'Blood Donation Camp', date: 'Mar 12, 2024', time: '10:00 AM - 3:00 PM', attendees: 120 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: { bg: 'bg-primary-100', text: 'text-primary-600', icon: 'text-primary-500' },
      wellness: { bg: 'bg-wellness-100', text: 'text-wellness-600', icon: 'text-wellness-500' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', icon: 'text-orange-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', icon: 'text-purple-500' },
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-wellness-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Johnson!</h2>
            <p className="text-primary-100">Here's what's happening at the Health Center today.</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">48</p>
              <p className="text-sm text-primary-100">Appointments</p>
            </div>
            <div className="w-px h-12 bg-white/30" />
            <div className="text-center">
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-primary-100">Urgent Cases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);
          return (
            <div key={index} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${colorClasses.bg}`}>
                  <stat.icon className={`w-6 h-6 ${colorClasses.icon}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-wellness-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-wellness-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.student}</p>
                    <p className="text-sm text-gray-500">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{appointment.time}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Health Alerts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Alerts</h3>
            <div className="space-y-3">
              {healthAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      alert.severity === 'warning' ? 'bg-yellow-100' :
                      alert.severity === 'success' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.severity === 'warning' ? 'text-yellow-600' :
                        alert.severity === 'success' ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{alert.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">{alert.count}</span>
                    {alert.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <Stethoscope className="w-6 h-6 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">New Consultation</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-wellness-50 rounded-lg hover:bg-wellness-100 transition-colors">
                <Pill className="w-6 h-6 text-wellness-600" />
                <span className="text-sm font-medium text-wellness-700">Prescribe</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <FileText className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">Records</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Heart className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Wellness</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View Calendar <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-1">{event.date}</p>
              <p className="text-sm text-gray-500 mb-3">{event.time}</p>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{event.attendees} registered</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;