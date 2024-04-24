import React from 'react'
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <div className='py-5 pt-15'>
        <div className='px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-12'>
                <h1 className='text-black font-bold text-xl'>quickDeli</h1>
                <div>
                    <p className='font-semibold text-black'>Help</p>
                    <ul className='mt-8 space-y-4 text-gray-800'>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Q&A</a></li>
                    </ul>
                </div>
                <div>
                    <p className='font-semibold text-black'>Partners</p>
                    <ul className='mt-8 space-y-4 text-gray-800'>
                        <li><a href="#">Our silver partners</a></li>
                        <li><a href="#">Our platinum partners</a></li>
                    </ul>
                </div>
                <div>
                    <p className='font-semibold text-black'>Join us</p>
                    <ul className='mt-8 space-y-4 text-gray-800'>
                        <li><a href="#">HR</a></li>
                        <li><a href="#">Job Offers</a></li>
                    </ul>
                </div>
            </div>
            
            <div className='mt-20 sm:flex items-center justify-between sm:space-x-6'>
                <ul className='flex gap-5 text-black text-3xl mb-3 sm:mb-0'>
                    <li><a href="#"><AiFillInstagram/></a></li>
                    <li><a href="#"><AiFillFacebook/></a></li>
                </ul>

                <ul className='flex gap-6 text-black'>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                </ul>
            </div>


        </div>
    </div>
  )
}

export default Footer