import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Calendar, Flag, AlignLeft, 
  X, Sparkles, Clock, AlertCircle,
  CheckCircle, Loader, Star, Zap
} from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import toast from 'react-hot-toast';

const TaskForm = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });
  
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState({
    title: false,
    description: false,
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: Clock, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
    { value: 'in-progress', label: 'In Progress', icon: Loader, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', icon: Star, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-900/20', emoji: '🟢' },
    { value: 'medium', label: 'Medium Priority', icon: Zap, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-900/20', emoji: '🟡' },
    { value: 'high', label: 'High Priority', icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-900/20', emoji: '🔴' },
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);
 
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const success = await addTask(formData);
    setLoading(false);
    
    if (success) {

      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: '',
      });
      setCharCount(0);
    
      setTimeout(() => {
        navigate('/tasks');
      }, 1000);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
  
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 mb-4 animate-bounce-slow">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Create New Task</h1>
        <p className="text-white/80">Organize your work and boost productivity</p>
      </div>

      <div className="glass-card rounded-3xl p-8 shadow-2xl animate-slide-in">
        <form onSubmit={handleSubmit} className="space-y-6">
      
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Task Title <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl transition-opacity duration-300 ${isFocused.title ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
              <div className="relative">
                <AlignLeft className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onFocus={() => setIsFocused({ ...isFocused, title: true })}
                  onBlur={() => setIsFocused({ ...isFocused, title: false })}
                  placeholder="What needs to be done?"
                  className={`w-full px-4 py-3 pl-12 pr-4 bg-white dark:bg-gray-800 border-2 rounded-xl transition-all duration-300
                    ${errors.title 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                    } focus:outline-none`}
                />
              </div>
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 animate-shake">{errors.title}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 3 characters, maximum 100 characters
            </p>
          </div>

       
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Description <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onFocus={() => setIsFocused({ ...isFocused, description: true })}
                onBlur={() => setIsFocused({ ...isFocused, description: false })}
                placeholder="Add more details about your task..."
                rows="4"
                className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-xl transition-all duration-300
                  ${errors.description 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-200 dark:border-gray-700 focus:border-purple-500'
                  } focus:outline-none resize-none`}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {charCount}/500
              </div>
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Status
              </label>
              <div className="grid grid-cols-3 gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: option.value })}
                    className={`relative group p-3 rounded-xl transition-all duration-300 ${
                      formData.status === option.value
                        ? `${option.bgColor} border-2 border-current ${option.color} shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:scale-105'
                    }`}
                  >
                    <option.icon className={`w-5 h-5 mx-auto mb-1 ${formData.status === option.value ? option.color : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${formData.status === option.value ? option.color : 'text-gray-600 dark:text-gray-400'}`}>
                      {option.label}
                    </span>
                    {formData.status === option.value && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

        
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {priorityOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: option.value })}
                    className={`relative group p-3 rounded-xl transition-all duration-300 ${
                      formData.priority === option.value
                        ? `${option.bgColor} border-2 border-current ${option.color} shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:scale-105'
                    }`}
                  >
                    <span className="text-xl mb-1 block">{option.emoji}</span>
                    <span className={`text-xs font-medium ${formData.priority === option.value ? option.color : 'text-gray-600 dark:text-gray-400'}`}>
                      {option.label}
                    </span>
                    {formData.priority === option.value && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

         
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Due Date <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl transition-opacity duration-300 ${isFocused.dueDate ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className="w-full px-4 py-3 pl-12 pr-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Set a deadline for your task (optional)
            </p>
          </div>

        
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Quick Tips:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Use clear and descriptive task titles</li>
                  <li>• Set priorities to focus on important tasks first</li>
                  <li>• Add due dates to never miss deadlines</li>
                  <li>• Break large tasks into smaller subtasks</li>
                </ul>
              </div>
            </div>
          </div>

         
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Task...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create Task</span>
                    <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
                  </>
                )}
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Cancel
            </button>
          </div>
        </form>
      </div>

   
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center animate-scale-up">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-full h-full border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Creating Task...</h3>
            <p className="text-gray-500">Please wait while we save your task</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;