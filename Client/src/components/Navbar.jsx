import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function Navbar({setShowLogin}) {

    const location = useLocation();
    let navigate = useNavigate();
    const [open, setOpen] = useState(false);

    return (
        <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24
    xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all  ${location.pathname === "/" && "bg-light"}`}>
            <Link to="/">
                <img src='/logo.svg' alt='logo' className='h-8' />

            </Link>

            <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16
            max-sm:border-t border-borderColor right-0 flex flex-col sm:flex-row
            items-start sm:items-conter gap-4 sm:gap-8 max-sm:p-4 transition-all
            duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>

                <Link to="/">Home</Link>

                <Link to="/cars">Cars</Link>

                <Link to="/my-bookings">My Bookings</Link>

                <div className='hidden lg:flex items-center text-sm gap-2 border border-borderColor
                 px-3 rounded-full max-w-56'>
                    <input type='text' className='py-1.5 w-full w-full bg-transparent
                     outline-none placeholder-gray-500' placeholder='Search products' />
                    <img src='/search_icon.svg' alt='search log' />
                </div>

                <div className='flex max-sm:flex-col items-start sm:items-center gap-6'>
                    <Link to="/owner" className='cursor-pointer'>Dashboard</Link>
                    <button onClick={()=> setShowLogin(true)} className='cursor-pointer px-8  py-2 bg-primary
                    hover:bg-primary-dull transition-all text-white rounded-lg'>Login</button>
                </div>
            </div>
            <button className='sm:hidden cursor-pointer arial-label="Menu' onClick={()=> setOpen(!open)}>
                <img alt='menu' src={open ? "/close_icon.svg" : "/menu_icon.svg"}/>
            </button>
        </div>
    )
}
