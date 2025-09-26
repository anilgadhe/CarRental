import React from 'react'
import Title from './Title'
import {motion} from "motion/react"

export default function Testinomial() {

     const testimonials = [
        {
            id: 1,
            name: "Aarav Mehta",
            address: "Mumbai, India",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            review: "The booking process was seamless, and the car was in excellent condition. Highly recommend this service!"
        },
        {
            id: 2,
            name: "Sophia Sharma",
            address: "Bangalore, India",
            image: "https://randomuser.me/api/portraits/women/45.jpg",
            rating: 4,
            review: "Great experience overall. The customer support was very responsive when I had questions."
        },
        {
            id: 3,
            name: "Rohan Verma",
            address: "Delhi, India",
            image: "https://randomuser.me/api/portraits/men/76.jpg",
            rating: 5,
            review: "The prices are fair, and the cars are always clean and well-maintained. I use it frequently for business trips."
        },
        {
            id: 4,
            name: "Ananya Patel",
            address: "Pune, India",
            image: "https://randomuser.me/api/portraits/women/65.jpg",
            rating: 4,
            review: "Easy to book, smooth pickup, and friendly staff. The only issue was a slight delay in car delivery."
        },
        {
            id: 5,
            name: "Kabir Nair",
            address: "Hyderabad, India",
            image: "https://randomuser.me/api/portraits/men/12.jpg",
            rating: 5,
            review: "Fantastic service! I rented a luxury car for a wedding, and it exceeded all expectations."
        },
        {
            id: 6,
            name: "Isha Kapoor",
            address: "Chennai, India",
            image: "https://randomuser.me/api/portraits/women/29.jpg",
            rating: 5,
            review: "Very professional service. The car was spotless, and the entire process was hassle-free. Will book again!"
        }
    ];


    return (
        <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">

            <Title title="What Our Customers Say" subTitle="Discover why discerning
              travelers choose stayVenture for their luxury accommodations around the world" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8
            hover:-translate-y-1 transition-all duration-500 cursor-grab">
                {testimonials.map((testimonial,index) => (
                    <motion.div 
                    initial={{opacity:0,y:40}}
                    whileInView={{opacity:1,y:0}}
                    transition={{duration:0.6,delay:index*0.2,ease:"easeOut"}}
                    viewport={{once:true,amount:0.3}}
                    
                    key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-xs">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src="./star_icon.svg" alt='Start_icon' />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
