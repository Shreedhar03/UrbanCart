import React, { useContext } from 'react'
import { AppContext } from '../App'
import ProductCard from './ProductCard'

const LatestProducts = () => {
    const {products}=useContext(AppContext)
    return (
        <>
            <div className="flex flex-col max-w-[90%]  mx-auto gap-8 py-12">
                <h1 className='text-2xl font-semibold'>Latest Products</h1>
                <section className='flex overflow-scroll lg:flex-wrap gap-8 snap-x snap-mandatory'>
                {
                    products?.slice(0,10)?.map((p,key)=>{
                        return(
                            <ProductCard key={key} ele={p}/>
                        )
                    })
                }
                </section>
            </div>
        </>
    )
}

export default LatestProducts
