import React, { useState } from "react";
import "./Contact.css";
import img3 from "../Images/contact3.jpg";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Display one item at a time on mobile devices
    },
  };

  return (
    <div id="contact" responsive={responsive}>
      <header>
        <h1 className="Heading-contact text-center hover-effect">Contact Us</h1>
      </header>
      <div className="containerContact" id="contact-section">
        <div className="row2">
          <div className="contact-left contact-cl-1">
            <div className="card-contact hover-effect">
              <div className="card-body-contact">
                <h5 className="card-title text-center" style={{ color: "black" }}>
                  Fill the form
                </h5>
                <form action="https://api.web3forms.com/submit" method="POST">
                  <input
                    type="hidden"
                    name="access_key"
                    value="8b127829-cc47-4f06-bb44-d8b2abff73aa"
                  />
                  <div className="form-group3">
                    <input
                      type="text"
                      className="form-control contact-input"
                      id="name"
                      name="name"
                      value={name}
                      placeholder="Enter Name"
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group3">
                    <input
                      type="email"
                      className="form-control contact-input"
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Enter Email"
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group3">
                    <textarea
                      className="form-control contact-input"
                      id="message"
                      name="message"
                      value={message}
                      placeholder="Enter Message"
                      onChange={(event) => setMessage(event.target.value)}
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block contact-input submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="contact-right contact-cl-2">
            <figure>
              <img src={img3} className="imgclass" alt="Contact" />
              <div className="overlay">
                <figcaption>
                  <p className="para">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "blue" }}
                    />{" "}
                    Punyashlok Ahilyadevi Holkar Madhamik Vidyalaya Ankai, Ankai
                    Tal, Yeola District, Nashik, Maharashtra, 423104
                    <br />
                    <FontAwesomeIcon icon={faPhoneAlt} style={{ color: "blue" }} /> +91 8755856858
                    <br />
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "blue" }} /> pahmvankai@gmail.com
                    <br />
                    <a href="https://facebook.com">
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="social-icon"
                      />
                    </a>
                    <a href="https://instagram.com">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="social-icon"
                      />
                    </a>
                    <a href="https://twitter.com">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="social-icon"
                      />
                    </a>
                  </p>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>

        <div className="map-section-contact">
          <div className="gmap-frame">
            <iframe
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=Ankai%20Tal,%20Yeola%20District,%20Nashik,%20Maharashtra,%20423104+(Punyashlok%20Ahilyadevi%20Holkar%20Madhamik%20Vidyalaya%20Ankai)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="School Location"
            >
              <a href="https://www.gps.ie/">gps vehicle tracker</a>
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
