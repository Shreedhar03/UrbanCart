import React from 'react'
import Quantity from '../Product/Quantity'

export default function CartItem() {
    return (
        <>
            <section className="flex items-center gap-12 bg-slate-100 justify-between px-12 rounded-xl">
                <div className="left flex items-center gap-4">
                    <img src="https://image.oppo.com/content/dam/oppo/in/mkt/homepage-new-version/campaign/events1.jpg.thumb.webp" className='w-24 h-24 rounded-full object-contain' alt="" />
                    <h2 className='text-xl font-semibold'>Nike Turbo NXT</h2>
                </div>
                <div className="right flex gap-12 items-center">
                    <Quantity />
                    <p className='text-xl'>Navy Blue</p>
                    <p className='text-xl'>Rs 1259</p>
                    <button className='text-red-600 text-3xl'>&times;</button>
                </div>
            </section>
        </>
    )
}
