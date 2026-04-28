import { useState } from 'react';
import { Heart, Users, Calendar, Plus } from 'lucide-react';

const WellnessProgramsPage = () => {
  const programs = [
    { id: 1, name: 'Yoga for Stress Relief', date: 'March 10, 2024', time: '18:00', location: 'Main Gym', enrolled: 45, maxCap: 50, type: 'Physical' },
    { id: 2, name: 'Mental Health First Aid', date: 'March 15, 2024', time: '14:00', location: 'Auditorium 2', enrolled: 120, maxCap: 150, type: 'Mental' },
    { id: 3, name: 'Nutrition Workshop', date: 'March 20, 2024', time: '16:00', location: 'Hall A', enrolled: 200, maxCap: 200, type: 'Nutritional' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wellness Programs</h1>
          <p className="text-gray-500">Manage campus health workshops and drives</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map(program => (
          <div key={program.id} className="card hover:shadow-lg transition-transform hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-wellness-100 rounded-xl">
                <Heart className="w-6 h-6 text-wellness-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{program.name}</h3>
                <span className="text-sm px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{program.type}</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{program.date} at {program.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{program.enrolled} / {program.maxCap} Enrolled</span>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className={`h-2.5 rounded-full ${program.enrolled >= program.maxCap ? 'bg-red-500' : 'bg-wellness-500'}`} 
                style={{ width: `${(program.enrolled / program.maxCap) * 100}%` }}
              ></div>
            </div>
            
            <button className="w-full btn-outline">Manage Attendees</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessProgramsPage;
