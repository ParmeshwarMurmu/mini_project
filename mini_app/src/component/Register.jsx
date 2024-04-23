import React, { useState } from "react";
import style from '../CSS/Login.module.css'
import { InputComponent } from "./InputComponent";
import { Link } from "react-router-dom";


export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    const registerData = {
      firstName,
      lastName,
      email,
    };

    localStorage.setItem("RegisterCredentials", JSON.stringify(registerData));
    alert("Registered Successfull");
    setFirstName("");
    setLastName("");
    setEmail("");
  };


  return (
    <div className={style.loginContainer}>
      <div>

        <h1 className={style.heading}>Register</h1>
        <form onSubmit={handleRegisterFormSubmit}>
          <InputComponent
            label={"First Name"}
            inputName={"firstName"}
            type={"text"}
            placeholder={"First Name"}
            value={firstName}
            handleDataFromChild = {(value)=>setFirstName(value)}
          />

          <InputComponent
            label={"Last Name"}
            type={"text"}
            inputName={"lastName"}
            placeholder={"Last Name"}
            value={lastName}
            handleDataFromChild = {(value)=>setLastName(value)}
          />

          <InputComponent
            label={"Email"}
            type={"email"}
            inputName={"email"}
            placeholder={"Email"}
            value={email}
            handleDataFromChild = {(value)=>setEmail(value)}
          />

          <div className={style.loginSubmitBtn}>
            <input type="submit" value="Submit" />
          </div>

          <Link to={'/login'} className={style.loginRegister}>Login</Link>
        </form>
      </div>
    </div>
  );
};
