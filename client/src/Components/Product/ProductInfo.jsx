import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
// import Checkbox from './Checkbox'
import Footer from '../Footer'
// import Size from './Size'
import Quantity from './Quantity'
import axios from 'axios'
import SimilarProducts from './SimilarProducts'
import { AppContext } from '../../App'


export default function ProductInfo() {
    const { token, data, cart, setCart } = useContext(AppContext)
    const [productData, setProductData] = useState({})
    const navigate = useNavigate()
    const location = useLocation()

    let id = window.location.href.split("/").slice(-1)
    const fetchData = async () => {
        let response = await axios.get(`http://localhost:5000/product/${id}`)

        window.scrollTo(0, 0)
        // console.log(response.data)
        setProductData(response.data)
    }
    const addToCart = async () => {

        try {
            if (token) {
                let res = await axios.put(`http://localhost:5000/add/${data.userData._id}/${id}`)
                if (res.data.success) {
                    // setButton("Added")
                    console.log(res.data)
                    setCart(!cart)
                }
            }
            else {
                navigate('/login')
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    const removeFromCart = async () => {

        try {
            if (token) {
                let res = await axios.put(`http://localhost:5000/remove/${data.userData._id}/${id}`)
                if (res.data.success) {
                    // setButton("Added")
                    console.log(res.data)
                    setCart(!cart)
                }
            }
            else {
                navigate('/login')
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const getQuantity = () => {
        const index = data?.userData?.cart.findIndex((p) => p.product._id == productData._id)
        console.log("index=",index)
        return index === -1 ? null : data?.userData?.cart[index]?.quantity
    }
    useEffect(() => {
        fetchData();
        console.log(data)
        getQuantity();
    }, [location, cart])

    return (
        <>
            <Navbar />
            <section className="flex flex-col md:flex-row items-center lg:items-start justify-center py-12 md:py-12 md:px-12 gap-12 md:gap-24 lg:gap-32">
                <div className="left w-9/12 sm:w-7/12 md:w-1/2 h-[320px] md:h-[500px] lg:self-start flex overflow-scroll snap-mandatory snap-x">
                    {/* <img src={productData.images?.slice(-1)} alt="" className='w-full h-full object-cover' /> */}
                    {productData.images?.map((img, i) => {
                        return <img src={img} key={i} className='shrink-0 w-full h-full object-cover snap-center' alt='product'></img>
                    })}
                </div>
                <div className="right w-10/12 md:w-1/2 h-full lg:px-12">
                    <section className='flex flex-col gap-4 items-start'>
                        <div className='flex flex-col gap-3'>
                            <h1 className="title text-2xl md:text-4xl font-extrabold">{productData.title}</h1>
                            <p className="flex gap-2"><span className='rating'>⭐ {productData.rating}</span>
                                <span className='reviews border-l border-l-slate-400 pl-2'>1.2k reviews</span>
                            </p>
                            <div className="price text-3xl">
                                <p>
                                    <span className='font-semibold'>${(productData.price - productData.price * productData.discountPercentage / 100).toFixed(2)}</span>
                                    <span className='text-lg opacity-50 ml-2 line-through'>${productData.price}</span>
                                </p>
                                <span className='text-xl text-pink-500'>-{productData.discountPercentage}%</span>
                            </div>

                        </div>
                        <div className='flex flex-col gap-3'>
                            <p className='text-xl font-semibold'>Product Description</p>
                            <p className='text-lg'>{productData.description}</p>
                            <p className='text-lg'><span className='font-semibold'>Brand</span> : {productData.brand}</p>
                        </div>
                        <div className="flex gap-4 sm:flex-row flex-col-reverse w-full">

                            {
                                token ?
                                    <>
                                        {

                                            getQuantity() !== null ?
                                                <Quantity quantity={getQuantity()} increaseQty={() => {
                                                    addToCart()
                                                    getQuantity()
                                                }} decreaseQty={() => {
                                                    removeFromCart()
                                                    getQuantity();
                                                }} />
                                                :
                                                <button className='text-md px-5 py-2 rounded-lg bg-[var(--secondary)]' onClick={() => {
                                                    addToCart();
                                                    getQuantity();
                                                }}>
                                                    Add to cart
                                                </button>
                                        }
                                    </> 
                                    :
                                    <button className='text-md px-5 py-2 rounded-lg bg-[var(--secondary)]' onClick={() => {
                                        navigate('/login')
                                    }}>
                                        Add to cart
                                    </button>
                            }
                        </div>
                    </section>
                </div>
            </section>

            <section className='similar-products flex flex-col max-w-fit mx-auto gap-8 mt-24 mb-12'>
                <SimilarProducts category={productData.category} thisID={productData.id} />
            </section>
            <Footer />

        </>
    )
}
