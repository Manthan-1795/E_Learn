import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { getStudents } from "../services/adminService";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CourseSearch from './../components/button';

function GetAllStudent() {
  const [students, setStudents] = useState([]);
  const location = useLocation();


  const params = new URLSearchParams(location.search);
  const courseId = params.get("course_id"); 

  useEffect(() => {
    loadStudents(courseId);
  }, [courseId]);

  const loadStudents = async (cid = null) => {
    try {
      const result = await getStudents(cid);

      if (result.status === "Success") {
        setStudents(result.data);
      } else {
        toast.error("Failed to load students");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <>
      <AdminNavbar />
      <br>
      </br>
      <CourseSearch />
      <div className="container mt-4">
        <div className="card shadow-sm border-0">
          <div className="card-body">

            <h4 className="mb-3">
              Enrolled Students
              {courseId && (
                <span className="text-muted ms-2">
                  (Course ID: {courseId})
                </span>
              )}
            </h4>

            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((s, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.course_id}</td>
                      <td>{s.course_name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  );
}

export default GetAllStudent;
