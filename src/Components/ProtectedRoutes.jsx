import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem('token')
  
  if (token) {
    return children
  }
  
  return <Navigate to="/login" replace />
}

export default ProtectedRoutes