import React from 'react'
import { useNavigate } from 'react-router-dom'


const ProductCard = (props) => {
    const navigate=useNavigate()

    return (

        <div key={props.key} className='w-[300px] h-[320px] border border-slate-100 shadow-inner shadow-slate-300 pb-4 rounded-2xl flex flex-col justify-between snap-center'>

            <div className="images flex overflow-scroll w-[300px] h-[200px] mt-3 rounded-t-2xl snap-x snap-mandatory">
                {props.ele.images.map((img, i) => {
                    return <img src={img} key={i} className='shrink-0 w-full h-full  object-contain snap-center' alt='product'></img>
                })}
            </div>

            <div className="details mx-3 flex flex-col h-[120px] justify-between py-4 relative cursor-pointer" onClick={()=>navigate(`/product/${props.ele._id}`)}>
                <div className='flex justify-between bg-sate-400'>
                    <div className='flex flex-col'>
                        <p className='text-sm text-gray-600'>{props.ele.brand}</p>
                        <p className='text-lg font-semibold'>{props.ele.title}</p>
                        <div className='flex gap-2 items-center mt-2'>
                            <p className='text-lg font-semibold'>&#8377;{(props.ele.price  - props.ele.price  * props.ele.discountPercentage / 100).toFixed(2)}</p>
                            <p className='text-sm text-gray-600'>|⭐ {props.ele.rating}</p>
                        </div>
                    </div>
                </div>

                <p className='absolute -top-4 bg-green-400 py-[2px] px-1 rounded-sm text-sm'>-{(props.ele.discountPercentage).toFixed(2)}%</p>
            </div>
            {/* <button className='text-sm border border-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all px-4 py-1 rounded-lg self-start mx-3 text-[var(--secondary)]'>
                <Link to={`/product/${props.ele._id}`}>
                    See Details
                </Link>
            </button> */}
        </div>
    )
}

export default ProductCard
