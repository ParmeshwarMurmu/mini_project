import React, { createContext, useContext, useState } from 'react'

export const appContent = createContext();

export const ContextApi = ({children}) => {

    const [isAuth, setIsAuth] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [totalCartItems, setTotalCartItems] = useState(0)

  return (
    <appContent.Provider value={{isAuth, setIsAuth, isOpen, setIsOpen,
      totalCartItems, setTotalCartItems
    }}>{children}</appContent.Provider>
  )
}
