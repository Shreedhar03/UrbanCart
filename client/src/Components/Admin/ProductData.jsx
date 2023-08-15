import React, { useContext, useEffect, useState } from 'react'
import edit from '../../assets/edit.svg'
import bin from '../../assets/bin.svg'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import axios from 'axios'
import AddProduct from './AddProduct'
import TableRow from './TableRow'

const ProductData = () => {
    const navigate = useNavigate()
    const { currentTab, setCurrentTab, data, token, products, fetchProducts } = useContext(AppContext)
    const matchingResults = []
    const [search, setSearch] = useState("")
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [sortByStock, setSortByStock] = useState(true)
    const [sortByPrice, setSortByPrice] = useState(false)
    const [ascending, setAscending] = useState(true)
    const handleChange = (e) => {
        setSearch(e.target.value)
        for (const key in products) {
            if (
                ((products[key].title.toLowerCase()).includes(search.toLowerCase())
                    || (products[key].brand.toLowerCase()).includes(search.toLowerCase())
                    || (products[key].category.toLowerCase()).includes(search.toLowerCase()))
            ) {
                matchingResults.push(products[key])
            }
        }
        setSearchResults(matchingResults)
        setSearchVisible(true)
    }
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
    const handleDelete = async (id) => {
        try {
            let { data } = await axios.delete(`${process.env.REACT_APP_ORIGIN}delete-product/${id}`)
            console.log(data)
            if (data.success) {
                fetchProducts()
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleBlur = () => {
        setTimeout(() => {
            setSearchVisible(false)
            setSearch("")
        }, 500);
    }
    const handleEdit = (id, title, brand, category, gender, description, rating, price, discountPercentage, stock, images) => {
        setShowEdit(true)
        setDetails({
            id, title, brand, category, gender, description, rating, price, discountPercentage, stock, images
        })
    }
    useEffect(() => {
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
                            <input type="text" name='search' autoComplete='off' placeholder='search' value={search} onChange={handleChange} onBlur={handleBlur} className='px-4 py-[6px] focus:outline-none bg-gray-200 rounded-md' />
                        </div>
                    </div>
                    <table>
                        {/* <h1 className='text-lg my-2 '>Pending</h1> */}
                        <tr className='bg-slate-200 border- border-gray-400'>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Sr</td>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Name</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'><div className='flex items-center cursor-pointer'><span>Sold</span></div></td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'><div className='flex items-center cursor-pointer' onClick={() => { setSortByPrice(true); setSortByStock(false); setAscending(!ascending); }}><span>Price</span><i className='bx bx-sort text-lg'></i></div></td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'><div className='flex items-center cursor-pointer' onClick={() => { setSortByStock(true); setSortByPrice(false); setAscending(!ascending); }}><span>Stock</span><i className='bx bx-sort text-lg'></i></div></td>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Action</td>

                        </tr>
                        {/* <tr><td className={`py-5 text-xl ${!loading && 'hidden'}`} colSpan={4}><center>Getting data...</center></td></tr> */}

                        {
                            searchVisible ?

                                searchResults.length === 0 ? <p className={`py-5`}>No data found...</p>
                                    :
                                    <>
                                        {
                                            searchResults
                                                .map((ele, key) => {
                                                    return (
                                                        <TableRow ele={ele} index={key + 1} edit={edit} bin={bin} handleEdit={handleEdit} handleDelete={handleDelete} />
                                                    )
                                                })
                                        }
                                    </>
                                :
                                sortByStock ?
                                    products?.sort((a, b) => { return ascending ? (a.stock - b.stock) : (b.stock - a.stock) }).
                                        map((ele, key) => {
                                            return (
                                                <TableRow ele={ele} index={key + 1} edit={edit} bin={bin} handleEdit={handleEdit} handleDelete={handleDelete} />
                                            )
                                        }) :
                                    products?.sort((a, b) => { return ascending ? (a.price - b.price) : (b.price - a.price) }).
                                        map((ele, key) => {
                                            return (
                                                <TableRow ele={ele} index={key + 1} edit={edit} bin={bin} handleEdit={handleEdit} handleDelete={handleDelete} />
                                            )
                                        })



                        }
                    </table>
                </div>}
            <div className='max-w-5xl mx-auto mt-4'>
                {showEdit &&
                    <>
                        <button className='text-3xl mx-6 sm:mx-4 text-gray-600' onClick={() => setShowEdit(false)}>&larr;<span className='text-lg text-gray-600 ml-2'>Back</span></button>
                        <AddProduct setShowEdit={setShowEdit} fetchData={fetchProducts} hide={true} id={details.id} title={details.title} brand={details.brand} category={details.category} gender={details.gender} description={details.description} rating={details.rating} price={details.price} discountPercentage={details.discountPercentage} stock={details.stock} images={details.images} />
                    </>
                }
            </div>

        </>
    )
}

export default ProductData
