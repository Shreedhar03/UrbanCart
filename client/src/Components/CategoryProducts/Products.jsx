import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../ProductCard';

const handleStar = (n) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push("⭐")
    }

    return arr;
}
const Products = () => {
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
            let category = window.location.href.split("/").slice(-1)
            let response = await axios.get(`http://localhost:5000/category/${category}`)
            console.log(response.data)
            setCategoryData(response.data)
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
        catch (err) {
            console.log(err.message)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (

        <>
            <section className='lg:ml-[250px] my-12 flex flex-col items-center gap-6'>
                {

                    loading ? <h1 className='text-2xl text-center'>Loading...</h1> :
                        <>

                            <p className='text-lg font-semibold'>{categoryData.length} Results Found</p>

                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
                                {
                                    categoryData.map((ele, key) => {
                                        return (
                                            <ProductCard key={key} ele={ele} handleStar={handleStar} />
                                        )

                                        // Navigate from similar products ? 
                                    })
                                }
                            </div>
                        </>

                }
            </section>
        </>
    )
}

export default Products
