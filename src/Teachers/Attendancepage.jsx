import React, {useState} from 'react';
import '../Components/Studprofile.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Teachnav from "./teachernav.jsx";

const StudentInfo = () => {
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
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  return (
    <div id="Attendancepage" onClick={handleOutsideClick}>
       <div id="teachnav">
    <Teachnav/>
    </div>
     
        
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate('/Teacherprofile')}>
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>
        <div className="cards-container">
          <div className="card3">
            <div className="box add-attendance">
              <div className="content">
                <i className="fas fa-calendar-check"></i>
                <h3>Scan And Mark Student Attendance</h3>
                <p>Add attendance details.</p>
                <a onClick={() => navigate('/Teacherprofile/Attendancepage/MarkAttendance')}>Add Attendance</a>
              </div>
            </div>
          </div>
        </div>
      
      <ToastContainer />
    </div>
  );
}

export default StudentInfo;