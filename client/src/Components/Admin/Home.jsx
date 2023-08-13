import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Navigation from './Navigation'
import InfoCard from './InfoCard'
import sales from '../../assets/sales.svg'
import orders from '../../assets/orders.svg'
import product from '../../assets/products.svg'
import account from '../../assets/account.svg'

const AdminPage = () => {
  const { data, token, currentTab, setCurrentTab,products,order } = useContext(AppContext)
  const navigate = useNavigate()


  useEffect(() => {
    !token && navigate('/login')
    data?.userData?.role === "customer" && navigate('/')
  })
  return (
    <>
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="flex items-center gap-12 max-w-5xl mx-auto mt-12">
        <InfoCard icon={sales} title={'Total Sales'} data1={'Rs 25663.25'} data2={'+248 this week'} />
        <InfoCard icon={account} title={'Users'} data1={'264'} data2={'+58 this week'} />
        <InfoCard icon={orders} title={'Orders'} data1={order.length} data2={'+37 this week'} />
        <InfoCard icon={product} title={'Products'} data1={products.length} data2={''} />
      </div>
    </>
  )
}

export default AdminPage
