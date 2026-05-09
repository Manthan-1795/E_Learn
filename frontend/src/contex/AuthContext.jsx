// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getProfile } from "../services/userService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser({
          email: payload.email,
          role: payload.role,
          token,
        });

        const profileData = await getProfile(token);
        if (profileData.status === "Success") {
          setProfile(profileData.data);
        }
      } catch (error) {
        // Invalid token — wipe everything
        sessionStorage.clear();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);

      if (response.status === "Success") {
        const { token } = response.data;

        // Clear any stale data first, then set fresh values
        sessionStorage.clear();
        sessionStorage.setItem("token", token);

        const payload = JSON.parse(atob(token.split(".")[1]));
        sessionStorage.setItem("email", payload.email);

        setUser({
          email: payload.email,
          role: payload.role,
          token,
        });

        const profileData = await getProfile(token);
        if (profileData.status === "Success") {
          setProfile(profileData.data);
        }

        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  };

  const logout = () => {
    // Clear EVERYTHING from sessionStorage — no stale email/token left behind
    sessionStorage.clear();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
