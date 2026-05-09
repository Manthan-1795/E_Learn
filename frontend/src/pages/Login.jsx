import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "./../App";
import { useAuth } from "../contex/AuthContext";
import "./Login.css";
import heroImg from "../assets/hero-Img.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setLoginStatus } = useContext(LoginContext);
  const { login: authLogin, user } = useAuth();

  // If already logged in, redirect to correct page
  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else navigate("/home");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    if (!email) {
      toast.warn("Email must be entered");
      return;
    }
    if (!password) {
      toast.warn("Password must be entered");
      return;
    }

    setIsLoading(true);
    const result = await authLogin(email, password);
    setIsLoading(false);

    if (result.success) {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Login failed: no token returned");
        return;
      }

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
      toast.error(result.error || "Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-illustration">
        <img src={heroImg} alt="Online learning" className="login-image" />
        <h1 className="login-brand">E‑Learn Hub</h1>
        <p className="login-tagline">
          Continue your learning journey with top mentors.
        </p>
      </div>

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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              disabled={isLoading}
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
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              disabled={isLoading}
            />
          </div>

          <button
            className="login-button"
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="login-hint">
            <span className="login-hint-icon">💡</span>
            New student default password:&nbsp;<strong>student</strong>
          </div>

          <div className="login-footer">
            Just browsing?&nbsp;
            <Link
              to={user?.role === "admin" ? "/admin" : "/home"}
              className="login-link"
            >
              {user
                ? user.role === "admin"
                  ? "Go to Admin Panel"
                  : "Go to Home"
                : "Go to Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
