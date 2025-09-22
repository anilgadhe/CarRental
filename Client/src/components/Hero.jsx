import React, { useState } from 'react'

export default function Hero() {

    const [place, setPlace] = useState("");


    return (
        <div className='h-screen flex flex-col items-center
         justify-center'>
            <h1 className='text-4xl md:text-5xl font-semibold'>Luxury cars on Rent</h1>

            <form className='flex flex-col md:flex-row items-start md:items-center
            justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
            bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>

                <div className='flex flex-col md:flex-row items-start md:items-center
               gap-10 min-md:ml-8'>

                    <div>
                        <select required value={place} onChange={(e) => setPlace(e.target.value)}>
                            <option value="">Pickup Location</option>
                            <option value="Pune">Pune</option>
                            <option value="Hederabad">Hyderabad</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Benglure">Benglure</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>

                        </select>
                        <p className='px-1 text-sm text-gray-500'>{place === "" ? "Please select location" : place}</p>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='pickup-date'>Pick-up Date</label>
                        <input type="date" id="pickup-date" min={new Date().toISOString().split("T")[0]}
                            className="text-sm text-gray-500" required />

                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <label htmlFor='return-date'>Return Date</label>
                        <input type="date" id="return-date" 
                            className="text-sm text-gray-500" required />

                    </div>
                   <button className='flex items-center justify-center gap-1 px-9 py-3
                   max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full
                   cursor-popinter'>
                    <img src='./search_icon.svg' alt='logo' className='brightness-300'/>
                    Search</button>
                </div>

            </form>

            <img src="./main_car.png" alt='main_Car' />
        </div>
    )
}
