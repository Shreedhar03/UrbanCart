import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const BottomNav = () => {
    const { data, products, token, setToken } = useContext(AppContext)
    const navigate = useNavigate()
    return (
        <nav className={`bg-white shadow-2xl shadow-black w-full sticky bottom-0 py-2 px-8 sm:hidden justify-evenly
                        ${!token && 'hidden'}`}>
            <ul className='flex items-center justify-between'>
                <li className='flex flex-col items-center relative' onClick={() => navigate('/cart')}>
                    <i className='bx bx-cart-alt text-xl'></i>
                    <p className='text-xs'>CART</p>
                    <p className={`absolute -top-1 left-4 ${data?.userData?.cart.length !== 0 && 'bg-red-500'} text-sm h-4 w-4 text-white flex items-center justify-center rounded-full`}>
                        {
                            token && data?.userData?.cart.length !== 0 && data?.userData?.cart.length
                        }
                    </p>
                </li>
                <li className='flex flex-col items-center relative' onClick={() => navigate('/user/inbox')}>
                    <i className='bx bx-bell text-xl'></i>
                    <p className='text-xs'>INBOX</p>
                    <p className={`absolute -top-1 left-5 ${data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center text-white justify-center rounded-full`}>
                        {
                            token && data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && data?.userData?.message.filter(ele => ele.isRead !== true).length
                        }
                    </p>
                </li>
                <li className='flex flex-col items-center' onClick={() => navigate('/orders')}>
                    <i className='bx bx-shopping-bag text-xl'></i>
                    <p className='text-xs'>ORDERS</p>
                </li>
                <li className='flex flex-col items-center' onClick={() => navigate('/profile')}>
                    <i className='bx bx-user text-xl'></i>
                    <p className='text-xs'>PROFILE</p>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNav
