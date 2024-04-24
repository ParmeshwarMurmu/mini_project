import React from 'react'

export const ButtonComponent = (props) => {

  const { label, buttonHandler, id, styling} = props;


  return (
    <div>
        <button style = {styling}
        onClick={()=>{ buttonHandler(id)}}
        >
            {label}
        </button>
    </div>
  )
}
