import React, { useState, useRef } from "react";
import "./AddAchivements.css";
import axios from "axios";
import img from "../Images/student1.jpeg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import trophy from "../Images/trophy.png";
import Teachnav from "./teachernav.jsx";

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY


function AddAchivements() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    title: "",
    content: "",
    //image: null,
  });

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

  const handleInputChangeAchivement = (event) => {
    if (event.target.name === "image") {
      setData({
        ...data,
        image: event.target.files[0],
      });
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
    setErrors({});
  };

  const handleSubmitAchivement = async (event) => {
    event.preventDefault();
    const errors = ValidateAchivement(data);
    if (Object.keys(errors).length === 0) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("title", data.title);
        formDataToSend.append("content", data.content);
        if (image){
          formDataToSend.append("image", image);}

// Debugging: Check FormData content
        for (const [key, value] of formDataToSend.entries()) {
         console.log(`${key}: ${value}`);
        }


        await axios.post(
          `${baseUrl}/home/add_achievement/`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        toast.success("Achievement added successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
  
        resetFormAchivement();
       // navigate("/Teacherprofile/Achivementpage");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unexpected error occurred!";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      setErrors(errors);
    }
  };
  
  const ValidateAchivement = (data) => {
    const errors = {};
    if (!data.title) {
      errors.title = "Title is required";
    }
    if (!data.content) {
      errors.content = "Content is required";
    }
    return errors;
  };

  const resetFormAchivement = () => {
    setImage(null);
    setData({
      title: "",
      content: "",
      image: null,
    });
    setErrors({});
    fileInputRef.current.value = "";
  };

  const resetFormPhoto = () => {
    setImage('');
    fileInputRef.current.value = null;
  };

  return (
    <div id="AddAchivements" onClick={handleOutsideClick}>
       <div id="teachnav">
    <Teachnav/>
    </div>
     
        
        
              <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/Teacherprofile/Achivementpage")}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <div className="achivement">
        <h1 className="heading-achivement">Add Achievements</h1>
        <div className="achivement-form-container">
          <form onSubmit={handleSubmitAchivement}>
            <div className="left-side">
              <img
                src={image || trophy}
                alt="photo"
                className="d-block ui-w-80"
              />
              <label htmlFor="file-input" className="btn btn-outline-primary">
                Upload new photo
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
                Reset
              </button>
              <div className="small mt-1">
                Allowed JPG, GIF or PNG. Max size of 800K
              </div>
            </div>
            <div className="right-side">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="achivementTitle"
                  name="title"
                  placeholder="Enter Achievement title"
                  value={data.title}
                  onChange={handleInputChangeAchivement}
                  required
                />
                {errors.title && (
                  <div style={{color: "red"}}>{errors.title}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="achivementContent"
                  name="content"
                  rows="5"
                  placeholder="Enter Achievement content"
                  value={data.content}
                  onChange={handleInputChangeAchivement}
                  required
                ></textarea>
                {errors.content && (
                  <div style={{color: "red"}}>{errors.content}</div>
                )}
              </div>
              <div className="save">
                <button type="submit" className="btn btn-primary submit3">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddAchivements;
