import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Calendar, Flag, Clock, User } from 'lucide-react';
import { getTaskById } from '../services/api';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const data = await getTaskById(id);
      if (data.success) {
        setTask(data.data);
      } else {
        navigate('/tasks');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      navigate('/tasks');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-orange-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
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
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!task) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 text-white mb-6 hover:text-purple-200 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Tasks
      </button>
      
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{task.title}</h1>
          <Link
            to={`/edit-task/${task._id}`}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Edit Task
          </Link>
        </div>
        
        <div className="flex gap-3 mb-6 flex-wrap">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(task.status)}`}>
            {task.status === 'in-progress' ? 'In Progress' : task.status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
            <Flag className="inline w-3 h-3 mr-1" />
            {task.priority} priority
          </span>
        </div>
        
        {task.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>
        )}
        
        <div className="border-t pt-6 space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>Due Date: <strong>{formatDate(task.dueDate)}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Created: <strong>{new Date(task.createdAt).toLocaleString()}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <User className="w-5 h-5" />
            <span>Last Updated: <strong>{new Date(task.updatedAt).toLocaleString()}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;