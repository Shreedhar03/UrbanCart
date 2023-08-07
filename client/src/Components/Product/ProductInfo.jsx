import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import Quantity from './Quantity'
import axios from 'axios'
import SimilarProducts from './SimilarProducts'
import { AppContext } from '../../App'
import Loading from '../Loading'


export default function ProductInfo() {
    const { token, data, cart, setCart, products, fetchProducts } = useContext(AppContext)
    const [productData, setProductData] = useState({})
    const [message, setMessage] = useState("")
    const [stock, setStock] = useState()
    const navigate = useNavigate()
    const location = useLocation()

    let id = window.location.href.split("/").slice(-1)[0]

    const addToCart = async () => {
        try {
            if (token) {
                let res = await axios.put(`${process.env.REACT_APP_ORIGIN}add/${data.userData._id}/${id}`)
                if (res.data.success) {
                    setStock(res.data.stock)
                    console.log(res.data)
                    if (res.data.outOfStock)
                        setMessage(res.data.message)
                    else {
                        setMessage("")
                    }
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
                let res = await axios.put(`${process.env.REACT_APP_ORIGIN}remove/${data.userData._id}/${id}`)
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
        // console.log("index=", index)
        return index === -1 ? null : data?.userData?.cart[index]?.quantity
    }
    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Checkout this at UrbanCart',
                    url: window.location.href
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        // fetchData();
        getQuantity();
    }, [location, cart])
    useEffect(() => {
        let singleProduct = products.filter(p => p._id === id)
        setProductData(singleProduct[0])
    }, [products])
    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProducts()
    }, [location])
    return (
        <>
            {productData ?
                <section className="flex flex-col md:flex-row items-center lg:items-start justify-center py-12 md:py-12 md:px-12 gap-12 md:gap-24 lg:gap-32">
                    <div className="left w-9/12 sm:w-7/12 md:w-1/2 h-[320px] md:h-[500px] lg:self-start flex overflow-scroll snap-mandatory snap-x">
                        {/* <img src={productData.images?.slice(-1)} alt="" className='w-full h-full  object-contain' /> */}
                        {productData.images?.map((img, i) => {
                            return <img src={img} key={i} className='shrink-0 w-full h-full  object-contain snap-center' alt='product'></img>
                        })}

                    </div>
                    <div className="right w-10/12 md:w-1/2 h-full lg:px-12">
                        <section className='flex flex-col gap-4 items-start relative'>
                            <div className='flex flex-col gap-3'>
                                <h1 className="title text-2xl md:text-4xl font-extrabold">{productData.title}</h1>
                                <p className="flex gap-2"><span className='rating'>⭐ {productData.rating}</span>
                                    <span className='reviews border-l border-l-slate-400 pl-2'>1.2k reviews</span>
                                </p>
                                <div className="price text-3xl">
                                    <p>
                                        <span className='font-semibold'>&#8377;
                                            {
                                                Object.keys(productData).length !== 0 && (productData.price - productData.price * productData.discountPercentage / 100).toFixed(2)
                                            }
                                        </span>
                                        <span className='text-sm opacity-50 sora ml-2'><span>M.R.P</span><span className='line-through ml-1'> &#8377;{productData.price}</span></span>
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
                                                    <Quantity stock={stock} quantity={getQuantity()} increaseQty={() => { addToCart(); getQuantity() }} decreaseQty={() => { removeFromCart(); getQuantity(); }} message={message} />
                                                    :
                                                    <button className={`text-md px-5 py-2 rounded-lg bg-[var(--secondary)] ${data?.userData?.role === "admin" && 'hidden'}`} disabled={(stock === 0) && true} onClick={() => {
                                                        addToCart();
                                                        getQuantity();
                                                    }}>
                                                        {stock === 0 ? 'Out of Stock' : 'Add to cart'}
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
                            <p className='text-red-500'>{(stock < 10 && stock !== 0) && `Only ${stock} items left`}</p>
                            <button className="absolute right-4 -top-6 bg-slate-300 w-8 h-8 rounded-full flex items-center justify-center" onClick={handleShare}><i className='bx bx-share-alt text-xl'></i></button>
                        </section>
                    </div>
                </section>
                :
                <Loading message="Loading..." />
            }
            {productData &&
                <section className='similar-products flex flex-col max-w-fit mx-auto gap-8 mt-24 mb-12'>
                    <SimilarProducts category={productData.category} thisID={productData._id} />
                </section>}
            <Footer />
        </>


    )
}
