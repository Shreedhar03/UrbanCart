import React, { useContext } from 'react'
import { AppContext } from '../App'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'

const LatestProducts = () => {

    const {products}=useContext(AppContext)
    return (
        <>
            <div className="flex flex-col max-w-[90%]  mx-auto gap-8 py-12">
                <h1 className='text-2xl font-semibold'>Recently Added <Link to={'/latest'} className='text-sm font-normal underline underline-offset-2 ml-2'>View all</Link></h1>
                <section className='flex overflow-scroll lg:flex-wrap gap-8 snap-x snap-mandatory'>
                {
                    products?.slice(0,8)?.map((p,key)=>{
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
