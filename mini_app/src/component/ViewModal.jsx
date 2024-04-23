import React, { memo, useContext, useEffect, useState } from "react";
import style from "../CSS/Login.module.css";
import { appContent } from "../ContextApi/ContextApi";
import { Loader } from "./Loader";


export const ViewModal = memo(({productId}) => {
  
  const [singleProductData, setSingleProductData] = useState({});
  const {setIsOpen} = useContext(appContent);
  const [loading, setLoading] = useState(false)

  const getSingleProduct = () => {
    
    if (productId) {
      setLoading(true)
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "++");
          setLoading(false)
          setSingleProductData(data);
        });
    }
  };

  useEffect(() => {
    console.log("UseEffect SingleProduct");
    getSingleProduct();
  }, [productId]);

  console.log("Single Product", singleProductData);

  return (
    <div className={style.mainContent}>
      {
         loading ? <Loader /> : 
      <div>

      <div className={style.singleImages}>
    
        
        {
          singleProductData.images?.map((element, index)=>(
              <div key={index}>
                  <img src={element} className={style.singleProductImages} alt='images' />
              </div>
          ))
        }

        </div>

        <div>
            <p>{singleProductData.brand}</p>
            <p>{singleProductData.description}</p>
            <p>Price: {singleProductData.price}</p>
            <p>Rating: {singleProductData.rating}</p>
        </div>
      </div>
      }
      <div className={style.btnContainer}>
      <button
      onClick={()=>{setIsOpen(false)}}
      >
        close
      </button>

      
      </div>
    </div>
  );
});
