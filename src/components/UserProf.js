import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const UserProf = ({src,name}) => {
  const {auth, setAuth} = useAuth()
  const navigate = useNavigate()

  const logout = () =>{
    setAuth({});
    navigate("/");
  }

  return (
      <Dropdown className='login-btn d-flex align-items-center' style={{ width: "fit-content" }}>
        <Dropdown.Toggle variant="light">
          <img src={src?src:"images/profile_pic.jpg"} alt="userprofile" className='user-nav me-2'/>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Header>Chào {name}</Dropdown.Header>
          <Dropdown.Divider/>
          {
            auth?.user?.type === 3? <Dropdown.Item>
              <Link to="/history"style={{ textDecoration: "none" , color: "black" }}>
                Lịch sử mua hàng
              </Link>
            </Dropdown.Item> : <></>
          }
          <Dropdown.Item>
            <Link to="/profile"style={{ textDecoration: "none" , color: "black" }}>
              Thông tin cá nhân 
            </Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Đăng xuất</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        
  )
}

export default UserProf