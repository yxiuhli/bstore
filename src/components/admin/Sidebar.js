import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import SidebarNav from './SidebarNav'

const Sidebar = () => {
  return (
    <div className='d-flex flex-column flex-shrink-0 fixed-bar p-2' style={{ backgroundColor: "#DFD3C3" }}>
      <Link style={{ textDecoration:"none" }} to="/" className='ms-auto me-auto' ><h3 style={{ color: "#7D6E83" }}>Irosas</h3></Link>
      <SidebarNav/>
    </div>
  )
}

export default Sidebar