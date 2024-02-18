import React, { useState } from "react";
import "./styles.css"; // Make sure to have your CSS file in the appropriate directory

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsername] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("/patient2/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, phoneno,}),
      });
      if (response.ok) {
        // Upon successful login, redirect to patient appointments page
        window.location.href = "/patient-appointments";
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };


  const handleRegister = async () => {
    try {
      const response = await fetch("/patient2/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, phoneno, pincode, district }),
      });
      if (response.ok) {
        // Upon successful registration, automatically login
        handleLogin();
      } else {
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("An error occurred while registering. Please try again.");
    }
  };


  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

//   const handleSignInClick = () => {
//     setIsSignUp(false);
//   };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Location</h1>
          <input type="pincode" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}/>
          <input type="district" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)}/>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Personal Details</h1>
          <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="phone" placeholder="Phone Number" value={phoneno} onChange={(e) => setPhoneNo(e.target.value)}/>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Enter location data</p>
            <button className="ghost" onClick={handleRegister}>Next</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello! Welcome!</h1>
            <p>Enter your personal information</p>
            <button className="ghost" onClick={handleSignUpClick}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
