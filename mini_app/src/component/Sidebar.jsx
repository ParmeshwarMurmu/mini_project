import React, { memo, useEffect, useState } from "react";
import style from "../CSS/Sidebar.module.css";
import { Main } from "./Main";
import { CiSearch } from "react-icons/ci";

export const Sidebar = () => {
  let storageUserData = JSON.parse(localStorage.getItem("userData")) || [];
  const [userData, setUserData] = useState(storageUserData);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertFirstName, setIsAlertFirstName] = useState(false);
  const [isAlertLastName, setIsAlertLastName] = useState(false);
  const [isAlertEmailName, setIsAlertEmailName] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEilValid, setIsEilValid] = useState(false);

  const [userDetail, setUserDeatil] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });

  const firstNameHandler = (e) => {
    if (e.target.value === "" && isAlertFirstName === false) {
      setIsAlertFirstName(true);
      setUserDeatil({
        ...userDetail,
        firstName: e.target.value,
      });
    } else {
      setIsAlertFirstName(false);
      setUserDeatil({
        ...userDetail,
        firstName: e.target.value,
      });
    }
  };

  const lastNameHandler = (e) => {
    if (e.target.value === "" && isAlertLastName === false) {
      setIsAlertLastName(true);
      setUserDeatil({
        ...userDetail,
        lastName: e.target.value,
      });
    } else {
      setIsAlertLastName(false);
      setUserDeatil({
        ...userDetail,
        lastName: e.target.value,
      });
    }
  };

  const emailHandler = (e) => {
    // if (e.target.value === "" && isAlertEmailName === false) {
    //   setIsAlertEmailName(true);
    //   setUserDeatil({
    //     ...userDetail,
    //     email: e.target.value,
    //   });
    // } else {
    //   setIsAlertEmailName(false);
    //   setUserDeatil({
    //     ...userDetail,
    //     email: e.target.value,
    //   });
    // }

    setUserDeatil({
      ...userDetail,
      email: e.target.value,
    });
    setIsEmailValid(validateEmail(e.target.value));
  };

  const validateEmail = (email) => {
    const pattern = /@gmail\.com$/i;
    return pattern.test(email);
  };

  // console.log(isEmailValid, "email validation");

  const ageHandler = (e) => {
    // console.log(e.target.value, "age Value")
    setUserDeatil({
      ...userDetail,
      age: e.target.value,
    });

    if (+e.target.value <= 18 && isAlertVisible === false) {
      setIsAlertVisible(true);
    } else {
      setIsAlertVisible(false);
    }
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    alert("User Detailed Saved");
    setUserData([...userData, userDetail]);
    // localStorage.setItem("userData", JSON.stringify(userData));
    setUserDeatil({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
    });

    if (isAlertVisible) {
      setIsAlertVisible(false);
    }
  };

  const deleteHandler = (index) => {
    let data = JSON.parse(localStorage.getItem("userData")) || [];
    let result = data.filter((_, ind) => {
      if (ind === index) {
        return false;
      } else {
        return true;
      }
    });

    localStorage.setItem("userData", JSON.stringify(result));
    setUserData(result);
    alert("Deleted");
    // setCount(count + 1)
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className={style.mainContainer}>
      <div className={style.formContainer}>
        <form onSubmit={submitFormHandler} className={style.userForm}>
          <div>
            <div>
              <label className={style.label} required>
                First Name :
              </label>
            </div>

            <div>
              <input
                type="text"
                placeholder="First Name"
                value={userDetail.firstName}
                onChange={firstNameHandler}
              />

              <p
                style={{
                  display: isAlertFirstName ? "block" : "none",
                }}
                className={style.ageAlertMessage}
              >
                First Name Cannot be empty
              </p>
            </div>
          </div>

          <div>
            <div>
              <label className={style.label}>Last Name :</label>
            </div>

            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={userDetail.lastName}
                onChange={lastNameHandler}
              />

              <p
                style={{
                  display: isAlertLastName ? "block" : "none",
                }}
                className={style.ageAlertMessage}
              >
                Last Name Cannot be empty
              </p>
            </div>
          </div>

          <div>
            <div>
              <label className={style.label}>Email :</label>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={userDetail.email}
                onChange={emailHandler}
              />
              <p
                style={{
                  display: isEmailValid ? "none" : "block",
                }}
                className={style.ageAlertMessage}
              >
                Enter a valid Email Address
              </p>
            </div>
          </div>

          <div>
            <div>
              <label className={style.label}>Age :</label>
            </div>

            <div>
              <input
                type="text"
                placeholder="age"
                value={userDetail.age}
                onChange={ageHandler}
              />

              <p
                style={{ display: isAlertVisible ? "block" : "none" }}
                className={style.ageAlertMessage}
              >
                Age should be greater than 18
              </p>
            </div>
          </div>

          <div className={style.submitBtnContainer}>
            <button
              // className={style.submitBtn}
              disabled={
                userDetail.firstName === "" ||
                userDetail.lastName === "" ||
                userDetail.email === "" ||
                userDetail.age === "" ||
                +userDetail.age <= 18
              }
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <div className={style.userDetailContainer}>
        <div>
          <input type="text" placeholder="Search" />
          <button>
            <CiSearch />
          </button>
        </div>
        <Main userData={userData} deleteHandler={deleteHandler} />
      </div>
    </div>
  );
};
