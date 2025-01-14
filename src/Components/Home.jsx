import React from "react";
import Nav from "../Components/Nav.jsx";
import Carousel from "../Components/Carousel.jsx";
import Notice from "./Notice.jsx";
import About from "./Aboutus.jsx";
import Achivement from "./Achivements.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

function Home() {
  return (
    <>
      <Nav />
      <div id="home">
        <Carousel  />
      </div>
      <div id="notice_section">
        <Notice />
      </div>
      <div id="about_section">
        <About />
      </div>
      <div id="achivement-section">
        <Achivement />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default Home;