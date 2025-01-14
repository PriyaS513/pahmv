import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nav.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY


function Teachnav({ getEmail }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const teacherEmail = localStorage.getItem("teacherEmail");

  useEffect(() => {
    if (!teacherEmail) {
      toast.error('No teacher email found!', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    axios.post(`${baseUrl}/principal/teacher-profile/`, { email: teacherEmail })
      .then(response => {
        setTeacherData(response.data);
        if (typeof getEmail === 'function') {
          getEmail(teacherEmail); // Pass teacher email to StudentTimetable
        } else {
          //console.error('getEmail is not a function');
        }
      })
      .catch(error => {
        console.error("Error fetching teacher profile:", error);
        toast.error("Failed to fetch teacher data!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }, [teacherEmail, getEmail]);

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    toast.success('Logout Successfully!', {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!teacherData) {
    return <p>Loading...</p>;
  }

  return (
    <div id="teachnav">
      <div className="student-navbar">
        <div className="student-details">
          <h2 className="student-name">{teacherData.name}</h2>
          <p className="student-reg-no">Reg No: {teacherData.regid}</p>
          <p className="student-reg-no">{teacherData.post}</p>
          <p className="student-reg-no">{teacherData.email}</p>
        </div>
        <div className="student-photo-container">
          <img
            src={teacherData.image ? teacherData.image : img}
            alt="Teacher"
            className="student-photo"
            onClick={handlePhotoClick}
          />
          {showDropdown && (
            <div className="dropdown-menu">
              <ul>
                <li>{teacherData.name}</li>
                <li>{teacherData.email}</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teachnav;