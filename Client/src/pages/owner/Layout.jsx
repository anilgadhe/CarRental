import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import Sidebar from "../../components/owner/Sidebar"
import { Outlet } from 'react-router-dom'

export default function Layout() {
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
