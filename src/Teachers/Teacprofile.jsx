import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teacprofile.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY



const StudentInfo = () => {
  const navigate = useNavigate();
  //const [teacherData, setTeacherData] = useState(null);
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

    // Fetch teacher profile based on the teacherEmail
    axios.post(`${baseUrl}/principal/teacher-profile/`, { email: teacherEmail })
      .then(response => {
        setTeacherData(response.data);
      })
      .catch(error => {
        console.error("Error fetching teacher profile:", error);
        toast.error("Failed to fetch teacher data!", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }, [teacherEmail]);

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
    <div id="Teacprofile">
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">{teacherData.name}</h2>
            <p className="student-reg-no">Reg No: {teacherData.regid}</p>
            <p className="student-reg-no">{teacherData.post}</p>
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


      <div className="cards-container">
        <div className="card3">
          <div className="box add-student">
            <div className="content">
              <i className="fas fa-user-plus"></i>
              <h3>Student</h3>
              <p>Add a new student to the system.</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage')}>Add Student</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-notice">
            <div className="content">
              <i className="fas fa-bullhorn"></i>
              <h3>Add Notice</h3>
              <p>Create and publish a new notice.</p>
              <a onClick={() => navigate('/Teacherprofile/Noticepage')}>Add Notice</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>Add Time Table</h3>
              <p>Set up a new class schedule.</p>
              <a onClick={() => navigate('/Teacherprofile/TimeTablepage')}>Add Time Table</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-achievement">
            <div className="content">
              <i className="fas fa-trophy"></i>
              <h3>Add Achievement</h3>
              <p>Record a new student achievement.</p>
              <a onClick={() => navigate('/Teacherprofile/Achivementpage')}>Add Achievement</a>
            </div>
          </div>
        </div>

        <div className="card3">
          <div className="box add-attendance">
            <div className="content">
              <i className="fas fa-check-circle"></i>
              <h3>Add Attendance</h3>
              <p>Mark or update student attendance.</p>
              <a onClick={() => navigate('/Teacherprofile/Attendancepage')}>Add Attendance</a>
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