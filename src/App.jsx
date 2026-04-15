import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './Pages/Login'
import Register from "./Pages/Register"
import ProtectedRoutes from './Components/ProtectedRoutes'
import HomePage from "./Pages/HomePage"
import RtiRegistration from './Pages/RtiRegistration'
import RtiManagement from './Pages/RtiManagement'
import LegalCases from './Pages/LegalCases'
import HearingCalender from './Pages/HearingCalender'

const App = () => {
  const token = localStorage.getItem('token')
  
  return (
    <Router>
      <Routes>
        {/* Root route - redirect based on auth status */}
        <Route 
          path="/" 
          element={token ? <Navigate to="/dashboard/:id" /> : <Navigate to="/login" />} 
        />
        
        {/* Public routes */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
        {/* Protected routes */}
        <Route path='/dashboard/:id' element={
          <ProtectedRoutes>
            <HomePage/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/rti-registration/:id' element={
          <ProtectedRoutes>
            <RtiRegistration/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/rti-management/:id' element={
          <ProtectedRoutes>
            <RtiManagement/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/legal-cases/:id' element={
          <ProtectedRoutes>
            <LegalCases/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/hearing-calender/:id' element={
          <ProtectedRoutes>
            <HearingCalender/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/documents/:id' element={
          <ProtectedRoutes>
            <HearingCalender/>
          </ProtectedRoutes>
        }/>
        
        <Route path='/report-analytics/:id' element={
          <ProtectedRoutes>
            <HearingCalender/>
          </ProtectedRoutes>
        }/>
        
        {/* Optional: Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App