import React from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
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
      <Footer />  
    </>
  )
}

export default CategoryProducts
