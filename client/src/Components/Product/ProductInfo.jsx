import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
// import Checkbox from './Checkbox'
import Size from './Size'
import Quantity from './Quantity'
import OrderButton from './OrderButton'
import axios from 'axios'

export default function ProductInfo() {

    const [data, setData] = useState({})

    const fetchData = async () => {
        let id = window.location.href.split("/").slice(-1)
        let response = await axios.get(`http://localhost:5000/product/${id}`)

        console.log(response.data)

        setData(response.data)
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Navbar />

            <section className="flex flex-col md:flex-row items-center lg:items-start justify-center py-12 md:py-12 md:px-12 gap-12 md:gap-24 lg:gap-32">
                <div className="left w-9/12 sm:w-7/12 md:w-1/2 h-[400px] md:h-[500px] lg:self-start flex overflow-scroll snap-mandatory snap-x">
                    {/* <img src={data.images?.slice(-1)} alt="" className='w-full h-full object-cover' /> */}
                    {data.images?.map((img, i) => {
                        return <img src={img} key={i} className='shrink-0 w-full h-full object-cover snap-center' alt='product'></img>
                    })}
                </div>
                <div className="right w-10/12 md:w-1/2 h-full lg:px-12">
                    <section className='flex flex-col gap-4 items-start'>
                        <div className='flex flex-col gap-3'>
                            <h1 className="title text-2xl md:text-4xl font-extrabold">{data.title}</h1>
                            <p className="flex gap-2"><span className='rating'>⭐⭐⭐⭐</span><span className='reviews'>1.2k reviews</span></p>
                            <p className="price text-2xl font-bold">${data.price}</p>
                            {/* <div className="colors py-6 flex gap-3 md:flex-col items-center md:items-start">
                                <p className="text-lg">Choose a colour</p>
                                <div className="flex gap-3">
                                    <Checkbox value="black" id="black" colour="black" />
                                    <Checkbox value="blue" id="blue" colour="blue" />
                                    <Checkbox value="red" id="red" colour="red" />
                                </div>
                            </div> */}

                        </div>
                        <Size />
                        <Quantity />
                        <div className='flex flex-col gap-3'>
                            <p className='text-xl font-semibold'>Product Description</p>
                            <p className='text-lg'>{data.description}</p>
                            <p className='text-lg'><span className='font-semibold'>Brand</span> : {data.brand}</p>
                        </div>
                        <OrderButton />
                    </section>
                </div>

            </section>

        </>
    )
}
