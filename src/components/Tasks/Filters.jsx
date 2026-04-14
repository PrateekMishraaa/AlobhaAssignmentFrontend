import React from 'react';
import { Filter, RefreshCw } from 'lucide-react';

const Filters = ({ filters, onFilterChange, onRefresh }) => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-8 text-black">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-700">Filters:</span>
        </div>
        
        <select
          name="status"
          value={filters.status}
          onChange={onFilterChange}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
        >
          <option value="all">All Status</option>
          <option value="pending">📋 Pending</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
        
        <select
          name="priority"
          value={filters.priority}
          onChange={onFilterChange}
          className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none bg-white"
        >
          <option value="all">All Priorities</option>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
        
        <button
          onClick={onRefresh}
          className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default Filters;