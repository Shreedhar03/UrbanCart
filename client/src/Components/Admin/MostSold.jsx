import React from 'react'
import { Link } from 'react-router-dom'

const MostSold = (props) => {
    return (
        <div className='flex flex-col items-start gap-4 max-w-5xl mx-4 sm:mx-auto mt-8'>
            <h1 className='text-2xl font-semibold'>Top Products</h1>
            <table>
                <thead>
                    <tr>
                        <td className='pr-3 py-2 text-sm text-gray-600'>Product Name</td>
                        <td className='px-6 py-2 text-sm text-gray-600'>Price</td>
                        <td className='px-6 py-2 text-sm text-gray-600'>Sold</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props?.products?.sort((a, b) => b.sold - a.sold).slice(0, 5).map((ele, key) => {
                            return (
                                <tr key={key}>
                                    <td className='p-3 pl-0'>
                                        <Link to={`/product/${ele._id}`} className='text-lg'>{ele.title}</Link>
                                    </td>
                                    <td className='text-lg py-3 px-6'>{ele.price}</td>
                                    <td className='text-lg py-3 px-6'>{ele.sold}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MostSold
