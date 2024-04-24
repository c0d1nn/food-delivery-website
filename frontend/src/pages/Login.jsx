import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const changeInputHandler = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value});
        if(errorMessage) setErrorMessage('');
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('http://localhost:3000/auth/login', loginData);
            console.log(response.data);

            localStorage.setItem('token', response.data.token);

            navigate('/admin');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.msg);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    };



  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h2 className='text-2xl font-bold mb-10'>Log In</h2>
        {errorMessage && <p className='text-red-500 text-xs italic mb-2'>{errorMessage}</p>}

        <form className='w-full max-w-xs' onSubmit={submitHandler}>
            <input type="text" placeholder='Email' name="email" value={loginData.email} onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            />

            <input type="password" placeholder='Password' name="password" value={loginData.password} onChange={changeInputHandler}
            className='shadow border rounded-md w-full py-2 px-3 text-gray-700'
            />

            <button type='submit' className='bg-blue-500 hover:bg-blue-800 rounded-md py-2 px-4 w-full'>Log In</button>

        </form>

        <p className='mt-4'>No account yet?</p>
        <Link to="/register" className='text-blue-500 hover:text-blue-800 text-xl'>Register</Link>
    </div>
  )
}

export default Login