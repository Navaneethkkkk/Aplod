import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from '../pages/Main';
import AdminLogin from '../pages/AdminLogin';
import AdminPanel from '../pages/AdminPanel';
import Orders from '../pages/Orders';

import Product from '../pages/Product';
import Sidebar from '../pages/Sidebar';
import Header from '../pages/Header';
import ProductForm from '../pages/ProductForm';
import ProductPreview from '../pages/ProductPreview';
import ProductDetail from '../pages/ProductDetail';
import Category from '../pages/Category';
import { AdminThemeProvider } from '../context/AdminThemeContext';

function LayoutRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/store-product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/adminpanel" element={<AdminThemeProvider><AdminPanel /></AdminThemeProvider>} />
        <Route path="/orders" element={<AdminThemeProvider><Orders /></AdminThemeProvider>} />

        <Route path="/product" element={<AdminThemeProvider><Product /></AdminThemeProvider>} />
        <Route path="/category" element={<AdminThemeProvider><Category /></AdminThemeProvider>} />
        <Route path="/sidebar" element={<AdminThemeProvider><Sidebar /></AdminThemeProvider>} />
        <Route path="/header" element={<AdminThemeProvider><Header /></AdminThemeProvider>} />
        <Route path="/productform" element={<AdminThemeProvider><ProductForm /></AdminThemeProvider>} />
        <Route path="/productpreview" element={<AdminThemeProvider><ProductPreview /></AdminThemeProvider>} />
      </Routes>
    </BrowserRouter>
  );
}

export default LayoutRoutes;
