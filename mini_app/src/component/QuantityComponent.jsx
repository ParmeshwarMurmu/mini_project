import React from 'react'
import { ButtonComponent } from './ButtonComponent'
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import style from '../CSS/Login.module.css'

export const QuantityComponent = (props) => {

    const { itemQuantity } = props;

  return (
    <div className={style.quantityContainer}>
        <ButtonComponent label={ <RiSubtractFill /> }
        itemQuantity = {itemQuantity}
        // buttonHandler = {()=> setItemQuantity(itemQuantity - 1)}

         />

        <p style={{padding: "5px"}}>{itemQuantity}</p>


        <ButtonComponent label={ <IoMdAdd />} 
        //  buttonHandler = {()=> setItemQuantity(itemQuantity + 1)}
        />

    </div>
  )
}
