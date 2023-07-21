import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import Navigation from './Navigation'

const AdminPage = () => {
  const { data, token, currentTab, setCurrentTab } = useContext(AppContext)
  const navigate = useNavigate()


  useEffect(() => {
    !token && navigate('/login')
    data?.userData?.role === "customer" && navigate('/')
  })
  return (
    <>
      <Navigation currentTab={currentTab} setCurrentTab={setCurrentTab}/>
    </>
  )
}

export default AdminPage
