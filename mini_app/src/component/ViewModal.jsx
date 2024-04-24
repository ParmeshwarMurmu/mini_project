import React, { memo, useContext, useEffect, useState } from "react";
import style from "../CSS/Login.module.css";
import { appContent } from "../ContextApi/ContextApi";
import { Loader } from "./Loader";
import { IoClose } from "react-icons/io5";
import { ButtonComponent } from "./ButtonComponent";



export const ViewModal = memo(({ productId, modalLevel, size, scroll }) => {
  const [singleProductData, setSingleProductData] = useState({});
  const { setIsOpen } = useContext(appContent);
  const [loading, setLoading] = useState(false);
  const modalEtraBtn = [
    {
      label: "Ok",
      onclick: ()=>{
        alert("Ok Clicked");
        setIsOpen(false);
        
      },
      style: {
        cursor: "pointer",
      }
    },
  
    {
      label: "Cancel",
      onclick: ()=>{
        setIsOpen(false);
      },
      style: {
        cursor: "pointer",
      }
    }
  ]

 
  

  const getSingleProduct = () => {
    if (productId) {
      setLoading(true);
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data, "++");
          setLoading(false);
          setSingleProductData(data);
        });
    }
  };

  useEffect(() => {
    console.log("UseEffect SingleProduct");
    getSingleProduct();
  }, [productId]);

  // console.log("Single Product", singleProductData);

  return (
    <div
      className={style.mainContent}
      style={{
        height:
          size === "xs"
            ? "350px"
            : size === "sm"
            ? "400px"
            : size === "md"
            ? "500px"
            : size === "lg"
            ? "520px"
            : "100vh",
        left:
          size === "xs"
            ? "40%"
            : size === "sm"
            ? "30%"
            : size === "md"
            ? "20%"
            : size === "lg"
            ? "10%"
            : "0px",
        width:
          size === "xs"
            ? "300px"
            : size === "sm"
            ? "450px"
            : size === "md"
            ? "750px"
            : size === "lg"
            ? "1000px"
            : "100vw",
        overflow: scroll ? "visible" : "hidden",
      }}
    >
      <div style={{position: "relative"}}>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className={style.singleImages}>
              {singleProductData.images?.map((element, index) => (
                <div key={index}>
                  <img
                    src={element}
                    className={style.singleProductImages}
                    alt="images"
                  />
                </div>
              ))}
            </div>

            <div>
              <p>{singleProductData.brand}</p>
              <p>{singleProductData.description}</p>
              <p>Price: {singleProductData.price}</p>
              <p>Rating: {singleProductData.rating}</p>
            </div>
          </div>
        )}

        <div className={style.btnContainer}>
          <ButtonComponent
            label={<IoClose fontSize={"20px"} />}
            buttonHandler={() => {
              setIsOpen(false);
            }}
            styling ={{
              cursor: "pointer",
            }}
          />
        </div>

       
       {/* Modal Footer */}
        <div>
         {
          modalEtraBtn.map((item, index)=>(
            <ButtonComponent key={index} label={item.label} buttonHandler={()=>setIsOpen(false)}
            styling = {item.style}
            />
          ))
         }
        </div>



      </div>
    </div>
  );
});
