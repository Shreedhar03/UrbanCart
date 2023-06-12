import React from 'react'
import Navbar from '../Navbar'
import Checkbox from './Checkbox'
import Size from './Size'
import Quantity from './Quantity'
import OrderButton from './OrderButton'

export default function ProductInfo() {

    return (
        <>
            <Navbar />

            <section className="h-[calc(100vh-70px)] flex items-start justify-center p-12 gap-4">
                <div className="left w-1/3 self-start">
                    <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/70511b6a-3e8f-48bc-9753-1d70f5ed7ed5/pegasus-turbo-next-nature-se-road-running-shoes-tHT957.png" alt="" className='w-[90%] object-cover' />
                </div>
                <div className="right w-1/3 h-full px-12">
                    <section className='flex flex-col gap-4 items-start'>
                        <div className='flex flex-col gap-3'>
                            <h1 className="title text-4xl font-extrabold">Nike Turbo NXT</h1>
                            <p className="flex gap-2"><span className='rating'>⭐⭐⭐⭐</span><span className='reviews'>1.2k reviews</span></p>
                            <p className="price text-2xl font-bold">$32.45</p>
                            <div className="colors py-6 flex gap-3 flex-col">
                                <p className="text-lg">Choose a colour</p>
                                <div className="flex gap-3">
                                    <Checkbox value="black" id="black" colour="black" />
                                    <Checkbox value="blue" id="blue" colour="blue" />
                                    <Checkbox value="red" id="red" colour="red" />
                                </div>
                            </div>
                        </div>
                        <Size />
                        <Quantity />
                        <OrderButton />
                    </section>
                </div>
            </section>
        </>
    )
}
