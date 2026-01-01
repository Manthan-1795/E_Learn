import React, { use, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProfile } from "../services/userService";

function Profile() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log(`Profile Loaded`);
    getDetails();
  }, []);

  const getDetails = async () => {
    const token = sessionStorage.getItem("token");
    const result = await getProfile(token);
    if (result.status == "Success") {
      const user = result.data[0];
      setEmail(user.email);
      setRole(user.role);
    } else {
      console.log(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome To Your Profile</h1>
      <div className="container">
        <div className="row">
          <div className="mt-3 col-4">
            <div className="card" style={{ width: "20rem" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ height: "2rem" }}>
                  {email}
                </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {role}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
