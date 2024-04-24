import React, { memo, useContext, useEffect, useState } from "react";
import { Loader } from "./Loader";
import style from "../CSS/Login.module.css";
import { ButtonComponent } from "./ButtonComponent";
import { FaRupeeSign } from "react-icons/fa";
import { QuantityComponent } from "./QuantityComponent";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { appContent } from "../ContextApi/ContextApi";
import { MdDelete } from "react-icons/md";


export const Cart = memo(() => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("Cart") || [])
  );

  const { setTotalCartItems, totalCartItems } = useContext(appContent);

  const [cartItemsLoading, setCartItemsLoading] = useState(false);
  const [individualItemQuantity, setIndividualItemQuantity] = useState(JSON.parse(localStorage.getItem("Cart_Items")) || [])
  const [totalPrice, setTotalPrice] = useState(0)

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
      setCartItems(values.map((item) => (
        {
          ...item,
          quantity: 1
        }
      )))
      setCartItemsLoading(false);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
     localStorage.setItem("Cart_Items", JSON.stringify(cartItems))
  }, [cartItems]);

  useEffect(()=>{
  let calculatePrice = 0, totalItemsInCart = 0;
   let price = individualItemQuantity.forEach(element => {
      calculatePrice = calculatePrice + ( element.price * element.quantity );
      totalItemsInCart = totalItemsInCart + element.quantity;
   });

   setTotalPrice(calculatePrice);
   setTotalCartItems(totalItemsInCart)

  }, [individualItemQuantity, totalCartItems])


  const increaseQuantityHandler = (ind)=>{
    setIndividualItemQuantity(individualItemQuantity.map((item, index)=>{
      if(ind == index){
         return {
          ...item,
          quantity: item.quantity + 1
         }
      }
      else{
        return item
      }
    }))
  }

  const decreaseQuantityHandler = (ind)=>{

    setIndividualItemQuantity(individualItemQuantity.map((item, index)=>{
      if(ind == index){
         return {
          ...item,
          quantity: item.quantity - 1
         }
      }
      else{
        return item
      }
    }))

  }

  return (
    <div className={style.cartItemContainer}>
      {cartItemsLoading ? (
        <Loader />
      ) : (

        <div style={{display: "flex"}}>

        <div className={style.cartItemContent}>
          {individualItemQuantity.map((item, index) => (
            <div style={{ boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px', borderRadius: "5px"}}>
              <div key={item.id} className={""} style={{ padding: "10px" }}>
                <div className={style.thumbnail}>
                  <img src={item.thumbnail} className={style.image} alt="" />
                </div>

                

                <div style={{ marginTop: "10px" }}>
                  <h3>{item.title}</h3>
                  <p style={{ marginTop: "5px" }}>
                    Price: <FaRupeeSign />
                    {item.price}
                  </p>
                  <p>Rating: {item.rating}</p>
                </div>

                <div className={style.viewAndAddtocartBtnContainer}>
                  <ButtonComponent
                    label={ <MdDelete fontSize={'20px'} color="white" />}
                    
                    styling= {{cursor: "pointer", backgroundColor: "rgb(239, 81, 81)", border: "none",  borderRadius: "5px"}}
                    id={index}
                    buttonHandler={(id) => {
                      console.log("Delete IndividualItemQuantity", id, index);
                      setIndividualItemQuantity(individualItemQuantity.filter((element, ind)=>{
                        if(ind == id){
                          return false
                        }
                        else{
                          return true
                        }
                      }))
                     
                    }}

                  />


                  <div>
                    <button style={{marginRight: "5px", cursor: "pointer"}}
                    onClick={()=>{
                      decreaseQuantityHandler(index)
                    }}
                    className={style.decreaseQuantityBtn}
                    
                    disabled={item.quantity === 1}
                    >
                       <RiSubtractFill fontSize={'20px'} color="white" />
                    </button>

                    {item.quantity}

                    <button
                    style={{marginLeft: "5px", cursor: "pointer" }}
                    onClick={()=> increaseQuantityHandler(index)}
                    className={style.increaseQuantityBtn}
                    >
                      <IoMdAdd fontSize={"20px"} color="white" />
                    </button>
                  </div>


                  {/* <QuantityComponent itemQuantity={item.quantity} item={item}
                   
                  /> */}


                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={style.billingDetails}>
        {/* <h3>Billing Details</h3> */}
        <div style={{width: "80%"}}>
          <h2>Billing Details</h2>
          {
            individualItemQuantity.map((element, index)=>(

              <div key={index} style={{display: "flex", justifyContent: "space-between"}}>
                <p className={style.cartTitle}>{element.title}</p>
                <p>{element.quantity}</p>
              </div>
              
            ))
          }

          <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
            <p>Total Item</p>
            <p>{totalCartItems}</p>
          </div>

          <div style={{display: "flex", justifyContent: "space-between"}}>
            <p>Total Price</p>
            <p><FaRupeeSign />
            {totalPrice}</p>

          </div>

          <button className={style.checkoutBtn} style={{width: "100%", marginTop: "10px"}}>
            Checkout
          </button>


        </div>

        </div>

        </div>
      )}

    </div>
  );
});
