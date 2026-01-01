// src/components/AdminNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
  };

  return (
    <nav
      className="navbar navbar-light bg-white ud-navbar"
      style={{
        width: "100%",
        borderRadius: "35px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="container-xxl">
        {/* LEFT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <button
            className="btn btn-link navbar-brand ud-logo"
            onClick={() => goTo("/admin")}
          >
            Admin Panel
          </button>
        </div>

        {/* RIGHT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          {/* Courses Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Courses
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => goTo("/allcourses")}
                >
                  Get All Courses
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => goTo("/addcourse")}
                >
                  Add Course
                </button>
              </li>
            </ul>
          </div>

          {/* Videos Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Videos
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => goTo("/getallvideos")}
                >
                  Get All Videos
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => goTo("/addvideo")}
                >
                  Add Videos
                </button>
              </li>
            </ul>
          </div>

          {/* Students Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Students
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => goTo("/getallstudents")}
                >
                  Get All Students
                </button>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <button
            className="btn ud-auth-btn--primary d-none d-md-inline-block"
            onClick={() => goTo("/login")}
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}
