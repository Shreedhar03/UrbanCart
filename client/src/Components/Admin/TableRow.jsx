import React from 'react'

const TableRow = (props) => {
    return (
        <>
            <tr className='borer border-black'>
                <td className='px-2 xl:px-5 py-3 border-b border-gray-300'>{props.index}</td>
                <td className='px-2 xl:px-5 py-3 border-b border-gray-300'><span className='text-gray-700 text-sm'>{props.ele.brand}</span><br /><span>{props.ele.title}</span></td>
                <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{props.ele.price}</td>
                <td className='px-2 xl:px-5 py-3 hidden md:table-cell border-b border-gray-300'>{props.ele.stock}</td>
                <td className='px-2 xl:px-5 py-3  border-b border-gray-300'>
                    <div className='flex gap-4 items-center'>
                        <img className='w-6 h-6 cursor-pointer' onClick={() =>
                            props.handleEdit(props.ele._id, props.ele.title, props.ele.brand, props.ele.category, props.ele.gender, props.ele.description, props.ele.rating, props.ele.price, props.ele.discountPercentage, props.ele.stock, props.ele.images)
                        } src={props.edit} alt="" />
                        <img className='w-5 h-5 cursor-pointer' onClick={() => props.handleDelete(props.ele._id)} src={props.bin} alt="" />
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TableRow
