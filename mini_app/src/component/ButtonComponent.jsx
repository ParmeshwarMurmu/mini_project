import React from 'react'

export const ButtonComponent = (props) => {

  const { label, buttonHandler, id, styling, itemQuantity} = props;


  return (
    <div>
        <button style = {styling}
        disabled = {itemQuantity === 1}
        onClick={()=>{ buttonHandler(id)}}
        >
            {label}
        </button>
    </div>
  )
}
