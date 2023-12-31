import React, { useContext } from 'react'
import { AppContext } from '../../App'
import OrderItem from './OrderItem'
import image from '../../assets/404.svg'
import NotFound from '../NotFound'
import BottomNav from '../BottomNav'

const Orders = () => {
    const { order } = useContext(AppContext)

    return (
        <>
            {
                order?.length !== 0 ?
                    <>
                        <p className='text-center text-2xl font-semibold text-gray-700 mt-6'>Purchase History</p>
                        <section className='flex flex-col gap-6 my-8 max-w-2xl mx-auto'>
                            {order?.map((ele, key) => {
                                return (
                                    <OrderItem status={ele.status} _id={ele._id} date={ele.createdAt.slice(0, 10)} amountPaid={ele.amountPaid} cart={ele.cart} />
                                )
                            })}
                        </section>
                    </> :
                    <NotFound message="Place your first order" />
            }

             
        </>
    )
}

export default Orders
