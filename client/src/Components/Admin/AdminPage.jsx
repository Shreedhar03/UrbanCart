import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import OrderList from './OrderList'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'

const AdminPage = () => {
  const { data, token } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    !token && navigate('/login')
    console.log(data?.userData?.role)
    data?.userData?.role === "customer" && navigate('/')
  })
  return (
    <>
      <Navbar />
      <p className="text-center text-2xl mt-6 font-semibold text-gray-800">Dashboard</p>
      <OrderList />
      
    </>
  )
}

export default AdminPage
