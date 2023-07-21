import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navigation = (props) => {
    const navigate=useNavigate()
    return (
        <>
            <div className='max-w-5xl px-4 sm:px-12 sm:mx-auto'>
            <h1 className="mt-6 text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
            <div className='flex gap-6'>
                {/* <button className={`py-1 mt-6 font-semibold text-gray-800 border-b-[3px] ${props.currentTab === 1 ? 'border-[var(--secondary)]' : 'border-white'}`} onClick={() => { props.setCurrentTab(1); navigate('/admin') }}>Home</button> */}
                <button className={`py-1 mt-6 font-semibold text-gray-800 border-b-[3px] ${props.currentTab === 2 ? 'border-[var(--secondary)]' : 'border-white'}`} onClick={() => { props.setCurrentTab(2); navigate('/admin/product-data') }}>All Products</button>
                <button className={`py-1 mt-6 font-semibold text-gray-800 border-b-[3px] ${props.currentTab === 3 ? 'border-[var(--secondary)]' : 'border-white'}`} onClick={() => { props.setCurrentTab(3); navigate('/admin/orders') }}>Orders</button>
                <button className={`py-1 mt-6 font-semibold text-gray-800 border-b-[3px] ${props.currentTab === 4 ? 'border-[var(--secondary)]' : 'border-white'}`} onClick={() => { props.setCurrentTab(4); navigate('/admin/add-product') }}>New Product</button>
            </div>
            </div>
        </>
    )
}

export default Navigation
