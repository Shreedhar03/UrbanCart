import React, { useContext } from 'react'
import { AppContext } from '../../App'

const Sidebar = () => {
  const { products } = useContext(AppContext)
  return (
    <div className='h-screen bg-[var(--primary)] text-gray-200 w-0 lg:w-[250px] shrink-0 fixed top-0 -z-10 overflow-y-scroll'>
      <div className='mt-24 max-w-[85%] mx-auto'>
        <h1>Apply Filters</h1>
        <div className='flex flex-col items-start gap-6 mt-8'>
          <h2>Price</h2>
          <div className='flex flex-col gap-2 items-start'>
            <button className='cursor-pointer'>Under &#8377;1,000</button>
            <button className='cursor-pointer'>&#8377;1,000-&#8377;5000</button>
            <button className='cursor-pointer'>&#8377;5,000-&#8377;10,000</button>
            <button className='cursor-pointer'>&#8377;10,000-&#8377;30,000</button>
            <button className='cursor-pointer'>Above &#8377;30,000</button>
          </div>
        </div>

        <div className='flex flex-col items-start gap-6 mt-8'>
          <h2>Discount</h2>
          <div className='flex flex-col gap-2 items-start'>
            <button className='cursor-pointer'>10% Off or more</button>
            <button className='cursor-pointer'>25% Off or more</button>
            <button className='cursor-pointer'>50% Off or more</button>
            <button className='cursor-pointer'>60% Off or more</button>
            <button className='cursor-pointer'></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
