import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import { addCourse } from "../services/adminService";
import { useNavigate } from "react-router-dom";

function AddCourse() {
  const navigate = useNavigate();

  const [course_name, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fees, setFees] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [video_expire_days, setVideoExpireDays] = useState("");

  const addCourses = async (e) => {
    e.preventDefault();

    // Validation
    if (!course_name.trim()) {
      toast.warn("Course name must be entered");
      return;
    }
    if (!description.trim()) {
      toast.warn("Description must be entered");
      return;
    }
    if (!fees || isNaN(fees) || Number(fees) <= 0) {
      toast.warn("Fees must be a positive number");
      return;
    }
    if (!start_date) {
      toast.warn("Start date must be entered");
      return;
    }
    if (!end_date) {
      toast.warn("End date must be entered");
      return;
    }
    if (new Date(end_date) < new Date(start_date)) {
      toast.warn("End date cannot be before start date");
      return;
    }
    if (
      !video_expire_days ||
      isNaN(video_expire_days) ||
      Number(video_expire_days) <= 0
    ) {
      toast.warn("Video expire days must be a positive number");
      return;
    }

    // Submit
    try {
      const res = await addCourse(
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days
      );

      if (res.status === "Success") {
        toast.success("Course added successfully");
        navigate("/allcourses");
      } else {
        toast.error(res.message || "Failed to add course");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Add Course</h2>

        <form onSubmit={addCourses}>
          <div className="mb-3">
            <label className="form-label">Course Name</label>
            <input
              type="text"
              className="form-control"
              value={course_name}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fees</label>
            <input
              type="number"
              className="form-control"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={start_date}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">End Date</label>
            <input
              type="date"
              className="form-control"
              value={end_date}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Video Expire Days</label>
            <input
              type="number"
              className="form-control"
              value={video_expire_days}
              onChange={(e) => setVideoExpireDays(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
