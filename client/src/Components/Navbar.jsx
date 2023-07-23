import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { toast } from 'react-toastify'

export default function Navbar() {

    const { data, products, token, setToken } = useContext(AppContext)
    const [searchVisible, setSearchVisible] = useState(false)
    const notify = (message) => toast(message)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const matchingResults = []
    const handleBlur = () => {
        setTimeout(() => {
            setSearchVisible(false)
            setSearch("")
        }, 500);
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
        for (const key in products) {
            if (
                ((products[key].title.toLowerCase()).includes(search.toLowerCase())
                    || (products[key].brand.toLowerCase()).includes(search.toLowerCase())
                    || (products[key].category.toLowerCase()).includes(search.toLowerCase()))
            ) {
                // console.log("found")
                matchingResults.push(products[key])
            }
            // console.log(products[key].title.includes(search) , "---" , products[key].title)
        }
        setSearchResults(matchingResults)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    useEffect(() => {
        console.log(searchResults)
    }, [searchResults])

    const navigate = useNavigate();
    return (
        <nav className='flex items-center justify-between py-4 sm:px-12 sticky top-0 z-20 bg-[var(--primary)] text-white flex-col md:flex-row w-full gap-4'>
            <div className='flex items-center gap-3'>
                <p className="logo text-2xl sora font-extrabold cursor-pointer" onClick={() => { navigate('/') }}>UrbanCart<span className='text-[var(--secondary)]'> .</span></p>
            </div>

            <div className='flex gap-2 sm:gap-6'>
                <i class='bx bx-menu text-3xl cursor-pointer md:hidden'></i>
                <form name='searchForm' className='flex self-center relative' onSubmit={handleSubmit}>
                    <input type="text" name='search' onFocus={() => setSearchVisible(true)} onBlur={handleBlur} value={search} onChange={handleChange} placeholder='try watches' id='search' className='w-48 sm:w-48 lg:w-64 text-lg py-1 px-4 focus:outline-none bg-[#405669] rounded-l-xl' autoComplete='off' />
                    <button type="submit" name='submit' id='submit' className='text-xl px-4 flex items-center rounded-r-xl bg-[#405669]'><i className='bx bx-search'></i></button>
                    <ul className={`bg-[#405669] flex flex-col gap-3 absolute top-10 max-h-96 overflow-y-scroll w-full text-white ${search.length > 2 && searchVisible && searchResults.length !== 0 && 'p-2'}`}>
                        {search.length > 2 && searchVisible && searchResults.map(ele => {
                            return <Link to={`/product/${ele._id}`} className='cursor-pointer border-b border-slate-500'>
                                <p className='text-gray-400 text-sm'>{ele.brand}</p>
                                <p>{ele.title}</p>
                            </Link>
                        })}
                    </ul>
                </form>

                <div className="user text-md flex items-center gap-2 sm:gap-4 justify-center">
                    {
                        token ?
                            <>
                                <div className='relative'>
                                    {
                                        data?.userData?.role === "admin" ?
                                            <div className='flex items-center cursor-pointer'>
                                                {/* <p onClick={()=>navigate('/admin')}>Dashboard</p> */}
                                            </div>
                                            :
                                            <div className='flex gap-3'>
                                                <button className='flex items-center gap-1' onClick={() => { navigate("/cart") }}><i className='bx bx-cart-alt text-2xl' ></i><p className='hidden'>Cart</p></button>
                                                <button className='hidden sm:flex items-center gap-1 relative' onClick={() => { navigate("/user/inbox") }}><i className='bx bx-bell text-2xl'></i><p className='hidden'>Cart</p>
                                                    <p className={`absolute -top-1 left-3 ${data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center justify-center rounded-full`}>
                                                        {
                                                            token && data?.userData?.message.filter(ele => ele.isRead !== true).length !== 0 && data?.userData?.message.filter(ele => ele.isRead !== true).length
                                                        }
                                                    </p>
                                                </button>
                                                <p className={`absolute -top-1 left-4 ${data?.userData?.cart.length !== 0 && 'bg-red-500'} text-sm h-4 w-4 flex items-center justify-center rounded-full`}>
                                                    {
                                                        token && data?.userData?.cart.length !== 0 && data?.userData?.cart.length
                                                    }
                                                </p>
                                            </div>
                                    }
                                </div>
                                <div className='flex items-center relative'>
                                    {/* <i className='bx bx-user text-2xl'></i> */}
                                    {/* <button className='hidden md:block'>Logout</button> */}
                                    
                                    <button className='user-icon w-10 h-10 bg-[var(--secondary)] rounded-full text-black text-xl sora'>{data?.userData?.name.slice(0, 1).toUpperCase()}</button>
                                    <ul className='settings absolute right-0 top-14 bg-[var(--secondary)] text-black flex flex-col gap-4'>
                                        <li className='cursor-pointer'><Link to={'/profile'} className='flex items-center gap-1'>
                                            <i className='bx bx-user text-xl'></i>Profile</Link>
                                        </li>
                                        <li className={`cursor-pointer flex items-center gap-1 ${data?.userData?.role === "admin" && 'hidden'}`} onClick={() => navigate('/orders')}><i className='bx bx-shopping-bag text-xl'></i>Orders</li>
                                        <li className={`cursor-pointer sm:hidden flex items-center gap-1 ${data?.userData?.role === "admin" && 'hidden'}`} onClick={() => navigate('/user/inbox')}><i className='bx bx-bell text-xl'></i>Inbox</li>
                                        <li className={`cursor-pointer flex items-center gap-1 ${data?.userData?.role !== "admin" && 'hidden'}`} onClick={() => navigate('/admin')}><i className='bx bx-shopping-bag text-xl'></i>Dashboard</li>
                                        <li className='cursor-pointer flex items-center gap-1' onClick={() => {
                                            localStorage.removeItem("authToken");
                                            setToken(null);
                                            notify("Logged Out !")
                                            navigate('/login');
                                        }}><i className='bx bx-power-off text-xl'></i>Logout</li>
                                    </ul>
                                </div>
                            </>
                            :
                            <button className='flex items-center gap-1' onClick={() => { navigate("/login") }}>
                                <i className='bx bx-user text-2xl'></i>
                                <p className='hidden md:block'>Sign Up / Login</p>
                            </button>
                    }
                </div>
            </div>

        </nav>
    )
}

