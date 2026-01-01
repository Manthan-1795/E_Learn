import config from "./config";
import axios from "axios";

export async function getAllCourses(token) {
  const URL = config.BASE_URL + "/courses/all-active-courses";

  const res = await axios.get(URL, {
    headers: {
      token: token,
    },
  });

  return res.data;
}

export async function mycourses(email) {
  const URL = config.BASE_URL + `/students/my-courses/${email}`;
  const token = sessionStorage.getItem("token");

  const res = await axios.get(URL, {
    headers: {
      token: token,
    },
  });
  return res.data;
}

export async function registerCourseService(data) {
  const URL = config.BASE_URL + "/students/register-to-course";

  const token = sessionStorage.getItem("token");

  const res = await axios.post(URL, data, {
    headers: {
      token: token,
    },
  });

  return res.data;
}

export async function myCourseVideos() {
  const URL = config.BASE_URL + "/students/my-course-with-videos";

  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("token");

  const res = await axios.get(URL, {
    headers: {
      email: email,
      token: token,
    },
  });

  return res.data;
}

export async function updateCourse(course_id, courseData) {
  const URL = config.BASE_URL + `/courses/update/${course_id}`;
  const token = sessionStorage.getItem("token");

  const res = await axios.put(URL, courseData, {
    headers: {
      token: token,
    },
  });

  return res.data;
}
