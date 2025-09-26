import React, { useState } from 'react'
import Title from "../../components/owner/Title"
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function AddCar() {

  const { axios, currency } = useAppContext()


  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmision: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    if (isLoading) return null

    setIsLoading(true)

    try {
      const formData = new FormData()

      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/owner/v1/add-car', formData)

      if (data.success) {
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmision: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Add New Car" subTitle="Fill in details to list a new car for
      booking, including pricing, availability, and car specifications"/>

      <form onSubmit={onSubmitHandle} className='flex flex-col gap-5 text-gray-500 *:texxt-sm mt-6 max-w-xl'>

        {/* car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img src={image ? URL.createObjectURL(image) : "/upload_icon.svg"} alt='car-img' className='h-14 rounded cursor-pointer' />
            <input type="file" id='car-image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} required />
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your car</p>
        </div>

        {/* Car Brand & Model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type='text' placeholder='e.g. BMW, Mercedes, Audi...' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
          </div>

          <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type='text' placeholder='e.g. X5, E-Class, M4...' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
          </div>
        </div>
        {/* car Year, Price, category */}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type='number' placeholder='2025' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
          </div>

          <div className='flex flex-col w-full'>
            <label>Daily Price ({currency})</label>
            <input type='number' placeholder='2025' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })} />
          </div>

          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={e => setCar({ ...car, category: e.target.value })} className='px-3 py-2 mt-1 border border-borderColor
             rounded-md outline-none' value={car.category}>
              <option value="">Select a category</option>
              <option value="Sedan">Sedan</option>
              <option value="Van">Van</option>
              <option value="SUV">SUV</option>

            </select>
          </div>

        </div>


        {/* Car transmision Fuel Type, Seating Capacity */}

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Transmision </label>
            <select onChange={e => setCar({ ...car, transmision: e.target.value })} className='px-3 py-2 mt-1 border border-borderColor
             rounded-md outline-none' value={car.transmision}>
              <option value="">Select a transmision</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label>Fuel Type</label>
            <select onChange={e => setCar({ ...car, fuel_type: e.target.value })} className='px-3 py-2 mt-1 border border-borderColor
             rounded-md outline-none' value={car.fuel_type}>
              <option value="">Select a transmision</option>
              <option value="Gas">Gas</option>
              <option value="Diesel">Diesel</option>
              <option value="Petrol">Petrol</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label>Seating Capacity</label>
            <input type='number' placeholder='4' required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })} />
          </div>
        </div>

        {/* Car Location */}

        <div className="flex flex-col w-full">
          <label>Location</label>
          <select onChange={e => setCar({ ...car, location: e.target.value })} className='px-3 py-2 mt-1 border border-borderColor
             rounded-md outline-none' value={car.location}>
            <option value="">Select a location</option>
            <option value="Bengluru">Bengluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Ahemadabad">Ahemadabad</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Car description */}

        <div className='flex flex-col w-full'>
          <label>Description</label>
          <textarea type='text' placeholder='e.g. A luxurious SUV with a spacious interior
          and a powerful engine' required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' value={car.description} onChange={e => setCar({ ...car, description: e.target.value })} >
          </textarea>
        </div>

        <button className='flex items-center gap-2 px-2 mt-4 bg-primary text-white rounded-md w-max cursor-pointer'>
          <img src='/tick_icon.svg' alt='tick' />
         {isLoading ?"Listing..." : "List your car"}
        </button>
      </form>

    </div>
  )
}
