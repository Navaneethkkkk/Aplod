import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import AdminLogin from '../pages/AdminLogin'
import AdminPanel from '../pages/AdminPanel'
import Product from '../pages/Product'
import Sidebar from '../pages/Sidebar'
import Header from '../pages/Header'
import ProductForm from '../pages/ProductForm'
import ProductPreview from '../pages/ProductPreview'

function LayoutRoutes() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element= {<Main/>}/>
        <Route path='/login' element= {<AdminLogin/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>
        <Route path='/header' element={<Header/>}/>


        
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default LayoutRoutes
