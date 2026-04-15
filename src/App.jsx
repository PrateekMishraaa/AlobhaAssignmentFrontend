import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './Pages/Login'
import Register from "./Pages/Register"
import ProtectedRoutes from './Components/ProtectedRoutes'
import HomePage from "./Pages/HomePage"
import RtiRegistration from './Pages/RtiRegistration'
import RtiManagement from './Pages/RtiManagement'
import LegalCases from './Pages/LegalCases'
import HearingCalender from './Pages/HearingCalender'
const App = () => {
  return (
  <>
  <Router>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard/:id' element={<ProtectedRoutes>
        <HomePage/>
      </ProtectedRoutes>}/>
      <Route path='/rti-registration/:id' element={<ProtectedRoutes>
        <RtiRegistration/>
      </ProtectedRoutes>}/>
        <Route path='/rti-management/:id' element={<ProtectedRoutes>
        <RtiManagement/>
      </ProtectedRoutes>}/>
           <Route path='/legal-cases/:id' element={<ProtectedRoutes>
        <LegalCases/>
      </ProtectedRoutes>}/>
      <Route path='/hearing-calender/:id' element={<ProtectedRoutes>
        <HearingCalender/>
      </ProtectedRoutes>}/>
        <Route path='/documents/:id' element={<ProtectedRoutes>
        <HearingCalender/>
      </ProtectedRoutes>}/>
       <Route path='/report-analytics/:id' element={<ProtectedRoutes>
        <HearingCalender/>
      </ProtectedRoutes>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
