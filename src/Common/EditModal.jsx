import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Flag, AlignLeft, AlertCircle } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import toast from 'react-hot-toast';

const EditModal = ({ task, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      });
      setCharCount(task.description?.length || 0);
    }
  }, [task]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'description') {
      setCharCount(value.length);
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = await onUpdate(task._id, formData);
    setLoading(false);
    
    if (success) {
      onClose();
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-orange-500', icon: '⏳' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-500', icon: '⚡' },
    { value: 'completed', label: 'Completed', color: 'bg-green-500', icon: '✅' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-50 dark:bg-green-900/20', emoji: '🟢' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', emoji: '🟡' },
    { value: 'high', label: 'High', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-50 dark:bg-red-900/20', emoji: '🔴' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 animate-slide-in">
          
          {/* Header with Gradient Background */}
          <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Save className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Edit Task</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/80 text-sm mt-2">Update your task details below</p>
          </div>
          
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-black dark:text-gray-200">
                Task Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title..."
                  className={`w-full pl-10 pr-4 py-2.5 text-black border-2 rounded-lg transition-all duration-200
                    ${errors.title 
                      ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.title}
                </p>
              )}
            </div>
            
            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-black dark:text-gray-200">
                Description <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add more details about your task..."
                rows="3"
                className={`w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-200 resize-none
                  ${errors.description 
                    ? 'border-red-500 focus:border-red-500 bg-red-50 dark:bg-red-900/10' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`}
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">Maximum 500 characters</span>
                <span className={`${charCount > 500 ? 'text-red-500 font-semibold' : 'text-gray-400 dark:text-gray-500'}`}>
                  {charCount}/500
                </span>
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.description}
                </p>
              )}
            </div>
            
            {/* Status and Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Status Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black dark:text-gray-200">
                  Status
                </label>
                <div className="space-y-2">
                  {statusOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200
                        ${formData.status === option.value 
                          ? `${option.color} bg-opacity-10 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500`
                          : 'border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={formData.status === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {option.icon} {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Priority Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-black dark:text-gray-200">
                  Priority
                </label>
                <div className="space-y-2">
                  {priorityOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all duration-200
                        ${formData.priority === option.value 
                          ? `${option.bgColor} border-2 border-purple-500`
                          : 'border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        }`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={option.value}
                        checked={formData.priority === option.value}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className={`text-sm font-medium ${option.color}`}>
                        {option.emoji} {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Due Date Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-black dark:text-gray-200">
                Due Date <span className="text-gray-500 dark:text-gray-400">(Optional)</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-purple-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Task</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Loading Overlay inside modal */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
          <LoadingSpinner size="md" message="Updating task..." />
        </div>
      )}
    </div>
  );
};

export default EditModal;