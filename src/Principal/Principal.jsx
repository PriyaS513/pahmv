import React, {useState} from 'react';
import "../Teachers/Teacprofile.css";
import img from "../Images/student1.jpeg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div id="Teacprofile" onClick={handleOutsideClick}>
      <div className="student-info-container">
        <div className="student-navbar">
          <div className="student-details">
            <h2 className="student-name">John Doe</h2>
            <p className="student-reg-no">Reg No: 123456789</p>
            <p className="student-reg-no">Principal</p>
          </div>
          <div className="student-photo-container">
        <img
              src={img}
              alt="Student"
              className="student-photo"
              onClick={handlePhotoClick}
            />
            {showDropdown && (
              <div
                className="dropdown-menu">
                <ul>
                  <li>
                    <a>John Doe</a>
                  </li>
                  <li>
                    <a>Reg No: 123456789</a>
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

        <div className="cards-container">
          <div className="card3">
            <div className="box add-teacher">
              <div className="content">
                <i className="fas fa-chalkboard-teacher"></i>
                <h3>Add Teacher</h3>
                <p>Add a new teacher to the system.</p>
                <a onClick={() => navigate('/Principalprofile/Addteacher')}>
                  Add Teacher
                </a>
              </div>
            </div>
          </div>

          <div className="card3">
            <div className="box list-teacher">
              <div className="content">
                <i className="fas fa-users"></i>
                <h3>List of Teacher</h3>
                <p>View the list of all teachers.</p>
                <a onClick={() => navigate('/Principalprofile/TeacherList')}>
                  View List
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentInfo;