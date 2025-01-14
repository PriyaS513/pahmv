import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chart as defaults } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Circle } from "rc-progress";
import CountUp from "react-countup";
import "./Attendance.css";
import img from "../Images/student1.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Studnav from "./studentnav.jsx";
//import StudentProfile from './StudentProfile';

const isDevelopment=import.meta.env.MODE==='development'
  const baseUrl=isDevelopment?import.meta.env.VITE_API_BASE_URL_LOCAL:import.meta.env.VITE_API_BASE_URL_DEPLOY


Chart.register(BarElement, CategoryScale, LinearScale);
defaults.maintainAspectRatio = false;
defaults.responsive = true;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [regid, setRegid] = useState(); // Replace with actual registration ID
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [showDropdown, setShowDropdown] = useState(false);

  const getRegid = (regid) => {
    setRegid(regid);
  };

  useEffect(() => {
    const regNoElement = document.querySelector(".student-reg-no");
    if (regNoElement) {
      const regNoText = regNoElement.textContent;
      const regNo = regNoText.split(": ")[1]; // Extract the registration number
      setRegid(regNo);
    }
  }, []);

  useEffect(() => {
    fetchAttendanceData();
  }, [regid, selectedMonth]);

  const fetchAttendanceData = async () => {
    if (!regid) {
      console.error("Registration ID is required");
      return;
    }
    try {
      
      const year = selectedMonth < 6 ? new Date().getFullYear() : new Date().getFullYear() - 1;
      const month = selectedMonth+1; // Pass month value as 6 for June and so on
      const response = await axios.get(`${baseUrl}/Teachers/attendance/${regid}/${year}/${month}/`);
      setAttendanceData(response.data);
      console.log(response);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };
    const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const handlePhotoClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    toast.success("Logout Successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".student-photo-container")) {
      setShowDropdown(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, selectedMonth, 1);
  const endDate = new Date(currentYear, selectedMonth + 1, 0);
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  const presentDays = attendanceData.filter(
    (attendance) =>
      new Date(attendance.date).getMonth() === selectedMonth &&
      attendance.status === "present"
  ).length;

  const percentage = totalDays !== 0 ? (presentDays / totalDays) * 100 : 0;

  const [chartData, setChartData] = useState({
    labels: [
      "January", "February", "March", "April", "May", 
      "June", "July", "August", "September", "October", "November", "December"
    ],
    datasets: [
      {
        label: "Attendance",
        data: Array(12).fill(0), // Initialize with zeros
        backgroundColor: [
          "rgba(43, 63, 229, 0.8)",
          "rgba(250, 192, 19, 0.8)",
          "rgba(253, 135, 135, 0.8)",
        ],
        borderRadius: 5,
      },
    ],
  });
    useEffect(() => {
    const updateChartData = () => {
      const chartDataCopy = { ...chartData };
      attendanceData.forEach((attendance) => {
        const monthIndex = new Date(attendance.date).getMonth();
        chartDataCopy.datasets[0].data[monthIndex]++;
      });
      setChartData(chartDataCopy);
    };
    updateChartData();
  }, [attendanceData]);
  
  
  return (
    <div id="attendance" onClick={handleOutsideClick}>
      <ToastContainer />
      <div id='studnav'>
      <Studnav getRegid={getRegid} />
      
      </div>
      <div className="format">
        <div className="home-button-container">
          <button className="home-button" onClick={() => navigate("/Studentprofile")}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </button>
        </div>
        <div className="selectMenu">
  <h2>
    Attendance for{" "}
    {new Date(currentYear-1, selectedMonth)
      .toLocaleString("default", { month: "long", year: "numeric" })
      .replace(/\b0+/g, "")} - 
    {new Date(currentYear-1 + (selectedMonth < 6 ? 1 : 0), (selectedMonth + 6) % 12)
      .toLocaleString("default", { month: "long", year: "numeric" })
      .replace(/\b0+/g, "")}
  </h2>
  <select value={selectedMonth} onChange={handleMonthChange}>
    {Array.from({ length: 11 }, (_, index) => {
      const monthIndex = (index + 5) % 12; // June (5) to April (4)
      const year = currentYear-1 + Math.floor((index + 6) / 12); // Increment year after April
      return (
        <option key={index} value={monthIndex}>
          {new Date(year, monthIndex, 1)
            .toLocaleString("default", { month: "long", year: "numeric" })
            .replace(/\b0+/g, "")}
        </option>
      );
    })}
  </select>
</div>
        <div className="container-attendance">
          <div className="information">
            <h3>Total Days: <CountUp start={0} end={totalDays} delay={3} />
            <div className="roundProgress">
              <Circle
                percent={100}
                strokeWidth={10}
                trailWidth={8}
                strokeColor="blue"
                trailColor="#b3a4f3"
              />
              <span className="circle-text">{totalDays}Days</span>
            </div>
            </h3>
          </div>

          <div className="information">
            <h3>
              Present Days: <CountUp start={0} end={presentDays} delay={3} />
              <div className="roundProgress">
                <Circle
                  percent={(presentDays / totalDays) * 100}
                  strokeWidth={10}
                  trailWidth={8}
                  strokeColor="blue"
                  trailColor="#b3a4f3"
                />
                <span className="circle-text">{presentDays} Days</span>
              </div>
            </h3>
          </div>
          <div className="information">
            <h3>
              Percentage:{" "}
              <CountUp start={0} end={percentage.toFixed(2)} delay={3} />
              <div className="roundProgress">
                <Circle
                  percent={percentage}
                  strokeWidth={10}
                  trailWidth={8}
                  strokeColor="blue"
                  trailColor="#b3a4f3"
                />
                <span className="circle-text">{percentage.toFixed(2)}%</span>
              </div>
            </h3>
          </div>
        </div>

        <div className="App1">
          <div className="dataCard revenueCard">
            <div className="cardHeader">
              <div className="barGraph">
              <Bar data={chartData} options={{
  scales: {
    x: {
      type: "category",
    },
    y: {
      type: "linear",
      beginAtZero: true,
    },
  },
}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentProfile;