import React, { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import axios from 'axios'

const handleStar = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push("⭐")
  }

  return arr;
}

const SimilarProducts = (props) => {
  const [data, setData] = useState([])
  let category = props.category

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios.get(`http://localhost:5000/category/${category}`)
      setData(res.data)
    }

    fetchData();
  }, [category])
  return (
    <>
      <h1 className='font-semibold text-2xl'>{data.length-1} Similar Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-8'>
        {
          data.filter((ele)=>{
            return ele.id !== props.thisID
          }).map((ele, key) => {
            return <ProductCard ele={ele} key={key} handleStar={handleStar} />
          })
        }
      </div>
    </>
  )
}

export default SimilarProducts
