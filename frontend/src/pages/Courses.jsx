import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../services/userService";

function Courses() {
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    const result = await getCourses();

    if (result.status === "Success") {
      setCourse(result.data);
    } else {
      toast.error(result.error || "Failed to load courses");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <div className="row g-4">
          {course.map((e) => (
            <div
              key={e.course_id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div className="card h-100 shadow-sm border-0">
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ height: "180px", fontWeight: "600" }}
                >
                  Course Image
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{e.course_name}</h5>

                  <p className="text-muted text-center flex-grow-1">
                    {e.description}
                  </p>

                  <h6 className="text-center mb-3">₹ {e.fees}</h6>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/course/${e.course_id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
