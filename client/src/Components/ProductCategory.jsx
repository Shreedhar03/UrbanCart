import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCategory(props) {
  return (
    <Link to={`/category/${props.search}`} className='catgory-image shrink-0 w-[310px] h-[200px] rounded-xl overflow-hidden relative cursor-pointer'>
      <img src={props.src} alt='product' className='rounded-xl object-cover w-full h-full hover:scale-[1.2] hover:blur-lg transition ease-in-out'/>
      <h2 className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl opacity-0 text-inherit'>{props.category}</h2>
    </Link>
  )
}
