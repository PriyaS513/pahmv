import React from "react";
import "./Footer.css";
import logo from "../Images/logo1.png"

const Footer = () => {
  return (
    <footer>
        <div className="container-footer">
            <div className="row1">
                  <div className="col logo hover-effect">
                      <img src={logo} alt="" className="logo" />
                      <p>
                      Punyashlok Ahilyadevi Holkar Madhyamik Vidyalaya in Ankai, Maharashtra, offers exceptional education and holistic development for student success.
                      </p>        
                  </div>
                  <div className="col services hover-effect">
                     <h3>Services</h3>
                     <div className="links">
                        <a href="/">Tutoring</a>
                        <a href="/">Academic Support</a>
                        <a href="/">Extracurricular Activities</a>
                        <a href="/">College and Career Readiness</a>
                     </div>
                  </div>
                  <div className="col useful-links hover-effect">
                     <h3>Links</h3>
                     <div className="links">
                        <a href="/about">About</a>
                        <a href="/notice">Notices</a>
                        <a href="/achivement">Achivements</a>
                        <a href="/contact">Help</a>
                     </div>
                  </div>
                  <div className="col contact hover-effect">
                      <h3>Contact</h3>
                      <div className="contact-details">
                         <p>Punyashlok Ahilyadevi Holkar Madhamik Vidyalya Ankai, Maharashtra, 423104</p>      
                         <p>+91-8755856858</p>
                         <p>Email : pahmvankai@gmail.com</p>
                      </div>
                  </div>
            </div>
        </div>
     </footer>
  );
}

export default Footer;
