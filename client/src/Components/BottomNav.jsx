import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

const urls = {
    'cart': 1,
    'inbox': 2,
    '': 3,
    'orders': 4,
    'profile': 5
}
const BottomNav = () => {
    const { data, token } = useContext(AppContext)
    const url = window.location.href.split("/").splice(-1)[0]
    const [active, setActive] = useState(urls[url])

    console.log(url)
    const navigate = useNavigate()

    useEffect(() => {
        setActive(urls[url])
    }, [url])
    return (
        <div className={`bg-white shadow-2xl shadow-black w-full fixed bottom-0 sm:hidden
                        ${!token && 'hidden'}`}>
            <ul className='flex items-center justify-between py-1'>
                <li className={`${active === 1 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center relative ${data?.userData?.role === "admin" && 'hidden'}`} onClick={() => { navigate('/cart'); }}>
                    <i className='bx bx-cart-alt text-xl'></i>
                    <p className='text-xs'>CART</p>
                    <p className={`absolute top-1 left-9 ${data?.userData?.cart.length !== 0 && 'bg-red-500'} text-sm h-4 w-4 text-white flex items-center justify-center rounded-full`}>
                        {
                            token && data?.userData?.cart.length !== 0 && data?.userData?.cart.length
                        }
                    </p>
                </li>
                <li className={`${active === 2 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center relative`} onClick={() => { navigate('/user/inbox'); }}>
                    <i className='bx bx-bell text-xl'></i>
                    <p className='text-xs'>INBOX</p>
                    <p className={`absolute top-1 left-9 ${data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center text-white justify-center rounded-full`}>
                        {
                            token && data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && data?.userData?.message.filter(ele => ele.isRead !== true).length
                        }
                    </p>
                </li>
                <li className={`${active === 3 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center`} onClick={() => { navigate('/'); }}>
                    <i class='bx bx-home-alt text-xl'></i>
                    <p className='text-xs'>HOME</p>
                </li>
                {
                    data?.userData?.role === "admin" ?
                        <li className={`${active === 4 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center`} onClick={() => { navigate('/admin'); }}>
                            <i className='bx bx-shopping-bag text-xl'></i>
                            <p className='text-xs'>DASHBOARD</p>
                        </li> :
                        <li className={`${active === 4 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center`} onClick={() => { navigate('/orders'); }}>
                            <i className='bx bx-shopping-bag text-xl'></i>
                            <p className='text-xs'>ORDERS</p>
                        </li>
                }
                <li className={`${active === 5 && 'bg-slate-200 rounded-lg'} transition-all w-1/5 flex py-1 px-2 flex-col items-center`} onClick={() => { navigate('/profile'); }}>
                    <i className='bx bx-user text-xl'></i>
                    <p className='text-xs'>PROFILE</p>
                </li>
            </ul>
        </div>
    )
}

export default BottomNav
