import { 
  Users, 
  CalendarFold  , 
  BookOpen, 
 
 
} from 'lucide-react';
import  { useState, useEffect } from 'react';
export default function SchoolStatistics() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);

 useEffect(() => {
        fetchCourseStatistics();
    }, []);

    const fetchCourseStatistics = async () => {
        try {
            const response = await fetch('http://localhost:3000/courses');
            const data = await response.json();
             setTotalCourses(data.statistics.total);
           
        } catch (err) {
           console.error('Failed to fetch statistics');
        }
    };

     useEffect(() => {
        fetchUserStatistics();
    }, []);

    const fetchUserStatistics = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
             setTotalUsers(data.statistics.total);
           
        } catch (err) {
           console.error('Failed to fetch statistics');
        }
    };

    useEffect(() => {
        fetchEventStatistics();
    }, []);

    const fetchEventStatistics = async () => {
        try {
            const response = await fetch('http://localhost:3000/events');
            const data = await response.json();
             setTotalEvents(data.results);
           
        } catch (err) {
           console.error('Failed to fetch statistics');
        }
    };
  const mainStats = [
    {
      title: "Total Students",
      value: totalUsers.toString(),
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
      description: " Enrolled students"
    },
    {
      title: "Total Events",
      value: totalEvents.toString(),
      changeType: "increase",
      icon: CalendarFold  ,
      color: "bg-green-500",
      description: "Active Events "
    },
    {
      title: "Total Courses",
      value:totalCourses.toString(),
      changeType: "increase",
      icon: BookOpen,
      color: "bg-purple-500",
      description: "Active courses"
    },
    
  ];



  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-green-600 bg-green-100';
      case 'decrease': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getChangeSymbol = (changeType) => {
    switch (changeType) {
      case 'increase': return '↗';
      case 'decrease': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📊 School Statistics
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive overview of school performance metrics and key indicators
          </p>
        </div>

        {/* Main Statistics */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getChangeColor(stat.changeType)}`}>
                    {getChangeSymbol(stat.changeType)} 
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium mb-1">{stat.title}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
}