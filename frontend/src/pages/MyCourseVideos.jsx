import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { myCourseVideos } from "../services/courseService";

// Convert YouTube URL to Embed URL
function toEmbedUrl(url) {
  if (!url) return "";

  // Already embed
  if (url.includes("embed")) return url;

  let id = "";
  if (url.includes("youtu.be/")) {
    id = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    id = url.split("watch?v=")[1].split("&")[0];
  }

  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function MyCourseVideos() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, [courseId]);

  const loadVideos = async () => {
    try {
      const result = await myCourseVideos();

      if (result.status === "Success") {
        const filtered = result.data.filter(
          (v) => String(v.course_id) === String(courseId)
        );
        setVideos(filtered);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h3 className="mb-4 text-center">Course Videos</h3>

        {loading ? (
          <p className="text-center">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-muted text-center">
            No videos available for this course.
          </p>
        ) : (
          <div className="row g-4">
            {videos.map((v) => (
              <div key={v.video_id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h6 className="text-center">{v.title}</h6>

                    <p className="text-muted small text-center flex-grow-1">
                      {v.description || "No description available"}
                    </p>

                    <div className="ratio ratio-16x9">
                      <iframe
                        src={toEmbedUrl(v.youtube_url)}
                        title={v.title}
                        allowFullScreen
                      ></iframe>
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

export default MyCourseVideos;
