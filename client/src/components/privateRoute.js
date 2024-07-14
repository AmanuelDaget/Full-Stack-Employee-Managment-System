import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute=({children})=>{
  return window.localStorage.getItem("isLogin") ? children : <Navigate to="/" />;
}
