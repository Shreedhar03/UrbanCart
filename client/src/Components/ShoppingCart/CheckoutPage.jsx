import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../App'
import Navbar from '../Navbar'
import axios from 'axios'
import ConfirmOrder from './ConfirmOrder'

export default function CheckoutPage() {
    const { token, data, cart, setCart } = useContext(AppContext)
    const [confirmMessage, setConfirmMessage] = useState(false)
    const navigate = useNavigate()
    const notify = (message) => toast(message);

    const totalQty = () => {
        let total = 0
        data?.userData?.cart?.forEach(ele => {
            total += ele.quantity
        })
        return total
    }
    const totalPrice = () => {
        let total = 0
        data?.userData?.cart?.forEach(ele => {
            total += ((ele.product.price - ele.product.price * ele.product.discountPercentage / 100) * ele.quantity)
        })
        return total.toFixed(2)
    }
    const handleDelete = async (_id) => {
        let res = await axios.put(`http://localhost:5000/edit-cart/${data.userData._id}/${_id}`)
        console.log(res.data)
        setCart(!cart)
    }
    const handleEdit = (location) => {
        navigate(`/product/${location}`)
    }
    const clearCart = async() => {
        try{
            let res=await axios.put(`http://localhost:5000/delete-cart/${data.userData._id}`)
            if(res.data.success){
                console.log("cart cleared")
                console.log(res.data)
                setCart(!cart)
                navigate('/orders')
            }
        }
        catch(err){
            console.log("error",err)
        }
    }
    const handleSubmit = async () => {
        try {
            let res = await axios.post(`http://localhost:5000/order/${data?.userData?._id}`, { cart: data.userData.cart, amountPaid:totalPrice() })
            if (res.data.success) {
                console.log("-------Order Placed-------")
                // console.log(res.data)
                notify("Order Placed")
                clearCart();
            }
        }
        catch (err) {
            console.log("error", err.message)
        }
    }
    useEffect(() => {
        !token && navigate('/login')
        console.log("cart rendered")
    }, [])
    return (
        <>
            <Navbar />
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-700 text-center mt-8 sora'>Your Shopping cart</h2>
            <div className='relative'>
                {confirmMessage && <ConfirmOrder
                    close={() => setConfirmMessage(false)}
                    handleSubmit={handleSubmit} />}

                <div className={`${confirmMessage && 'opacity-20'} flex-col lg:flex-row gap-12 lg:gap-0 flex my-12 justify-evenly items-center lg:items-start`}>

                    {
                        data?.userData?.cart.length !== 0 ?


                            <>
                                <section className='max-w-3x bg-vioet-600 flex flex-col gap-3 sm:gap-1'>
                                    {
                                        data?.userData?.cart.map((ele, key) => {
                                            return (
                                                <CartItem image={ele.product.images[0]} title={ele.product.title}
                                                    quantity={ele.quantity}
                                                    price={(ele.product.price - ele.product.discountPercentage * ele.product.price / 100).toFixed(2)}
                                                    handleDelete={() => { handleDelete(ele.product._id) }}
                                                    handleEdit={() => { handleEdit(ele.product._id);}}
                                                />
                                            )
                                        })
                                    }
                                </section>
                                {/* Order summary */}
                                <section className='borde border-pink-600 flex flex-col'>
                                    <h1 className='text-2xl text-gray-700 border-b-2 border-gray-300 font-semibold py-1'>Order Summary</h1>
                                    <h1 className='text-xl text-gray-700 pt-4 font-semibold'>Items :  <span className=' font-normal mx-3'>{totalQty()}</span></h1>
                                    <h1 className='text-xl text-gray-700 pb-4 font-semibold border-b-2 border-gray-300'>Amount :  <span className=' font-normal mx-3'>${totalPrice()}</span></h1>
                                    <button className='bg-[var(--secondary)] py-2 text-lg rounded-lg mt-4 px-6' onClick={() => setConfirmMessage(true)}>Proceed for Payment</button>
                                    <Link to={'/'} className='text-gray-600 text-xl mt-8'>&larr; Continue Shopping</Link>
                                </section>


                            </>

                            :
                            <h1 className='text-xl sm:text-2xl mt-6'>Your cart is empty !</h1>
                    }
                </div>
            </div>
        </>
    )
}
