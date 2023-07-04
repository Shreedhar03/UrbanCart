import React from 'react'
import {ToastContainer} from 'react-toastify'
import '../../index.css'
import { banner1, banner2, banner3, banner4, banner5 } from '../../assets/index'
import BannerImg from './BannerImg'
import Category from './Category'
import Navbar from '../Navbar'
import Footer from '../Footer'

export default function Home() {

    return (
        <>
            <Navbar />

            <div className='flex w-full overflow-scroll h-[400px] mt-8 snap-x snap-mandatory'>
                <BannerImg src={banner5} snap={"snap-center"} />
                <BannerImg src={banner4} snap={"snap-center"} />
                <BannerImg src={banner3} snap={"snap-center"} />
                <BannerImg src={banner1} snap={"snap-center"} />
                <BannerImg src={banner2} snap={"snap-center"} />
            </div>
            <Category />
            <ToastContainer theme='dark' position='top-center' autoClose={2000} hideProgressBar={true} />
            <Footer />
        </>
    )

}
