import React from 'react'

export default function OrderButton() {
    return (
        <>
            <div className="flex gap-4">
                <button className='text-md px-5 py-1 rounded-2xl bg-black text-white'>Buy Now</button>
                <button className='text-md px-5 py-1 rounded-2xl border-2 border-black'>Add to Cart</button>
            </div>
        </>
    )
}
