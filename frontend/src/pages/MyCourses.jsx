import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { mycourses } from "../services/courseService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyCourses();
  }, []);

  const loadMyCourses = async () => {
    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem("token");

    if (!email || !token) {
      toast.error("Please login to view your courses");
      navigate("/");
      return;
    }

    try {
      const result = await mycourses(email, token);
      console.log("MY COURSES RESULT:", result);

      if (result.status === "success") {
        setCourses(result.data);
      }
    } catch (err) {
      console.log("ERROR:", err);
      toast.error("Failed to load courses");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3 className="mb-4">My Registered Courses</h3>

        {loading ? (
          <p>Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-muted">No courses registered.</p>
        ) : (
          <div className="row g-4">
            {courses.map((c) => (
              <div key={c.course_id} className="col-md-4">
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5>{c.course_name}</h5>
                    <p className="text-muted">{c.description}</p>
                    <strong>₹ {c.fees}</strong>

                    <div className="mt-3">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          navigate(`/my-course/${c.course_id}/videos`)
                        }
                      >
                        View Videos
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyCourses;
