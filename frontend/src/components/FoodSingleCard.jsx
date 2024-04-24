import React, { useState } from 'react';
import { BiCart, BiMinus, BiPlus } from "react-icons/bi";
import { useCart } from "../../context/CartContext";

const FoodSingleCard = ({ food }) => {
    const { addToCart, removeFromCart, cartItems } = useCart();

    const itemInCart = cartItems.find(item => item._id === food._id);

    const quantity = itemInCart ? itemInCart.quantity : 0;


    const handleAddToCart = () => {
        addToCart(food);
    }

    const handleRemoveFromCart = () => {
        removeFromCart(food._id);
    }

  return (
    <div className='border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl m-4 bg-gradient-to-br from-green-50 to-green-100 relative'>
        <img className='object-cover w-full h-56 lg:h-72' src={food.image} alt={food.name} />
        <div className='p-4'>
            <div className='flex justify-between items-baseline mb-12'>
                <h2 className='text-xl lg:text-2xl font-bold text-gray-800'>{food.name}</h2>
                <span className='text-lg lg:text-xl font-semibold text-green-600'>
                    ${(food.priceInCents / 100).toFixed(2)}
                </span>
            </div>

            <div className='flex justify-end items-center gap-x-2 absolute bottom-0 right-0'>
                {quantity > 0 && (
                    <>
                        <button onClick={handleRemoveFromCart} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-tl-lg'>
                            <BiMinus className='text-xl' />
                        </button>
                        <span className='px-4 py-2 bg-white text-black font-bold'>{quantity}</span>
                    </>
                )}
        
                <button onClick={handleAddToCart} className={`bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold
                                    py-4 px-6 rounded-tr-lg rounded-bl-lg`}>
                    <BiPlus className='text-xl' />
                </button>
            </div>

        </div>
    </div>
  )
}

export default FoodSingleCard