```jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await axios.post('/api/login', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  const register = async (email, password) => {
    const res = await axios.post('/api/register', { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```
