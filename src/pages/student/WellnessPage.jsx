import { useState, useEffect } from 'react';
import studentApi from '../../api/studentApi';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  Brain,
  Activity,
  Apple,
  Moon,
  Sun,
  Droplets,
  Footprints,
  TrendingUp,
  ChevronRight,
  Calendar,
  Target,
  Award,
  CheckCircle,
  Circle,
  Loader2
} from 'lucide-react';

const WellnessPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dailyGoals, setDailyGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      if (!user?.studentId) return;
      try {
        const data = await studentApi.getWellnessGoals(user.studentId);
        setDailyGoals(data);
      } catch (err) {
        console.error('Failed to fetch goals:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, [user]);

  const handleToggleGoal = async (goalId) => {
    try {
      const updated = await studentApi.toggleWellnessGoal(goalId);
      setDailyGoals(goals => goals.map(g => g.id === goalId ? updated : g));
    } catch (err) {
      console.error('Failed to toggle goal:', err);
    }
  };

  const categories = [
    { id: 'all', label: 'All', icon: Heart },
    { id: 'mental', label: 'Mental Health', icon: Brain },
    { id: 'physical', label: 'Physical', icon: Activity },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'sleep', label: 'Sleep', icon: Moon },
  ];

  const wellnessStats = [
    { label: 'Steps Today', value: '8,432', target: '10,000', progress: 84, icon: Footprints, color: 'blue' },
    { label: 'Water Intake', value: '6', target: '8 glasses', progress: 75, icon: Droplets, color: 'cyan' },
    { label: 'Sleep Hours', value: '7.5', target: '8 hours', progress: 94, icon: Moon, color: 'purple' },
    { label: 'Active Minutes', value: '45', target: '60 min', progress: 75, icon: Activity, color: 'green' },
  ];

  const wellnessPrograms = [
    {
      id: 1,
      title: 'Mindfulness Meditation',
      description: 'Learn techniques to reduce stress and improve focus',
      duration: '4 weeks',
      sessions: 8,
      enrolled: 245,
      category: 'mental',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=200&fit=crop',
      progress: 60
    },
    {
      id: 2,
      title: 'Fitness Challenge',
      description: '30-day fitness program for beginners',
      duration: '30 days',
      sessions: 30,
      enrolled: 512,
      category: 'physical',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=200&fit=crop',
      progress: 25
    },
    {
      id: 3,
      title: 'Healthy Eating Habits',
      description: 'Nutrition workshop and meal planning',
      duration: '3 weeks',
      sessions: 6,
      enrolled: 189,
      category: 'nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop',
      progress: 0
    },
    {
      id: 4,
      title: 'Better Sleep Program',
      description: 'Improve your sleep quality and energy levels',
      duration: '2 weeks',
      sessions: 4,
      enrolled: 156,
      category: 'sleep',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=200&fit=crop',
      progress: 100
    },
  ];

  const dailyGoalsCount = dailyGoals.filter(g => g.completed).length;
  const progressPercent = dailyGoals.length === 0 ? 0 : Math.round((dailyGoalsCount / dailyGoals.length) * 100);

  const upcomingEvents = [
    { id: 1, title: 'Yoga Session', date: 'Feb 26, 2024', time: '7:00 AM', instructor: 'Sarah Miller' },
    { id: 2, title: 'Stress Management Workshop', date: 'Feb 28, 2024', time: '3:00 PM', instructor: 'Dr. Robert Kim' },
    { id: 3, title: 'Nutrition Seminar', date: 'Mar 2, 2024', time: '2:00 PM', instructor: 'Dr. Lisa Chen' },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', progress: 'bg-blue-500' },
      cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', progress: 'bg-cyan-500' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', progress: 'bg-purple-500' },
      green: { bg: 'bg-green-100', text: 'text-green-600', progress: 'bg-green-500' },
    };
    return colors[color] || colors.blue;
  };

  const filteredPrograms = selectedCategory === 'all' 
    ? wellnessPrograms 
    : wellnessPrograms.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in-up">
      {loading ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
        </div>
      ) : (
        <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wellness Center</h1>
          <p className="text-gray-500">Track your wellness journey and join programs</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-700">Daily Progress: {progressPercent}%</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {wellnessStats.map((stat, index) => {
          const colorClasses = getColorClasses(stat.color);
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                  <stat.icon className={`w-5 h-5 ${colorClasses.text}`} />
                </div>
                <span className="text-sm text-gray-500">{stat.target}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${colorClasses.progress}`} 
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="card overflow-hidden p-0">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{program.title}</h3>
                    {program.progress === 100 && (
                      <Award className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{program.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span>{program.duration}</span>
                    <span>•</span>
                    <span>{program.sessions} sessions</span>
                  </div>
                  {program.progress > 0 && program.progress < 100 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium text-gray-700">{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary-500" 
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    program.progress === 100
                      ? 'bg-green-100 text-green-700'
                      : program.progress > 0
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                    {program.progress === 100 ? 'Completed' : program.progress > 0 ? 'Continue' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">          {/* Daily Goals */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Goals</h3>
              <span className="text-sm text-primary-600 font-medium">
                {dailyGoalsCount}/{dailyGoals.length}
              </span>
            </div>
            <div className="space-y-3">
              {dailyGoals.map((goal) => (
                <button 
                  key={goal.id} 
                  onClick={() => handleToggleGoal(goal.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${goal.completed ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-transparent hover:border-primary-100'}`}
                >
                  {goal.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                  <span className={`text-sm ${goal.completed ? 'text-green-700 line-through' : 'text-gray-700 font-medium'}`}>
                    {goal.task}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    <span className="text-sm font-medium text-gray-900">{event.date}</span>
                    <span className="text-sm text-gray-500">{event.time}</span>
                  </div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.instructor}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center gap-1">
              View All Events <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Wellness Tip */}
          <div className="card bg-gradient-to-br from-primary-500 to-wellness-500 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Sun className="w-5 h-5" />
              <h3 className="font-semibold">Daily Tip</h3>
            </div>
            <p className="text-sm text-primary-100 font-medium">
              Take a 5-minute break every hour to stretch and rest your eyes. This helps reduce fatigue and improves productivity.
            </p>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default WellnessPage;