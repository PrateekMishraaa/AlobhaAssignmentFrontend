import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Settings,
  User,
  Menu,
  X,
  ChevronDown,
  ClipboardList,
  FolderOpen,
  Users,
  Calendar,
  BarChart3,
  LogOut,
  Gavel,
  CalendarDays,
  FileArchive,
  ChartBar,
  BellRing
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path:id ? `/dashboard/${id}` : '/dashboard'},
    { id: 'rti-registration', label: 'RTI Registration', icon: FileText, path: id ? `/rti-registration/${id}` : '/rti-registration' },
    { id: 'rti-management', label: 'RTI Registration Details', icon: ClipboardList, path: id ? `/rti-management/${id}` : '/rti-management' },
    { id: 'legal-cases', label: 'Legal Cases', icon: Gavel, path: id ? `/legal-cases/${id}` : '/legal-cases' },
    { id: 'hearing-calendar', label: 'Hearing Calendar', icon: CalendarDays, path: id ? `/hearing-calender/${id}` : '/hearing-calender' },
    { id: 'documents', label: 'Documents', icon: FileArchive, path: id ? `/documents/${id}` : '/documents' },
    { id: 'report-analytics', label: 'Report & Analytics', icon: ChartBar, path: id ? `/report-analytics/${id}` : '/report-analytics' },
    { id: 'notifications-settings', label: 'Notifications & Settings', icon: BellRing, path: '/notifications-settings' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (item) => {
    setActiveItem(item.id);
    if (item.path) {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div
      className={`h-screen bg-white flex flex-col shadow-lg transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >

      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {isExpanded ? (
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-blue-900 font-bold text-lg">SAU</span>
            </div>
            <span className="font-bold text-sm tracking-tight text-black">SOUTH ASIAN UNIVERSITY</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center mx-auto cursor-pointer" onClick={() => navigate('/dashboard')}>
            <span className="text-blue-900 font-bold text-lg">SA</span>
          </div>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-black transition-colors"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

  
      <nav className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'text-black hover:bg-gray-100 hover:text-black'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-black' : 'text-gray-600 group-hover:text-black'} />
                  {isExpanded && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
              <User size={16} className="text-black" />
            </div>
            <div className="flex-1">
              <button onClick={handleLogout} className="text-xs font-medium text-black">Logout</button>
              
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-black transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
              <User size={16} className="text-black" />
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-black transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;