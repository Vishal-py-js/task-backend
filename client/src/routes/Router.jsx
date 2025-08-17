/**
 * App Router: defines pages and protected routes
 */

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* catch-all could be added */}
      </Routes>
    // </BrowserRouter>
  );
}
