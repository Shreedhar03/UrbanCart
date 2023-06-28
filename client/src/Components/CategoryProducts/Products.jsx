import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Products = () => {
    const [categoryData,setCategoryData] = useState([])
    const fetchData = async()=>{

        try{
            let response = await axios.get("http://localhost:5000/category/smartphones")
            console.log(response.data)
            setCategoryData(response.data)
        }
        catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <>
        <ul className='ml-[275px]'>
            {
                categoryData.map((ele,key)=>{
                    return <li key={key}>{ele.title}</li>
                })
            }
        </ul>
    </>
  )
}

export default Products
