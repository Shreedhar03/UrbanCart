import Home from "./Components/Home";
import Login from "./Components/LoginSignUp/Login";
import Register from "./Components/LoginSignUp/Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductInfo from "./Components/Products/ProductInfo";
import CheckoutPage from "./Components/ShoppingCart/CheckoutPage";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
        
          <Route element={<Home />} path="/"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Register />} path="/register"></Route>
          <Route element={<ProductInfo />} path="/:product_id"></Route>
          <Route element={<CheckoutPage />} path="/checkout"></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
