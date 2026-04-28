import { useState, useEffect } from 'react';
import { Search, HeartPulse, FileText, Download, User, Loader2 } from 'lucide-react';
import adminApi from '../../api/adminApi';

const AdminHealthRecordsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await adminApi.getAllHealthRecords();
        setRecords(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch records');
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this health record?')) return;

    try {
      await adminApi.deleteHealthRecord(id);
      setRecords(prev => prev.filter(r => r.id !== id));
      alert('Health record deleted successfully');
    } catch (err) {
      console.error('Failed to delete health record:', err);
      alert('Failed to delete record: ' + (err.message || 'Unknown error'));
    }
  };

  const filteredRecords = records.filter(record => 
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    record.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
          <p className="text-gray-500">View and manage student medical histories</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" /> Export All
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search records by student name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map(record => (
          <div key={record.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-wellness-100 flex items-center justify-center">
                <User className="w-6 h-6 text-wellness-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{record.studentName}</h3>
                <p className="text-sm text-gray-500">{record.studentId}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <HeartPulse className="w-4 h-4 text-red-500" />
                <span className="text-gray-700 font-medium">Condition:</span>
                <span className="text-gray-900">{record.condition}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 font-medium">Notes:</span>
                <span className="text-gray-900">{record.notes}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">Last Visit: {record.lastVisit}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleDelete(record.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View Full</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHealthRecordsPage;
