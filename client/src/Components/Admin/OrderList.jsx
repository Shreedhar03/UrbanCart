import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import OrderItem from '../Checkout/OrderItem'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import { useNavigate } from 'react-router-dom'

const OrderList = () => {
    const navigate = useNavigate()
    const { currentTab, setCurrentTab, data, token } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [loading,setLoading]=useState(true)
    const [orderTab, setOrderTab] = useState(1)
    const [orderDetail, setOrderDetail] = useState({
        id: "",
        date: "",
        status: "",
        cart: [],
        amountPaid: "",
        shippingAddress: {
            title: "",
            fName: "",
            lName: "",
            contact: "",
            flatNo: "",
            building: "",
            landmark: "",
            area: "",
            city: "",
            state: "",
            pin: ""
        }
    })
    const { title, fName, lName, contact, flatNo, building, landmark, area, city, state, pin } = orderDetail.shippingAddress

    const [seeDetails, setSeeDetails] = useState(false)
    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:5000/admin/get-orders')
        if (data.success) {
            setOrders(data.order)
            setLoading(false)
            console.log("data.order", data.order)
        }
    }
    const handleComplete = async (user, id) => {
        try {
            let { data } = await axios.put(`http://localhost:5000/admin/edit-order/${user}/${id}`)
            if (data.success) {
                console.log("data", data)
                fetchData()
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDetails = (id, date, status, cart, amountPaid, shippingAddress) => {
        setOrderDetail({ id, date, status, cart, amountPaid, shippingAddress: shippingAddress[0] })
        setSeeDetails(true)
        console.log(id, "---", date, "---", status, "---", cart, "---", amountPaid, "----", shippingAddress[0])
    }

    useEffect(() => {
        fetchData();
        !token && navigate('/login')
        data?.userData?.role === "customer" && navigate('/')
    }, [])
    return (
        <>

            {
                !seeDetails && <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
            }
            {!seeDetails &&
                <div className='max-w-5xl mx-auto bg-slate-100 py-8 mt-8 flex flex-col rounded-xl px-4 sm:px-12 relative'>
                    <div className=' mb-4'>
                        {/* <p className='self-start text-lg font-semibold mb-4'>Order History</p> */}
                        <button className={`${orderTab === 1 ? 'border-[var(--secondary)]' : 'border-slate-100'} border-b-[3px] text-lg`} onClick={() => setOrderTab(1)}>All</button>
                        <button className={`${orderTab === 2 ? 'border-[var(--secondary)]' : 'border-slate-100'} border-b-[3px] text-lg ml-4`} onClick={() => setOrderTab(2)}>Delivered</button>
                        <button className={`${orderTab === 3 ? 'border-[var(--secondary)]' : 'border-slate-100'} border-b-[3px] text-lg ml-4`} onClick={() => setOrderTab(3)}>Pending</button>
                    </div>
                    <table>
                        {/* <h1 className='text-lg my-2 '>Pending</h1> */}
                        <tr className='bg-slate-200 border- border-gray-400'>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Customer</td>
                            <td className='px-2 xl:px-5 p-4 font-semibold'>Order Details</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'>Total Amount</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'>Status</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'>Order Date</td>
                            <td className='px-2 xl:px-5 p-4 hidden md:table-cell font-semibold'>Action</td>

                        </tr>
                        <tr><td className={`py-5 text-xl ${!loading && 'hidden'}`} colSpan={6}><center>Getting data...</center></td></tr>

                        {
                            orders?.filter((ele) => {
                                if (orderTab !== 1)
                                    return orderTab === 2 ? ele.status === "Delivered" : ele.status === "Pending"
                                return true

                            }
                            )?.map((ele, key) => {
                                return (
                                    <tr key={key} className='borer border-black'>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300'>{ele.name}</td>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300 text-blue-600 cursor-pointer underline underline-offset-3' onClick={() => handleDetails(ele._id, (ele.createdAt).slice(0, 10), ele.status, ele.cart, ele.amountPaid, ele.shippingAddress)}>Details</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>${ele.amountPaid}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{ele.status}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{(ele.createdAt).slice(0, 10)}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>
                                            {
                                                ele.status === "Pending" ?
                                                    <div className='flex' onClick={() => handleComplete(ele.userID, ele._id)}>
                                                        <input type="checkbox" name={ele._id} id={ele._id} />
                                                        <label htmlFor={ele._id} className='ml-2 font-semibold text-green-500'>Complete</label>
                                                    </div>
                                                    : "NA"
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            }
            <div className='max-w-2xl mx-auto my-12'>
                {seeDetails &&
                    <>
                        <button className='text-3xl mb-6 mx-6 sm:mx-4 text-gray-600' onClick={() => setSeeDetails(false)}>&larr;<span className='text-lg text-gray-600 ml-2'>Back</span></button>
                        <OrderItem status={orderDetail.status} _id={orderDetail.id} date={orderDetail.date} amountPaid={orderDetail.amountPaid} cart={orderDetail.cart} />
                        <div className='mt-4 mx-6 sm:mx-4'>
                            <h1 className='mb-2 underline underline-offset-2'>Delivery Address</h1>
                            {/* <span className='text-gray-800 font-semibold bg-slate-300 py-1 px-2 rounded-lg'>{title}</span><br/> */}
                            <span className='font-semibold'>{fName}</span>
                            <span className='font-semibold'> {lName}</span>
                            <span>, {flatNo}</span>
                            <span>, {building}</span>
                            <span>, near {landmark}</span><br />
                            <span>{area}</span>
                            <span>, {city}</span>
                            <span>, {state}</span>
                            <span>, {pin}</span><br />
                            <span>Contact: {contact}</span>

                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default OrderList
