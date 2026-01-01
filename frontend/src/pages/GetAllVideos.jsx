import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getAllVideos } from "../services/adminService";

// Convert YouTube URL to Embed URL
function toEmbedUrl(url) {
  if (!url) return "";

  if (url.includes("embed")) return url;

  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    id = url.split("watch?v=")[1].split("&")[0];
  }

  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function GetAllVideos() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("all");

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const result = await getAllVideos();
      if (result.status === "Success") {
        setVideos(result.data);
        setFilteredVideos(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseFilter = (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);

    if (courseId === "all") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        (v) => String(v.course_id) === String(courseId)
      );
      setFilteredVideos(filtered);
    }
  };

  // Get unique course IDs for the dropdown
  const courseOptions = [...new Set(videos.map((v) => v.course_id))];

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3 className="mb-4 text-center">All Course Videos</h3>

        {/* Filter by Course */}
        <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
          <span className="fw-semibold">Filter by Course:</span>
          <select
            className="form-select w-auto"
            value={selectedCourse}
            onChange={handleCourseFilter}
          >
            <option value="all">All Courses</option>
            {courseOptions.map((id) => (
              <option key={id} value={id}>
                Course {id}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading videos...</p>
        ) : filteredVideos.length === 0 ? (
          <p className="text-muted text-center">No videos available.</p>
        ) : (
          <div className="row g-4">
            {filteredVideos.map((v) => (
              <div key={v.video_id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h6 className="text-center">{v.title}</h6>
                    <p className="text-muted small text-center flex-grow-1">
                      {v.description}
                    </p>
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={toEmbedUrl(v.youtube_url)}
                        title={v.title}
                        allowFullScreen
                      />
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

export default GetAllVideos;
