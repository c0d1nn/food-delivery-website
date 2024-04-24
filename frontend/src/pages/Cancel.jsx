import React from 'react'
import { Link } from "react-router-dom";


const Cancel = () => {
  return (
    <div className='max-w-4xl mx-auto p-5 bg-red-100 rounded-lg shadow my-72'>
      <h1 className='text-3xl font-bold text-red-800'>Payment Cancelled or Failed</h1>
      <p className='mt-4'>Your payment process was not completed. If this was an error, you may try again.</p>
      <div className='mt-16'>
         <Link to="/" className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-900'>Return to Homepage</Link> 
      </div>
    </div>
  )
}

export default Cancel