import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import AdminLogin from '../pages/AdminLogin'
import AdminPanel from '../pages/AdminPanel'

function LayoutRoutes() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element= {<Main/>}/>
        <Route path='/login' element= {<AdminLogin/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default LayoutRoutes
