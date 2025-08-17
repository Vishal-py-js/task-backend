/**
 * AuthContext provides:
 * - user: current user object or null
 * - loading: whether we are checking session
 * - register(), login(), logout()
 *
 * On mount it calls GET /auth/me to restore session from httpOnly cookie.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { registerApi, loginApi, logoutApi, meApi } from '../api/auth.api';
import PropTypes from 'prop-types';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // while verifying session
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // let mounted = true;

  // useEffect(() => {
  //   if (token) {
  //     setUser(JSON.parse(localStorage.getItem("user"))); // optional
  //   }
  // }, [token]);

  // useEffect(() => {
  //   let mounted = true;
  //   const checkSession = async () => {
  //     try {
  //       const res = await meApi();
  //       if (!mounted) return;
  //       setUser(res.data);
  //     } catch (err) {
  //       // not logged in or session expired
  //       setUser(null);
  //     } finally {
  //       if (mounted) setLoading(false);
  //     }
  //   };
  //   checkSession();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

  const register = async (payload) => {
    // payload = { name, email, password }
    const res = await registerApi(payload);
    setUser(res.data); // server returns sanitized user
    return res;
  };

  const login = async (payload) => {
    // payload = { email, password }
    const res = await loginApi(payload);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data); // server returns sanitized user
    return res;
  };

  const logout = async () => {
    try {
      await logoutApi();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      // clear local user state regardless of server response
      setUser(null);
      // redirect to login will be handled by caller
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

// Hook for components
export const useAuth = () => useContext(AuthContext);