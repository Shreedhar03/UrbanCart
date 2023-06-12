import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className='flex items-center justify-around py-4 sticky top-0 z-10 bg-white'>
            <p className="logo text-2xl sora font-extrabold">UrbanCart<span className='text-[var(--primary)]'> .</span></p>

            <ul className='flex items-end justify-center gap-12 text-[16px]'>
                <li><a href="/" className='flex items-center gap-1'><span>Category</span><i className='bx bx-chevron-down'></i></a></li>
                <li><a href="/">Deals</a></li>
                <li><a href="/">What's New</a></li>
            </ul>

            <form action="..." name='searchForm' className='flex items-stretch'>
                <input type="text" name='search' placeholder='try sport shoes' id='search' className='text-lg py-1 px-4 focus:outline-none bg-slate-100 rounded-l-xl' autoComplete='off'/>
                <button type="submit" name='submit' id='submit' className='text-xl bg-[var(--primary)] px-4 flex items-center rounded-r-xl'><i className='bx bx-search'></i></button>
            </form>

            <div className="user text-md flex items-center gap-8">
                <button className='flex items-center gap-1' onClick={()=>{navigate("/checkout")}}><i className='bx bx-cart-alt' ></i><p>Cart</p></button>
                <button className='flex items-center gap-1' onClick={()=>{navigate("/login")}}><i className='bx bx-user'></i><p>Sign Up / Login</p></button>
            </div>


        </nav>
    )
}
