
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Components/Student.css';
import Lottie from "lottie-react";
import text from "../assets/login.json";
import img from "../Images/carousel3.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY


const authCredentials = {
  principal: {
    email: "priya@gmail.com",
    password: "Pass@123"
  }
};

const Student = () => {
  const [action, setAction] = useState("Teacher");
  const [formData, setFormData] = useState({
    teacherEmail: '',
    teacherPassword: '',
  });
  const [principalData, setPrincipalData] = useState({
    principalEmail: '',
    principalPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (action === "Teacher") {
      setFormData({ ...formData, [name]: value });
    } else {
      setPrincipalData({ ...principalData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (action === "Teacher") {
      // Validate Teacher form
      if (!formData.teacherEmail.trim()) {
        validationErrors.teacherEmail = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.teacherEmail)) {
        validationErrors.teacherEmail = "Email is not valid";
      }
      if (!formData.teacherPassword.trim()) {
        validationErrors.teacherPassword = "Password is required";
      } else if (formData.teacherPassword.length < 8) {
        validationErrors.teacherPassword = "Password should be at least 8 characters";
      }

      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        try {
          const credentials = {
            email: formData.teacherEmail,
            password: formData.teacherPassword,
          };
          const response = await axios.post(`${baseUrl}/principal/login/`, credentials);

          if (response.status === 200) {
            toast.success("Teacher Login Successful!");
            localStorage.setItem("teacherEmail", formData.teacherEmail);
            setTimeout(() => navigate("/Teacherprofile"), 2000);
          }
        } catch (error) {
          toast.error("Invalid email or password!");
        }
      }
    } else if (action === "Principal") {
      // Validate Principal form
      if (!principalData.principalEmail.trim()) {
        validationErrors.principalEmail = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(principalData.principalEmail)) {
        validationErrors.principalEmail = "Email is not valid";
      }
      if (!principalData.principalPassword.trim()) {
        validationErrors.principalPassword = "Password is required";
      }

      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        if (
          principalData.principalEmail === authCredentials.principal.email &&
          principalData.principalPassword === authCredentials.principal.password
        ) {
          toast.success("Principal Login Successful!");
          setTimeout(() => navigate("/Principalprofile"), 2000);
        } else {
          toast.error("Invalid Principal credentials!");
        }
      }
    }
  };

  const handleForgotPassword = () => {
    navigate("/Forgot");
  };

  return (
    <form onSubmit={handleSubmit} id="teacher">
      <div className="login-page">
        <div className="box container">
          <div className="login-left">
            <img src={img} className="background-image" />
            <div className="stud">Teachers Login</div>
            <div className="text stud-1">{action}</div>
            <div className="underline"></div>
            <div className="submit-container">
              <div className="hover-effect">
                <div className={action === "Principal" ? "submit gray" : "submit"} onClick={() => { setAction("Teacher") }}>Teacher's Login</div>
              </div>
              <div className="hover-effect">
                <div className={action === "Teacher" ? "submit gray" : "submit"} onClick={() => { setAction("Principal") }}>Principal's Login</div>
              </div>
            </div>
            {action === "Teacher" ? (
              <div>
                <div className="input_box">
                  <input type="email" name="teacherEmail" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
                  {errors.teacherEmail && <span>{errors.teacherEmail}</span>}
                </div>
                <div className="input_box">
                  <input type="password" name="teacherPassword" placeholder="Password" onChange={handleChange} />
                  {errors.teacherPassword && <span>{errors.teacherPassword}</span>}
                </div>
                <div className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?<span>Click Here</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="input_box">
                  <input type="email" name="principalEmail" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
                  {errors.principalEmail && <span>{errors.principalEmail}</span>}
                </div>
                <div className="input_box">
                  <input type="password" name="principalPassword" placeholder="Password" onChange={handleChange} />
                  {errors.principalPassword && <span>{errors.principalPassword}</span>}
                </div>
                <div className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?<span>Click Here</span>
                </div>
              </div>
            )}
            <div className="submit">
              <button type="submit">Login</button>
            </div>
          </div>
          <div className="login-right">
            <Lottie animationData={text} loop={true} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Student;
