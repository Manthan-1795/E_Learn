// src/components/ProfileDropdown.jsx
import React, { useState } from "react";
import "./profiledropdown.css";

import { KeyRound, Package, LogOut, ChevronRight, User } from "lucide-react";
import { useAuth } from "../contex/AuthContext";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService"; // 🆕 Import

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, logout } = useAuth(); // 🆕 profile mil gaya!
  const navigate = useNavigate();

  const avatarText = user?.email?.slice(0, 2).toUpperCase() || "WL";

  const handleChangePassword = () => {
    setIsOpen(false);
    navigate("/change-password");
  };

  const handlePurchases = () => {
    setIsOpen(false);
    navigate("/purchases");
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-link d-flex align-items-center p-2"
      >
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          {avatarText}
        </div>
      </button>

      {isOpen && (
        <div
          className="dropdown-menu show position-absolute end-0 mt-2"
          style={{ width: "20rem", zIndex: 1050 }}
        >
          {/* Profile Header */}
          <div className="p-3 border-bottom">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary bg-gradient text-white d-flex align-items-center justify-content-center fw-bold"
                style={{ width: "3rem", height: "3rem" }}
              >
                {avatarText}
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  {profile?.user?.name || "User"}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                {profile?.user?.mobile && (
                  <p className="text-xs text-gray-400">{profile.user.mobile}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-3">
            <button
              onClick={handleChangePassword}
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between p-3 mb-2"
            >
              <KeyRound size={20} className="text-primary me-3" />
              <span>Change Password</span>
              <ChevronRight size={16} />
            </button>

            <button
              onClick={handlePurchases}
              className="btn btn-outline-success w-100 d-flex align-items-center justify-content-between p-3 mb-2"
            >
              <Package size={20} className="text-success me-3" />
              <span>Purchases ({profile?.enrolledCourses?.length || 0})</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="border-top p-3">
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger w-100 d-flex align-items-center p-3"
            >
              <LogOut size={20} className="me-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
