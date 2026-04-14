import React from 'react';
import { ListTodo, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-white mt-4 text-lg">Loading tasks...</p>
      </div>
    );
  }
  
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 glass-effect rounded-2xl">
        <ListTodo className="w-20 h-20 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-2">No tasks found</p>
        <p className="text-gray-500 mb-6">Create your first task now!</p>
        <Link to="/add-task" className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Task
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;