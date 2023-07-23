import React, { useState } from 'react'
import Navbar from '../Navbar'
import Sidebar from './Sidebar'
import Products from './Products'

const CategoryProducts = () => {
  const [filters,setFilters]=useState({
    price:{min:0,max:500000},
    discount:{status:true,percent:0}
  })
  const handleFilters=(disc,min,max)=>{
    if(min || max){
      console.log(min,max)
      setFilters({...filters,price:{min:min,max:max}})
      console.log(filters.price)
    }
    else{
      console.log(disc)
      setFilters({...filters,discount:{status:true,percent:disc}})
    }
  }
  return (
    <>
      <div>
        <Sidebar filters={filters} setFilters={handleFilters}/>
        <Products filters={filters} setFilters={handleFilters}/>
      </div>
    </>
  )
}

export default CategoryProducts
