import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ViewModal } from "./ViewModal";
import style from "../CSS/Login.module.css";
import { appContent } from "../ContextApi/ContextApi";
import { ButtonComponent } from "./ButtonComponent";
import { Navbar } from "../Routes/Navbar";
import { InputComponent } from "./InputComponent";

export const Home = () => {
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState(null);
  const { isOpen, setIsOpen, setTotalCartItems } = useContext(appContent);
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem("Cart"))|| [])

  const handleData = () => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) =>
        // console.log(data.products),
        setData(data.products)
      );
  };



  // const handleModal = (id) => {
  //   console.log("Id", id);
  //   setProductId(id);
  //   setIsOpen(true);
  // };

  useEffect(() => {
    handleData();
  }, []);


  useEffect(()=>{
    localStorage.setItem("Cart", JSON.stringify(cart));
    setTotalCartItems(cart.length)
  }, [cart])
  

  console.log("cart", cart);

  return (
    <div className={style.cont}>

      <div>
        <Navbar />
      </div>

      <div
        style={{ display: isOpen ? "block" : "none" }}
        className={style.singleProduct}
      >
        <ViewModal 
        productId={productId}
        size={"sm"}
        scroll = {true}

         />
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

              <ButtonComponent label={"View"} 
               id={element.id} 
               buttonHandler = {(id)=> {
                setProductId(id);
                setIsOpen(true)
               }}

               />


              <ButtonComponent label={"Add To Cart"}
              id={element.id}
              buttonHandler = {(id) =>{       
                setCart([...cart, id]);
                alert("Product Added To Cart")
              }}
               
               />


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
