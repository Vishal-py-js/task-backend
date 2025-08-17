/**
 * ProtectedRoute guards routes requiring authentication.
 * - If auth is still loading, show spinner
 * - If not authenticated, redirect to /login
 * - Otherwise render children
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  console.log(user, loading);

  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}