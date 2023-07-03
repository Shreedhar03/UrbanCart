import React from 'react'

const ConfirmDelete = (props) => {
    return (
        <div className='absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col gap-4 p-4'>
            <p className='text-lg'>Do you really want delete account ? </p>
            <div className="flex gap-2">
                <button className='text-lg rounded-lg px-4 py-1 border border-gray-500' onClick={props.handlePopUp}>Cancel</button>
                <button className='text-lg rounded-lg px-4 py-1 bg-red-500' onClick={props.handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default ConfirmDelete
