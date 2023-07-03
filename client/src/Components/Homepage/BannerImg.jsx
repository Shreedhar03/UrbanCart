import React from 'react'

export default function BannerImg(props) {
    return (
        <img src={props.src} alt='product' className={`${props.snap} object-cover w-full h-full object-center shrink-0`} />
    )
}
