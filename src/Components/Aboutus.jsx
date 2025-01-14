import React, { useState } from 'react';
import "./About.css";
import img3 from "../Images/mission.jpg";
import img1 from "../Images/vision2.webp";

import img2 from "../Images/vision3.jpg";

const About = () => {
  const [activeTab, setActiveTab] = useState('Vision and Mission');
  const [activeimg, setActiveimg] = useState(img3);

  const opentab = (tabName, img) => {
    setActiveTab(tabName);
    setActiveimg(img);
  };

  return (
    <>
      <div id="about-section">
        <h1 className="Heading text-center hover-effect">About</h1>
        <div className="about container">
          <div className="about-left about-cl-1">
            <img src={activeimg} alt="aboutimg" className="aboutimg img-fluid" />
          </div>

          <div className="about-right about-cl-2">
            <div className="tab-title">
              <p style={{ padding: '0' }}
                className={`tab-links ${activeTab === 'Vision and Mission' ? 'active-link' : ''}`}
                onClick={() => opentab('Vision and Mission', img3)}
              >
                Vision and Mission
              </p>
              <p style={{ padding: '0' }}
                className={`tab-links ${activeTab === 'Commitment to Innovation' ? 'active-link' : ''}`}
                onClick={() => opentab('Commitment to Innovation', img1)}
              >
                Commitment to Innovation
              </p>
              <p style={{ padding: '0' }}
                className={`tab-links ${activeTab === 'Focus on Community Engagement' ? 'active-link' : ''}`}
                onClick={() => opentab('Focus on Community Engagement', img2)}
              >
                Focus on Community Engagement
              </p>
            </div>
            <div className={`tab-contents ${activeTab === 'Vision and Mission' ? 'active-tab' : ''}`} id="Vision and Mission">
              <ul>
                <p style={{ padding: '0' }}>Our vision is to create an environment where curiosity and creativity thrive, enabling students to reach their highest potential. We aim to develop well-rounded individuals who are confident, compassionate, and prepared to lead in a global society.</p>
                <p style={{ padding: '0' }}>We offer a balanced education that nurtures intellectual curiosity, critical thinking, and personal growth. Our curriculum includes academics, arts, and extracurricular activities to meet the unique needs of each student.</p>
              </ul>
            </div>
            <div className={`tab-contents ${activeTab === 'Commitment to Innovation' ? 'active-tab' : ''}`} id="Commitment to Innovation">
              <ul>
                <p style={{ padding: '0' }}>We integrate new teaching methods and technology to keep our education relevant and engaging. By staying ahead of trends, we provide a learning experience that prepares students for the future.</p>
                <p style={{ padding: '0' }}>We foster creativity and problem-solving by encouraging project-based learning and interdisciplinary studies. This commitment ensures our students are equipped to tackle tomorrow's challenges and shape their own futures.</p>
              </ul>
            </div>
            <div className={`tab-contents ${activeTab === 'Focus on Community Engagement' ? 'active-tab' : ''}`} id="Focus on Community Engagement">
              <ul>
                <p style={{ padding: '0' }}>   We encourage students to participate in community service projects and local initiatives. These experiences help students develop a sense of empathy and a commitment to making a positive impact in their communities.</p>
                <p style={{ padding: '0' }}>By building partnerships with local organizations and businesses, we provide students with real-world learning opportunities. These collaborations enrich our curriculum and help students understand the value of civic engagement and social responsibility.</p>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;