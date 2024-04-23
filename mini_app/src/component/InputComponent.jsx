import React, { memo } from "react";
import style from "../CSS/Login.module.css";


export const InputComponent = memo((props) => {

    const {type, placeholder, label, handleDataFromChild, value} = props;

    return (
      <div className={style.inputComp}>
        <label>{label}:</label>

        <input
          type={type}
          placeholder={placeholder}
          onChange={(e)=>{handleDataFromChild(e.target.value)}}
          value={value}

        />
      </div>
    );
  }
);
