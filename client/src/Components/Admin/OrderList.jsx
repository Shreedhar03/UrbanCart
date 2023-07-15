import React, { useEffect, useState } from 'react'
import axios from 'axios'
import OrderItem from '../ShoppingCart/OrderItem'

const OrderList = () => {
    const [orders, setOrders] = useState([])
    const [orderDetail, setOrderDetail] = useState({
        id: "",
        date: "",
        status: "",
        cart: [],
        amountPaid: ""
    })
    const [seeDetails, setSeeDetails] = useState(false)
    const fetchData = async () => {
        const { data } = await axios.get('http://localhost:5000/admin/get-orders')
        if (data.success) {
            setOrders(data.order)
            console.log(data.order)
        }
    }
    const handleComplete = async (id) => {
        try {
            let { data } = await axios.put(`http://localhost:5000/admin/edit-order/${id}`)
            if (data.success) {
                console.log("data", data)
                fetchData()
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleDetails = (id, date, status, cart, amountPaid) => {
        setSeeDetails(true)
        console.log(id, "---", date, "---", status, "---", cart, "---", amountPaid)
        setOrderDetail({ id, date, status, cart, amountPaid })
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>


            {!seeDetails &&
                <div className='max-w-5xl mx-auto bg-slate-100 py-8 mt-6 flex flex-col rounded-xl px-12 relative'>
                    <p className='self-start text-xl font-semibold mb-4'>Order History</p>
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
                        {
                            orders?.map((ele, key) => {
                                return (
                                    <tr key={key} className='borer border-black'>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300'>{ele.name}</td>
                                        <td className='px-2 xl:px-5 py-3 border-b border-gray-300 text-blue-600 cursor-pointer underline underline-offset-3' onClick={() => handleDetails(ele._id, (ele.createdAt).slice(0, 10), ele.status, ele.cart, ele.amountPaid)}>Details</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>${ele.amountPaid}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{ele.status}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{(ele.createdAt).slice(0, 10)}</td>
                                        <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>
                                            {
                                                ele.status === "Pending" ?
                                                    <div className='flex' onClick={() => handleComplete(ele._id)}>
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
                        <button className='text-3xl mb-6 mx-6 sm:mx-0 text-gray-600' onClick={()=>setSeeDetails(false)}>&larr;<span className='text-lg text-gray-600 ml-2'>Back</span></button>
                        <OrderItem status={orderDetail.status} _id={orderDetail.id} date={orderDetail.date} amountPaid={orderDetail.amountPaid} cart={orderDetail.cart} />
                    </>
                }
            </div>
        </>
    )
}

export default OrderList
