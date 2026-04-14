import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle, Home, ListTodo, PlusCircle, Info, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tasks', icon: ListTodo, label: 'My Tasks' },
    { path: '/add-task', icon: PlusCircle, label: 'Add Task' },
    { path: '/about', icon: Info, label: 'About' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <NavLink to="/" className="flex items-center gap-2">
            <CheckCircle className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              TaskMaster
            </span>
          </NavLink>
          
        
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-100 text-purple-600 font-bold'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
          
         
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-purple-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
       
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-100 text-purple-600 font-bold'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;