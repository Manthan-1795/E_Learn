import AdminNavbar from "../components/AdminNavbar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addVideos } from "../services/adminService";
import { useNavigate, useParams } from "react-router-dom";

function AddVideoForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [course_id, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [youtube_url, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setCourseId(courseId);
  }, [courseId]);

  const addvid = async (e) => {
    e.preventDefault();

    if (!title || !youtube_url || !description) {
      toast.warn("All fields are required");
      return;
    }

    try {
      const res = await addVideos(course_id, title, youtube_url, description);

      if (res.status === "Success") {
        toast.success("Video added successfully");
        navigate("/addvideo");
      } else {
        toast.error(res.error || "Failed to add video");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Add Video</h2>

        <form onSubmit={addvid}>
          <div className="mb-3">
            <label className="form-label">Course ID</label>
            <input
              type="number"
              className="form-control"
              value={course_id}
              disabled
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Video Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">YouTube URL</label>
            <input
              type="text"
              className="form-control"
              value={youtube_url}
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Video
          </button>
        </form>
      </div>
    </>
  );
}

export default AddVideoForm;
