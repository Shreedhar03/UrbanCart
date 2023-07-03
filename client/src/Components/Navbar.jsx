import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

/*
const getToken = ()=>{
    return localStorage.getItem("authToken") || null
}*/

export default function Navbar() {
    
    const {data,token,setToken} = useContext(AppContext)

    const navigate = useNavigate();
    return (
        <nav className='flex items-center justify-between py-4 sm:px-12 sticky top-0 z-10 bg-[var(--primary)] text-white flex-col md:flex-row w-full gap-4'>
            <p className="logo text-2xl sora font-extrabold cursor-pointer" onClick={() => { navigate('/') }}>UrbanCart<span className='text-[var(--secondary)]'> .</span></p>

            <div className='flex gap-2 sm:gap-6'>
                <form action="..." name='searchForm' className='flex items-stretch'>
                    <input type="text" name='search' placeholder='try sport shoes' id='search' className='w-48 sm:w-48 lg:w-72 text-lg py-1 px-4 focus:outline-none bg-[#405669] rounded-l-xl' autoComplete='off' />
                    <button type="submit" name='submit' id='submit' className='text-xl px-4 flex items-center rounded-r-xl bg-[var(--secondary)]'><i className='bx bx-search'></i></button>
                </form>

                <div className="user text-md flex items-center gap-3 sm:gap-4 justify-center">
                    <button className='flex items-center gap-1' onClick={() => { navigate("/checkout") }}><i className='bx bx-cart-alt text-2xl' ></i><p className='hidden md:block'>Cart</p></button>
                    {
                        token ?
                            <div className='flex items-center relative'>
                                {/* <i className='bx bx-user text-2xl'></i> */}
                                {/* <button className='hidden md:block'>Logout</button> */}
                                <button className='user-icon w-10 h-10 bg-[var(--secondary)] rounded-full text-black text-xl'>{data?.userData?.name.slice(0,1).toUpperCase()}</button>
                                <ul className='settings absolute top-10 -left-10 sm:top-10 sm:-left-6 bg-[var(--secondary)] text-black flex flex-col gap-4'>
                                    <li className='cursor-pointer'><Link to={'/profile'}>Profile</Link></li>
                                    <li className='cursor-pointer'>Orders</li>
                                    <li className='cursor-pointer' onClick={()=>{
                                        localStorage.removeItem("authToken");
                                        setToken(null);
                                        navigate('/');
                                        }}>Logout</li>
                                </ul>
                            </div>
                            :
                            <button className='flex items-center gap-1' onClick={() => { navigate("/login") }}>
                                <i className='bx bx-user text-2xl'></i>
                                <p className='hidden md:block'>Sign Up / Login</p>
                            </button>
                    }
                </div>
            </div>


            {/* <ul className='flex flex-col md:flex-row items-end justify-center lg:gap-12 text-[16px]'>
                            <li><a href="/" className='flex items-center gap-1'><span>Category</span><i className='bx bx-chevron-down'></i></a></li>
                            <li><a href="/">Deals</a></li>
                            <li><a href="/">What's New</a></li>
                        </ul> */}
        </nav>
    )
}

