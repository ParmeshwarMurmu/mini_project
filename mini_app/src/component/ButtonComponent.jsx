import React from 'react'

export const ButtonComponent = (props) => {

    const { label, buttonHandler} = props;


  return (
    <div>
        <button>
            {label}
        </button>
    </div>
  )
}
