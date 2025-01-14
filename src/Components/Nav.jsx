import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Logo from '../Images/logo1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Nav() {
  const [menu, setMenu] = useState("Home");
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // Adjust the timeout as needed
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navbar) {
      document.body.classList.add('navbar-open');
    } else {
      document.body.classList.remove('navbar-open');
    }
  }, [navbar]);
  
  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '75px',
    backgroundColor: isScrolled ? '#2f61ac' : 'transparent',
    color: isScrolled ? '#fff' : '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1050, // Ensure navbar has a high z-index
  };

  return (
    <>
      <div className={`page-overlay ${navbar ? 'show' : ''}`} />

      <nav className={`navbar fixed-top navbar-expand-lg ${navbar ? "navbar-open" : ""}`} style={navStyle}>
        <a className="navbar-brand">
          <img src={Logo} className="logo" alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setNavbar(!navbar)}
          style={{ color: (isScrolled || navbar) ? '#fff' : '#000', border: "none", outline: "none" }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <div className={`collapse navbar-collapse ${navbar ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link onClick={() => { handleScroll("home"); setMenu("Home"); setNavbar(false); }} className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => { handleScroll("about_section"); setMenu("About"); setNavbar(false); }} className="nav-link text-white" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => { handleScroll("notice_section"); setMenu("Notice"); setNavbar(false); }} className="nav-link text-white" to="/notice">Notice Board</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => { handleScroll("contact"); setMenu("Contact"); setNavbar(false); }} className="nav-link text-white" to="/contact">Contact</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link onClick={() => { handleScroll("student"); setMenu("Student"); setNavbar(false); }} className="nav-link text-white" to="/student">Student Portal</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => { handleScroll("teacher"); setMenu("Teacher"); setNavbar(false); }} className="nav-link text-white" to="/teacher">Teacher Portal</Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => { handleScroll("achivement-section"); setMenu("Achievement"); setNavbar(false); }} className="nav-link text-white" to="/achivement">Achievements</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
