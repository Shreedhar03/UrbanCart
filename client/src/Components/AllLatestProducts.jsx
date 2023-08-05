import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App'
import ProductCard from './ProductCard'

const AllProducts = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const { products } = useContext(AppContext)
    return (
        <>
            <div className="flex flex-col max-w-[90%]  mx-auto gap-8 py-12">
                <h1 className='text-2xl font-semibold'>Recently Added</h1>
                <section className='flex flex-wrap gap-8 snap-x snap-mandatory'>
                    {
                        products?.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0, 30)?.map((p, key) => {
                            return (
                                <ProductCard key={key} ele={p} />
                            )
                        })
                    }
                </section>
            </div>
        </>
    )
}

export default AllProducts
