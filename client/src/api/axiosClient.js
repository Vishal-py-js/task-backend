/**
 * Central axios instance.
 * - baseURL is taken from Vite env (VITE_API_URL)
 * - withCredentials: true so httpOnly cookie is sent to backend
 * - response interceptor handles 401 globally (redirect to login)
 
 */

import axios from 'axios';

// baseURL should be: http://localhost:5000/api/v1 (as set in client/.env)
const baseURL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Global response interceptor - redirect to login on 401
axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log(window.location.pathname);
    if (err?.response?.status === 401) {
      // If unauthorized, redirect to login. This is a fallback; ProtectedRoute handles most cases.
      // Use full reload to clear any stale client state.
      //window.location.href = '/login';
      if (window.location.pathname !== '/login' || window.location.pathname !== '/register') {
        //window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

// axiosClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default axiosClient;
