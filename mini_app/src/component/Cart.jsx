import React, { memo, useEffect, useState } from "react";
import { Loader } from "./Loader";
import style from "../CSS/Login.module.css";
import { ButtonComponent } from "./ButtonComponent";

export const Cart = memo(() => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart") || [])
  );
  const [cartItemsLoading, setCartItemsLoading] = useState(false);

  const getCartItems = () => {
    const localStorageCart = JSON.parse(localStorage.getItem("Cart"));
    console.log(localStorageCart);
    setCartItemsLoading(true);
    Promise.all(
      localStorageCart.map((item) =>
        fetch(`https://dummyjson.com/products/${item}`).then((res) =>
          res.json()
        )
      )
    ).then((values) => {
      setCartItems(values);
      setCartItemsLoading(false);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    //  localStorage.setItem("Cart", JSON.stringify(cartItems))
  }, [cartItems]);

  console.log(cartItems);

  return (
    <div className={style.cartItemContainer}>
      {cartItemsLoading ? (
        <Loader />
      ) : (
        <div className={style.cartItemContent}>
          {cartItems.map((item, index) => (
            <div>
              <div key={item.id} className={""} style={{ padding: "10px" }}>
                <div className={style.thumbnail}>
                  <img src={item.thumbnail} className={style.image} alt="" />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>Price: {item.price}</p>
                  <p>Rating: {item.rating}</p>
                </div>

                <div className={style.viewAndAddtocartBtnContainer}>
                  <ButtonComponent
                    label={"Delete"}
                    id={index}
                    buttonHandler={(id) => {
                      console.log("index", id, index);
                      cartItems.splice(id, 1);
                      setCartItems(cartItems);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div>
        <h3>Billing Details</h3>
        
      </div>


    </div>
  );
});
