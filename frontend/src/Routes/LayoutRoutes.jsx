import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../pages/Main'
import AdminLogin from '../pages/AdminLogin'

function LayoutRoutes() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path='/' element= {<Main/>}/>
        <Route path='/login' element= {<AdminLogin/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default LayoutRoutes
