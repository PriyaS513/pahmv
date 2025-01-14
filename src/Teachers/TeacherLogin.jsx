import React from "react";
import Nav from "../Components/Nav.jsx";
import Teacher from "../Teachers/Teacher.jsx";


function TeacherPortal() {
  return (
    <>
      <Nav />
      <div id="teacher">
        <Teacher />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default TeacherPortal;