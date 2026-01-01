import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerCourseService } from "../services/courseService";
import { toast } from "react-toastify";

function CourseRegister() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const loggedEmail = sessionStorage.getItem("email");

  const [name, setName] = useState("");
  const [email, setEmail] = useState(loggedEmail || "");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state?.courseId) {
      navigate("/courses");
    }
  }, [state, navigate]);

  useEffect(() => {
    if (loggedEmail) {
      setEmail(loggedEmail);
    }
  }, [loggedEmail]);

  const registerCourse = async () => {
    if (!name || !email || !mobile) {
      toast.warn("Please fill all fields");
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
        toast.warn("User already registered for this course");
        setLoading(false);
        return;
      }

      if (result.status === "success" || result.data?.affectedRows === 1) {
        toast.success("Course registered successfully");
        navigate("/my-courses");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.log("REGISTER ERROR:", error);
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

            <input
              className="form-control mb-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                const value = e.target.value;

                // Allow only letters and spaces
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setName(value);
                }
              }}
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
              disabled={!!loggedEmail}
            />

            <input
              className="form-control mb-3"
              placeholder="Mobile (10 digits)"
              type="tel"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
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
