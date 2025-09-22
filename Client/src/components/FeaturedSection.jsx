import React from 'react'
import Title from './Title'
import { useNavigate } from "react-router-dom"
import { cars } from '../assets/data';
import CarCard from "./CarCard"

export default function FeaturedSection() {

    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center py-24 px-6 md:px-16
    lg:px-24 xl:px-32'>

            <div>
                <Title title="Featured Vehicles" subTitle="Explore our selection of premium vehicles available for your next adventure" />

            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>

                {cars.slice(0,6).map(car => (
                    <CarCard key={car._id} car={car} />
                ))}
            </div>

            <button onClick={() => {
                navigate("/cars"); scrollTo(0, 0)
            }}
                className='flex items-center justify-center gap-2 px-6 py-2 border
        border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer'>
                Explore all cars <img src='./arrow_icon.svg' alt='arrow_icon' />

            </button>

        </div>
    )
}
