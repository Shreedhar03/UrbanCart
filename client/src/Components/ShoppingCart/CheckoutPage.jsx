import React from 'react'
import CartItem from './CartItem'
import {useNavigate} from 'react-router-dom'

export default function CheckoutPage() {
    const navigate = useNavigate()
    return (
        <>

        {
            localStorage.getItem("authToken") ? 
            
            <div className="flex flex-col px-24 py-6 gap-14">
                <div className="flex flex-col max-w-4xl gap-14">
                    <p className="logo text-2xl sora font-extrabold">UrbanCart<span className=' text-[var(--primary)]'> .</span></p>
                    <div className="cart flex flex-col gap-12">
                        <h1 className='text-2xl text-[var(--primary)]'>Your Shopping Cart</h1>

                        <div className="items flex flex-col gap-6">
                            <CartItem />
                            <CartItem />
                            <CartItem />
                        </div>

                        <div className="proceed flex justify-between">

                            <button className='text-slate-600 text-xl' onClick={()=>{navigate('/')}}>&larr; Continue Shopping</button>

                            <div className='flex flex-col self-end gap-2'>
                                <p className='text-xl font-semibold'>Total : Rs 4899.00</p>
                                <button className='bg-black text-white px-6 py-2 text-lg rounded-xl'>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        :
        ""
            }
        </>
    )
}
