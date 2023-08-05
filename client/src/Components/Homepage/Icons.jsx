import React from 'react'
import { Link } from 'react-router-dom'
const categories=[
    {image:"https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/original/boss/967236/0/HOnRuX154n-dozwvxjs3j-967236_1.jpg?dpr=1",name:"Perfumes"},
    {image:"https://m.media-amazon.com/images/I/61MbLLagiVL._SX679_.jpg",name:"Smart Home"},
    {image:"https://www.lakmeindia.com/cdn/shop/products/24351_H-8901030724411_600x.jpg?v=1674040406",name:"Beauty"},
    {image:"https://manyavar.scene7.com/is/image/manyavar/SKT4692-425_01_12-05-2021-20-05:283x395",name:"Fashion"},
    {image:"https://cdn-5c84bc36-b681cbc1.mysagestore.com/b522fd52e101edc926c3308c230445d5/contents/2A13190SNR/thumbnail/big_2A13190SNR.jpg",name:"Sports"},
    {image:"https://cdn.fcglcdn.com/brainbees/images/cattemplate/fashion_desktop_soi2023_36.jpg",name:"Kids"},
    {image:"https://m.media-amazon.com/images/I/71l+9JWHRbL._SL1500_.jpg",name:"Kitchen"}
]

const Icons = () => {
  return (
    <div className='flex max-w-[90%] mx-auto gap-12 py-12 overflow-scroll'>
      {categories?.map((c,key)=>{
        return(
            <Link to={`/category/${c.name}`} key={key} className='flex flex-col items-center gap-1 shrink-0'>
                <img src={c.image} alt="product" className=' rounded-full w-20 h-20 object-cover border border-gray-200'/>
                <h3 className=''>{c.name}</h3>
            </Link>
        )
      })}
    </div>
  )
}

export default Icons
