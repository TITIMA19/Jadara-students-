import  { useState, useEffect } from 'react';
import { ChevronRight, BookOpen, Users, BarChart3, Shield, Star, Play, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Curriculum Management",
      description: "Advanced tools for designing, tracking, and optimizing educational curricula with real-time analytics.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Student & Staff Portal",
      description: "Integrated platform connecting students, teachers, and administrators with seamless communication.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Data-driven insights to track student progress, identify trends, and improve educational outcomes.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "Enterprise-grade security with full FERPA compliance and advanced data protection protocols.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal, Riverside Academy",
      content: "SMTA transformed our school operations completely. Student engagement increased by 40% in just one semester.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "IT Director, Metro School District",
      content: "The implementation was seamless and the support team is exceptional. Best investment we've made in years.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Vice Principal, Innovation High",
      content: "Our administrative efficiency improved dramatically. We save 15 hours per week on routine tasks.",
      rating: 5
    }
  ];

 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
   

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">SMTA</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/login" className="text-gray-300 hover:text-white transition-colors">Login</a>
              <a href="/register" className="text-gray-300 hover:text-white transition-colors">Sign up</a>
             
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <a href="/login" className="block text-gray-300 hover:text-white transition-colors">Login</a>
              <a href="/register" className="block text-gray-300 hover:text-white transition-colors">Sign up</a>
             
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
             
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  School Management
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Revolutionize education platform that streamlines operations, enhances learning outcomes, and connects your entire school community.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <a href="/register">
                  Start Free Trial</a>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
               
              </div>
            </div>
            
        
          </div>
        </div>
      </section>

    
    



      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SMTA</span>
            </div>
            
            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 School Management Technology Academy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}