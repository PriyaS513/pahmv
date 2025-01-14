import React, { useState, useEffect } from 'react';
import './Studprofile.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY



const StudentInfo = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const studentRegid = localStorage.getItem("studentRegid");

  useEffect(() => {
    if (!studentRegid) {
      toast.error('No student Register Id found!', {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Fetch student profile based on the studentEmail
    axios.post(`${baseUrl}/Teachers/student-profile/`, { regid: studentRegid })
      .then(response => {
        setStudentData(response.data);
      })
      .catch(error => {
        console.error("Error fetching student profile:", error);
        toast.error("Failed to fetch student data!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }, [studentRegid]);

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

  if (!studentData) {
    return <p>Loading...</p>;
  }

  return (
    <div id="Studprofile">
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">{studentData.name}</h2>
            <p className="student-reg-no">Reg No: {studentData.regid}</p>
            <p className="student-reg-no">{studentData.sclass}</p>
          </div>
          <div className="student-photo-container">
          <img
  src={studentData.image ? studentData.image : img}
  alt="Teacher"
  className="student-photo"
  onClick={handlePhotoClick}
/>            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li>{studentData.name}</li>
                  <li>Reg No: {studentData.regid}</li>
                  <li>Class: {studentData.sclass}</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="cards-container">
          <div className="card3">
            <div className="box attendance">
              <div className="content">
                <i className="fas fa-calendar-check"></i>
                <h3>Attendance</h3>
                <p>Your attendance details.</p>
                <a onClick={() => navigate('/Studentprofile/Attendance')}>View Attendance</a>
              </div>
            </div>
          </div>

          <div className="card3">
            <div className="box timetable">
              <div className="content">
                <i className="fas fa-calendar-alt"></i>
                <h3>Time Table</h3>
                <p>Your class schedule.</p>
                <a onClick={() => navigate('/Studentprofile/TimeTable')}>View Time Table</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StudentInfo;
