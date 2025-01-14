import React, {useState} from 'react';
import '../Components/Studprofile.css';
import img from '../Images/student1.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Teachnav from './teachernav.jsx';

const StudentInfo = () => {
  
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  
  const handleOutsideClick = (e) => {
    if (!e.target.closest('.student-photo-container')) {
      setShowDropdown(false);
    }
  };

  return (
    <>
    
    <div id='Achivementpage' onClick={handleOutsideClick}>
      
    <div className="Achivementpage">
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
            <div className="box add-notice">
              <div className="content">
              <i className="fas fa-trophy"></i>
                <h3>Add Achivements</h3>
                <p>Add a new achivements.</p>
                <a onClick={() => navigate('/Teacherprofile/Achivementpage/AddAchivements')}>Add Achivements</a>
              </div>
            </div>
          </div>

          <div className="card3">
            <div className="box list-notice">
              <div className="content">
                <i className="fas fa-list-alt"></i>
                <h3>List of Achivement</h3>
                <p>View the list of all achivements.</p>
                <a onClick={() => navigate('/Teacherprofile/Achivementpage/AchivementsList')}>View List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    <ToastContainer />
    </div>
    </>
  );
}

export default StudentInfo;