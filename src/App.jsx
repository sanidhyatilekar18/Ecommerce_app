

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import ShopCategory from './pages/ShopCategory.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import OrderSuccess from './pages/OrderSuccess.jsx'
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
    const [showSideBar, setSideBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

   const toggleSideBar = () => {
    setSideBar(prev => !prev);
  };


  return (
    <>
     <BrowserRouter>
         <ToastContainer position="top-right" autoClose={3000} />
     <Navbar toggleSideBar={toggleSideBar}  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}/>
        <div className="flex  bg-gray-100 text-gray-800 min-h-screen  ">
          {showSideBar && <Sidebar />}
          <div className="flex-1 p-4">
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="/mens" element={<ShopCategory />} />
              <Route path="/womens" element={<ShopCategory />} />
              <Route path="/kids" element={<ShopCategory />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
