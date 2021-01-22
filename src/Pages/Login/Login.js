import React, { useState,useEffect } from "react";
import styles from "./Login.module.css";

import { Link } from "react-router-dom"; 





const Login = (props) => {

  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [LoginError,setLoginError] = useState("");
  const [hasAccount,setHasAccount] = useState(false);

  const clearErrors = () => {
    setLoginError("");
  }
  
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const handleLogin = () => {
   
  }

  const handleEmailChange = (e) => {
    setEmail(e.target);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target);
  }



  return(
    <div
    className={`${styles.container} container-fluid d-flex align-items-center justify-content-center`}
  >
    <div className={styles.registrationFormContainer}>
      <fieldset className="border p-3 rounded">
        <legend
          className={`${styles.registrationFormLegend} border rounded p-1 text-center`}
        >
          Login Form
        </legend>
        <form>
          <div className="form-group">
            <label htmlFor="inputForEmail">Email address</label>
            <span className="mandatory">*</span>
            <input
              id="inputForEmail"
              type="email"
              className="form-control"
              aria-describedby="Enter email address"
              placeholder="Enter email address"
              onChange={handleEmailChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputForPassword">Password</label>
            <span className="mandatory">*</span>
            <input
              type="password"F
              className="form-control"
              id="inputForPassword"
              placeholder="Enter password"
              onChange={handlePasswordChange}
            />
            <p className = "errorMsg">{LoginError}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={handleLogin} className="btn btn-outline-primary">
              Login
            </button>
            <button className="btn btn-link">
              <Link to="/register">Sign Up</Link>
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  </div>
  )
  
};

export default Login;