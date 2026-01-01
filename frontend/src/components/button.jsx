import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CourseSearch() {
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate();

  // 🔹 allow numbers only
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCourseId(value);
    }
  };

  // 🔹 ENTER key search
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && courseId !== "") {
      navigate(`/getallstudents?course_id=${courseId}`);
    }
  };

  // 🔹 Button click search
  const handleSearchClick = () => {
    if (courseId !== "") {
      navigate(`/getallstudents?course_id=${courseId}`);
    }
  };

  return (
    <div className="d-flex gap-2 align-items-center">
      <input
        type="text"
        className="form-control w-25"
        placeholder="Add Filter by Course ID"
        value={courseId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>
  );
}

export default CourseSearch;
