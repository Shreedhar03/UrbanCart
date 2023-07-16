import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import delivered from '../assets/delivered.svg'
import lock from '../assets/lock.svg'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserInbox = () => {
    const { token, data, cart, setCart } = useContext(AppContext)
    const navigate = useNavigate()
    const markAsRead = async () => {
        try {
            await axios.put(`http://localhost:5000/mark-as-read/${data?.userData?._id}`)
            setCart(!cart)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        !token && navigate('/login')
    })
    return (
        <>
            <Navbar />
            <div className="bg-gray-100 rounded-xl max-w-xl mx-auto flex flex-col mt-8 p-6">
                <div className='flex justify-between items-center'>
                    <h1 className="text-gray-800 font-semibold text-xl">Notifications</h1>
                    <button className="text-blue-500 font-semibold text-sm flex items-center" onClick={markAsRead}><i className='bx bx-check-double text-2xl'></i><span>Mark as read</span></button>
                </div>
                <ul className='my-8'>
                    {
                        data?.userData?.message?.map((ele, key) => {
                            return (
                                <li key={key} className='flex justify-between gap-3 border-b-2 border-gray-200 py-4'>
                                    <div className='flex gap-2 w-10/12'>
                                        {
                                            !ele.isRead &&
                                            <p className='rounded-full w-3 h-3 bg-[var(--secondary)] shrink-0 self-start mt-[6px]'></p>
                                        }
                                        <div>
                                            <p>{ele.message}</p>
                                            <p className='text-sm text-gray-600'>{ele.time}</p>
                                        </div>
                                    </div>
                                    <img src={ele.category === "security" ? lock : delivered} className='w-10 sm:w-16 self-start' alt="" />
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </>
    )
}

export default UserInbox
