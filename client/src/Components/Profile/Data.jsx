import React from 'react'

const Data = (props) => {
    return (
            <div className='flex justify-between bg-red-20 w-full'>
                <p className='py-2 text-lg'>{props.field}</p>
                <p className='py-2 px-4 text-left w-[60%]'>{props.info}</p>
            </div>
    )
}

export default Data
