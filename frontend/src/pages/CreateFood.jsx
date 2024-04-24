import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Spinner from '../components/Spinner';

const CreateFood = () => {

    const [name, setName] = useState('');
    const [priceInCents, setPriceInCents] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [img, setImg] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImg(selectedFile);
        if(selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImgPreview(null);
        }
    }

    const uploadFile = async () => {
        if (!img) {
            enqueueSnackbar('No image selected', {variant:'warning'});
            return;
        }

        const token = localStorage.getItem('token');
        if(!token) {
            console.log('No token found');
            enqueueSnackbar('Authentification required', { variant: 'error'});
            return;
        }

        const data = new FormData();
        data.append('file', img);

        try {
            const uploadUrl = 'http://localhost:3000/upload-image';
            const res = await axios.post(uploadUrl, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { secure_url } = res.data;
            console.log('Uploaded image url: ', secure_url);
            enqueueSnackbar('Image uploaded succesfully', {variant:'success'});
            return secure_url;
        } catch (error) {
            console.error('Upload error', error);
            enqueueSnackbar('Failed to upload an image', {variant:'error'});
        }
    }

    const handleSaveFood = async () => {
        if (!name || !priceInCents) {
            enqueueSnackbar('Please fill all required fields', {variant:'warning'});
            return;
        }

        const price = parseInt(priceInCents);
        if (isNaN(price) || price <= 0) {
            enqueueSnackbar('Price must be a positive number', { variant: 'warning'});
            return;
        }

        if (name.length < 2 || name.length > 30) {
            enqueueSnackbar('Food name must be between 2 and 30 characters', { variant: 'warning'});
            return;
        }

        setLoading(true);

        try {
            const uploadedImageUrl = await uploadFile();
            if (!uploadedImageUrl) {
                throw new Error('Image upload failed');
            }

            const formData = {
                name,
                priceInCents,
                image: uploadedImageUrl
            };

            const token = localStorage.getItem('token');
            if (!token) {
                enqueueSnackbar('Authentification failed', { variant: 'error'} );
                setLoading(false);
                return;
            }


            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            console.log(import.meta.env.VITE_REACT_APP_BACKEND_BASEURL);

            await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/food`, formData, config);

            enqueueSnackbar('Food saved succesfully', { variant:'success' });
            navigate('/admin');
        } catch (error) {
            console.error('Error:', error);
            enqueueSnackbar('Error saving food: ' + (error.response?.data?.message || error.message), {variant:'error'});
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='p-6 bg-gray-50 min-h-screen flex justify-center '>
        {loading && <Spinner/>}

        <div className='container max-w-lg shadow-lg rounded-lg p-5 bg-white'>
            <Link to="/admin" className='flex justify-center items-center bg-gray-400 mb-4 w-12 py-2 px-4 text-sm rounded-xl'>Back</Link>
            <h1 className='text-3xl font-semibold text-gray-800 my-4'>Create Food</h1>
            <div className='space-y-4'>
                <label htmlFor='name' className='block text-lg text-gray-600 mb-2'>Name</label>
                <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full border border-gray-300 px-4 py-2 rounded-md'
                required
                />

                <label htmlFor='priceInCents' className='block text-lg text-gray-600 mb-2'>Price in cents</label>
                <input
                id="priceInCents"
                type="number"
                value={priceInCents}
                onChange={(e) => setPriceInCents(e.target.value)}
                className='w-full border border-gray-300 px-4 py-2 rounded-md'
                required
                />


                <label htmlFor='img' className='block text-lg text-gray-600 mb-2'>Upload Image</label>
                <input
                id="img"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className='w-full border border-gray-300 px-4 py-2 rounded-md'
                required
                />


                {imgPreview && (
                    <div className='my-4'>
                        <img src={imgPreview} alt="Preview" className='max-w-full h-auto' />
                    </div>
                )}

                <button onClick={handleSaveFood} className='w-full bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded-md' >Save</button>
            </div>
        </div>
    </div>
  )
}

export default CreateFood