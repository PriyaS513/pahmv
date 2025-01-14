import React from "react";
import Nav from "./Nav.jsx";
import Student from "./Student.jsx";
import Footer from "./Footer.jsx";

function StudentPortal() {
  return (
    <>
      <Nav />
      <div id="student">
        <Student />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default StudentPortal;