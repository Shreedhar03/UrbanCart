import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCategory(props) {
  return (
    <Link to={`/category/${props.search}`} className='image-div shrink-0 w-[310px] h-[200px] rounded-xl overflow-hidden relative cursor-pointer'>
      <img src={props.src} alt='product' className='category-image rounded-xl object-cover w-full h-full'/>
      <h2 className='image-tag absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-2xl text-white'>{props.category}</h2>
    </Link>
  )
}
