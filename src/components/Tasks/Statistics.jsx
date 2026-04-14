import React, { useState, useEffect } from 'react';
import { ClipboardList, Clock, Loader, CheckCircle, TrendingUp, Target } from 'lucide-react';

const AnimatedCounter = ({ target }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count}</span>;
};

const Statistics = ({ tasks }) => {
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  const stats = [
    { icon: ClipboardList, label: 'Total Tasks', value: total, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    { icon: Clock, label: 'Pending', value: pending, color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    { icon: Loader, label: 'In Progress', value: inProgress, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    { icon: CheckCircle, label: 'Completed', value: completed, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card rounded-2xl p-6 card-hover group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">
                  <AnimatedCounter target={stat.value} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      

      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Overall Progress</h3>
          </div>
          <span className="text-2xl font-bold text-purple-600">{completionRate}%</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          You've completed {completed} out of {total} tasks
        </p>
      </div>
    </div>
  );
};

export default Statistics;