import React from 'react'
import '../index.css'
import { banner1, banner2, banner3, banner4, banner5 } from '../assets/index'
import Carousel from 'react-material-ui-carousel'
import BannerImg from './BannerImg'
import Category from './Category'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Home() {

    return (
        <>
            <Navbar />

            <div className='mt-2'>
                <Carousel height={420} autoPlay={true} showDots={false} stopAutoPlayOnHover={false} animation='slide' swipe={true} navButtonsAlwaysVisible={true}>
                    <BannerImg src={banner5} />
                    <BannerImg src={banner4} />
                    <BannerImg src={banner3} />
                    <BannerImg src={banner1} />
                    <BannerImg src={banner2} />
                </Carousel>

                <Category />
            </div>

            <Footer />
        </>
    )

}
