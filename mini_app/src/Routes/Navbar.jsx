import React, { memo, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../CSS/Login.module.css";
import { appContent } from "../ContextApi/ContextApi";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = memo(() => {
  const [userData, setUserData] = useState({});
  const [isProfileClicked, setIsProfileClicked] = useState(false);
  const {  totalCartItems } = useContext(appContent)
  // const totalCartItems = JSON.parse(localStorage.getItem("Cart")).length;
  
  const { isAuth } = useContext(appContent);
  

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("RegisterCredentials")
    );
    setUserData(localStorageData);
  }, []);

  // useEffect(()=>{
  //   setTotalCartItems(JSON.parse(localStorage.getItem("Cart")).length);
  // }, [totalCartItems])

  return (
    <div className={style.navbar}>
      <div className={style.navbarContent}>
        <div>
          <Link className={style.link} to={"/"}>
            Home
          </Link>
        </div>

        <div style={{display:"flex", justifyContent: "center"}}>

          <div style={{paddingTop: "4px", marginRight: "10px"}}>
            <FaShoppingCart style={{marginRight: "2px"}} />
            {totalCartItems}

          </div>

        {
          isAuth && <div style={{ position: "relative" }}>
            <div className={style.profile}
            onClick={()=>{setIsProfileClicked(!isProfileClicked)}}
            ></div>

            <div style={{display: isProfileClicked ? "block": "none"}} className={style.dropDown}>
              <p style={{borderBottom: "1px solid black"}}>{userData.firstName}</p>
              <p style={{borderBottom: "1px solid black"}}>{userData.email}</p>
              <p>your cart</p>
            </div>
          </div>
        }

        </div>

      </div>
    </div>
  );
});
