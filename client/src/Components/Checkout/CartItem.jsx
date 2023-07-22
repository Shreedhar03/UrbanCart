import React from 'react'
import cross from '../../assets/cross.svg'
import edit from '../../assets/edit.svg'

export default function CartItem(props) {

    return (
        <>
            <section className="max-w-3xl flex bg-gray-100 p-4 flex-col sm:flex-row items-center justify-between sm:gap-12 sm:pr-6 rounded-xl">

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full">
                    <img src={props.image} className='w-full h-32 sm:w-24 sm:h-24  object-contain rounded-lg' alt="" />
                    <div>
                    <h2 className='sm:mx-0 text-xl font-semibold self-start sm:self-center mx-6'>{props.title}</h2>
                    <div className='sm:mx-0 flex sm:items-center self-start sm:self-center mx-6 gap-8 mt-4 w-full'>
                        <p className='text-xl font-semibold text-gray-800'>Qty: {props.quantity}</p>
                        <p className='text-xl font-semibold text-gray-800'>&#8377; {props.price}</p>
                    </div>
                    </div>
                </div>

                <div className='gap-6 flex sm:gap-4 self-start sm:self-center sm:m-0 m-6 sm:border-0'>
                    <button onClick={props.handleEdit} className=''>
                        <img src={edit} className='w-8 h-8' alt="" />
                    </button>
                    <button onClick={props.handleDelete} className=''>
                        <img src={cross} className='w-8 h-8' alt="" />
                    </button>
                </div>
            </section >
        </>
    )
}
