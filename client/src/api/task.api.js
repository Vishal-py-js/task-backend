/**
 * Task endpoints (server side enforces auth & ownership).
 *
 * GET    /tasks
 * POST   /tasks
 * GET    /tasks/:id
 * PUT    /tasks/:id
 * DELETE /tasks/:id
 */

import axiosClient from './axiosClient';

export const fetchTasksApi = (params) => axiosClient.get('/tasks', { params });
export const createTaskApi = (payload) => axiosClient.post('/tasks', payload);
export const updateTaskApi = (id, payload) => axiosClient.put(`/tasks/${id}`, payload);
export const deleteTaskApi = (id) => axiosClient.delete(`/tasks/${id}`);
