import React, { useState } from "react";
import "./Student.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import text from "../assets/login.json";
import img from "../Images/carousel3.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const isDevelopment=import.meta.env.MODE==='development'
const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY

const Student = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validation for username
    if (!formData.username.trim()) {
      validationErrors.username = "UserId is required";
    } else if (!formData.username) {
      validationErrors.username = "UserId must be in the format of userId@pahmv.com";
    }

    // Validation for password
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password = "Password should be at least 8 characters";
    }

    setErrors(validationErrors);

    // If no validation errors, send API request
    if (Object.keys(validationErrors).length === 0) {
      try {
        const credentials = {
          regid: formData.username,
          password: formData.password,
        };

        const response = await axios.post(`${baseUrl}/student/login/`, credentials);


        if (response.status === 200) {
          toast.success("Logged In Successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
          localStorage.setItem("studentRegid", formData.username);
          setTimeout(() => navigate("/Studentprofile"), 2000);
        }
      } catch (error) {
        toast.error("Invalid username or password!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} id="student">
      <div id="studentlogin">
        <div className="login-page">
          <img src={img} className="background-image" alt="background" />
          <div className="box container">
            <div className="login-left">
              <div className="stud">Student Login</div>
              <div className="text stud-1">{action}</div>
              <div className="underline"></div>

              <div className="input_box">
                <input
                  type="text"
                  name="username"
                  placeholder="Student Regester ID"
                  autoComplete="off"
                  onChange={handleChange}
                />
                {errors.username && <span>{errors.username}</span>}
              </div>

              <div className="input_box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
              </div>
              <div className="submit-container">
                <button
                  className={action === "Login" ? "submit1" : "submit gray"}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="login-right">
              <Lottie animationData={text} loop />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Student;
