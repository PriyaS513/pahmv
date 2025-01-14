import React from "react";
import Nav from "./Nav.jsx";
import Forgot from "./Forgot.jsx";
import Footer from "./Footer.jsx";

function ForgotPassword() {
  return (
    <>
      <Nav />
      <div id="forgot-password">
        <Forgot />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default ForgotPassword;