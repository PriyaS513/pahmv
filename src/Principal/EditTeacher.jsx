
import React, { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Teachers/Form.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY




const EditTeacher = () => {
  const { state } = useLocation();
  const [name, setName] = useState(state.name);
  const [regid, setRegid] = useState(state.regid);
  const [email, setEmail] = useState(state.email);
  const [mobno, setMobno] = useState(state.mobno);
  const [passw, setPassw] = useState(state.passw);
  const [confirmPass, setConfirmPass] = useState(state.confirmPass);
  const [edu, setEdu] = useState(state.edu);
  const [post, setPost] = useState(state.post);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChangeName = (event) => {
    setName(event.target.value);
  };

  const handleInputChangeRegid = (event) => {
    setRegid(event.target.value);
  };

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputChangeMobno = (event) => {
    setMobno(event.target.value);
  };

  const handleInputChangePassw = (event) => {
    setPassw(event.target.value);
  };

  const handleInputChangeConfirmPass = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleInputChangeEdu = (event) => {
    setEdu(event.target.value);
  };

  const handleInputChangePost = (event) => {
    setPost(event.target.value);
  };

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    const fileType = file.type;
    const fileSize = file.size;
  
    if (!["image/jpeg", "image/gif", "image/png"].includes(fileType)) {
      alert("Only JPG, GIF and PNG files are allowed");
      return;
    }
  
    if (fileSize > 819200) {
      alert("File size exceeds 800KB");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm({
      name,
      regid,
      email,
      mobno,
      passw,
      confirmPass,
      edu,
      post,
    });
    if (Object.keys(errors).length === 0) {
      event.preventDefault();
      // Form is valid, show confirmation dialog
      confirmAlert({
        title: 'Confirm to Edit',
        message: 'Are you sure you want to edit this teacher?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              // Form is valid, submit the data
              try {
                const response = await axios.put(`${baseUrl}/principal/edit_teacher/${regid}/`, {
                  name,
                  regid,
                  email,
                  mobno,
                  passw,
                  confirmPass,
                  edu,
                  post,
                  image,
                });
                console.log(response.data);
                // Reset the form data and errors
                resetForm();
              } catch (error) {
                if (error.response && error.response.status === 403) {
                  console.error("Error adding teacher data: Forbidden");
                } else {
                  console.error("Error adding teacher data:", error);
                }
              }
            },
          },
          {
            label: 'No',
            onClick: () => {
              // Do nothing
            },
          },
        ],
      });
    } else {
      setErrors(errors);
    }
  };
  const validateForm = (StudformData) => {
    const errors = {};
  
    if (!StudformData.name) {
      errors.name = "Name is required";
    }
  
    if (!StudformData.regid) {
      errors.regid = "ID is required";
    }
  
    if (!StudformData.mobno) {
      errors.mobno = "Mobile number is required";
    } else if (!/^\d{10}$/.test(StudformData.mobno)) {
      errors.mobno = "Mobile number is invalid";
    }
  
    if (!StudformData.edu) {
      errors.edu = "Education is required";
    }
  
    if (!StudformData.post) {
      errors.post = "Post is required";
    }
  
    if (!StudformData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(StudformData.email)) {
      errors.email = "Email is invalid";
    }
  
    if (!(StudformData.passw || "").trim()) {
      errors.passw = "Password is required";
    } else if (StudformData.passw.length < 8) {
      errors.passw = "Password should be at least 8 characters";
    }
  
    if (!(StudformData.confirmPass || "").trim()) {
      errors.confirmPass = "Confirm Password is required";
    } else if (StudformData.confirmPass !== StudformData.passw) {
      errors.confirmPass = "Password and Confirm Password should be the same";
    }
  
    return errors;
  };
  

  const fileInputRef = useRef(null);
  const boxSize = 80;

  const resetForm = () => {
    setName(state.name);
    setRegid(state.regid);
    setEmail(state.email);
    setPost(state.post);
    setEdu(state.edu);
    setMobno(state.mobno);
    setPassw(state.passw);
    setConfirmPass(state.confirmPass);
    setImage('');
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage('');
    fileInputRef.current.value = null;
  };

  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    // Add logout logic here
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container') && showDropdown) {
      setShowDropdown(false);
    }
  };
  

  return (
    <div id="EditTeac" onClick={handleOutsideClick}>
        <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Principal</p>
          </div>
          <div className="student-photo-container">
        <img
              src={image}
              alt="Student"
              className="student-photo"
              onClick={handlePhotoClick}
            />
            {showDropdown && (
              <div
                className="dropdown-menu">
                <ul>
                  <li>
                    <a >John Doe</a>
                  </li>
                  <li>
                    <a >Reg No: 123456789</a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* < div className="format"> */}
      <div className="home-button-container">
      <button className="home-button" onClick={() => window.history.back()}>
      <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
</button>
      </div>
      <h2 className="heading-teac">Edit Teacher details</h2>
      <form onSubmit={handleSubmit} action="student" method="post" id="student-form">
        <div className="card-body media align-items-center">
          <img
            src={image || "https://bootdey.com/img/Content/avatar/avatar1.png"}
            alt="student"
            className="d-block ui-w-80"
            style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="media-body ml-4">
              <label htmlFor="file-input" className="btn btn-outline-primary">
                Upload New Photo
                <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                ref={fileInputRef}
                accept="image/*"
                aria-label="Upload new photo"
                required
              />
              </label>
              <button
                type="button"
                className="btn btn-default md-btn-flat"
                onClick={resetFormPhoto}
              >
                Reset Photo
              </button>
              <div className="small mt-1">
              Allowed JPG, GIF or PNG. Max size of 800K
            </div>
            </div>
          </div>
        
          <div className="row">
          <div className="col-md-6">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-1"
                id="name-input"
                name="name"
                required
              value={name}
              onChange={handleInputChangeName}
               placeholder="Enter Name"
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
            </div>
            <div className="col-md-6">
          <div className="form-group">
            <label>Registration Id</label>
            <input
              type="text"
              value={regid}
              onChange={handleInputChangeRegid}
              className="form-control"
                id="id-input"
                name="regid"
                required
                placeholder="Enter Reg Id"
            />
            {errors.regid && (
                <div style={{ color: "red" }}>{errors.regid}</div>
              )}
          </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <div className="form-group">
            <label>Email Id</label>
            <input
              type="email"
              className="form-control mb-1"
              id="email-input"
              name="email"
              required
              value={email}
              onChange={handleInputChangeEmail}
              placeholder="Enter Email ID"
            />
            {errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
          </div>
            </div>
            <div className="col-md-6">
          <div className="form-group">
          <label>Mobile No</label>
            <input
              type="tel"
              className="form-control mb-1"
              id="mobile-input"
              name="mobno"
              required
              value={mobno}
              onChange={handleInputChangeMobno}
              placeholder="Enter Mobile No"
            />
            {errors.mobno && (
                <div style={{ color: "red" }}>{errors.mobno}</div>
              )}
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <div className="form-group">
            <label>Education</label>
            <input
              type="text"
              className="form-control"
                id="edu-input"
                name="edu"
                required
              value={edu}
              onChange={handleInputChangeEdu}
              placeholder="Enter Education"
            />
            {errors.edu && <div style={{ color: "red" }}>{errors.edu}</div>}
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
            <label>Post</label>
            <input
              type="text"
              className="form-control mb-1"
                id="post-input"
                name="post"
                required
              value={post}
              onChange={handleInputChangePost}
              placeholder="Enter Post"
            />
            {errors.post && (
                <div style={{ color: "red" }}>{errors.post}</div>
              )}
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
          <div className="form-group">
            <label>Enter Password</label>
            <input
              type="password"
              className="form-control mb-1"
                id="passw-input"
                name="passw"
                required
              value={passw}
              onChange={handleInputChangePassw}
              placeholder="Enter Password"
            />
            {errors.passw && (
                <div style={{ color: "red" }}>{errors.passw}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mb-1"
              id="confirmPass-input"
              name="confirmPass"
              required
              value={confirmPass}
              onChange={handleInputChangeConfirmPass}
              placeholder="Enter Confirm Password"
            />
            {errors.confirmPass && (
                <div style={{ color: "red" }}>{errors.confirmPass}</div>
              )}
            </div>
          </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
            
          <button type="submit" className="btn btn-primary">
            Update Student
          </button>
          <button type="button" className="btn btn-default" onClick={resetForm}>
            Reset Form
          </button>
          
          </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
  };
  
  export default EditTeacher;