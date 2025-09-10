import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // {user_id, username, role}
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', data.token);
    const decoded = jwtDecode(data.token);
    setUser({ user_id: decoded.id, username: decoded.username, role: decoded.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  // Restore session on page refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUser({ user_id: decoded.id, username: decoded.username, role: decoded.role });
      } else {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
