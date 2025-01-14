import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import img from '../Images/student1.jpeg';
import "./TimeTable.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Studnav from "./studentnav.jsx";

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY



const StudentTimetable = () => {
  const [timetableUrl, setTimetableUrl] = useState(null);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [studentScalss, setstudentScalss] = useState(null);

  // Fetch teacher email from Teachnav component
  const getClass = (sclass) => {
    setstudentScalss(sclass);
  };

  // Fetch timetable on component mount
  useEffect(() => {
    const fetchTimetable = async () => {
      if (!studentScalss) return;

      try {
        const response = await axios.post(`${baseUrl}/principal/getTimetable/`, {
          sclass: studentScalss,
        });
        if (response.data.image) {
          setTimetableUrl(response.data.image);
        } else {
          toast.info("No timetable found for your class.");
        }
      } catch (error) {
        console.error("Error fetching timetable:", error.response?.data || error.message);
        toast.error('Failed to load timetable. Please try again later.');
      }
    };

    fetchTimetable();
  }, [studentScalss]);

  // Toggle dropdown menu
  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Logout logic
  const handleLogout = () => {
    toast.success('Logged out successfully!', {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  // Handle clicks outside the dropdown to close it
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  return (
    <div id="displayStudTT" onClick={handleOutsideClick}>
      {/* Navbar */}
      <div id="teachnav">
        <Studnav getClass={getClass} />
      </div>

      {/* Back button */}
      <div className="format">
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate('/')}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>
      </div>

      {/* Timetable display */}
      <div className="container-fluid">
        <h2>Time Table</h2>
        <div className="table-responsive">
          {timetableUrl ? (
            <img src={timetableUrl} alt="Timetable" className="uploaded-timetable" />
          ) : (
            <p>No timetable uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default StudentTimetable;