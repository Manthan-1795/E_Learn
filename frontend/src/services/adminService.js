import axios from "axios";
import config from "./config";

export async function addCourse(
  course_name,
  description,
  fees,
  start_date,
  end_date,
  video_expire_days
) {
  const URL = config.BASE_URL + "/courses/add";
  const token = sessionStorage.getItem("token");

  return (
    await axios.post(
      URL,
      {
        course_name,
        description,
        fees,
        start_date,
        end_date,
        video_expire_days,
      },
      { headers: { token } }
    )
  ).data;
}

export async function deleteCourses(course_id) {
  const URL = config.BASE_URL + `/courses/delete/${course_id}`;
  const token = sessionStorage.getItem("token");
  const result = await axios.delete(URL, {
    headers: { token },
  });
  return result.data;
}

export async function getAllVideoss(token) {
  const URL = config.BASE_URL + "/video/all-videos";

  const res = await axios.get(URL, {
    headers: { token },
  });

  return res.data;
}

export async function addVideos(course_id, title, youtube_url, description) {
  const URL = config.BASE_URL + "/video/add";
  const token = sessionStorage.getItem("token");

  const response = await axios.post(
    URL,
    { course_id, title, youtube_url, description },
    { headers: { token } }
  );

  return response.data;
}

export async function getAllVideos() {
  const url = config.BASE_URL + "/video/all-videos";

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");

  const response = await axios.get(url, {
    headers: { email, token },
  });

  return response.data;
}

// ✅ Add this function to fetch all courses
export async function getAllCourses() {
  const token = sessionStorage.getItem("token"); // optional if your backend requires
  const url = config.BASE_URL + "/courses/all"; // make sure your backend route exists

  const response = await axios.get(url, {});

  return response.data;
}

export async function getStudents(course_id = null) {
  const token = sessionStorage.getItem("token");

  const response = await axios.get(
    config.BASE_URL + "/admin/enrolledstudents",
    {
      headers: { token },
      params: course_id ? { course_id } : {},
    }
  );

  return response.data;
}
