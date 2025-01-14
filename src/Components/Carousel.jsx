import React, { useEffect, useState } from "react";
import './Carousel.css';


import s1 from '../Images/carousel2.jpg';
import s6 from '../Images/carousel.jpg';
import s7 from '../Images/carousel3.jpg';
import s2 from '../Images/carousel4.jpg';


function Carousel() {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = [s1, s6, s7, s2];
  const totalImages = images.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedImage((prevSelectedImage) => (prevSelectedImage + 1) % totalImages);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [totalImages]);


  // const responsive = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 3000 },
  //     items: 5,
  //   },
  //   desktop: {
  //     breakpoint: { max: 3000, min: 1024 },
  //     items: 3,
  //   },
  //   tablet: {
  //     breakpoint: { max: 1024, min: 464 },
  //     items: 2,
  //   },
  //   mobile: {
  //     breakpoint: { max: 464, min: 0 },
  //     items: 1, 
  //   },
  // };

  // const style ={
  //   width: "300px",
  //   top : "30%",
  //   display: "flex",
  //   left :"20%",
  //   right : "20%"

  // }
  return (
    <div id="carouselExampleCaptions" className="carousel d-flex justify-content-center slide h-100" style={{ height: '100vh' }}>
       {/* <Carousel responsive={responsive}> */}
      {/* <Nav/> */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === selectedImage ? "active" : ""}
            aria-current={index === selectedImage ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setSelectedImage(index)}
          ></button>
        ))}
      </div>
     {/* <Carousel responsive={responsive}> */}
      <div className="carousel-inner h-100">
  
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item h-100 ${index === selectedImage ? 'active' : ''}`}
          >
            <img className="h-100 w-100" src={image} alt={`Slide ${index + 1}`} />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
              style={{ background: "rgba(24, 29, 56,.7)" }}
            ></div>
            <div className="carousel-caption d-block" style={{ transition: "all 0.5s ease" }}>
         
    <h2> <span className="name">PAHMV</span> Secondary School</h2>
              <p>Learning, growing, together - explore our school's world!</p>
            
            </div>
          </div>
        ))}
      </div>
      {/* </Carousel> */}
    </div>
  );
}

export default Carousel;
