import React, {useState} from "react";
import './Student.css';
import img from "../Images/carousel3.jpg";
import Lottie from "lottie-react";
import text from "../assets/forgot.json";
{/* Import images import user_icon from "../images/user_icon.png"
import email_icon from "../images/email_icon.png"
import password_icon from "../images/password_icon.png"
*/}

const Student = () => {
  const [action,setAction] = useState("Forgot Password");
  const [formData, setFormData] = useState({
        email: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData, [name] : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = {}

    if(!formData.email.trim()) {
        validationErrors.email = "email is required"
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        validationErrors.email = "email is not valid"
    }

    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
        alert("Email Send successfully")
    }

  }

  return (
    <div id="forgot-password">
    <form onSubmit={handleSubmit}>
    <div id="studentlogin">
    <div className="login-page">
    <img src={img} className="background-image" />
    <div className="box container">
    <div className="login-left">
    
        <div className="text stud">{action}</div>
        <div className="underline"></div>
      
        <div className="input_box">
          <img src="" alt="" />
          <input type="email" name="email" placeholder="example@gmail.com" autoComplete='off' onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>} 
        </div>
      <div className="submit-container">
      <button className={action==="Forgot Password"?"submit1":"submit gray"} type="submit">Submit</button>
      </div>
      </div>
      <div className="login-right">
        <Lottie animationData={text} />
        </div>
      </div>
      </div>
    </div>
    </form>
    </div>
  )
}

export default Student;