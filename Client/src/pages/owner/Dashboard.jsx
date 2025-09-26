import React, { useEffect, useState } from 'react'
import Title from "../../components/owner/Title"
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

export default function Dashboard() {

  const { axios, isOwner, currency } = useAppContext()

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: "/carIconColored.svg" },
    { title: "Total Bookings", value: data.totalBookings, icon: "/listIconColored.svg" },
    { title: "Pending", value: data.pendingBookings, icon: "/cautionIconColored.svg" },
    { title: "Confirmed", value: data.completedBookings, icon: "/listIconColored.svg" },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/owner/v1/dashboard');
      if (data.success) {
        setData(data.dashboardData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData()
    }
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      <Title 
        title="Admin Dashboard" 
        subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
      />

      {/* cards */}
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-fill'>
              <img src={card.icon} alt='card-icon' className='h-4 w-4' />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>
        {/* recent booking */}
        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg'>
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>

          {data.recentBookings.map((booking, index) => {
            const car = booking.car; // could be null if deleted
            return (
              <div key={index} className="mt-4 flex items-center justify-between w-100 ">
                <div className='flex items-center'>
                  <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10'>
                    <img src='/listIconColored.svg' alt='listIcon' className='h-5 w-5' />
                  </div>
                  <div>
                    <p>{car ? `${car.brand} ${car.model}` : "Car Removed"}</p>
                    <p className='text-sm text-gray-500'>
                      {booking.createdAt.split('T')[0]}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 font-medium'>
                  <p className='text-sm text-gray-500'>
                    {currency}{booking.price}
                  </p>
                  <p className='px-3 py-0.5 border border-borderColor rounded-full text-sm'>
                    {booking.status}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* monthly revenue */}
        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>
          <p className='text-3xl mt-6 font-semibold text-primary'>
            {currency}{data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  )
}
