import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "../contex/AuthContext";
import "./Navbar.css";
import "./profiledropdown.css";
import "./ChangePassword.css";

export default function Navbar() {
  const { user, loading } = useAuth();

  // Show default "normal" navbar initially
  const isAdmin = user && user.role === "admin";

  return (
    <nav
      style={{
        width: "100%",
        borderRadius: "35px",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
      }}
      className="navbar navbar-light bg-white ud-navbar"
    >
      <div className="container-xxl">
        {/* LEFT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          <Link
            className="navbar-brand ud-logo"
            to={isAdmin ? "/admin" : "/home"}
          >
            E‑Learn
          </Link>
        </div>

        {/* CENTER - Search */}
        <form className="ud-search">
          <input
            className="form-control"
            type="search"
            placeholder="Search for anything"
          />
        </form>

        {/* RIGHT group */}
        <div className="d-flex align-items-center gap-3 flex-shrink-0">
          {isAdmin ? (
            <>
              {/* Admin menus */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Courses
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/allcourses">
                      Get All Courses
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/addcourse">
                      Add Course
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/deletecourse">
                      Delete Course
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Videos
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/getallvideos">
                      Get All Videos
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/addvideo">
                      Add Videos
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Students
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/getallstudents">
                      Get All Students
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Default normal user navbar */}
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Courses
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/courses">
                      Get All Courses
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/my-courses">
                      My Courses
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="d-flex align-items-center gap-3 flex-shrink-0">
                <Link
                  className="navbar-brand ud-logo"
                  to={isAdmin ? "/admin" : "/aboutus"}
                >
                  About Us
                </Link>
              </div>
            </>
          )}

          {/* Profile / Login */}
          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline-dark ud-auth-btn d-none d-md-inline-block"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
