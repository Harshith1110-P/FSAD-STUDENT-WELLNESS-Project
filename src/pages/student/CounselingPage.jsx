import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Users, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import studentApi from '../../api/studentApi';
import { useAuth } from '../../context/AuthContext';

const CounselingPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reason: '',
    urgency: 'Medium',
    preferredDate: ''
  });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.studentId) return;
      try {
        const data = await studentApi.getCounselingRequests(user.studentId);
        setRequests(data);
      } catch (err) {
        console.error('Failed to fetch requests:', err);
      }
    };
    fetchRequests();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        studentId: user.studentId,
        studentName: user.name
      };
      const saved = await studentApi.requestCounseling(payload);
      setRequests([saved, ...requests]);
      setSubmitted(true);
      setFormData({ reason: '', urgency: 'Medium', preferredDate: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 space-y-6 pb-20">
      <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 text-center text-purple-900 shadow-sm">
        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Student Counseling Services</h1>
        <p className="text-lg text-purple-700">We're here to listen. You're not alone.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reservation Form */}
        <div className="card p-8 space-y-6 border-purple-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Send className="w-5 h-5 text-purple-600" />
            Request a Session
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700">Why would you like to speak with a counselor?</label>
              <textarea
                required
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="input-field min-h-[100px]"
                placeholder="Briefly describe what's on your mind..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Urgency</label>
                <select
                  value={formData.urgency}
                  onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                  className="input-field"
                >
                  <option value="Low">Low (Next few days)</option>
                  <option value="Medium">Medium (Today/Tomorrow)</option>
                  <option value="High">High (Immediate Help)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                  className="input-field"
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="btn-primary w-full bg-purple-600 hover:bg-purple-700 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MessageCircle className="w-5 h-5" />}
              Submit Request
            </button>

            {submitted && (
              <div className="p-3 bg-green-100 text-green-700 rounded-xl text-center font-medium animate-in fade-in zoom-in-95">
                Request sent! A counselor will reach out soon.
              </div>
            )}
          </form>
        </div>

        {/* Previous Requests */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Requests</h2>
          <div className="space-y-3 h-[400px] overflow-y-auto pr-2">
            {requests.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No previous requests found</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="card p-4 border-l-4 border-purple-500">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      req.urgency === 'High' ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {req.urgency} Urgency
                    </span>
                    <span className="text-[10px] text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-1">{req.reason}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle2 className={`w-3 h-3 ${req.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`} />
                    Status: <span className="capitalize">{req.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselingPage;
