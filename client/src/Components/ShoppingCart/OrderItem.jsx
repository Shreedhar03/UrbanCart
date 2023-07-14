import React from 'react'

const OrderItem = (props) => {
  return (
    <div className='bg-gray-100 px-4 py-6 rounded-2xl'>
      <p className='sm:px-12 text-lg font-semibold'>Order ID : <span className='text-[16px] font-normal'>{props._id}</span></p>
      <p className='sm:px-12 mt-2'>Date : {props.date}</p>
      <p className='sm:px-12 mt-2'>Status : <span className='font-semibold'>{props.status}</span></p>
      <div className='max-w-2xl bg-vioet-600 flex flex-col gap-4 mt-5 border-t-2 pt-5'>
        {props.cart.map((ele, key) => {
          return (
            <>
              <div key={key} className='flex justify-between sm:px-12'>
                <div className='flex gap-3'>
                  <img src={ele.product.images[0]} className='h-20 w-20 object-cover rounded-xl' alt="" />
                  <div>
                    <h2 className='text-xl font-semibold text-slate-800'>{ele.product.title}</h2>
                    <p className='text-sm text-gray-600'>Qty: {ele.quantity}</p>
                  </div>
                </div>
                {/* <div className='flex flex-col items-end'> */}
                <p className='text-xl font-semibold'>${(ele.product.price - ele.product.price * ele.product.discountPercentage / 100).toFixed(2)}</p>
                {/* </div> */}
              </div>
            </>
          )
        })}
        <p className='sm:px-12 font-semibold text-gray-600 text-right'>Amount Paid : <span>{props.amountPaid}</span></p>
      </div>
    </div>
  )
}

export default OrderItem
