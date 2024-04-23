import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ViewModal } from "./ViewModal";
import style from "../CSS/Login.module.css";
import { appContent } from "../ContextApi/ContextApi";
import { ButtonComponent } from "./ButtonComponent";

export const Home = () => {
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState(null);
  const { isOpen, setIsOpen } = useContext(appContent);

  const handleData = () => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) =>
        // console.log(data.products),
        setData(data.products)
      );
  };



  const handleModal = (id) => {
    console.log("Id", id);
    setProductId(id);
    setIsOpen(true);
  };

  useEffect(() => {
    handleData();
  }, []);

  console.log(data);

  return (
    <div className={style.cont}>
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className={style.singleProduct}
      >
        <ViewModal productId={productId} />
      </div>
      <div className={style.homeContainer}>
        {data.map((element) => (

          <div key={element.id} className={style.content} style={{ padding: "10px" }}>

            <div className={style.thumbnail}>
              <img src={element.thumbnail} className={style.image} alt="" />
            </div>

            <div>
              <h3>{element.title}</h3>
              <p>Price: {element.price}</p>
              <p>Rating: {element.rating}</p>
            </div>

            <div className={style.viewAndAddtocartBtnContainer}>

              {/* <div>
                <button
                  onClick={() => {
                    handleModal(element.id);
                  }}
                >
                  View
                </button>
              </div> */}

              <ButtonComponent label={"View"}  
               buttonHandler = {(id)=> {
                setProductId(id);
                setIsOpen(true)
               }}

               />


              <ButtonComponent label={"Add To Cart"}
              buttonHandler = {(id) =>{
                
              }}
               
               />

              {/* <div>
              <button
                
              >
                Add To Cart
              </button>
              </div> */}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
