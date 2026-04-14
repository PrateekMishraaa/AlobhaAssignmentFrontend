import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, Clock, Sparkles, TrendingUp, 
  Zap, Award, Rocket, Shield, Star, Gem, Crown, 
  ThumbsUp, Heart, Coffee
} from 'lucide-react';

const HomePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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


  const UsersIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
    
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-800 opacity-90"></div>
      </div>

      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

     
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-float opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-float-delay opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
        </div>

        <div className="relative text-center px-4 z-20">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-4 animate-bounce-slow">
                <Sparkles className="w-16 h-16 text-white md:w-24 md:h-24" />
              </div>
              <div className="absolute -top-4 -right-4 animate-ping">
                <Rocket className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Welcome to{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 blur-2xl opacity-50"></span>
              <span className="relative bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient bg-300">
                TaskMaster
              </span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto animate-fade-in-delay">
            Organize your tasks, boost your productivity, and achieve your goals with our intuitive task management system.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-delay-2">
            <Link to="/tasks" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="relative flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link to="/about" className="group relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105">
              Learn More
              <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div>

    
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-4">
              <Gem className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm font-medium">Premium Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                TaskMaster
              </span>
              ?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover the power of organized task management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-white/50 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

 
      <div className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 mb-4">
              <Heart className="w-4 h-4 text-red-400" />
              <span className="text-white/90 text-sm font-medium">Loved by Users</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 relative">
                      <div className="relative">
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                        <p className="text-lg text-white/90 mb-6 italic leading-relaxed">
                          "{testimonial.text}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold">{testimonial.image}</span>
                          </div>
                          <div>
                            <p className="font-bold text-white">{testimonial.name}</p>
                            <p className="text-sm text-white/70">{testimonial.role} at {testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'w-8 h-2 bg-white rounded-full'
                      : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

   
      <div className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-gradient"></div>
            <div className="relative bg-gradient-to-r from-purple-900/90 to-indigo-900/90 backdrop-blur-lg rounded-3xl p-12 text-center overflow-hidden">
              <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce-slow" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to boost your productivity?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust TaskMaster for their daily task management.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/add-task" className="group inline-flex items-center gap-2 bg-white text-purple-600 font-semibold py-3 px-8 rounded-full hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Start Free Trial
                  <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Link>
                <Link to="/about" className="group inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg text-white font-semibold py-3 px-8 rounded-full hover:bg-white/30 transition-all duration-300">
                  Contact Sales
                  <ThumbsUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;