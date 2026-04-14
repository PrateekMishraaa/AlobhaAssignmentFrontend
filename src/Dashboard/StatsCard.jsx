import React from 'react';

const StatsCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="glass-effect rounded-xl p-6 card-hover">
      <div className="flex items-center gap-4">
        <div className={color}>
          <Icon className="w-10 h-10" />
        </div>
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;