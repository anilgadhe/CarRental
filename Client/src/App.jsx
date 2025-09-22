import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home  from "./pages/Home"
import Cars from "./pages/Cars"
import CarDetials from "./pages/CarDetails"
import MyBookings from "./pages/MyBookings"
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'


export default function App() {
  const [showLogin, setShowLogin] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  
  return (
    <>
    {showLogin && <Login setShowLogin={setShowLogin}/>}
    
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='CarDetails/:_id' element={<CarDetials/>}/>
        <Route path='Cars' element={<Cars/>}/>
        <Route path='My-bookings' element={<MyBookings/>}/>
        <Route path='owner'element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-car' element={<AddCar/>}/>
            <Route path='manage-cars' element={<ManageCars/>}/>
            <Route path='manage-bookings' element={<ManageBookings/>}/>            
        </Route>
      </Routes>

      {!isOwnerPath && <Footer/>}
    </>
  )
}
