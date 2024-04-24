import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from 'react-router-dom';
import logoNav from "../assets/logoQdeli.png";
import CartIcon from '../components/CartIcon';

const Navbar = () => {

    const [nav, setNav] = useState(false);
    const toggleNav = () => setNav(!nav);


  return (
    <div className='bg-gradient-to-b from-green-400 to-green-600 shadow-lg fixed top-0 z-50 opacity-95 w-full'>
        <div className='flex justify-between items-center p-4 max-w-[1400px] mx-auto'>
            <a href="/" className='flex items-center'>
                <img src={logoNav} alt="logo" className='max-w-[100px]'/>
            </a>

            <Link to="/cart">
                <CartIcon/>
            </Link>

            <button onClick={toggleNav} className='text-white lg:hidden'>
                {nav ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>

            <nav className={`${nav ? "flex bg-green-600" : "hidden"} absolute  lg:static w-full lg:w-auto lg:flex flex-col lg:flex-row items-center
                            space-y-5 lg:space-y-0 lg:space-x-6 top-14 left-0 right-0 py-5 lg:py-0 z-20`}>
                        <Link to="/" className='text-white'>Home</Link>
                        <Link to="/contact" className='text-white'>Contact</Link>
            </nav>
        </div>
    </div>
  )
}

export default Navbar