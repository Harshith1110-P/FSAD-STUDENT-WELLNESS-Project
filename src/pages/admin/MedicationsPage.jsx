import { useState } from 'react';
import { Pill, Plus, Search, AlertCircle, RefreshCw } from 'lucide-react';

const MedicationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const inventory = [
    { id: 1, name: 'Paracetamol 500mg', stock: 1250, threshold: 500, category: 'Pain Relief', expiry: 'Oct 2025' },
    { id: 2, name: 'Amoxicillin 250mg', stock: 120, threshold: 200, category: 'Antibiotic', expiry: 'Jan 2025' },
    { id: 3, name: 'Cetirizine 10mg', stock: 850, threshold: 300, category: 'Antihistamine', expiry: 'Mar 2026' },
    { id: 4, name: 'Ibuprofen 400mg', stock: 45, threshold: 100, category: 'Pain Relief', expiry: 'Nov 2024' },
  ];

  const getStockStatus = (stock, threshold) => {
    if (stock <= threshold) {
      return <span className="flex items-center gap-1 text-red-600 font-medium"><AlertCircle className="w-4 h-4"/> Low Stock</span>;
    }
    return <span className="text-green-600 font-medium">Sufficient</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medication Inventory</h1>
          <p className="text-gray-500">Manage pharmacy stock and expiry alerts</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Restock Request
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by medication name or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-gray-900 font-medium">{item.stock}</span>
                  <span className="text-sm text-gray-400 ml-1">/ {item.threshold} min</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStockStatus(item.stock, item.threshold)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicationsPage;
