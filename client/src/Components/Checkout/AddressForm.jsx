import React from 'react'
import cross from '../../assets/cross.svg'
const AddressForm = (props) => {

    return (
        <form className='max-w-sm bg-gray-50 w-7/12' onSubmit={props.handleSubmit}>
            <div className="flex justify-between max-w-[90%] items-center mb-8">
                <h1 className='text-lg font-semibold'>Add New Address</h1>
                <button onClick={() => props.setAddAddress(false)} type='button' className='bg-slate-300 p-[1px] rounded-md'><img src={cross} className='w-6' alt="cross" /></button>
            </div>
            <div className='flex flex-col max-w-[90%] gap-3 items-stretch my-4'>
                <input autoComplete='off' className='focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.title} name='title' onChange={props.handleChange} placeholder='Title*' />
                <div className='flex gap-3'>
                    <input autoComplete='off' className='shrink w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.fName} name='fName' onChange={props.handleChange} placeholder='First name*' />
                    <input autoComplete='off' className='shrink w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.lName} name='lName' onChange={props.handleChange} placeholder='Last name*' />
                </div>
                <input autoComplete='off' className='focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" pattern='[0-9]{10}' value={props.address.contact} name='contact' onChange={props.handleChange} placeholder='Phone*' />
                <div className="flex gap-3">
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.flatNo} name='flatNo' onChange={props.handleChange} placeholder='Flat/House No*' />
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.building} name='building' onChange={props.handleChange} placeholder='Building*' />
                </div>
                <input autoComplete='off' className='focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.landmark} name='landmark' onChange={props.handleChange} placeholder='Landmark*' />
                <div className="flex gap-3">
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.area} name='area' onChange={props.handleChange} placeholder='Area*' />
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.city} name='city' onChange={props.handleChange} placeholder='City*' />
                </div>
                <div className="flex gap-3">
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.state} name='state' onChange={props.handleChange} placeholder='State*' />
                    <input autoComplete='off' className='w-1/2 focus:outline-none px-4 py-[6px] text-sm border border-gray-400 rounded-md bg-inherit' type="text" value={props.address.pin} name='pin' onChange={props.handleChange} placeholder='PIN*' />
                </div>
                <input autoComplete='off' className='bg-[var(--secondary)] mt-2 w-full px-4 text-sm py-2 rounded-md' type="submit" value={"Submit"} />
            </div>
        </form>
    )
}

export default AddressForm
