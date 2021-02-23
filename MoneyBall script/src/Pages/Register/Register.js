import React, { useState,useEffect } from "react";
import styles from "./Register.module.css";

import { Link } from "react-router-dom";
import { signUpWIthEmailAndPassword } from "../../Database/userAuthentication.js"; 





const Register = (props) => {

  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [RegisterationError,setRegisterationError] = useState("");
  const [hasAccount,setHasAccount] = useState(false);

  const clearErrors = () => {
    setRegisterationError("");
  }
  
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const handleRegisteration =  async (e) => {
    e.preventDefault();
    try{
       await signUpWIthEmailAndPassword(email,password)
    }
    catch (err) {
      setRegisterationError(err.message);
    }
   
    
    
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          Registration Form
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
              type="password"
              className="form-control"
              id="inputForPassword"
              placeholder="Enter password"
              onChange={handlePasswordChange} 
            />
            <p className = "errorMsg">{RegisterationError}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={handleRegisteration} className="btn btn-outline-primary">
              Sign up
            </button>
            <button className="btn btn-link">
              <Link to="/login">Cancel</Link>
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  </div>
  )
  
};

export default Register;