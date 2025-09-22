import React from 'react'
import { Link } from 'react-router-dom';
import {dummyUserData} from "../../assets/data"

export default function NavbarOwner() {

    const user = dummyUserData;
    return (
        <div className='flex items-center justify-center px-6
    md:px-10 py-4 text-gray-500 border-b border-borderColor
    relative transition-all'>

            <Link to="/">
                <img src="/logo.svg" alt='logo' className='h-7' />
            </Link>

            <p>Welcome, {user.name || "owner"}</p>
        </div>
    )
}
