import Home from "./Components/Homepage/Home";
import Login from "./Components/LoginSignUp/Login";
import Register from "./Components/LoginSignUp/Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductInfo from "./Components/Product/ProductInfo";
import CheckoutPage from "./Components/ShoppingCart/CheckoutPage";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import { createContext, useEffect, useState } from "react";
import Profile from "./Components/Profile/Profile";
import Orders from './Components/ShoppingCart/Orders'
import axios from "axios";
import AdminPage from "./Components/Admin/AdminPage";
import Details from "./Components/Admin/Details";
import UserInbox from "./Components/UserInbox";

export const AppContext = createContext();

function App() {
  const [data,setData] = useState({});
  const [order,setOrder] = useState([]);
  const [cart,setCart] = useState(true)
  const [token,setToken] = useState(localStorage.getItem("authToken"))
  
  const fetchOrders = async (id) => {
    try {
        let res = await axios.get(`http://localhost:5000/get-orders/${id}`)
        if(res.data.success){
          setOrder(res.data.order)
        }
        console.log("res.data=",res.data)
    }
    catch (err) {
        console.log("err", err)
    }
}
  const fetchData = async()=>{
    let res = await fetch('http://localhost:5000/user',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem("authToken") || null,
      }
    })

    const json = await res.json();
    if(json.success){
      console.log(json)
      fetchOrders(json.userData._id)
      setData(json)
      
    }
  }

  useEffect(()=>{
    fetchData()
    setToken(token)
  },[token,cart])
  return (
    <>

    <AppContext.Provider value={{data,token,setToken,cart,setCart,order}}>
        <BrowserRouter>

          <Routes>

            <Route element={<Home />} path="/"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<ProductInfo />} path="product/:product_id"></Route>
            <Route element={<CategoryProducts />} path="/category/:category"></Route>
            <Route element={<CheckoutPage />} path="/cart"></Route>
            <Route element={<Orders userID={data?.userData?._id} handleRefresh={fetchData}/>} path="/orders"></Route>
            <Route element={<Profile />} path="/profile"></Route>
            <Route element={<UserInbox />} path="/user/inbox"></Route>
            <Route element={<AdminPage />} path="/admin"></Route>
            <Route element={<Details />} path="/admin/order/details"></Route>
          </Routes>

          <ToastContainer theme='dark' position='top-center' autoClose={1500} hideProgressBar={true} style={{marginTop:'20px'}}/>
          

        </BrowserRouter>
        </AppContext.Provider>
    </>
  );
}

export default App;
