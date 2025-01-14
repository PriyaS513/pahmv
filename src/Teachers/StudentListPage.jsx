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
    <div id="StudentpageList" onClick={handleOutsideClick}>
   
    <div id="teachnav">
    <Teachnav/>
    </div>
     
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate('/Teacherprofile/Studentpage')}>
        <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
      </div>
      <div className="cards-container">
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>1st Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/1')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>2nd Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/2')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>3rd Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/3')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>4th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/4')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>5th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/5')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>6th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/6')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>7th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/7')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>8th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/8')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>9th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/9')}>View List</a>
            </div>
          </div>
        </div>
        <div className="card3">
          <div className="box timetable">
            <div className="content">
              <i className="fas fa-calendar-alt"></i>
              <h3>10th Class</h3>
              <p>List of Student</p>
              <a onClick={() => navigate('/Teacherprofile/Studentpage/StudentListPage/10')}>View List</a>
            </div>
          </div>
        </div>
      </div>  
      
      <ToastContainer />
    </div>
  );
}

export default StudentInfo;