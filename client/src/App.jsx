import React, {useState} from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import DeviceDetails from './pages/DeviceDetails'
import Devices from './pages/Devices'
import MyBookings from './pages/MyBookings'
import Layout from './pages/owner/Layout'
import Footer from './components/Footer'
import Dashboard from './pages/owner/Dashboard'
import AddDevice from './pages/owner/AddDevice'
import ManageDevices from './pages/owner/ManageDevices'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
    
    const {showLogin} = useAppContext()
    const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
      <Toaster/>
      {showLogin && <Login/> } 
      {!isOwnerPath && <Navbar/>}

    <Routes>
      <Route path='/' element={<Home/>}/>  
      <Route path='/device-details/:id' element={<DeviceDetails/>}/>  
      <Route path='/devices' element={<Devices/>}/>  
      <Route path='/my-bookings' element={<MyBookings/>}/>  
      <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="add-device" element={<AddDevice/>}/>
        <Route path="manage-devices" element={<ManageDevices/>}/>
        <Route path="manage-bookings" element={<ManageBookings/>}/>
      </Route>
    </Routes>  

    {!isOwnerPath && <Footer/>}

    </>
  )
}

export default App
