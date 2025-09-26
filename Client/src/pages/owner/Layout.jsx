import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from "../../components/owner/Sidebar"
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

export default function Layout() {

  const {isOwner,navigate}=useAppContext();

useEffect(()=>{
  if(!isOwner){
    navigate('/')
  }
},[isOwner])

  return (
    <div>
      <NavbarOwner/>

      <div className='flex'>
       <Sidebar/>
       <Outlet/>
      </div>
    </div>
  )
}
