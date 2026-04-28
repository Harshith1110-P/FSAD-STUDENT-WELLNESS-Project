import { Save, Bell, Shield, Clock } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Clinic Settings</h1>
        <p className="text-gray-500">Manage university health center configurations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Clock className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold">Operating Hours</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                <input type="time" defaultValue="08:00" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                <input type="time" defaultValue="18:00" className="input-field" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Bell className="w-5 h-5 text-primary-600" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Alerts</p>
                  <p className="text-sm text-gray-500">Send an email when stock is low</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">SMS Reminders</p>
                  <p className="text-sm text-gray-500">Send SMS to students 24h before appt.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-gray-700" />
              <h2 className="font-semibold text-gray-900">System</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p><strong>Version:</strong> 2.0.4-stable</p>
              <p><strong>Last Backup:</strong> Today, 04:00 AM</p>
              <p><strong>Storage Used:</strong> 45% (4.5GB)</p>
            </div>
            <button className="w-full btn-outline mt-6">Force Backup</button>
          </div>
          
          <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
