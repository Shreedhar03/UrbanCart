import React from 'react'


const Sidebar = (props) => {

  return (
    <div className='h-screen bg-[var(--primary)] text-gray-200 w-0 lg:w-[250px] shrink-0 fixed top-0 z-10'>
      <div className='mt-24 max-w-[80%] mx-auto'>
        <h1>Apply Filters</h1>
        <div className='flex flex-col items-start gap-6 mt-8'>
          <h2>Price</h2>
          <div className='flex flex-col gap-2 items-start'>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 0 && props.filters.price.max==500000 && 'bg-slate-300 rounded-lg text-black'}`} value='500000' name='0' >All</button>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 0 && props.filters.price.max==1000 && 'bg-slate-300 rounded-lg text-black'}`} value='1000' name='0'  >Under &#8377;1,000</button>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 1000 && props.filters.price.max==5000 && 'bg-slate-300 rounded-lg text-black'}`} value='5000' name='1000'  >&#8377;1,000-&#8377;5000</button>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 5000 && props.filters.price.max==10000 && 'bg-slate-300 rounded-lg text-black'}`} value='10000' name='5000'  >&#8377;5,000-&#8377;10,000</button>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 10000 && props.filters.price.max==30000 && 'bg-slate-300 rounded-lg text-black'}`} value='30000' name='10000'  >&#8377;10,000-&#8377;30,000</button>
            <button onClick={(e) => props.setFilters(null, e.target.name, e.target.value)} className={`px-2 py-1 cursor-pointer  ${props.filters.price.min == 30000 && props.filters.price.max==500000 && 'bg-slate-300 rounded-lg text-black'}`} value='500000' name='30000'  >Above &#8377;30,000</button>
          </div>
        </div>

        <div className='flex flex-col items-start gap-6 mt-8'>
          <h2>Discount</h2>
          <div className='flex flex-col gap-2 items-start'>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='0' className={`px-2 py-1 cursor-pointer  ${props.filters.discount.percent == 0 && 'bg-slate-300 rounded-lg text-black'}`}>All</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='10' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 10 && 'bg-slate-300 rounded-lg text-black'}`}>10% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='25' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 25 && 'bg-slate-300 rounded-lg text-black'}`}>25% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='50' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 50 && 'bg-slate-300 rounded-lg text-black'}`}>50% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='60' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 60 && 'bg-slate-300 rounded-lg text-black'}`}>60% Off or more</button>
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='0' className={`px-2 py-1 cursor-pointer  ${props.filters.discount.percent == 0 && 'bg-slate-300 rounded-lg text-black'}`}>All</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='10' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 10 && 'bg-slate-300 rounded-lg text-black'}`}>10% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='25' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 25 && 'bg-slate-300 rounded-lg text-black'}`}>25% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='50' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 50 && 'bg-slate-300 rounded-lg text-black'}`}>50% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='60' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 60 && 'bg-slate-300 rounded-lg text-black'}`}>60% Off or more</button>
          </div>
          <div className='flex flex-col gap-2 items-start'>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='0' className={`px-2 py-1 cursor-pointer  ${props.filters.discount.percent == 0 && 'bg-slate-300 rounded-lg text-black'}`}>All</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='10' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 10 && 'bg-slate-300 rounded-lg text-black'}`}>10% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='25' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 25 && 'bg-slate-300 rounded-lg text-black'}`}>25% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='50' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 50 && 'bg-slate-300 rounded-lg text-black'}`}>50% Off or more</button>
            <button onClick={(e) => props.setFilters(e.target.value, null, null)} value='60' className={`px-2 py-1 cursor-pointer ${props.filters.discount.percent == 60 && 'bg-slate-300 rounded-lg text-black'}`}>60% Off or more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
