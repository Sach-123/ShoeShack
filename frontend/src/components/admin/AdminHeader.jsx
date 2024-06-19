import React from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const AdminHeader = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    axios.post('/api/v1/admin/logout')
    .then((response) => {
      console.log(response)
      navigate('/admin/login')
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <div className="flex justify-between items-center w-full px-24 h-16 sticky top-0  z-10 bg-white border-b">
      <NavLink to="/">
        <div className="logo text-2xl font-bold">
          Shoe<span className="">Shack.</span>
        </div>
      </NavLink>
      <div className="nav-container">
        
        <NavLink to='/' className="mx-5">Home</NavLink>
        {location.pathname !== '/admin/login' && (
          <button onClick={handleLogout} className="ml-5 bg-red-500 p-2 rounded hover:bg-red-600">Logout</button>
        )}
        
      </div>
    </div>
  )
}

export default AdminHeader