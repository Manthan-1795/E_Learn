import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold">Learn Skills That Matter 🚀</h1>
            <p className="text-muted mt-3">
              Upgrade your skills with industry-ready courses designed for
              students and professionals.
            </p>

            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate("/courses")}
            >
              Explore Courses
            </button>
          </div>

          <div className="col-md-6 text-center">
            <div
              className="bg-light rounded p-5"
              style={{ fontSize: "18px", fontWeight: "600" }}
            >
              Learning Platform Image
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h5>📚 Quality Content</h5>
            <p className="text-muted">
              Courses curated by experienced mentors.
            </p>
          </div>

          <div className="col-md-4">
            <h5>🎥 Video Learning</h5>
            <p className="text-muted">Learn anytime with recorded sessions.</p>
          </div>

          <div className="col-md-4">
            <h5>💼 Career Ready</h5>
            <p className="text-muted">Skills aligned with industry needs.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
