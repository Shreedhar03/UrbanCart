import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = (props) => {
    const navigate = useNavigate()
    const [productInfo, setProductInfo] = useState({
        title: "",
        brand: "",
        category: "",
        gender: "",
        description: "",
        rating: "",
        price: "",
        discountPercentage: "",
        stock: "",
        images: ""
    })
    const handleSubmit = async (e, id) => {
        e.preventDefault()
        try {
            console.log(productInfo)
            let { data } = await axios.post("http://localhost:5000/admin/add-product", { productInfo, existingProduct: id })
            if (data.success) {
                console.log(data)
                if (props.title) {
                    props.setShowEdit(false)
                    props.fetchData()
                    window.scrollTo(0, 0)
                }
                navigate('/admin/product-data')
                setProductInfo({
                    title: "",
                    brand: "",
                    category: "",
                    gender: "",
                    description: "",
                    rating: "",
                    price: "",
                    discountPercentage: "",
                    stock: "",
                    images: ""
                })
            }
        }
        catch (err) {
            console.log("submission error", err.message)
        }
    }
    const handleChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }
    const { currentTab, setCurrentTab, data, token } = useContext(AppContext)
    useEffect(() => {
        !token && navigate('/login')
        data?.userData?.role === "customer" && navigate('/')
        if (props.id) {
            setProductInfo({
                title: props.title,
                brand: props.brand,
                category: props.category,
                gender: props.gender,
                description: props.description,
                rating: props.rating,
                price: props.price,
                discountPercentage: props.discountPercentage,
                stock: props.stock,
                images: props.images
            })
        }
    }, [])
    return (
        <>
            {!props.hide && <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />}
            <div className="max-w-5xl flex flex-col bg-slate-100 mx-4 sm:mx-auto py-8 px-4 sm:px-12 my-8 rounded-xl">
                <h1 className='text-lg font-semibold mb-6'>Enter Product Details</h1>
                <form onSubmit={(e) => props.id ? handleSubmit(e, props.id) : handleSubmit(e, null)} className='flex flex-col'>
                    <div className='flex flex-col md:flex-row justify-between gap-12 md:gap-20'>
                        <div className='flex flex-col gap-8 md:w-1/2'>
                            <div className='flex flex-col'>
                                <label className='text-cyan-600 font-semibold' htmlFor="name">Product Name</label>
                                <input required type="text" name='title' onChange={handleChange} value={productInfo.title} autoComplete='off' className='focus:outline-none bg-slate-200 text-sm bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='name' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-cyan-600 font-semibold' htmlFor="brand">Brand</label>
                                <input required type="text" name='brand' onChange={handleChange} value={productInfo.brand} autoComplete='off' className='focus:outline-none bg-slate-200 text-sm bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='brand' />
                            </div>
                            <div className='flex flex-wrap gap-3'>
                                <div className='flex items-center gap-3'>
                                    <label className='text-cyan-600 font-semibold' htmlFor="category">Category</label>
                                    <select name="category" id="category" required onChange={handleChange} value={productInfo.category} className='bg-slate-200 px-2 py-2 border border-gray-200 rounded-md'>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Watches">Watches</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Furniture">Furniture</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Appliances">Appliances</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Laptops">Laptops</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Clothing">Clothing</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="SkinCare">SkinCare</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Footware">Footware</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Smartphones">Smartphones</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="Fragrances">Fragrances</option>
                                        <option className='bg-slate-200 p-2 rounded-lg' value="home-decoration">home-decoration</option>
                                    </select>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <label className='text-cyan-600 font-semibold' htmlFor="gender">Gender</label>
                                    <select name="gender" id="gender" onChange={handleChange} required value={productInfo.gender} className='bg-slate-200 px-2 py-2 border border-gray-200 rounded-md'>
                                        <option className="bg-slate-200" value="Male">Male</option>
                                        <option className="bg-slate-200" value="Female">Female</option>
                                        <option className="bg-slate-200" value="NA">NA</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-cyan-600 font-semibold' htmlFor="description">Description</label>
                                <textarea autoComplete='off' name='description' onChange={handleChange} value={productInfo.description} rows={5} cols={30} className='focus:outline-none bg-slate-200 text-sm bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='description' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 md:w-1/2'>
                            <div className='flex gap-2 md:gap-2 flex-wrap'>
                                <div className='flex flex-col'>
                                    <label className='text-cyan-600 font-semibold' htmlFor="price">Price</label>
                                    <input required type="text" name='price' onChange={handleChange} value={productInfo.price} autoComplete='off' className='focus:outline-none bg-slate-200 text-sm w-32 bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='price' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-cyan-600 font-semibold m' htmlFor="discount">Discount (%)</label>
                                    <input required type="text" name='discountPercentage' onChange={handleChange} value={productInfo.discountPercentage} autoComplete='off' className='focus:outline-none bg-slate-200 text-sm w-32 bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='discount' />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='text-cyan-600 font-semibold' htmlFor="stock">Stock</label>
                                    <input required type="text" autoComplete='off' name='stock' onChange={handleChange} value={productInfo.stock} className='focus:outline-none bg-slate-200 text-sm w-32 bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='stock' />
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-cyan-600 font-semibold' htmlFor="images">Rating</label>
                                <input required type="text" autoComplete='off' name='rating' onChange={handleChange} value={productInfo.rating} className='focus:outline-none bg-slate-200 text-sm w-32 bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='rating' />
                            </div>
                            <div className='flex flex-col'>
                                <label className='text-cyan-600 font-semibold' htmlFor="images">Product Images <span className='text-slate-500 font-normal'>( space seperated URLs )</span></label>
                                <textarea autoComplete='off' rows={5} name='images' onChange={handleChange} value={productInfo.images} className='focus:outline-none bg-slate-200 text-sm bg-inherit px-2 py-2 border border-gray-200 rounded-md' id='images' />
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-3 mt-6'>
                        {/* <input value={"Clear"} type='reset' className='px-6 font-semibold py-2 text-sm text-red-500 border border-red-500 rounded-lg' /> */}
                        <input value={props.id ? "Update Product" : "Add Product"} type='submit' className='px-6 font-semibold py-2 text-sm bg-[var(--secondary)] rounded-lg' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddProduct
