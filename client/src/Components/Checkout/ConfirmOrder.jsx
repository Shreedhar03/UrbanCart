import React from 'react'

const ConfirmOrder = (props) => {
  return (
    <div className='flex flex-col fixed top-56 left-1/2 -translate-x-1/2 bg-slate-100 z-10 p-8 gap-4 w-full sm:w-auto'>
      <h1 className='font-semibold text-xl text-gray-700'>Order Confirmation</h1>
      <div>
        <p>Are you sure you want to place the order ?</p>
      </div>
      <div className='flex gap-3'>
      <button className='border border-[var(--secondary)] py-2 rounded-lg px-6' onClick={props.close}>Cancel</button>
      <button className='bg-[var(--secondary)] py-2 rounded-lg px-6' onClick={props.handleSubmit}>Place Order</button>
      </div>
    </div>
  )
}

export default ConfirmOrder
