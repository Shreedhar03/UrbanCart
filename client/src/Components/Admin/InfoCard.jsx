import React from 'react'

const InfoCard = (props) => {
    
    return (
        <div className='flex flex-col gap-5 bg-slate-50 p-4 w-[260px] h-[136px] shadow-md rounded-lg hover:shadow-2xl'>
            <div className='flex items-center gap-2'>
                <img src={props.icon} alt="icon" className='w-6 h-6'/>
                <h1 className='text-lg'>{props.title}</h1>
            </div>
            <div>
                <p className='text-2xl font-semibold'>{props.data1}</p>
                <p className='mt-1'>{props.data2}</p>
            </div>
        </div>
    )
}

export default InfoCard
