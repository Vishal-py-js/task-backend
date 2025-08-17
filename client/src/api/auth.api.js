/**
 * Auth HTTP helpers mapped to backend endpoints:
 * POST /auth/register
 * POST /auth/login
 * POST /auth/logout
 * GET  /auth/me
 *
 * The backend uses httpOnly cookie named `token`.
 * The client only reads the returned user object; cookies are handled by browser.
 */

import axiosClient from './axiosClient';

export const registerApi = (payload) => axiosClient.post('/auth/register', payload);
export const loginApi = (payload) => axiosClient.post('/auth/login', payload);
export const logoutApi = () => axiosClient.post('/auth/logout');
export const meApi = () => axiosClient.get('/auth/me');
