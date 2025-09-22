import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cars } from '../assets/data';
import Loder from "../components/Loder"

export default function CarDetails() {

  const param = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    setCar(cars.find(car => car._id === param._id));
  }, [param.id])
  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button onClick={() => navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>
        <img src="/arrow_icon.svg" alt='aarow' className='rotate-180 opacity-65' />
        Back to all cars
      </button>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        <div className='lg:col-span-2'>
          <img src={car.image} alt='carimg' className='w-full h-auto md:max-h-100
           object-cover rounded-xl mb-6 shadow-md'/>
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
              <p>{car.category} . {car.year} </p>
            </div>
            <hr className='border-borderColor my-6' />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: "/users_icon.svg", text: `${car.seating_capacity} Seats` },
                { icon: "/fuel_icon.svg", text: `${car.fuel_type} ` },
                { icon: "/car_icon.svg", text: `${car.transmission} ` },
                { icon: "/location_icon.svg", text: `${car.location} ` },

              ].map((item, index) => (
                <div key={index} className='flex flex-col items-center bg-light 
                    p-4 rounded-lg'>
                  <img src={item.icon} alt='icon' className='h-5 mb-5' />
                  {item.text}
                </div>
              ))}
            </div>

            <div>
              <h1 className='text-xl font-medium mb-3'>Description</h1>
              <p className='text-gray-500'>{car.description}</p>
            </div>

            {/* {Features} */}
            <div>
              <h1 className='text-xl font-medium mb-3'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>

                {
                  ["360 Camera", "Bluetooth", "GPS", "Heated Seats", "Rear Veiws"
                    , "Mirror"
                  ].map((item) => (
                    <li key={item} className='flex items-center text-gray-500'>
                      <img src='/check_icon.svg' alt='check_icon' className='h-4 mr-2' />
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6
        text-gray-500'>

          <p className='flex items-center justify-between text-2xl text-gray-800
           font-semibold'>{currency} {car.pricePerDay} <span className='text-base text-gray-400 font-normal'>per day </span></p>

          <hr className='border-borderColor my-6' />

          <div className='flex flex-col gap-2'>
            <label htmlFor='pickup-date'>Pickup Date</label>
            <input id='pickup-date' type='date' className='border border-borderColor px-3 py-2
            rounded-lg' min={new Date().toISOString().split("T")[0]} required />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='returned-date'>Returned Date</label>
            <input id='returned-date' type='date' className='border border-borderColor px-3 py-2
            rounded-lg'  required />
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl
          cursor-pointe'>Book Now</button>
          <p className='text-center text-sm'>No credit card required to reserve</p>
        </form>
      </div>
    </div>
  ) : <Loder />
}
