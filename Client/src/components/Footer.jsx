import React from 'react'
import { motion } from "motion/react"


export default function Footer() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}

                className='flex flex-wrap justify-between items-start gap-8 pb-6
            border-borderColor border-b'>
                <div>
                    <motion.img
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        src="/logo.svg" alt="logo" className='h-8 md:h-9' />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='max-w-80 mt-3'>
                        Premium car rental service with a wide selection of luxury
                        and everyday vehicles for all your driving needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className='flex items-center gap-3 mt-4'>
                        <a href=''><img src="/facebook_logo.svg" alt='facebook' className='w-5 h-5' /></a>

                        <a href='#'><img src="/instagram_logo.svg" alt='instagram' className='w-5 h-5' /></a>

                        <a href='#'><img src="/twitter_logo.svg" alt='twitter' className='w-5 h-5' /></a>

                        <a href='#'><img src="/gmail_logo.svg" alt='gmail' className='w-5 h-5' /></a>

                    </motion.div>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Quik Links</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Browse Cars</a></li>
                        <li><a href="#">List Your cars</a></li>
                        <li><a href="#">About Us</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy POlicy</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                    <ul className='mt-3 flex flex-col gap-1.5 text-sm'>
                        <li>1234 Luxury Drive</li>
                        <li>San Francisco</li>
                        <li>+1 2334344534</li>
                        <li>info@example.com</li>
                    </ul>
                </div>

            </motion.div>

            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">CarRental</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li>|</li>
                    <li><a href="#">Terms</a></li>
                    <li>|</li>

                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </motion.div>
    )
}
