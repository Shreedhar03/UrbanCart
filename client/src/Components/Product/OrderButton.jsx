import React from 'react'

export default function OrderButton() {
    return (
        <>
            <div className="flex gap-4 sm:flex-row flex-col-reverse w-full">
                <button className='text-md px-5 py-3 rounded-2xl bg-[var(--secondary)] text-white'>Buy Now</button>
                <button className='text-md px-5 py-3 rounded-2xl border border-black'>Add to Cart</button>
            </div>
        </>
    )
}
