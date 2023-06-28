import React, { useState } from 'react'

export default function Quantity() {
    const [quantity, setQuantity] = useState(1)
    return (
        <>
            <div className="flex items-center gap-2">
                <div className='bg-slate-200 flex justify-center py-1 px-2 my-4 rounded-lg'>
                    <button className='text-2xl px-4' onClick={() => { quantity > 1 && setQuantity(quantity - 1) }}>-</button>
                    <p type="text" id={quantity} className='bg-slate-200 text-2xl focus:outline-none'>{quantity}</p>
                    <button className='text-2xl px-4' onClick={() => { quantity < 5 && setQuantity(quantity + 1) }}>+</button>
                </div>
                    <p className='message text-md text-red-400'>{quantity === 5 && 'Maximum quantity'}</p>
            </div>

        </>
    )
}
