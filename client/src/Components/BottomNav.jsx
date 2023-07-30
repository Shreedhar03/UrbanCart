import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const BottomNav = () => {
    const { data, products, token, setToken } = useContext(AppContext)
    const navigate=useNavigate()
    return (
        <nav className={`bg-white shadow-2xl shadow-black w-full sticky bottom-0 py-1 px-8 sm:hidden justify-evenly
                        ${!token&&'hidden'}`}>
            <ul className='flex items-center justify-between'>
                <li className='flex flex-col items-center' onClick={()=>navigate('/cart')}>
                    <i className='bx bx-cart-alt text-xl'></i>
                    <p className='text-xs'>CART</p>
                </li>
                <li className='flex flex-col items-center' onClick={()=>navigate('/user/inbox')}>
                    <i className='bx bx-bell text-xl'></i>
                    <p className='text-xs'>INBOX</p>
                </li>
                <li className='flex flex-col items-center' onClick={()=>navigate('/orders')}>
                    <i className='bx bx-shopping-bag text-xl'></i>
                    <p className='text-xs'>ORDERS</p>
                </li>
                <li className='flex flex-col items-center' onClick={()=>navigate('/profile')}>
                    <i className='bx bx-user text-xl'></i>
                    <p className='text-xs'>PROFILE</p>
                </li>
            </ul>
        </nav>
    )
}

export default BottomNav
