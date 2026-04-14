
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Clock, Sparkles, TrendingUp, 
  Zap, Award, Rocket, Shield, Star, Gem, Crown, 
  ThumbsUp, Heart, Coffee, Moon, Sun, Menu, X
} from 'lucide-react';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const features = [
    { icon: CheckCircle, title: 'Easy Task Management', desc: 'Create, update, and delete tasks effortlessly', color: 'from-green-500 to-emerald-500', delay: 0 },
    { icon: Clock, title: 'Track Progress', desc: 'Monitor task status and completion rates', color: 'from-blue-500 to-cyan-500', delay: 100 },
    { icon: TrendingUp, title: 'Analytics', desc: 'View statistics and productivity insights', color: 'from-purple-500 to-pink-500', delay: 200 },
    { icon: Zap, title: 'Fast & Responsive', desc: 'Works seamlessly on all devices', color: 'from-orange-500 to-red-500', delay: 300 },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users', icon: Shield, gradient: 'from-blue-500 to-cyan-500' },
    { value: '50K+', label: 'Tasks Completed', icon: CheckCircle, gradient: 'from-green-500 to-emerald-500' },
    { value: '99.9%', label: 'Uptime', icon: Award, gradient: 'from-purple-500 to-pink-500' },
    { value: '24/7', label: 'Support', icon: Heart, gradient: 'from-orange-500 to-red-500' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'Tech Corp',
      image: 'SJ',
      text: 'TaskMaster has completely transformed how our team manages projects. The intuitive interface and powerful features have increased our productivity by 200%!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Freelance Developer',
      company: 'DevStudio',
      image: 'MC',
      text: 'As a freelancer juggling multiple clients, TaskMaster keeps me organized and on track. The best task management tool I have ever used!',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      company: 'InnovateLab',
      image: 'ER',
      text: 'From idea to execution, TaskMaster helps us stay focused and deliver results. Absolutely essential for our daily operations.',
      rating: 5,
    },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'My Tasks' },
    { path: '/add-task', label: 'Add Task' },
    { path: '/about', label: 'About' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300">

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <span className="font-bold text-purple-600 dark:text-purple-400">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>


      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Link to="/" className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TaskMaster
              </span>
            </Link>

         
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

        
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all"
              >
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

     
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-all duration-300 lg:hidden"
        aria-label="Toggle theme"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-purple-600" />
        )}
      </button>

     
      <div className="fixed inset-0 pointer-events-none transition-colors duration-500">
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 opacity-100' 
            : 'bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-800 opacity-90'
        }`}></div>
      </div>

     
      <div 
        className="hidden lg:block fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          background: `radial-gradient(circle, ${
            isDarkMode 
              ? 'rgba(139,92,246,0.2) 0%, rgba(139,92,246,0) 70%'
              : 'rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%'
          })`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />


      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-30 ${
            isDarkMode ? 'bg-purple-600' : 'bg-purple-500'
          }`}></div>
          <div className={`absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay opacity-30 ${
            isDarkMode ? 'bg-pink-600' : 'bg-pink-500'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20 ${
            isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
          }`}></div>
        </div>

        <div className="relative text-center px-4 sm:px-6 z-20">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 sm:p-4 animate-bounce-slow">
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
              </div>
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 animate-ping">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 sm:mb-6 animate-fade-in px-2">
            Welcome to{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient bg-300">
                TaskMaster
              </span>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-delay px-4">
            Organize your tasks, boost your productivity, and achieve your goals with our intuitive task management system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap animate-fade-in-delay-2 px-4">
            <Link to="/tasks" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/about" className="group inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              Learn More
              <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

          <div className="hidden sm:block absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
                    : 'bg-white/10 backdrop-blur-lg'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 sm:mb-2 text-white">
                  {stat.value}
                </p>
                <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/80'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-lg'
                : 'bg-white/10 backdrop-blur-lg'
            }`}>
              <Gem className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/90'}`}>
                Premium Features
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                TaskMaster
              </span>
              ?
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-white/80'}`}>
              Discover the power of organized task management
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center hover:transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
                    : 'bg-white/10 backdrop-blur-lg'
                }`}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h3 className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-white/70'}`}>
                  {feature.desc}
                </p>
                <div className="mt-3 sm:mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    
      <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 sm:px-4 sm:py-2 mb-3 sm:mb-4 ${
              isDarkMode 
                ? 'bg-gray-800/50 backdrop-blur-lg'
                : 'bg-white/10 backdrop-blur-lg'
            }`}>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
              <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-white/90'}`}>
                Loved by Users
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              What Our{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <div className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 relative ${
                      isDarkMode 
                        ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700/50'
                        : 'bg-white/10 backdrop-blur-lg'
                    }`}>
                      <div className="relative">
                        <div className="flex gap-1 mb-3 sm:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 italic leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-white/90'}`}>
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm sm:text-base">{testimonial.image}</span>
                          </div>
                          <div>
                            <p className={`font-bold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-white'}`}>
                              {testimonial.name}
                            </p>
                            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-white/70'}`}>
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-white rounded-full'
                      : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 rounded-full hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-gradient"></div>
            <div className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-900/90 to-purple-900/90 backdrop-blur-lg'
                : 'bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-lg'
            }`}>
              <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto mb-4 sm:mb-6 animate-bounce-slow" />
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
                Ready to boost your productivity?
              </h2>
              <p className={`text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-gray-300' : 'text-white/80'}`}>
                Join thousands of users who trust TaskMaster for their daily task management.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center flex-wrap px-4">
                <Link to="/add-task" className="group inline-flex items-center justify-center gap-2 bg-white text-purple-600 font-semibold py-2.5 px-5 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Start Free Trial
                  <Coffee className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                </Link>
                <Link to="/about" className="group inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-lg text-white font-semibold py-2.5 px-5 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base hover:bg-white/30 transition-all duration-300">
                  Contact Sales
                  <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-delay-2 {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 7s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 0.8s ease-out 0.3s both; }
        .animate-fade-in-delay-2 { animation: fade-in-delay-2 0.8s ease-out 0.6s both; }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .bg-300 { background-size: 300% 300%; }
      `}</style>
    </div>
  );
};

export default HomePage;