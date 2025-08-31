import React from 'react'
import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Shop from './pages/Shop'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}  />
      <Route path='/about' element={<About />}  />
      <Route path='/blog' element={<Blog />}  />
      <Route path='/shop' element={<Shop />}  />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App