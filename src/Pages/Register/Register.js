import React, { useState,useEffect} from "react";
import styles from "./Register.module.css";

import { Link } from "react-router-dom";



const Register = (props) => {

  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [emailError,setEmailError] = useState("");
  const [passwordError,setPasswordError] = useState("");
  const [hasAccount,setHasAccount] = useState(false);

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }
  
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const handleRegisteration = () => {

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
            />
            <p className = "errorMsg">{emailError}</p>
          </div>
          <div className="form-group">
            <label htmlFor="inputForPassword">Password</label>
            <span className="mandatory">*</span>
            <input
              type="password"
              className="form-control"
              id="inputForPassword"
              placeholder="Enter password"
            />
            <p className = "errorMsg">{passwordError}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button onClick="handleRegisteration" className="btn btn-outline-primary">
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