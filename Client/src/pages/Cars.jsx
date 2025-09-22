import React, { useState } from 'react'
import Title from "../components/Title"
import { cars } from '../assets/data';
import CarCard from "../components/CarCard"

export default function Cars() {

  const [input, setInput] = useState("");

  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title="Available Cars" subTitle="Browse our selection of premium vehicles available for your next adventure" />

        <div className='flex items-center  bg-light px-4 mt-6 max-w-140 w-full h-12
      rounded-full shadow'>
          <img src="./search_icon.svg" alt='search' className='w-4.5 h-4.5 mr-2' />
          <input type='text' onClick={(e) => setInput(e.target.value)} value={input} placeholder='Search by make ,model,or features' />
          <img src="./filter_icon.svg" alt='filter' className='w-4.5 h-4.5 ml-75' />

        </div>

      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-24 xl:px-32 mt-10'>
        <p className='text-gray-500 xl:px-20 mxa-w-7xl mx-auto'>showing {cars.length} Cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4
        xl:px-20 max-w-7xl mx-auto'>
               {cars.map((car , index)=>(
                 <div key={index}>
                    <CarCard car={car}/>
                </div>  
               ))}
        </div>

      </div>
    </div>
  )
}
