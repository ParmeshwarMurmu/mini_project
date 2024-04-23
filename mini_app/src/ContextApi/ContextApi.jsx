import React, { createContext, useContext, useState } from 'react'

export const appContent = createContext();

export const ContextApi = ({children}) => {

    const [isAuth, setIsAuth] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

  return (
    <appContent.Provider value={{isAuth, setIsAuth, isOpen, setIsOpen}}>{children}</appContent.Provider>
  )
}
