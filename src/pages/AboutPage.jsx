import React from 'react';
import { Code, Heart, Star, Users, Mail } from 'lucide-react';

const AboutPage = () => {
  const technologies = [
    { name: 'React 18', icon: '⚛️', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Tailwind CSS v4', icon: '🎨', color: 'bg-blue-100 text-blue-700' },
    { name: 'React Router v6', icon: '🔄', color: 'bg-red-100 text-red-700' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-700' },
    { name: 'Express.js', icon: '🚂', color: 'bg-gray-100 text-gray-700' },
    { name: 'MongoDB', icon: '🍃', color: 'bg-emerald-100 text-emerald-700' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">About TaskMaster</h1>
      
      <div className="glass-effect rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          TaskMaster is designed to help individuals and teams organize their tasks efficiently,
          boost productivity, and achieve their goals. We believe that simple, intuitive tools
          can make a big difference in how people work and live.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Built with React</h3>
          <p className="text-gray-600 text-sm">Modern, fast, and responsive</p>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">Made with Love</h3>
          <p className="text-gray-600 text-sm">For the developer community</p>
        </div>
        
        <div className="glass-effect rounded-xl p-6 text-center card-hover">
          <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800">User Friendly</h3>
          <p className="text-gray-600 text-sm">Simple and intuitive interface</p>
        </div>
      </div>
      
      <div className="glass-effect rounded-2xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span
              key={tech.name}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${tech.color}`}
            >
              {tech.icon} {tech.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="glass-effect rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect With Us</h2>
        <div className="flex justify-center gap-6">
          {/* <a href="#" className="text-gray-600 hover:text-purple-600 transition-all">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-all">
            <Linkedin className="w-6 h-6" />
          </a> */}
          <a href="#" className="text-gray-600 hover:text-purple-600 transition-all">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Version 1.0.0 | © 2024 TaskMaster
        </p>
      </div>
    </div>
  );
};

export default AboutPage;