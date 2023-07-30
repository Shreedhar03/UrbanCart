import Home from "./Components/Homepage/Home";
import Login from "./Components/LoginSignUp/Login";
import Register from "./Components/LoginSignUp/Register";
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductInfo from "./Components/Product/ProductInfo";
import CheckoutPage from "./Components/Checkout/CheckoutPage";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import { createContext, useEffect, useState } from "react";
import Profile from "./Components/Profile/Profile";
import Orders from './Components/Checkout/Orders'
import axios from "axios";
import AdminPage from "./Components/Admin/Home";
import UserInbox from "./Components/UserInbox";
import AddProduct from "./Components/Admin/AddProduct";
import OrderList from "./Components/Admin/OrderList";
import ProductData from "./Components/Admin/ProductData";
import Navbar from "./Components/Navbar";
import PlaceOrder from "./Components/Checkout/PlaceOrder";
import AllProducts from "./Components/AllProducts";
import NotFound from "./Components/NotFound";
import BottomNav from "./Components/BottomNav";

export const AppContext = createContext();

function App() {
  // const navigate=useNavigate()
  const [data, setData] = useState({});
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(true)
  const [currentTab, setCurrentTab] = useState(1)
  const [token, setToken] = useState(localStorage.getItem("authToken"))

  const fetchOrders = async (id) => {
    try {
      let res = await axios.get(`${process.env.REACT_APP_ORIGIN}get-orders/${id}`)
      if (res.data.success) {
        setOrder(res.data.order)
      }
      // console.log("res.data=", res.data)
    }
    catch (err) {
      console.log("err", err)
    }
  }
  const fetchData = async () => {
    try {

      let res = await fetch(`${process.env.REACT_APP_ORIGIN}user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem("authToken") || null,
        }
      })

      const json = await res.json();
      // console.log("success ============== " , json.success)
      if (json.success) {
        // console.log(json)
        fetchOrders(json.userData._id)
        setData(json)
      }
      else{
        setToken(null)
        localStorage.removeItem("authToken")
      }
    }
    catch(err){
      console.log("err=",err)
      setToken(null)
    }
  }
  const fetchProducts = async () => {
    try {
      let { data } = await axios.get(`${process.env.REACT_APP_ORIGIN}allproducts`)
      setProducts(data.products)
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData()
    fetchProducts()
    setToken(token)
    console.log(process.env.REACT_APP_ORIGIN)
  }, [token, cart])

  useEffect(()=>{
    // console.log("products=",products)
  },[products])

  return (
    <>

      <AppContext.Provider value={{products,fetchProducts, currentTab, setCurrentTab, data, token, setToken, cart, setCart, order }}>
        <BrowserRouter>
          <Navbar />
          <Routes>

            <Route element={<Home />} path="/"></Route>
            <Route element={<AllProducts />} path="/latest"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<ProductInfo />} path="product/:product_id"></Route>
            <Route element={<CategoryProducts />} path="/category/:category"></Route>
            <Route element={<CheckoutPage />} path="/cart"></Route>
            <Route element={<Orders userID={data?.userData?._id} handleRefresh={fetchData} />} path="/orders"></Route>
            <Route element={<Profile />} path="/profile"></Route>
            <Route element={<UserInbox />} path="/user/inbox"></Route>
            <Route element={<AdminPage />} path="/admin"></Route>
            <Route element={<OrderList />} path="/admin/orders"></Route>
            <Route element={<AddProduct />} path="/admin/add-product"></Route>
            <Route element={<ProductData />} path="/admin/product-data"></Route>
            <Route element={<PlaceOrder />} path="/place-order"></Route>
            <Route element={<NotFound message="Page Not Found !"/>} path="*"></Route>
          </Routes>

          <ToastContainer theme='dark' position='top-center' autoClose={1500} hideProgressBar={true} style={{ marginTop: '20px' }} />
          {token && <BottomNav />}

        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
