import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/Tasks/TaskList';
import Filters from '../components/Tasks/Filters';
import StatsCard from '../Dashboard/StatsCard.jsx';
import { ClipboardList, Clock, Loader, CheckCircle } from 'lucide-react';

const TasksPage = () => {
  const { tasks, loading, filters, setFilters, removeTask, fetchTasks } = useTasks();
  
  const stats = [
    { icon: ClipboardList, label: 'Total Tasks', value: tasks.length, color: 'text-blue-600' },
    { icon: Clock, label: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'text-orange-600' },
    { icon: Loader, label: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length, color: 'text-purple-600' },
    { icon: CheckCircle, label: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'text-green-600' },
  ];

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await removeTask(id);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">My Tasks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={fetchTasks}
      />
      
      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default TasksPage;