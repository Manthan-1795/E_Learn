// src/components/ChangePassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../contex/AuthContext";
import { changePassword } from "../services/userService";
import "./ChangePassword.css";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    try {
      const token = user?.token || sessionStorage.getItem("token");
      const result = await changePassword(newPassword, token);

      if (result?.success || result?.status === "Success") {
        toast.success("Password updated. Please login again.");
        setTimeout(() => {
          logout();
          navigate("/login");
        }, 1200);
      } else {
        toast.error(result?.error || "Failed to update password");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-card">
        <h1 className="change-password-title">Update Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="password-field-group">
            <label className="password-label">New password</label>
            <input
              type="password"
              className="password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="password-field-group">
            <label className="password-label">Confirm password</label>
            <input
              type="password"
              className={`password-input ${
                newPassword &&
                confirmPassword &&
                newPassword !== confirmPassword
                  ? "error"
                  : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="change-password-btn"
            disabled={
              isLoading ||
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
          >
            {isLoading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}
