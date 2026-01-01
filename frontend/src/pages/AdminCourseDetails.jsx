import React, { useEffect, useState } from "react";
import { getAllCourses } from "../services/courseService";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    console.log("API RESULT:", result);
    console.log("URL ID:", id);

    if (!result || !result.data) {
      console.log("No data received");
      return;
    }

    const selectedCourse = result.data.find(
      (e) => String(e.course_id) === String(id)
    );

    console.log("MATCHED COURSE:", selectedCourse);

    setCourse(selectedCourse);
  };

  if (!course) {
    return (
      <>
        <AdminNavbar />
        <h4 className="text-center mt-5 text-danger">Course Expired !!!</h4>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0">
              {/* Image Section */}
              <div
                className="d-flex align-items-center justify-content-center bg-light"
                style={{ height: "220px", fontSize: "22px", fontWeight: "600" }}
              >
                Course Image
              </div>

              {/* Content */}
              <div className="card-body p-4">
                <h2 className="text-center mb-3">{course.course_name}</h2>

                <p className="text-muted text-center mb-4">
                  {course.description}
                </p>

                <div className="row mb-4">
                  <div className="col-6">
                    <p>
                      <strong>Start Date:</strong>
                      <br />
                      {new Date(course.start_date).toDateString()}
                    </p>
                  </div>
                  <div className="col-6">
                    <p>
                      <strong>End Date:</strong>
                      <br />
                      {new Date(course.end_date).toDateString()}
                    </p>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h4 className="text-success">₹ {course.fees}</h4>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => navigate(`/update-course/${id}`)}
                  >
                    Update Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
