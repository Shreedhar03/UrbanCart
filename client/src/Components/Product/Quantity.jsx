import React from 'react'

export default function Quantity(props) {
    
    return (
        <>
            <div className="flex items-center gap-2">
                <div className='bg-slate-200 flex justify-center py-1 px-2 my-4 rounded-lg'>
                    <button className='text-2xl px-4' onClick={props.decreaseQty}>-</button>
                    <p type="text" id={props.quantity} className='bg-slate-200 text-2xl focus:outline-none'>{props.quantity}</p>
                    <button className='text-2xl px-4' onClick={props.increaseQty}>+</button>
                </div>
                    <p className='message text-md text-red-400'>{(props.message || props.quantity===5) && 'Maximum quantity'}</p>
            </div>

        </>
    )
}
