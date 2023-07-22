import React from 'react'

const OrderItem = (props) => {
  return (
    <div className='bg-gray-100 px-4 py-6 rounded-2xl mx-2'>
      <p className='sm:px-12 text-lg font-semibold'>Order ID : <span className='text-[16px] font-normal'>{props._id}</span></p>
      <p className='sm:px-12 mt-2'>Date : {props.date}</p>
      <p className='sm:px-12 mt-2'>Status : <span className='font-semibold'>{props.status}</span></p>
      <div className='max-w-2xl bg-vioet-600 flex flex-col gap-8 mt-5 border-t-2 pt-5'>
        {props.cart?.map((ele, key) => {
          return (
            <>
              <div key={key} className='flex justify-between sm:px-12'>
                <div className='flex gap-3'>
                  <img src={ele.product.images[0]} className='h-20 w-20  object-contain rounded-xl' alt="" />
                  <div>
                    <h2 className='text-xl text-black'>{ele.product.title}</h2>
                    <p className='text-sm text-gray-600'>Qty: {ele.quantity}</p>
                  </div>
                </div>
                {/* <div className='flex flex-col items-end'> */}
                <p className='sm:text-xl font-semibold text-gray-900'>&#8377;{(ele.product.price  - ele.product.price  * ele.product.discountPercentage / 100).toFixed(2)}</p>
                {/* </div> */}
              </div>
            </>
          )
        })}
        <p className='sm:px-12 font-semibold text-gray-800 text-right'>Amount Paid : <span>&#8377;{props.amountPaid}</span></p>
      </div>
    </div>
  )
}

export default OrderItem
