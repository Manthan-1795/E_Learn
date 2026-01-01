// src/context/AuthContext.jsx (complete updated code)
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, getProfile } from '../services/userService'; // 🆕 Import

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);  // 🆕 Profile data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ 
          email: payload.email, 
          role: payload.role,
          token 
        });
        
        const profileData = await getProfile(token);
        if (profileData.status === "Success") {
          setProfile(profileData.data);
        }
      } catch (error) {
        sessionStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      
      if (response.status === "Success") {
        const { token } = response.data;
        sessionStorage.setItem('token', token);
        
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ 
          email: payload.email, 
          role: payload.role,
          token 
        });
        
        // Profile bhi fetch kar le
        const profileData = await getProfile(token);
        setProfile(profileData.data);
        
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
