import React from 'react'

export default function ProductCategory(props) {
  return (
    <div className='w-[310px] h-[200px] rounded-xl'>
      <img src={props.src} alt='product' className='rounded-xl object-cover w-full h-full'/>
    </div>
  )
}
