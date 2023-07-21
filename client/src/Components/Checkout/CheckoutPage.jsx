import React, { useContext, useEffect, useState } from 'react'
import CartItem from './CartItem'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../../App'
import axios from 'axios'
// import ConfirmOrder from './ConfirmOrder'

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
    
    const handleDelete = async (_id) => {
        let res = await axios.put(`http://localhost:5000/edit-cart/${data.userData._id}/${_id}`)
        console.log(res.data)
        setCart(!cart)
    }
    const handleEdit = (location) => {
        navigate(`/product/${location}`)
    }
    const totalPrice = () => {
        let total = 0
        data?.userData?.cart?.forEach(ele => {
            total += ((ele.product.price - ele.product.price * ele.product.discountPercentage / 100) * ele.quantity)
        })
        return total.toFixed(2)
    }
    useEffect(() => {
        !token && navigate('/login')
        setCart(!cart)
    }, [])
    // method 2
    if (data?.userData?.role === "admin") {
        return (
            navigate('/')
        )
    }

    return (
        <>
            <h2 className='text-2xl font-semibold text-slate-700 text-center mt-8 sora'>
                {data?.userData?.cart.length !== 0 ? 'Your Shopping cart' : 'Your cart is Empty :('}
            </h2>
            <div className='relative'>
                {/* {confirmMessage && <ConfirmOrder
                    close={() => setConfirmMessage(false)}
                    handleSubmit={handleSubmit} />} */}

                <div className={`${confirmMessage && 'opacity-20'} flex-col lg:flex-row gap-12 lg:gap-0 flex my-12 justify-evenly items-center lg:items-start`}>

                    {
                        data?.userData?.cart.length !== 0 &&


                        <>
                            <section className='flex flex-col gap-3 sm:gap-1'>
                                {
                                    data?.userData?.cart.map((ele, key) => {
                                        return (
                                            <CartItem key={key} image={ele.product.images[0]} title={ele.product.title}
                                                quantity={ele.quantity}
                                                price={(ele.product.price - ele.product.discountPercentage * ele.product.price / 100).toFixed(2)}
                                                handleDelete={() => { handleDelete(ele.product._id) }}
                                                handleEdit={() => { handleEdit(ele.product._id); }}
                                            />
                                        )
                                    })
                                }
                            </section>
                            {/* Order summary */}
                            <section className='borde border-pink-600 flex flex-col'>
                                <h1 className='text-2xl text-gray-700 border-b-2 border-gray-300 font-semibold py-1'>Order Summary</h1>
                                <h1 className='text-xl text-gray-700 pt-4 font-semibold'>Items :  <span className=' font-normal mx-3'>{totalQty()}</span></h1>
                                <h1 className='text-xl text-gray-700 pb-4 font-semibold border-b-2 border-gray-300'>Amount :  <span className=' font-normal mx-3'>&#8377;{totalPrice()}</span></h1>
                                <button className='bg-[var(--secondary)] py-2 text-lg rounded-lg mt-4 px-6' onClick={() => { navigate('/place-order'); setConfirmMessage(true) }}>Proceed</button>
                                <Link to={'/'} className='text-gray-600 text-xl mt-8'>&larr; Continue Shopping</Link>
                            </section>


                        </>

                    }
                </div>
            </div>
        </>
    )
}
