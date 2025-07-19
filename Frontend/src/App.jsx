

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
import React, { useState } from 'react'

function App() {
    const [showSideBar, setSideBar] = useState(false);
   const toggleSideBar = () => {
    setSideBar(prev => !prev);
  };


  return (
    <>
     <BrowserRouter>
     <Navbar toggleSideBar={toggleSideBar} />
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
              <Route path=":productId" element={<ProductDetails />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
