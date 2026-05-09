import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = user?.role === "admin";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const avatarText = user?.email?.slice(0, 2).toUpperCase() || "??";
  const displayName =
    profile?.user?.name || user?.email?.split("@")[0] || "User";

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="nav-root">
        <div className="nav-inner">
          {/* ── LOGO ── */}
          <Link
            to={isAdmin ? "/admin" : "/home"}
            className="nav-logo"
            onClick={() => setMobileOpen(false)}
          >
            <span className="nav-logo-icon">📚</span>
            E‑Learn<span className="nav-logo-accent">Hub</span>
          </Link>

          {/* ── DESKTOP LINKS ── */}
          <div className="nav-links">
            {isAdmin ? (
              <>
                <NavDropdown label="Courses">
                  <DropItem to="/allcourses" icon="📋">
                    All Courses
                  </DropItem>
                  <DropItem to="/addcourse" icon="➕">
                    Add Course
                  </DropItem>
                  <DropItem to="/deletecourse" icon="🗑️">
                    Delete Course
                  </DropItem>
                </NavDropdown>
                <NavDropdown label="Videos">
                  <DropItem to="/getallvideos" icon="🎥">
                    All Videos
                  </DropItem>
                  <DropItem to="/addvideo" icon="📤">
                    Add Video
                  </DropItem>
                </NavDropdown>
                <NavDropdown label="Students">
                  <DropItem to="/getallstudents" icon="👥">
                    All Students
                  </DropItem>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavDropdown label="Courses">
                  <DropItem to="/courses" icon="🌐">
                    Browse Courses
                  </DropItem>
                  {user && (
                    <DropItem to="/my-courses" icon="🎓">
                      My Courses
                    </DropItem>
                  )}
                </NavDropdown>
                <Link
                  to="/aboutus"
                  className={`nav-link${isActive("/aboutus") ? " nav-link--active" : ""}`}
                >
                  About Us
                </Link>
              </>
            )}
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="nav-right">
            {user ? (
              <div className="nav-profile" ref={profileRef}>
                <button
                  className="nav-avatar-btn"
                  onClick={() => setProfileOpen((o) => !o)}
                  aria-label="Profile menu"
                >
                  <div className="nav-avatar">{avatarText}</div>
                  <span className="nav-avatar-name">{displayName}</span>
                  <svg
                    className={`nav-chevron${profileOpen ? " nav-chevron--open" : ""}`}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="nav-dropdown nav-profile-menu">
                    {/* Header */}
                    <div className="nav-profile-header">
                      <div className="nav-profile-avatar-lg">{avatarText}</div>
                      <div>
                        <div className="nav-profile-name">{displayName}</div>
                        <div className="nav-profile-email">{user.email}</div>
                        <span
                          className={`nav-profile-badge${isAdmin ? " nav-profile-badge--admin" : ""}`}
                        >
                          {isAdmin ? "Admin" : "Student"}
                        </span>
                      </div>
                    </div>

                    <div className="nav-dropdown-divider" />

                    {/* Menu items */}
                    {!isAdmin && (
                      <button
                        className="nav-dropdown-item"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/my-courses");
                        }}
                      >
                        <span className="nav-dropdown-item-icon">🎓</span>
                        My Courses
                        {profile?.enrolledCourses?.length > 0 && (
                          <span className="nav-dropdown-item-count">
                            {profile.enrolledCourses.length}
                          </span>
                        )}
                      </button>
                    )}

                    <button
                      className="nav-dropdown-item"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("/change-password");
                      }}
                    >
                      <span className="nav-dropdown-item-icon">🔑</span>
                      Change Password
                    </button>

                    <div className="nav-dropdown-divider" />

                    <button
                      className="nav-dropdown-item nav-dropdown-item--danger"
                      onClick={handleLogout}
                    >
                      <span className="nav-dropdown-item-icon">🚪</span>
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="nav-btn-outline">
                  Log in
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className={`nav-hamburger${mobileOpen ? " nav-hamburger--open" : ""}`}
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
      <div className={`nav-mobile${mobileOpen ? " nav-mobile--open" : ""}`}>
        {isAdmin ? (
          <>
            <MobileSection title="Courses">
              <MobileItem to="/allcourses" onClick={() => setMobileOpen(false)}>
                All Courses
              </MobileItem>
              <MobileItem to="/addcourse" onClick={() => setMobileOpen(false)}>
                Add Course
              </MobileItem>
              <MobileItem
                to="/deletecourse"
                onClick={() => setMobileOpen(false)}
              >
                Delete Course
              </MobileItem>
            </MobileSection>
            <MobileSection title="Videos">
              <MobileItem
                to="/getallvideos"
                onClick={() => setMobileOpen(false)}
              >
                All Videos
              </MobileItem>
              <MobileItem to="/addvideo" onClick={() => setMobileOpen(false)}>
                Add Video
              </MobileItem>
            </MobileSection>
            <MobileSection title="Students">
              <MobileItem
                to="/getallstudents"
                onClick={() => setMobileOpen(false)}
              >
                All Students
              </MobileItem>
            </MobileSection>
          </>
        ) : (
          <>
            <MobileItem to="/courses" onClick={() => setMobileOpen(false)}>
              Browse Courses
            </MobileItem>
            {user && (
              <MobileItem to="/my-courses" onClick={() => setMobileOpen(false)}>
                My Courses
              </MobileItem>
            )}
            <MobileItem to="/aboutus" onClick={() => setMobileOpen(false)}>
              About Us
            </MobileItem>
          </>
        )}

        <div className="nav-mobile-divider" />

        {user ? (
          <>
            <div className="nav-mobile-user">
              <div className="nav-avatar nav-avatar--sm">{avatarText}</div>
              <div>
                <div className="nav-mobile-user-name">{displayName}</div>
                <div className="nav-mobile-user-email">{user.email}</div>
              </div>
            </div>
            <MobileItem
              to="/change-password"
              onClick={() => setMobileOpen(false)}
            >
              🔑 Change Password
            </MobileItem>
            <button
              className="nav-mobile-logout"
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
            >
              🚪 Log Out
            </button>
          </>
        ) : (
          <div className="nav-mobile-auth">
            <Link
              to="/login"
              className="nav-btn-outline nav-btn--full"
              onClick={() => setMobileOpen(false)}
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="nav-btn-solid nav-btn--full"
              onClick={() => setMobileOpen(false)}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="nav-overlay" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}

/* ── Helper sub-components ── */

function NavDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="nav-dropdown-wrap" ref={ref}>
      <button
        className={`nav-link nav-link--dropdown${open ? " nav-link--active" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        {label}
        <svg
          className={`nav-chevron${open ? " nav-chevron--open" : ""}`}
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
      {open && <div className="nav-dropdown">{children}</div>}
    </div>
  );
}

function DropItem({ to, icon, children }) {
  return (
    <Link to={to} className="nav-dropdown-item">
      {icon && <span className="nav-dropdown-item-icon">{icon}</span>}
      {children}
    </Link>
  );
}

function MobileSection({ title, children }) {
  return (
    <div className="nav-mobile-section">
      <div className="nav-mobile-section-title">{title}</div>
      {children}
    </div>
  );
}

function MobileItem({ to, children, onClick }) {
  return (
    <Link to={to} className="nav-mobile-item" onClick={onClick}>
      {children}
    </Link>
  );
}
