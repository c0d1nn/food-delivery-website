import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Success = () => {

  const location = useLocation();

  const [orderDetails, setOrderDetails] = useState(null);

  const session_id = new URLSearchParams(location.search).get('session_id');

  const postOrderToDatabase = async (postData) => {
    try {
      const response = await fetch('http://localhost:3000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error('Failed to save order to database');
      }

      const responseData = await response.json();
      console.log('Order saved to database: ', responseData);
    } catch (error) {
        console.error('Error posting order to a database: ', error);
    }
  }

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/stripe/api/session/${session_id}`);
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        const data = await response.json();
        setOrderDetails(data);
        postOrderToDatabase(data);

        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('Failed to fetch session details: ', error);
      }
    }
    
      if (session_id) {
        fetchSessionDetails();
      }

  }, [session_id])
  

  return (
    <div className='max-w-4xl mx-auto my-40 p-5 bg-green-100 rounded-lg shadow'>
      <h1 className='text-3xl font-bold text-green-800'>Payment Succesfull</h1>
      {orderDetails ? (
        <div>
          <p className='mt-4'>Thank you, {orderDetails.customerEmail}, for your purchase. Here are your order details: </p>
          <ul className='mt-4'>
            {orderDetails.items.map((item, index) => (
              <li key={index}>Order: {item.name}, quantity: {item.quantity}</li>
            ))}
          </ul>

          <p className='mt-4'>Shipping Address:</p>
          <p>Address Line 1: {orderDetails.address.line1}</p>
          <p>Address Line 2: {orderDetails.address.line2}</p>
          <p>City & State & ZIP: {`${orderDetails.address.city}, ${orderDetails.address.state}, ${orderDetails.address.postal_code} `}</p>
          <p>Country: {orderDetails.address.country}</p>
        </div>
      ) : (
        <p className='mt-4'>Loading order details...</p>
      )}
      <div className='mt-4'>
        <Link to="/" className='bg-green-600 hover:bg-green-900 text-white py-2 px-4 font-semibold'>Go Back to Homepage</Link>
      </div>
      
    </div>
  )
}

export default Success