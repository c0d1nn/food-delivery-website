import React from 'react'
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { BiPlus, BiMinus } from 'react-icons/bi';
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe('pk_test_51P3HBFKDv03KPTKma9xQpBfSIpJAhtUYhUpFTZr2w4CM4oKk3H2BxRDdPa8FFlz7OF1DD1QsLuUkAHBtLtLg2mzc0001jGsAmt');

const Cart = () => {

    const { cartItems, decreaseCartItemQuantity, addToCart } = useCart();

    if (cartItems.length === 0) {
        return <div className='text-black text-3xl text-center my-72'>Your cart is empty.</div>;
    }

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const transformedItems = cartItems.map(item => ({
            name: item.name,
            priceInCents: item.priceInCents,
            quantity: item.quantity
        }))

        try {
            const response = await axios.post('http://localhost:3000/stripe/create-checkout-session', {
                products: transformedItems
            })

            if (response.data.id) {
                await stripe.redirectToCheckout({
                    sessionId: response.data.id
                });
            } else {
                throw new Error('Session ID missing in response');
            }
        } catch (error) {
            console.error('There was an error processing the checkout: ', error)
        }

    }

    const totalPrice = cartItems.reduce((acc, item) => acc + item.priceInCents * item.quantity, 0);



  return (
    <div className='p-4 mt-16 max-w-[1400px] mx-auto'>
        <h2 className='text-2xl font-semibold text-center my-6'>Shopping Cart</h2>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {cartItems.map((item, index) => (
                <div key={index} className='bg-white rounded-lg shadow-lg p-4 flex flex-col'>
                    <img src={item.image} alt={item.name} className='rounded-md mb-4 w-full h-64 object-cover' />
                    <h2 className='text-lg font-bold mb-2'>{item.name}</h2>
                    <p className='text-md mb-1'>Price: ${(item.priceInCents / 100).toFixed(2)}</p>
                    <div className='flex items-center justify-between text-md mb-3'>
                        <p>Quantity: {item.quantity}</p>
                        <div className='flex items-center'>
                            <button onClick={() => decreaseCartItemQuantity(item._id)}
                            className='bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-lg'
                            ><BiMinus/></button>
                            <button onClick={() => addToCart(item)}
                            className='bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-lg'
                            ><BiPlus/></button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='text-center mt-8'>
            <p className='text-2xl font-semibold mb-4'>Total Price: ${(totalPrice / 100).toFixed(2)}</p>
            <button onClick={handleCheckout} className='text-white text-xl font-bold py-4 px-8 rounded-xl bg-gradient-to-r from-green-600
            to-green-700 hover:from-green-800 hover:to-green-900'
            >
                Proceed to Checkout</button>
        </div>  
    </div>
  )
}

export default Cart