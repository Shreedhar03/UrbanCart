import Home from "./Components/Homepage/Home";
import Login from "./Components/LoginSignUp/Login";
import Register from "./Components/LoginSignUp/Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductInfo from "./Components/Product/ProductInfo";
import CheckoutPage from "./Components/ShoppingCart/CheckoutPage";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import { createContext, useEffect, useState } from "react";
import Profile from "./Components/Profile/Profile";

export const AppContext = createContext();

function App() {
  const [data,setData] = useState({});
  const [cart,setCart] = useState(true)
  const [token,setToken] = useState(localStorage.getItem("authToken"))
  
  const fetchData = async()=>{
    let res =await fetch('http://localhost:5000/user',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem("authToken") || null,
      }
    })

    const json = await res.json();
    setData(json)
    console.log(json,json.status)
  }

  useEffect(()=>{
    console.log(token)
    fetchData();
    setToken(token)
    console.log("data" , data)
  },[token,cart])
  return (
    <>

    <AppContext.Provider value={{data,token,setToken,cart,setCart}}>
        <BrowserRouter>

          <Routes>

            <Route element={<Home />} path="/"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<ProductInfo />} path="product/:product_id"></Route>
            <Route element={<CategoryProducts />} path="/category/:category"></Route>
            <Route element={<CheckoutPage />} path="/checkout"></Route>
            <Route element={<Profile />} path="/profile"></Route>
          </Routes>
        </BrowserRouter>
        </AppContext.Provider>
    </>
  );
}

export default App;
