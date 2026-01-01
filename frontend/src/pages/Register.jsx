import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerUser } from "../services/userService";
import "./Auth.css";
import heroImg from "../assets/hero-Img.png";

function Register() {
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const signup = async () => {
    console.log(`email : ${email}`);
    console.log(password);
    if (name == "") {
      toast.warn("name must be entered");
    } else if (email == "") {
      toast.warn("email must be entered");
    } else if (password == "") {
      toast.warn("password must be entered");
    } else if (mobile == "") {
      toast.warn("mobile must be entered");
    } else {
      const result = await registerUser(name, email, password, mobile);
      console.log(result);
      if (result.status == "Success") {
        toast.success("Registration successful");
        navigator("/");
      } else {
        toast.error(result.data);
      }
    }
  };

  return (
    <div className="auth-page">
            <div className="auth-illustration">
            <img src={heroImg} alt="Online learning" className="auth-image" />   
              <h1 className="auth-title">
                Become placement‑ready
                <br /> with industry‑level courses.
              </h1>
      
              <p className="auth-subtitle">
                Master real projects, build a strong portfolio, and learn directly
                from working engineers — all in one place.
              </p>
            </div>
      <div className="auth-form-wrapper">
      <div className="auth-card">
      <h2 className="auth-heading">Sign up with email</h2>

        <div className="field">
        <input
        type="text"
        className="form-control modern-input"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        
            <div className="field">
              <input
                type="email"
                className="form-control modern-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="password"
                className="form-control modern-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="field">
              <input
                type="tel"
                className="form-control modern-input"
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>





               don't have an account ? To Create Account{" "}
               <Link to="/login">Click Here</Link>
            
            </div>

      </div> 
 

      </div>
      
      

    </div>

  );
}

export default Register;
