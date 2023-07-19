import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from "./pages/Login";

const App = () => {
    
    return (
        <>
           <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/products" exact element={<Products />} />
                    <Route path="/product-detail/:id" exact element={<ProductDetail />} />
                    <Route path="/login" exact element={<Login />} />
                </Routes>
           </BrowserRouter>
        </>
    )
}

export default App;