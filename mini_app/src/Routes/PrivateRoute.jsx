import React, { useContext } from 'react'
import { appContent } from '../ContextApi/ContextApi'
import { Navigate, useNavigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

  const {isAuth} = useContext(appContent);

  if(isAuth){
    return children;
  }
  else{
    alert("Please Login");
    return <Navigate to="/login" />
    
  }
}
