import React, { useContext, useEffect } from 'react'
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
            await axios.put(`${process.env.REACT_APP_ORIGIN}mark-as-read/${data?.userData?._id}`)
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
            <div className="bg-gray-100 rounded-xl max-w-xl mx-auto flex flex-col my-8 p-6">
                <div className='flex justify-between items-center'>
                    {
                        data?.userData?.message?.length === 0 ?
                            <p className='self-center'>You do not have any notifications.</p> :
                            <>
                                <h1 className="text-gray-800 font-semibold text-xl">Notifications</h1>
                                <button className="text-blue-500 font-semibold text-sm flex items-center" onClick={markAsRead}><i className='bx bx-check-double text-2xl'></i><span>Mark as read</span></button>
                            </>
                    }
                </div>
                <ul className='my-8'>
                    {
                        data?.userData?.message?.sort((a, b) => new Date(b.time) - new Date(a.time))
                            ?.sort((a, b) => {
                                const dateA = new Date(a.time.replace(/ at/, ''));
                                const dateB = new Date(b.time.replace(/ at/, ''));
                                return dateB - dateA;
                            })
                            .map((ele, key) => {
                                return (
                                    <li key={key} className='flex justify-between gap-3 border-b-2 border-gray-200 py-4'>
                                        <div className='flex gap-2 w-10/12'>
                                            {
                                                <p className={`rounded-full w-3 h-3 ${ele.isRead ? 'bg-gray-100' : 'bg-[var(--secondary)]'} shrink-0 self-start mt-[6px]`}></p>
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
