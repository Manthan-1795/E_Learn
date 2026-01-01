import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllCourses, updateCourse } from "../services/courseService";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    course_name: "",
    description: "",
    fees: "",
    start_date: "",
    end_date: "",
    video_expire_days: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllCourses(token);

    if (result.status === "Success" && result.data) {
      const selectedCourse = result.data.find(
        (e) => String(e.course_id) === String(id)
      );

      if (selectedCourse) {
        setCourse({
          course_name: selectedCourse.course_name,
          description: selectedCourse.description,
          fees: selectedCourse.fees,
          start_date: selectedCourse.start_date.split("T")[0], // Format for input
          end_date: selectedCourse.end_date.split("T")[0],
          video_expire_days: selectedCourse.video_expire_days,
        });
      }
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await updateCourse(id, course);

    if (result.status === "Success") {
      toast.success("Course updated successfully!");
      navigate("/admincourse/" + id);
    } else {
      toast.error(result.error || "Failed to update course");
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-header bg-primary text-white text-center">
                <h3>Update Course</h3>
              </div>

              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="course_name"
                      value={course.course_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={course.description}
                      onChange={handleChange}
                      rows="3"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Fees</label>
                    <input
                      type="number"
                      className="form-control"
                      name="fees"
                      value={course.fees}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="start_date"
                      value={course.start_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      value={course.end_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Video Expire Days</label>
                    <input
                      type="number"
                      className="form-control"
                      name="video_expire_days"
                      value={course.video_expire_days}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Update Course
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-lg"
                      onClick={() => navigate("/admincourse/" + id)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCourse;
