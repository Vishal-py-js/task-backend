/**
 * TaskContext manages task list and CRUD actions.
 * - loadTasks(params) for fetch with search/status/pagination
 * - createTask / updateTask / deleteTask
 *
 * Controllers call server endpoints via task.api.js (axiosClient which contains cookies).
 */

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '../api/task.api';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load tasks (supports optional query params)
  const loadTasks = async (params = {}) => {
    console.log("Helllllooooo")
    setLoading(true);
    try {
      const res = await fetchTasksApi(params);
      console.log("hiiiiiiiiiii");
      setTasks(res.data?.data || []);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (payload) => {
    const res = await createTaskApi(payload);
    // Prepend the new task
    setTasks((prev) => [res.data, ...prev]);
    return res;
  };

  const updateTask = async (id, payload) => {
    const res = await updateTaskApi(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    return res;
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, loadTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node
};

export const useTasks = () => useContext(TaskContext);
