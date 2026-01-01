import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";

import "./App.css";
import { createContext, useState } from "react";
import Admin from "./pages/Admin";
import AddCourse from "./pages/AddCourse";
import AllCourses from "./pages/AllCourses";
import GetAllStudents from "./pages/GetAllStudents";
import GetAllVideos from "./pages/GetAllVideos";
import AddVideo from "./pages/AddVideo";
import DeleteCourse from "./pages/DeleteCourse";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import AdminCourseDetails from "./pages/AdminCourseDetails";
import CourseRegister from "./pages/CourseRegister";
import MyCourses from "./pages/MyCourses";
import MyCourseVideos from "./pages/MyCourseVideos";
import AddVideoForm from "./pages/AddVideoForm";
import AboutUs from "./pages/AboutUs";

import ProfileDropdown from "./components/ProfileDropdown";
import ChangePassword from "./components/ChangePassword";
import UpdateCourse from "./pages/UpdateCourse";
export const LoginContext = createContext();

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <>
      <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />

          <Route
            path="/profile"
            element={loginStatus ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/change-password"
            element={loginStatus ? <ChangePassword /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={loginStatus ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/addcourse"
            element={loginStatus ? <AddCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/allcourses"
            element={loginStatus ? <AllCourses /> : <Navigate to="/" />}
          />
          <Route
            path="/getallstudents"
            element={loginStatus ? <GetAllStudents /> : <Navigate to="/" />}
          />
          <Route
            path="/getallvideos"
            element={loginStatus ? <GetAllVideos /> : <Navigate to="/" />}
          />
          <Route
            path="/addvideo"
            element={loginStatus ? <AddVideo /> : <Navigate to="/" />}
          />
          <Route
            path="/addvideoform/:courseId"
            element={loginStatus ? <AddVideoForm /> : <Navigate to="/" />}
          />
          <Route
            path="/deletecourse"
            element={loginStatus ? <DeleteCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/update-course/:id"
            element={loginStatus ? <UpdateCourse /> : <Navigate to="/" />}
          />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/admincourse/:id" element={<AdminCourseDetails />} />
          <Route path="/course-register" element={<CourseRegister />} />
          <Route path="/my-courses" element={<MyCourses />} />

          <Route
            path="/my-course/:courseId/videos"
            element={<MyCourseVideos />}
          />
        </Routes>
      </LoginContext.Provider>

      <ToastContainer />
    </>
  );
}

export default App;
