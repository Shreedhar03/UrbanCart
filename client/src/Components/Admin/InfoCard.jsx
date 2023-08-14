import React from 'react'

const InfoCard = (props) => {
    
    return (
        <div className='flex flex-col snap-mandatory snap-center shrink-0 gap-5 bg-slate-50 p-4 w-[230px] h-[136px] rounded-lg'>
            <div className='flex items-center gap-2'>
                <img src={props.icon} alt="icon" className='w-6 h-6'/>
                <h1 className='text-lg text-gray-500'>{props.title}</h1>
            </div>
            <div>
                <p className='text-3xl font-semibold'>{props.data1}</p>
                <p className='mt-1'>{props.data2}</p>
            </div>
        </div>
    )
}

export default InfoCard
