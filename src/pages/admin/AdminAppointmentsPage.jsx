import { useState } from 'react';
import { Calendar, Search, Filter, Clock, MoreVertical, Plus, User, Stethoscope } from 'lucide-react';

const AdminAppointmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const appointments = [
    { id: 1, student: 'Priya Patel', doctor: 'Dr. Johnson', date: 'Feb 25, 2024', time: '10:00 AM', type: 'General Checkup', status: 'scheduled' },
    { id: 2, student: 'Arjun Singh', doctor: 'Dr. Sharma', date: 'Feb 25, 2024', time: '11:30 AM', type: 'Dental', status: 'completed' },
    { id: 3, student: 'Rohan Gupta', doctor: 'Dr. Lee', date: 'Feb 26, 2024', time: '09:00 AM', type: 'Vaccination', status: 'scheduled' },
    { id: 4, student: 'Ananya Sharma', doctor: 'Dr. Johnson', date: 'Feb 26, 2024', time: '02:00 PM', type: 'Mental Health', status: 'cancelled' },
    { id: 5, student: 'Deepika Nair', doctor: 'Dr. Sharma', date: 'Feb 27, 2024', time: '10:15 AM', type: 'Follow Up', status: 'scheduled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.student.toLowerCase().includes(searchQuery.toLowerCase()) || 
    apt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500">Manage all clinic scheduling</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Appointment
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button className="btn-outline flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor & Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <p className="font-medium text-gray-900">{apt.student}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-900">{apt.doctor}</p>
                        <p className="text-sm text-gray-500">{apt.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{apt.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <p className="text-sm text-gray-500">{apt.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><MoreVertical className="w-4 h-4 text-gray-500" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;
