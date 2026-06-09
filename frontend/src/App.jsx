import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Main from './pages/Main'
import AdminLogin from './pages/AdminLogin'
import LayoutRoutes from './Routes/LayoutRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <LayoutRoutes/>
    </>
  )
}

export default App
