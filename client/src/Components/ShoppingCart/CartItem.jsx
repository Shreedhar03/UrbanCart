import React from 'react'
import cross from '../../assets/cross.svg'
import edit from '../../assets/edit.svg'

export default function CartItem(props) {

    return (
        <>
            <section className="flex bg-slate-100 flex-col sm:flex-row items-center justify-between sm:pr-6 w-full">

                <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <img src={props.image} className='w-full h-32 sm:w-2/4 sm:h-24 object-cover' alt="" />
                    <h2 className='sm:mx-0 text-xl font-semibold self-start sm:self-center mx-6 sm:w-3/4'>{props.title}</h2>
                    <div className='sm:mx-0 flex sm:items-center self-start sm:self-center mx-6 gap-8 sm:gap-0 sm:w-4/5'>
                        <p className='text-xl sm:w-1/2 font-semibold text-gray-800'>Qty : {props.quantity}</p>
                        <p className='text-xl sm:w-1/2 font-semibold text-gray-800'>$ {props.price}</p>
                    </div>
                </div>

                <div className='gap-6 flex sm:gap-4 self-start sm:self-center sm:m-0 m-6 sm:border-0'>
                    <button onClick={props.handleEdit} className=''>
                        <img src={edit} className='w-6' alt="" />
                    </button>
                    <button onClick={props.handleDelete} className=''>
                        <img src={cross} className='w-6' alt="" />
                    </button>
                </div>
            </section >
        </>
    )
}
