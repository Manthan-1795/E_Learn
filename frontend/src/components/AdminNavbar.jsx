import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user, profile } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarText = user?.email?.slice(0, 2).toUpperCase() || "AD";
  const displayName =
    profile?.user?.name || user?.email?.split("@")[0] || "Admin";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="admin-nav-root">
        <div className="admin-nav-inner">
          {/* ── LOGO ── */}
          <button className="admin-nav-logo" onClick={() => goTo("/admin")}>
            <span className="admin-nav-logo-icon">⚙️</span>
            Admin<span className="admin-nav-logo-accent">Panel</span>
            <span className="admin-nav-badge">Admin</span>
          </button>

          {/* ── DESKTOP LINKS ── */}
          <div className="admin-nav-links">
            {/* Courses Dropdown */}
            <AdminDropdown label="Courses">
              <AdminDropItem
                icon="📋"
                label="Get All Courses"
                active={isActive("/allcourses")}
                onClick={() => goTo("/allcourses")}
              />
              <AdminDropItem
                icon="➕"
                label="Add Course"
                active={isActive("/addcourse")}
                onClick={() => goTo("/addcourse")}
              />
              {/* <AdminDropItem
                icon="🗑️"
                label="Delete Course"
                active={isActive("/deletecourse")}
                onClick={() => goTo("/deletecourse")}
              /> */}
            </AdminDropdown>

            {/* Videos Dropdown */}
            <AdminDropdown label="Videos">
              <AdminDropItem
                icon="🎥"
                label="Get All Videos"
                active={isActive("/getallvideos")}
                onClick={() => goTo("/getallvideos")}
              />
              <AdminDropItem
                icon="📤"
                label="Add Videos"
                active={isActive("/addvideo")}
                onClick={() => goTo("/addvideo")}
              />
            </AdminDropdown>

            {/* Students Dropdown */}
            <AdminDropdown label="Students">
              <AdminDropItem
                icon="👥"
                label="Get All Students"
                active={isActive("/getallstudents")}
                onClick={() => goTo("/getallstudents")}
              />
            </AdminDropdown>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="admin-nav-right">
            {/* User pill */}
            {user && (
              <div className="admin-nav-user">
                <div className="admin-nav-avatar">{avatarText}</div>
                <span className="admin-nav-user-name">{displayName}</span>
              </div>
            )}

            {/* Logout button */}
            <button className="admin-nav-logout-btn" onClick={handleLogout}>
              <span>🚪</span>
              <span>Log Out</span>
            </button>

            {/* Hamburger */}
            <button
              className={`admin-nav-hamburger${mobileOpen ? " admin-nav-hamburger--open" : ""}`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`admin-nav-mobile${mobileOpen ? " admin-nav-mobile--open" : ""}`}
      >
        {/* Courses */}
        <div className="admin-nav-mobile-section-title">Courses</div>
        <button
          className={`admin-nav-mobile-item${isActive("/allcourses") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/allcourses")}
        >
          <span>📋</span> Get All Courses
        </button>
        <button
          className={`admin-nav-mobile-item${isActive("/addcourse") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/addcourse")}
        >
          <span>➕</span> Add Course
        </button>
        <button
          className={`admin-nav-mobile-item${isActive("/deletecourse") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/deletecourse")}
        >
          <span>🗑️</span> Delete Course
        </button>

        {/* Videos */}
        <div className="admin-nav-mobile-section-title">Videos</div>
        <button
          className={`admin-nav-mobile-item${isActive("/getallvideos") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/getallvideos")}
        >
          <span>🎥</span> Get All Videos
        </button>
        <button
          className={`admin-nav-mobile-item${isActive("/addvideo") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/addvideo")}
        >
          <span>📤</span> Add Videos
        </button>

        {/* Students */}
        <div className="admin-nav-mobile-section-title">Students</div>
        <button
          className={`admin-nav-mobile-item${isActive("/getallstudents") ? " admin-nav-mobile-item--active" : ""}`}
          onClick={() => goTo("/getallstudents")}
        >
          <span>👥</span> Get All Students
        </button>

        <div className="admin-nav-mobile-divider" />

        {/* User info */}
        {user && (
          <div className="admin-nav-mobile-user">
            <div className="admin-nav-avatar">{avatarText}</div>
            <div>
              <div className="admin-nav-mobile-user-name">{displayName}</div>
              <div className="admin-nav-mobile-user-email">{user.email}</div>
            </div>
          </div>
        )}

        {/* Logout */}
        <button className="admin-nav-mobile-logout" onClick={handleLogout}>
          <span>🚪</span> Log Out
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="admin-nav-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

/* ── Dropdown sub-components ── */

function AdminDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="admin-nav-dropdown-wrap" ref={ref}>
      <button
        className={`admin-nav-dropdown-btn${open ? " admin-nav-dropdown-btn--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <svg
          className={`admin-nav-chevron${open ? " admin-nav-chevron--open" : ""}`}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && <div className="admin-nav-dropdown">{children}</div>}
    </div>
  );
}

function AdminDropItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`admin-nav-dropdown-item${active ? " admin-nav-dropdown-item--active" : ""}`}
      onClick={onClick}
    >
      <span className="admin-nav-dropdown-item-icon">{icon}</span>
      {label}
    </button>
  );
}
