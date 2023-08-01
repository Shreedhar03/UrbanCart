import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const BottomNav = () => {
    const { data, token } = useContext(AppContext)
    const [active, setActive] = useState(3)
    const navigate = useNavigate()
    return (
        <div className={`bg-white shadow-2xl shadow-black w-full fixed bottom-0 sm:hidden
                        ${!token && 'hidden'}`}>
            <ul className='flex items-center justify-between'>
                <li className={`${active === 1 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center relative ${data?.userData?.role==="admin"&&'hidden'}`} onClick={() => { navigate('/cart'); setActive(1) }}>
                    <i className='bx bx-cart-alt text-xl'></i>
                    <p className='text-xs'>CART</p>
                    <p className={`absolute top-1 left-9 ${data?.userData?.cart.length !== 0 && 'bg-red-500'} text-sm h-4 w-4 text-white flex items-center justify-center rounded-full`}>
                        {
                            token && data?.userData?.cart.length !== 0 && data?.userData?.cart.length
                        }
                    </p>
                </li>
                <li className={`${active === 2 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center relative`} onClick={() => { navigate('/user/inbox'); setActive(2) }}>
                    <i className='bx bx-bell text-xl'></i>
                    <p className='text-xs'>INBOX</p>
                    <p className={`absolute top-1 left-9 ${data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center text-white justify-center rounded-full`}>
                        {
                            token && data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && data?.userData?.message.filter(ele => ele.isRead !== true).length
                        }
                    </p>
                </li>
                <li className={`${active === 3 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center`} onClick={() => { navigate('/'); setActive(3) }}>
                    <i class='bx bx-home-alt text-xl'></i>
                    <p className='text-xs'>HOME</p>
                </li>
                {
                    data?.userData?.role === "admin" ?
                        <li className={`${active === 4 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center`} onClick={() => { navigate('/admin'); setActive(4) }}>
                            <i className='bx bx-shopping-bag text-xl'></i>
                            <p className='text-xs'>DASHBOARD</p>
                        </li> :
                        <li className={`${active === 4 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center`} onClick={() => { navigate('/orders'); setActive(4) }}>
                            <i className='bx bx-shopping-bag text-xl'></i>
                            <p className='text-xs'>ORDERS</p>
                        </li>
                }
                <li className={`${active === 5 ? 'border-gray-800' : 'border-gray-50'} transition-all border-t-[3px] w-1/5 flex py-2 px-3 flex-col items-center`} onClick={() => { navigate('/profile'); setActive(5) }}>
                    <i className='bx bx-user text-xl'></i>
                    <p className='text-xs'>PROFILE</p>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav
