import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from 'notistack'
import Spinner from '../components/Spinner'

const DeleteOrder = () => {

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

    const handleDeleteOrder = () => {
        setLoading(true);

        axios
            .delete(`http://localhost:3000/order/${id}`, config)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Order deleted succesfully', {variant:'success'});
                navigate('/admin/dashboard')
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error deleting the order', {variant:'error'});
                console.log(error);
            })
    }

  return (
    <div className='p-6 bg-gray-50 flex justify-center items-center min-h-[60vh]'>
        {loading && <Spinner/> }
        <div className='container max-w-lg mx-auto shadow-lg rounded-lg bg-white text-center p-10'>
            <Link to="/admin/dashboard" 
            className='flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl'>
                Back
            </Link>

            <h2 className='text-2xl mb-4 font-semibold text-gray-800'>Are You Sure You Want to Delete This Order?</h2>
            <button onClick={handleDeleteOrder}
                    className='bg-red-600 hover:bg-red-800 text-white py-2 px-4 rounded-md w-full'>
                Yes, Delete It
            </button>

        </div>
    </div>
  )
}

export default DeleteOrder