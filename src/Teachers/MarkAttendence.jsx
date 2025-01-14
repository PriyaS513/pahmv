import React, { useState } from 'react';
import './MarkAttendence.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Teachnav from "./teachernav.jsx";
import QrScanner from 'react-qr-scanner';

const isDevelopment = import.meta.env.MODE === 'development';
const baseUrl = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

function MarkAttendance() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [webCamResult, setWebCamResult] = useState("");

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

  const webcamScan = (result) => {
    if (result) {
      const [mobile, regId] = result.split("-");
      setWebCamResult(mobile);
      sendSMS(mobile, regId);
      toast.success('Attendance marked successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const sendSMS = (mobile, regId) => {
    axios.post(`${baseUrl}/Teachers/sendsms/`, {
      mobile_number: mobile,
      regid: regId,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div id="MarkAttendance" onClick={handleOutsideClick}>
      <div id="teachnav">
        <Teachnav />
      </div>
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/Attendancepage')}>
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <div className="attendence">
        <div className='webcam'>
          <div>
            <h3>Webcam</h3>
            <QrScanner
              onScan={webcamScan}
              onError={() => console.log('Error occurred while scanning QR code')}
            />
            <h6>Mob No: {webCamResult}</h6>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MarkAttendance;