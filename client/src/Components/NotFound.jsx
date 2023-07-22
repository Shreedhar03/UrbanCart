import React from 'react'
import image from '../assets/404.svg'
const NotFound = () => {
  return (
    <div className='h-[85vh] flex gap-24 items-center flex-col justify-center'>
      <h1 className='text-xl'>404 Page Not Found</h1> 
      <img src={image} className='w-72' alt="" />
    </div>
  )
}

export default NotFound
