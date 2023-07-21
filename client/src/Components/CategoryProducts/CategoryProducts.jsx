import React from 'react'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'
import Products from './Products'

const CategoryProducts = () => {
  return (
    <>
      <div>
        <Sidebar />
        <Products />
      </div>
    </>
  )
}

export default CategoryProducts
