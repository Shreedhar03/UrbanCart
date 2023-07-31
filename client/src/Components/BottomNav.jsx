import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const BottomNav = () => {
    const { data, token } = useContext(AppContext)
    const [active,setActive] = useState(3)
    const navigate = useNavigate()
    return (
        <div className={`bg-white shadow-2xl shadow-black w-full fixed bottom-0 px-4 sm:hidden
                        ${!token && 'hidden'}`}>
            <ul className='flex items-center justify-between py-2'>
                <li className={`${active===1 && 'shadow shadow-gray-500 bg-gray-100 rounded-2xl'} flex py-2 px-3 flex-col items-center relative`} onClick={() => {navigate('/cart');setActive(1)}}>
                    <i className='bx bx-cart-alt text-xl'></i>
                    <p className='text-xs'>CART</p>
                    <p className={`absolute -top-1 left-4 ${data?.userData?.cart.length !== 0 && 'bg-red-500'} text-sm h-4 w-4 text-white flex items-center justify-center rounded-full`}>
                        {
                            token && data?.userData?.cart.length !== 0 && data?.userData?.cart.length
                        }
                    </p>
                </li>
                <li className={`${active===2 && 'shadow shadow-gray-500 bg-gray-100 rounded-2xl'} flex py-2 px-3 flex-col items-center relative`} onClick={() => {navigate('/user/inbox');setActive(2)}}>
                    <i className='bx bx-bell text-xl'></i>
                    <p className='text-xs'>INBOX</p>
                    <p className={`absolute top-1 left-8 ${data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center text-white justify-center rounded-full`}>
                        {
                            token && data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && data?.userData?.message.filter(ele => ele.isRead !== true).length
                        }
                    </p>
                </li>
                <li className={`flex py-2 px-3 flex-col items-center rounded-2xl ${active===3 && 'shadow shadow-gray-500 bg-gray-100'}`} onClick={() => {navigate('/');setActive(3)}}>
                    <i class='bx bx-home-alt text-xl'></i>
                    <p className='text-xs'>HOME</p>
                </li>
                <li className={`${active===4 && 'shadow shadow-gray-500 bg-gray-100 rounded-2xl'} flex py-2 px-3 flex-col items-center`} onClick={() => {navigate('/orders');setActive(4)}}>
                    <i className='bx bx-shopping-bag text-xl'></i>
                    <p className='text-xs'>ORDERS</p>
                </li>
                <li className={`${active===5 && 'shadow shadow-gray-500 bg-gray-100 rounded-2xl'} flex py-2 px-3 flex-col items-center`} onClick={() => {navigate('/profile');setActive(5)}}>
                    <i className='bx bx-user text-xl'></i>
                    <p className='text-xs'>PROFILE</p>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav
