import React, { useContext, useEffect, useState } from 'react'
import edit from '../../assets/edit.svg'
import bin from '../../assets/bin.svg'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import axios from 'axios'
import AddProduct from './AddProduct'

const ProductData = () => {
    const navigate = useNavigate()
    const { currentTab, setCurrentTab, data, token } = useContext(AppContext)
    const [products, setProducts] = useState([])
    const [sortAscending, setSortAscending] = useState(true)
    const [details, setDetails] = useState({
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
    const [showEdit, setShowEdit] = useState(false)
    const fetchData = async () => {
        try {
            let { data } = await axios.get('http://localhost:5000/allproducts')
            console.log(data.products)
            setProducts(data.products)
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDelete = async (id) => {
        try {
            let { data } = await axios.delete(`http://localhost:5000/delete-product/${id}`)
            console.log(data)
            if (data.success) {
                fetchData()
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleEdit = (id, title, brand, category, gender, description, rating, price, discountPercentage, stock, images) => {
        setShowEdit(true)
        setDetails({
            id, title, brand, category, gender, description, rating, price, discountPercentage, stock, images
        })
    }
    useEffect(() => {
        fetchData();
        !token && navigate('/login')
        data?.userData?.role === "customer" && navigate('/')
    }, [])
    return (
        <>
            {
                !showEdit && <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
            }


            {
                !showEdit &&
                <div className='max-w-5xl mx-auto bg-slate-100 py-8 my-8 flex flex-col rounded-xl px-4 sm:px-12 relative'>
                    <div className='flex items-center justify-between mb-4 flex-wrap gap-3'>
                        <h1 className='text-lg font-semibold'>Product Data</h1>
                        <div className='flex gap-1 flex-wrap'>
                            <input type="text" className='px-4 py-[6px] focus:outline-none bg-gray-200 rounded-md' />
                            <button type='button' className='px-4 py-[6px] rounded-md bg-[var(--secondary)]'>Search</button>
                        </div>
                    </div>
                    <table>
                        {/* <h1 className='text-lg my-2 '>Pending</h1> */}
                        <tr className='bg-slate-200 border- border-gray-400'>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Sr</td>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Name</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'><div className='flex items-center cursor-pointer' onClick={() => setSortAscending(!sortAscending)}><span>Stock</span><i class='bx bx-sort text-lg'></i></div></td>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Action</td>

                        </tr>
                        {
                            products?.sort((a, b) => { return sortAscending ? (a.stock - b.stock) : (b.stock - a.stock) }).map((ele, key) => {
                                return (
                                    <tr key={key} className='borer border-black'>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300'>{key + 1}</td>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300'><span className='text-gray-700 text-sm'>{ele.brand}</span><br /><span>{ele.title}</span></td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{ele.stock}</td>
                                        <td className='px-2 xl:px-5 py-3  border-b border-gray-300'>
                                            <div className='flex gap-4 items-center'>
                                                <img className='w-6 h-6 cursor-pointer' onClick={() =>
                                                    handleEdit(ele._id, ele.title, ele.brand, ele.category, ele.gender, ele.description, ele.rating, ele.price, ele.discountPercentage, ele.stock, ele.images)
                                                } src={edit} alt="" />
                                                <img className='w-5 h-5 cursor-pointer' onClick={() => handleDelete(ele._id)} src={bin} alt="" />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>}
            <div className='max-w-5xl mx-auto my-12'>
                {showEdit &&
                    <>
                        <button className='text-3xl mb-6 mx-6 sm:mx-4 text-gray-600' onClick={() => setShowEdit(false)}>&larr;<span className='text-lg text-gray-600 ml-2'>Back</span></button>
                        <AddProduct setShowEdit={setShowEdit} fetchData={fetchData} hide={true} id={details.id} title={details.title} brand={details.brand} category={details.category} gender={details.gender} description={details.description} rating={details.rating} price={details.price} discountPercentage={details.discountPercentage} stock={details.stock} images={details.images} />
                    </>
                }
            </div>

        </>
    )
}

export default ProductData
