import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from "../assets/qdeli.png";
import restaurant from "../assets/restaurant1.png";
import FoodCard from '../components/FoodCard';

const Home = () => {

    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:3000/food')
            .then((response) => {
                setFood(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

  return (
    <div className='p-4 max-w-[1400px] mx-auto mt-16'>

        <div className='grid sm:grid-cols-2 gap-4'>
            <img src={logo} className='rounded-2xl h-full object-cover' />
            <img src={restaurant} className='rounded-2xl h-full object-cover' />
        </div>

        <div className='rounded-tr-lg rounded-bl-lg bg-gradient-to-l from-green-400 to-green-600 mt-8 h-[40px]
                        flex items-center justify-start my-8'>
            <h1 className='text-2xl my-8 font-bold pl-8 text-white'>Lunch Specials</h1>
        </div>

        <FoodCard food={food} />
    </div>
  )
}

export default Home