import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import ProductCard from './ProductCard'

const TopDeals = () => {
    const [loading, setLoading] = useState(true)
    const { products } = useContext(AppContext)
    const maxDisc = products?.sort((a, b) => b.discountPercentage - a.discountPercentage).slice(0, 1)[0]?.discountPercentage
    // console.log("maxDisc=", maxDisc)
    useEffect(() => {
        setLoading(false)
    },[])
    return (
        <>
            <div className="flex flex-col max-w-[90%] mx-auto gap-8 py-12">
                <h1 className='text-2xl font-semibold flex items-center'>Top deals <p className='text-sm font-normal ml-2 bg-slate-300 px-2 py-[2px] rounded-lg'>Upto {maxDisc}% off !</p></h1>
                <h1 className={`${!loading && 'hidden'} text-center`}>Loading</h1>
                <section className='flex overflow-scroll lg:flex-wrap gap-8 snap-x snap-mandatory'>
                    {
                        products?.sort((p, q) => q.discountPercentage - p.discountPercentage)?.slice(0, 10)?.map((ele, key) => {
                            return (
                                <ProductCard key={key} ele={ele} />
                            )
                        })
                    }
                </section>
            </div>
        </>
    )
}

export default TopDeals
