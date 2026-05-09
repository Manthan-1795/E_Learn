import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerCourseService } from "../services/courseService";
import { useAuth } from "../contex/AuthContext";
import { toast } from "react-toastify";

function CourseRegister() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const loggedEmail = user?.email || "";
  const loggedName = profile?.user?.name || "";

  const [name, setName] = useState(loggedName);
  const [email, setEmail] = useState(loggedEmail);
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.courseId) {
      navigate("/courses");
    }
  }, [state, navigate]);

  useEffect(() => {
    setEmail(user?.email || "");
    setName(profile?.user?.name || "");
  }, [user, profile]);

  const registerCourse = async () => {
    if (!name.trim()) {
      toast.warn("Please enter your name");
      return;
    }
    if (!email) {
      toast.warn("Please enter your email");
      return;
    }
    if (!mobile) {
      toast.warn("Please enter your mobile number");
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      toast.warn("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    try {
      const result = await registerCourseService({
        name,
        email,
        course_id: state.courseId,
        mobile_no: mobile,
      });

      if (result.status === "exists") {
        toast.warn("You are already registered for this course");
        setLoading(false);
        return;
      }

      if (result.status === "success") {
        toast.success(
          user
            ? "Course registered successfully!"
            : "Course registered successfully! Login with password: student",
        );
        navigate("/my-courses");
      } else if (result.error) {
        toast.error("Registration failed: " + JSON.stringify(result.error));
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="col-md-8 mx-auto">
          <div className="card mb-4">
            <table className="table mb-0">
              <tbody>
                <tr>
                  <th>Course Name</th>
                  <td>{state?.courseName}</td>
                </tr>
                <tr>
                  <th>Fees (₹)</th>
                  <td>{state?.fees}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Register to Course</h3>

            {!user && (
              <div className="alert alert-info mb-3">
                <strong>Note:</strong> A login account will be created
                automatically with default password: <strong>student</strong>
              </div>
            )}

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setName(value);
                }
              }}
              disabled={loading}
            />

            <input
              className="form-control mb-3"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => {
                if (!loggedEmail) {
                  setEmail(e.target.value);
                }
              }}
              disabled={!!loggedEmail || loading}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile (10 digits)"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              disabled={loading}
            />

            <button
              className="btn btn-info btn-lg text-white"
              onClick={registerCourse}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseRegister;
