import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: 'all', priority: 'all' });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks(filters);
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const addTask = async (taskData) => {
    try {
      const data = await createTask(taskData);
      if (data.success) {
        toast.success('Task created successfully!');
        fetchTasks();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      return false;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const data = await updateTask(id, taskData);
      if (data.success) {
        toast.success('Task updated successfully!');
        fetchTasks();
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      return false;
    }
  };

  const removeTask = async (id) => {
    try {
      const data = await deleteTask(id);
      if (data.success) {
        toast.success('Task deleted successfully!');
        fetchTasks();
        return true;
      }
    } catch (error) {
      toast.error('Failed to delete task');
      return false;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      filters,
      setFilters,
      addTask,
      editTask,
      removeTask,
      fetchTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
};