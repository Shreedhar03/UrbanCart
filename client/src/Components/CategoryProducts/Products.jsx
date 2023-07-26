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
const calculatePrice = (price, discount) => {
    return price - price * discount / 100
}
const roundToTen = (num) => {
    let new_num = Math.round(num)
    let len = new_num.toString().length - 2;
    let num1 = new_num / (10 ** len)
    return Math.floor(num1) * (10 ** (len))
}

const Products = (props) => {
    const [categoryData, setCategoryData] = useState([])
    const [loading, setLoading] = useState(true)

    const calcRange = () => {
        const min_price_Product = categoryData.sort((a, b) => calculatePrice(a.price, a.discountPercentage) - calculatePrice(b.price, b.discountPercentage))[0]
        const max_price_Product = categoryData.sort((b, a) => calculatePrice(a.price, a.discountPercentage) - calculatePrice(b.price, b.discountPercentage))[0]
        console.log(min_price_Product,max_price_Product)
        const max_price = calculatePrice(max_price_Product.price, max_price_Product.discountPercentage)
        const min_price = calculatePrice(min_price_Product.price, min_price_Product.discountPercentage)
        console.log(min_price, max_price)
        console.log(roundToTen(max_price))
    }


    const fetchData = async () => {
        try {
            let category = window.location.href.split("/").slice(-1)
            let response = await axios.get(`${process.env.REACT_APP_ORIGIN}category/${category}`)
            console.log("response.data Category = ", response.data)
            setCategoryData(response.data)
            setTimeout(() => {
                setLoading(false);
            }, 1000)
            calcRange();

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

                            {/* <p className='text-lg font-semibold'>{categoryData.length} Results Found</p> */}

                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12'>
                                {
                                    categoryData
                                        ?.filter(p =>
                                            p.discountPercentage >= props.filters.discount.percent
                                        )?.filter(p =>
                                            calculatePrice(p.price, p.discountPercentage) > props.filters.price.min && calculatePrice(p.price, p.discountPercentage) < props.filters.price.max
                                        )?.map((ele, key) => {
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
