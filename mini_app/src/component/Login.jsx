import React, { useContext, useState } from "react";
import { InputComponent } from "./InputComponent";
import style from "../CSS/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { appContent } from "../ContextApi/ContextApi";

export const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {setIsAuth} = useContext(appContent)

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      firstName,
      email,
    };

    const existingData = JSON.parse(
      localStorage.getItem("RegisterCredentials")
    );

    if (existingData.firstName === loginData.firstName && existingData.email === loginData.email){
      setIsAuth(true)
      alert("Login Successfull");
      navigate("/");
    } else {
      alert("User Not Found.");
      navigate("/register");
    }

  };

  return (
    <div className={style.loginContainer}>
      <div>
        <h1 className={style.heading}>Login</h1>
        <form onSubmit={handleLoginFormSubmit}>
          <InputComponent
            label={"First Name"}
            inputName={"firstName"}
            type={"text"}
            placeholder={"First Name"}
            value={firstName}
            handleDataFromChild={(value) => setFirstName(value)}
          />

          <InputComponent
            label={"Email"}
            type={"email"}
            inputName={"email"}
            placeholder={"Email"}
            value={email}
            handleDataFromChild={(value) => setEmail(value)}
          />

          <div className={style.loginSubmitBtn}>
            <input type="submit" value="Submit" />
          </div>

          <Link to={"/register"} className={style.loginRegister}>
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};
