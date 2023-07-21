import React, { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import '../../index.css'
import { banner1, banner2, banner3, banner4, banner5 } from '../../assets/index'
import BannerImg from './BannerImg'
import Category from './Category'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { AppContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import LatestProducts from '../LatestProducts'

export default function Home() {
    const navigate=useNavigate()
    const { data } = useContext(AppContext)

    if (data?.userData?.role === "admin") {
        return (
            navigate('/admin')
        )
    }

    return (
        <>

            <div className='flex w-full overflow-scroll h-[400px] snap-x snap-mandatory'>
                <BannerImg src={banner5} />
                <BannerImg src={banner4} />
                <BannerImg src={banner3} />
                <BannerImg src={banner1} />
                <BannerImg src={banner2} />
            </div>
            <LatestProducts />
            <Category />
            <ToastContainer theme='dark' position='top-center' autoClose={2000} hideProgressBar={true} />
            <Footer />
        </>
    )

}
