import { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Search,
  ChevronDown,
  Eye,
  Share2,
  Calendar,
  Pill,
  Activity,
  Droplets,
  Heart,
  ClipboardList,
  Lock
} from 'lucide-react';

const HealthRecordsPage = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const recordTypes = [
    { id: 'all', label: 'All Records' },
    { id: 'lab', label: 'Lab Results' },
    { id: 'prescription', label: 'Prescriptions' },
    { id: 'visit', label: 'Visit Notes' },
    { id: 'immunization', label: 'Immunizations' },
  ];

  const healthRecords = [
    {
      id: 1,
      type: 'lab',
      title: 'Complete Blood Count (CBC)',
      date: 'Feb 18, 2024',
      doctor: 'Dr. Sarah Johnson',
      status: 'normal',
      summary: 'All values within normal range',
      details: {
        hemoglobin: '14.2 g/dL',
        wbc: '7,500 /μL',
        rbc: '4.8 million/μL',
        platelets: '250,000 /μL',
      }
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Vitamin D Supplement',
      date: 'Feb 15, 2024',
      doctor: 'Dr. Sarah Johnson',
      status: 'active',
      summary: 'Once daily with food',
      details: {
        medication: 'Vitamin D3 1000 IU',
        dosage: '1 tablet daily',
        duration: '3 months',
        refills: 2,
      }
    },
    {
      id: 3,
      type: 'visit',
      title: 'General Checkup',
      date: 'Feb 15, 2024',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      summary: 'Routine examination - all vitals normal',
      details: {
        bloodPressure: '120/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6°F',
        weight: '70 kg',
        height: '175 cm',
        bmi: '22.9',
      }
    },
    {
      id: 4,
      type: 'immunization',
      title: 'Flu Vaccination',
      date: 'Dec 10, 2023',
      doctor: 'Dr. Robert Kim',
      status: 'completed',
      summary: 'Annual influenza vaccine administered',
      details: {
        vaccine: 'Influenza (Flu) Vaccine',
        lotNumber: 'FL2023-4521',
        site: 'Left Deltoid',
        nextDose: 'N/A',
      }
    },
    {
      id: 5,
      type: 'lab',
      title: 'Lipid Panel',
      date: 'Jan 20, 2024',
      doctor: 'Dr. Sarah Johnson',
      status: 'normal',
      summary: 'Cholesterol levels within healthy range',
      details: {
        totalCholesterol: '180 mg/dL',
        ldl: '95 mg/dL',
        hdl: '55 mg/dL',
        triglycerides: '120 mg/dL',
      }
    },
  ];

  const vitalHistory = [
    { date: 'Feb 15', bp: '120/80', hr: '72', temp: '98.6', weight: '70' },
    { date: 'Jan 15', bp: '118/78', hr: '70', temp: '98.4', weight: '71' },
    { date: 'Dec 10', bp: '122/82', hr: '74', temp: '98.6', weight: '70.5' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700';
      case 'active':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'attention':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lab':
        return Activity;
      case 'prescription':
        return Pill;
      case 'visit':
        return ClipboardList;
      case 'immunization':
        return Droplets;
      default:
        return FileText;
    }
  };

  const filteredRecords = healthRecords.filter(record => {
    const matchesFilter = filterType === 'all' || record.type === filterType;
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-500">View and manage your medical records</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-outline flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Records
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-primary-600 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-primary-900">Your records are private and secure</p>
          <p className="text-sm text-primary-700">Only you and authorized healthcare providers can access your health information.</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {recordTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filterType === type.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Records List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredRecords.map((record) => {
            const TypeIcon = getTypeIcon(record.type);
            return (
              <div
                key={record.id}
                className={`card cursor-pointer transition-all ${
                  selectedRecord?.id === record.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedRecord(record)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-xl">
                      <TypeIcon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.title}</h3>
                      <p className="text-sm text-gray-500">{record.doctor}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{record.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{record.summary}</p>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Record Details */}
          {selectedRecord && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Record Details</h3>
              <div className="space-y-3">
                {Object.entries(selectedRecord.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 btn-primary flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          )}

          {/* Vital History */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Vitals</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="pb-2 text-left font-medium">Date</th>
                    <th className="pb-2 text-center font-medium">BP</th>
                    <th className="pb-2 text-center font-medium">HR</th>
                    <th className="pb-2 text-center font-medium">Wt</th>
                  </tr>
                </thead>
                <tbody>
                  {vitalHistory.map((vital, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-2 text-gray-600">{vital.date}</td>
                      <td className="py-2 text-center font-medium text-gray-900">{vital.bp}</td>
                      <td className="py-2 text-center font-medium text-gray-900">{vital.hr}</td>
                      <td className="py-2 text-center font-medium text-gray-900">{vital.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">Blood Type</span>
                </div>
                <span className="font-semibold text-gray-900">O+</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">BMI</span>
                </div>
                <span className="font-semibold text-gray-900">22.9</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Allergies</span>
                </div>
                <span className="font-semibold text-gray-900">None</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsPage;