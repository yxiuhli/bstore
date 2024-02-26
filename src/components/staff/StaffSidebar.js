import React from 'react'
import { Link } from 'react-router-dom'
import StaffSidebarNav from './StaffSidebarNav'

const StaffSidebar = () => {
  return (
    <div className='d-flex flex-column flex-shrink-0 fixed-bar p-2' style={{ backgroundColor: "#DFD3C3" }}>
      <Link style={{ textDecoration:"none" }} className='ms-auto me-auto text-4xl' to="/"><h3  style={{ color: "sienna" }}>B-Store</h3></Link>
      <StaffSidebarNav/>
    </div>
  )
}

export default StaffSidebar