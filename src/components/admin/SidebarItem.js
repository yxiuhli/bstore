import PropTypes from 'prop-types'
import React from 'react'
import { FaIcons } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const SidebarItem = ({title, icon, href}) => {
  // var isActive = this.context.router.route.location.pathname == this.prop.href;
  return (
    <li>
      <NavLink to={href} end className={`d-flex flex-row nav-link py-3 px-2 border-bottom align-items-center`} style={{ color:"black", padding:"1.5rem" }}>
          <div className="bi ms-2">{icon}</div>
          <span className='ms-3 nav-ttl'>{title}</span>
      </NavLink>
      
    </li>
  )
}

SidebarItem.contextTypes = {
  router: PropTypes.object
};

export default SidebarItem