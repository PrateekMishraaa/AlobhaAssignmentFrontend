import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Calendar, Flag, Eye } from 'lucide-react';

const TaskCard = ({ task, onDelete }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-orange-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 card-hover animate-fade-in shadow-md hover:shadow-xl">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
              <Flag className="inline w-3 h-3 mr-1" />
              {task.priority}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
              {getStatusText(task.status)}
            </span>
          </div>
          
          {task.description && (
            <p className="text-gray-600 mb-3">{task.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
            <div>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Link
            to={`/edit-task/${task._id}`}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </Link>
          <Link
            to={`/task/${task._id}`}
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;