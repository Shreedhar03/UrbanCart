import React from 'react'
import image from '../assets/404.svg'
const NotFound = (props) => {
  return (
    <div className='h-[85vh] flex gap-24 items-center flex-col justify-center'>
      <h1 className='text-2xl font-semibold text-gray-700'>{props.message}</h1> 
      <img src={image} className='w-72' alt="" />
    </div>
  )
}

export default NotFound
