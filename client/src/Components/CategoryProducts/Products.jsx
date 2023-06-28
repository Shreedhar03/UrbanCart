import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const handleStar = (n)=>{
    let arr=[];
    for(let i=0;i<n;i++){
        arr.push("⭐")
    }

    return arr;
}
const Products = () => {
    const [categoryData, setCategoryData] = useState([])
    const fetchData = async () => {
        try {
            let category = window.location.href.split("/").slice(-1)
            let response = await axios.get(`http://localhost:5000/category/${category}`)
            console.log(response.data)
            setCategoryData(response.data)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <section className='lg:ml-[250px] my-12 flex flex-col items-center gap-6'>
            <p className='text-lg font-semibold'>{categoryData.length} Results Found</p>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
                {
                    categoryData.map((ele, key) => {
                        return (
                            <div key={key} className='w-[330px] h-[500px] border border-slate-300 pb-4 rounded-2xl flex flex-col justify-between'>

                                <div className="images flex overflow-scroll w-full h-[290px] rounded-t-2xl snap-x snap-mandatory">
                                    {ele.images.map((img, i) => {
                                        return <img src={img} key={i} className='shrink-0 w-full h-full object-cover snap-center' alt='product'></img>
                                    })}
                                </div>

                                <div className="details mx-3 flex flex-col h-[210px] justify-between py-4">
                                    <div className='flex justify-between'>
                                        <div className='flex flex-col'>
                                        <Link to={`/product/${ele._id}`} className='w-[75%] text-lg font-semibold'>{ele.title}</Link>
                                        <Link to={`/product/${ele._id}`} className='w-full text-sm'>{ele.description}</Link>
                                        </div>
                                        <p className='font-semibold'>${ele.price}</p>
                                    </div>

                                    <p>
                                        {handleStar(Math.floor(ele.rating)).map((ele,key)=>{
                                            return(
                                                <span key={key}>{ele}</span>
                                            ) 
                                        })}
                                    </p>
                                    {/* <h2>{ele.brand}</h2> */}
                                </div>
                                <button className='text-md border border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all px-4 py-2 rounded-lg self-start mx-3 text-[var(--secondary)]'>Add To Cart</button>
                            </div>
                        )
                    })
                }
            </div>

        </section>
    )
}

export default Products
