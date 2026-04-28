import React, { useState } from 'react';
import { Phone, MapPin, AlertCircle, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import studentApi from '../../api/studentApi';
import { useAuth } from '../../context/AuthContext';

const EmergencyPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSOS = async (type) => {
    if (!window.confirm(`Are you sure you want to trigger a ${type} emergency alert?`)) return;
    
    setLoading(true);
    try {
      await studentApi.sendEmergencyAlert({
        studentId: user?.studentId,
        studentName: user?.name,
        type: type
      });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      alert('Failed to send alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-red-600 rounded-2xl flex items-center justify-center animate-pulse shadow-lg shadow-red-200">
            <Phone className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-red-900 mb-2">Emergency Hub</h1>
            <p className="text-lg text-red-700">Immediate assistance for medical or life-threatening situations.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rapid Response Trigger */}
        <div className="card border-red-100 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              Rapid Response
            </h2>
            <p className="text-sm text-gray-500 mt-1">Click to instantly notify campus authorities.</p>
          </div>

          <div className="space-y-3">
            <button 
              disabled={loading}
              onClick={() => handleSOS('Medical')}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <AlertCircle className="w-6 h-6" />}
              MEDICAL EMERGENCY
            </button>
            <button 
              disabled={loading}
              onClick={() => handleSOS('Security')}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldAlert className="w-6 h-6" />}
              SECURITY ALERT
            </button>
          </div>

          {sent && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5" />
              <p className="font-bold uppercase text-xs tracking-widest">Alert Sent Successfully!</p>
            </div>
          )}
        </div>

        {/* Contact Directory */}
        <div className="space-y-4">
          <div className="card p-6 bg-white flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-xl font-mono font-bold text-red-600 text-xl">24/7</div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Health Center</p>
              <p className="text-2xl font-bold text-gray-900">+91 98765 43210</p>
            </div>
          </div>

          <div className="card p-6 bg-white flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl font-mono font-bold text-blue-600 text-xl">112</div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">National Help</p>
              <p className="text-2xl font-bold text-gray-900">Medical & Police</p>
            </div>
          </div>

          <div className="card p-6 bg-white">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-100 rounded-xl text-gray-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 leading-none mb-1">Health Center Location</h3>
                <p className="text-sm text-gray-500">Block C, Academic Square, Main Campus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
