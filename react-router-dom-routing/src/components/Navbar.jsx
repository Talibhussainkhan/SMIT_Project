import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="text-gray-600 body-font bg-violet-200">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">
    <Link to='/' className="flex title-font font-medium items-center text-gray-900 cursor-pointer mb-4 md:mb-0">
    <span className="ml-3 text-xl">React Routing</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <NavLink to='/' className={({ isActive })=> `mr-5 text-gray-800 hover:text-gray-900 cursor-pointer ${isActive && 'border-b-2 border-amber-400'}`} >Home</NavLink>
      <NavLink to='/about' className={({ isActive })=> `mr-5 text-gray-800 hover:text-gray-900 cursor-pointer  ${isActive && 'border-b-2 border-amber-400'} `} >About</NavLink>
      <NavLink to='/blog' className={({ isActive })=> `mr-5 text-gray-800 hover:text-gray-900 cursor-pointer  ${isActive && 'border-b-2 border-amber-400'} `} >Blog</NavLink>
      <NavLink to='/shop' className={({ isActive })=> `mr-5 text-gray-800 hover:text-gray-900 cursor-pointer  ${isActive && 'border-b-2 border-amber-400'} `} >Shop</NavLink>
    </nav>
  </div>
</header>
  )
}

export default Navbar