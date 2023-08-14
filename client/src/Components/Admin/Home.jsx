import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import InfoCard from './InfoCard'
import sales from '../../assets/sales.svg'
import orders from '../../assets/orders.svg'
import product from '../../assets/products.svg'
import account from '../../assets/account.svg'
import axios from 'axios'
import MostSold from './MostSold'

const AdminPage = () => {
  const { data, token, currentTab, setCurrentTab,products } = useContext(AppContext)
  const [details,setDetails]=useState({
    users:"...",
    totalSale:"...",
    orders:"...",
    products:"..."
  })
  const navigate = useNavigate()

  const fetchAdminData=async()=>{
    let {data} = await axios.get(`${process.env.REACT_APP_ORIGIN}admin-data`)
    setDetails(data)
  }

  useEffect(() => {
    !token && navigate('/login')
    data?.userData?.role === "customer" && navigate('/')
    fetchAdminData()
  },[])
  return (
    <>
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex sm:flex-wrap snap-x items-center gap-12 max-w-5xl mx-4 sm:mx-auto mt-12 py-2 overflow-scroll">
        <InfoCard icon={sales} title={'Total Sales'} data1={details?.totalSale} data2={''} />
        <InfoCard icon={account} title={'Users'} data1={details?.users} data2={''} />
        <InfoCard icon={orders} title={'Orders'} data1={details?.orders} data2={''} />
        <InfoCard icon={product} title={'Products'} data1={details?.products} data2={''} />
      </div>
      <MostSold products={products}/>
    </>
  )
}

export default AdminPage
