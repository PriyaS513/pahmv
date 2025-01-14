import React, { useState, useRef } from 'react';
import axios from "axios";
import '../Components/Studprofile.css';
import './TimeTable.css';
import img from '../Images/TimeTable.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import imgLogo from '../Images/student1.jpeg';
import Teachnav from "./teachernav.jsx";

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY


function StudentTimeTable() {
  const [image, setImage] = useState(null);
  const [timetableData, setTimeTable] = useState({ email: "" });
  const [SelfTimeTable, setSelfTimeTable] = useState({ image: null });
  const [errors, setErrors] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
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
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  const handleInputChangePhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      if (!['image/jpeg', 'image/gif', 'image/png'].includes(fileType)) {
        alert('Only JPG, GIF and PNG files are allowed');
        return;
      }

      if (fileSize > 819200) {
        alert('File size exceeds 800KB');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setSelfTimeTable({ ...SelfTimeTable, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTimeTable({ ...timetableData, [name]: value });
    setErrors({});
  };

  const resetFormPhoto = () => {
    setImage(null);
    setSelfTimeTable({ image: null });
    fileInputRef.current.value = null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!SelfTimeTable.image || !timetableData.email) {
      setErrors({ name: "Please fill all fields and upload a valid image." });
      return;
    }
    //const formData = new FormData();
    console.log(image);

    confirmAlert({
      title: 'Confirm to upload',
      message: 'Are you sure to upload your time table?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const formDataToSend = new FormData();
            formDataToSend.append("image", image);
            formDataToSend.append("email", timetableData.email);
            

            try {
              await axios.post(`${baseUrl}/principal/add_timetable/`, formDataToSend, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              toast.success('Time table uploaded successfully!');
              resetFormPhoto();
            } catch (error) {
              if (error.response && error.response.status === 403) {
                toast.error('Error: Forbidden.');
              } else {
                toast.error('Error uploading time table.');
              }
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div id="SelfTT" className="containerTT" onClick={handleOutsideClick}>
       <div id="teachnav">
    <Teachnav/>
    </div>
     
      
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate('/Teacherprofile/TimeTablepage')}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>

        <h2 className="text-center mb-4">Upload Student Time Table</h2>
        <form onSubmit={handleSubmit} id="self-tt" className="form-container">
          <div className="form-group d-flex flex-column align-items-center">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="email"
                  value={timetableData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
              </div>
            </div>

            <label htmlFor="file-input" className="btn btn-outline-primary upload-button">
              Upload new photo
              <input
                type="file"
                className="account-settings-fileinput"
                id="file-input"
                name="image"
                onChange={handleInputChangePhoto}
                ref={fileInputRef}
                accept="image/*"
                required
              />
            </label>

            <button type="button" className="btn btn-default reset-button" onClick={resetFormPhoto}>
              Reset
            </button>
          </div>

          <div className="small mt-1 allowed-types">Allowed JPG, GIF or PNG. Max size of 800K</div>
          <div className="image-preview">
            <img src={image || img} alt="preview" className="preview-image" />
          </div>

          <button type="submit" className="btn btn-primary submit-button mt-4">
            Upload
          </button>
        </form>
      
      <ToastContainer />
    </div>
  );
}

export default StudentTimeTable;
