import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { LoginContext } from "./../App";
import { useAuth } from "../contex/AuthContext";
import "./Login.css";
import heroImg from "../assets/hero-Img.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginContext);
  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    if (!email) {
      toast.warn("Email must be entered");
      return;
    }
    if (!password) {
      toast.warn("Password must be entered");
      return;
    }

    const result = await authLogin(email, password);

    if (result.success) {
      // Get token from sessionStorage (already saved by authLogin)
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Login failed: no token returned");
        return;
      }

      // Decode token to get email and role
      const payload = JSON.parse(atob(token.split(".")[1]));
      sessionStorage.setItem("email", payload.email);

      setLoginStatus(true);
      toast.success("Login successful");

      if (payload.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      {/* Left illustration */}
      <div className="login-illustration">
        <img src={heroImg} alt="Online learning" className="login-image" />
        <h1 className="login-brand">E‑Learn Hub</h1>
        <p className="login-tagline">
          Continue your learning journey with top mentors.
        </p>
      </div>

      {/* Right form */}
      <div className="login-form-wrapper">
        <div className="login-card">
          <h2 className="login-heading">Log in to your account</h2>
          <p className="login-subheading">
            Welcome back! Please enter your details.
          </p>

          <div className="login-form-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label className="login-label">Password</label>
            <input
              type="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="button" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
