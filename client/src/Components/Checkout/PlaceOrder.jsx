import React, { useContext, useState } from 'react'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import delivered from '../../assets/delivered.svg'
import checked from '../../assets/checked.svg'
import AddressForm from './AddressForm'
import axios from 'axios'

const PlaceOrder = () => {
    const [addAddress, setAddAddress] = useState(false)
    const nav = useNavigate()
    const { token, data, cart, setCart } = useContext(AppContext)
    const [address, setAddress] = useState({
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
    })
    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }
    const addNewAddress = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.put(`http://localhost:5000/add-address/${data.userData._id}`, { address })
            if (res.data.success) {
                console.log(res.data)
                setAddAddress(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const handleAddressess = async (address, toBeDeleted) => {
        try {
            let res = await axios.put(`http://localhost:5000/set-address/${data.userData._id}`, { address, toBeDeleted })
            if (res.data.success) {
                console.log(res.data)
                setCart(!cart)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    if (!token || data?.userData?.cart.length === 0) {
        return (nav('/login'))
    }
    const totalPrice = () => {
        let total = 0
        data?.userData?.cart?.forEach(ele => {
            total += ((ele.product.price - ele.product.price * ele.product.discountPercentage / 100) * ele.quantity)
        })
        return total.toFixed(2)
    }
    const clearCart = async () => {
        try {
            let res = await axios.put(`http://localhost:5000/delete-cart/${data.userData._id}`)
            if (res.data.success) {
                console.log("cart cleared")
                console.log(res.data)
                setCart(!cart)
                nav('/orders')
            }
        }
        catch (err) {
            console.log("error", err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`http://localhost:5000/order/${data?.userData?._id}`,
                {
                    cart: data.userData.cart,
                    name: data.userData.name,
                    amountPaid: totalPrice(),
                    shippingAddress: data.userData.address.filter(add => add.selected === true)
                }
            )
            if (res.data.success) {
                console.log("-------Order Placed-------")
                // console.log(res.data)
                // notify("Order Placed")
                clearCart();
            }
        }
        catch (err) {
            console.log("error", err.message)
        }
    }
    return (
        <>
            <form className='bg-gray-50 max-w-6xl p-12 mx-4 sm:mx-auto flex justify-between gap-8 mt-6'>
                {
                    addAddress ?
                        <AddressForm address={address} handleSubmit={addNewAddress} handleChange={handleChange} setAddAddress={setAddAddress} />
                        :
                        // List of Shipping addresses //

                        <section className=' w-7/12'>
                            <h1 className='text-lg font-semibold'>Select Delivery Address</h1>
                            <div className='flex flex-wrap gap-6 mt-4'>
                                {
                                    data?.userData?.address?.map((addr, key) => {
                                        return (
                                            <>
                                                <input type="radio" name="check" id={key} className='hidden' required/>
                                                <label htmlFor={key} key={key} className='bg-gray-100 p-6 rounded-lg relative'>
                                                    <button type='button' className='font-semibold' onClick={() => handleAddressess(addr, null)}>{addr.title}</button>
                                                    <p className='mt-3'>{addr.fName} {addr.lName}</p>
                                                    <div className='text-sm text-gray-500'>
                                                        <p>{addr.user}</p>
                                                        <p>{addr.flatNo}, {addr.building}</p>
                                                        <p>near {addr.landmark}, {addr.area}</p>
                                                        <p>{addr.city}-{addr.pin}</p>
                                                        <p>{addr.state}</p>
                                                        <p className='mt-3 font-semibold text-black'>Contact - {addr.contact}</p>
                                                        <div className='mt-4 flex gap-3'>
                                                            {/* <button className='text-gray-800' onClick={()=>handleAddressess(addr,false)}>Edit</button> */}
                                                            <button className='text-gray-800' onClick={() => handleAddressess(addr, true)}>Remove</button>
                                                        </div>
                                                    </div>
                                                    {/* <p className='absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full'></p> */}

                                                    {addr.selected && <img src={checked} alt="" className='absolute top-2 right-2 h-6 w-6' />}

                                                </label>
                                            </>
                                        )
                                    })
                                }
                                <div onClick={() => setAddAddress(true)} className='bg-gray-100 p-6 flex flex-col items-center justify-center gap-6 rounded-lg cursor-pointer'>
                                    {/* <img src={location} className='w-20' alt="" /> */}
                                    <button className='text-4xl bg-slate-300 px-4 py-2 rounded-full'>+</button>
                                    <h2 className='text-sm text-gray-500'>Add new address</h2>
                                </div>
                            </div>
                        </section>

                }
                <section className='border-l-2 border-gray-200 w-5/12 pl-12'>
                    <div className='flex flex-col max-w-[85%] mx-auto'>
                        <h1 className='text-lg font-semibold text-gray-800'>Order Summary</h1>
                        <div className='bg-geen-300 mt-4'>
                            <p className=' float-left'>Order Total</p>
                            <p className=' float-right ml-8'>&#8377;{totalPrice()}</p>
                        </div>
                        <div className='bggreen-300 mt-2'>
                            <p className=' float-left'>Delivery Charges</p>
                            <p className=' float-right ml-8'>&#8377;0.00</p>
                        </div>
                    </div>
                    <div className='flex flex-col mt-8 gap-3 max-w-[85%] mx-auto'>
                        <h1 className='text-lg font-semibold text-gray-800'>Delivery Summary</h1>
                        <div className='flex gap-3 mt-3'>
                            <img src={delivered} className='w-10' alt="delivery" />
                            <div className='flex flex-col'>
                                <p className=' underline underline-offset-2'>Standard Delivery</p>
                                <p className=' text-sm text-gray-500'>Expected on Jul 26, 2023</p>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <p className='float-left'>Total Payable</p>
                            <p className='float-right'>&#8377;{totalPrice()}</p>
                        </div>
                        <button className='text-sm bg-[var(--secondary)] py-2 rounded-md' type='submit' onClick={handleSubmit}>Place Order</button>
                    </div>
                </section>
            </form>
        </>
    )
}

export default PlaceOrder
