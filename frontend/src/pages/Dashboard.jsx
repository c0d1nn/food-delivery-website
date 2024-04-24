import React, { useEffect, useState } from 'react'
import axios from "axios"
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios
            .get('http://localhost:3000/order')
            .then((response) => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])

  return (
    <div className='px-4 py-8 max-w-7xl mx-auto bg-gray-50'>
        {loading && <Spinner/>}

        <div className='shadow overflow-x-auto'>
            <table className='w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" className='py-3 px-6'>#order</th>
                        <th scope="col" className='py-3 px-6'>Food</th>
                        <th scope="col" className='py-3 px-6'>Quantity</th>
                        <th scope="col" className='py-3 px-6'>Email</th>
                        <th scope="col" className='py-3 px-6'>Street</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order._id} className='bg-white border-b hover:bg-gray-50'>
                            <td className='py-4 px-6'>{index + 1}</td>
                            <td className='py-4 px-6'>{order.items[0].name}</td>
                            <td className='py-4 px-6'>{order.items[0].quantity}</td>
                            <td className='py-4 px-6'>{order.customerEmail}</td>
                            <td className='py-4 px-6'>{order.address.line1}</td>
                            <td className='py-4 px-6'>
                                <div>
                                    <Link to={`/admin/order/delete/${order._id}`}
                                    className='bg-red-500 hover:bg-red-900 text-white py-2 px-4 rounded-lg'>
                                    Delete
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Dashboard