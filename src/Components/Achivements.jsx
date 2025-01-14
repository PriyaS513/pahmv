import React, { useEffect, useState } from "react";
import "./Achivements.css";
import axios from "axios";
import img1 from "../Images/background1.jpg";
import img2 from "../Images/v2.avif";
import img3 from "../Images/about.jpg";
import Carousel from "react-multi-carousel";


const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY

const Achivement = () => {
  const [Achievements, setAchivements] = useState([]);
  

  useEffect(() => {
    axios
      .get(`${baseUrl}/home/getAchievements/`)
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setAchivements(response.data.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  // const  card1Style1 = {
  //   position: "relative",
  //   // backgroundColor: "#fff",
  //   borderRadius: "8px",
  //   padding: "0px",
  //   margin: "20px",
  //   // border: "2px solid #007bff", // Add border here
  //   // borderBottomColor: "2px solid #ffff", // Add border here
  //   // boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
  //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
  // };

  // const  card1Style1 = {
  //   position: "relative",
  //   padding: "0px",
  //   margin: "20px",
  //   transition: "transform 0.3s ease, box-shadow 0.3s ease",
  //   display: "grid",
  //   placeItems: "center",
  //   width: "80vw",
  //   maxWidth: "21.875rem",
  //   height: "28.125rem",
  //   overflow: "hidden",
  //   borderRadius: "0.625rem",
  //   boxShadow: "0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.25)",
  // };

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
    <div className="containerAchivement" id="achivement-section">
      <div className="row">
        <div className="page-content container note-has-grid" id="notice">
          <h1 className="Heading text-center hover-effect">Achivement</h1>
        </div>
      </div>

      {/* Achievement  card1s */}
      
      <div className="tab-content bg-transparent">
        
        <div className="row note-has-grid note-full-container">
          <Carousel responsive={responsive}>
           
            {/*           <div className="single-note-item all-category">
              <div className=" card11 board hover-effect" style={ card1Style1}>
                 
                <img src={img} className=" card1-img-top" alt="Notice" />
                 <h5
                  className="note-title text-truncate w-75 mb-0"
                  data-noteheading="Example Notice Title"
                >
                  Example Notice{" "}
                  <i className="point fa fa-circle ml-1 font-10"></i>
                </h5>

                <div className="note-content">
                  <p
                    className="note-inner-content text-muted"
                    data-notecontent="This is an example notice content."
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum voluptatem corrupti quaerat modi ad mollitia facere,
                    officia amet nihil provident dolorem voluptatum temporibus
                    architecto perspiciatis, aut sunt nostrum earum laudantium.
                  </p>
                </div> 
              </div>
            </div>
*/}
        
{Achievements.map((achievements) => (

<div className="card1-container">
        <article className=" card1">
               
                  <img
                    src={achievements.image}
                    className="card1__background  card1-img-top"
                    alt="Achievement"
                  />
                  <div className="card1__content flow">
                    <div className="card1__content--container flow">
                      <h2 className="card1__title">{achievements.title}</h2>
                      <p className="card1__description">{achievements.title}</p>
                    </div>
                </div>
                </article>
                </div>
                  
       
       ))}
       
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Achivement;