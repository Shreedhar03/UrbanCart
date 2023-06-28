import React from 'react'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'
import Products from './Products'

const CategoryProducts = () => {
  return (
    <>
      <Navbar />
      <div>
        <Sidebar />
        {/* Products goes here */}
        <Products />
      </div>
    </>
  )
}

export default CategoryProducts
