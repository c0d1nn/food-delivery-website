import React from 'react'
import { useCart } from "../../context/CartContext";
import { BiCart } from "react-icons/bi";

const CartIcon = () => {

    const { cartItems } = useCart();

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className='relative'>
        <BiCart className='text-3xl text-white'/>
        {totalQuantity > 0 && (
            <span className='absolute -top-2 bg-red-500 text-white rounded-full text-xs px-2 py-1'>
                {totalQuantity}
            </span>
        )}
        
    </div>
  )
}

export default CartIcon