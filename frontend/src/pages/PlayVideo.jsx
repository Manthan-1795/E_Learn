import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import { getAllVideoss } from "../services/adminService";

function PlayVideo() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    loadVideo();
  }, []);

  const loadVideo = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getAllVideoss(token);

    if (result.status === "Success") {
      const found = result.data.find((v) => v.video_id === Number(videoId));
      setVideo(found);
    } else {
      toast.error("Video not found");
    }
  };

  if (!video) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  const videoKey = video.youtube_url.split("v=")[1];

  return (
    <>
      <AdminNavbar />

      <div className="container mt-4">
        <h3 className="text-center mb-3">{video.title}</h3>

        <div className="ratio ratio-16x9">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Video Player"
            allowFullScreen
          ></iframe>
        </div>

        <p className="mt-3 text-center text-muted">{video.description}</p>
      </div>
    </>
  );
}

export default PlayVideo;
