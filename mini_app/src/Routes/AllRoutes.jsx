import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../component/Login'
import { Register } from '../component/Register'
import { Home } from '../component/Home'
import { NotFound } from '../component/NotFound'
import { PrivateRoute } from './PrivateRoute'

export const AllRoutes = () => {

  return (
    <Routes>
        <Route path="/" element={
            <PrivateRoute>
                <Home/>
            </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
