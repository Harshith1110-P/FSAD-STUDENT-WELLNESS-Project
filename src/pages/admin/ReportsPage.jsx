import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports {"&"} Analytics</h1>
          <p className="text-gray-500">Clinic performance and student health trends</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card border-t-4 border-t-primary-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-50 rounded"><BarChart3 className="w-5 h-5 text-primary-600"/></div>
            <h3 className="font-semibold text-gray-700">Total Visits</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">1,248</p>
          <p className="text-sm text-green-600 flex items-center mt-2"><TrendingUp className="w-4 h-4 mr-1"/> +12% from last month</p>
        </div>
        
        <div className="card border-t-4 border-t-wellness-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-wellness-50 rounded"><PieChart className="w-5 h-5 text-wellness-600"/></div>
            <h3 className="font-semibold text-gray-700">Common Conditions</h3>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Flu / Cold</span><span className="font-medium">45%</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Physical Injuries</span><span className="font-medium">30%</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Mental Health</span><span className="font-medium">25%</span></div>
          </div>
        </div>

        <div className="card border-t-4 border-t-purple-500">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded"><BarChart3 className="w-5 h-5 text-purple-600"/></div>
            <h3 className="font-semibold text-gray-700">Avg Wait Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">14<span className="text-lg text-gray-500 font-normal"> mins</span></p>
          <p className="text-sm text-green-600 flex items-center mt-2"><TrendingUp className="w-4 h-4 mr-1"/> -2 mins from last month</p>
        </div>
      </div>

      <div className="card h-64 flex flex-col items-center justify-center bg-gray-50 border border-dashed border-gray-300">
         <BarChart3 className="w-12 h-12 text-gray-300 mb-2"/>
         <p className="text-gray-500 font-medium text-center">Detailed charts will appear here<br/>(Ready for Recharts integration)</p>
      </div>
    </div>
  );
};

export default ReportsPage;
