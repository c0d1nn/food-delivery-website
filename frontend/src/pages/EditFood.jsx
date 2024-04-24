import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Spinner from '../components/Spinner';

const EditFood = () => {

    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/food/${id}`)
            .then((response) => {
                setName(response.data.name);
                setPriceInCents(response.data.priceInCents);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                alert('An error happened. Check console');
            });
    }, [id]);

    const handleEditFood = () => {
        const data = { name, priceInCents };
        setLoading(true);
        axios
            .put(`http://localhost:3000/food/${id}`, data, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Food edited succesfully', {variant:'success'});
                navigate('/admin');
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', {variant:'error'});
                console.log(error);
            });
    };


  return (
    <div className='p-6 bg-gray-50 flex justify-center items-center'>
        {loading && <Spinner/>}
        <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-white'>
            <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
            <h1 className='text-3xl font-semibold my-4 text-gray-800'>Edit Food</h1>
            <div className='my-4'>
                <label htmlFor="name" className='block text-md text-gray-600 mb-2'>Name</label>
                <input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border border-gray-300 px-4 py-2 w-full rounded-md'    
                />

                <label htmlFor="priceInCents" className='block text-md text-gray-600 mb-2'>Price in cents</label>
                <input 
                    id="priceInCents"
                    type="number"
                    value={priceInCents}
                    onChange={(e) => setPriceInCents(e.target.value)}
                    className='border border-gray-300 px-4 py-2 w-full rounded-md'    
                />

                <button onClick={handleEditFood} className='w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md mt-4'>
                    Save Changes
                </button>
            </div>
        </div>

        
    </div>
  )
}

export default EditFood