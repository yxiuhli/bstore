import React from 'react'
import { Dropdown, NavDropdown } from 'react-bootstrap'
import { MdOutlineAccountCircle } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useDatabase from '../../hooks/useDatabase'

const DropDownAccount = () => {
  const {auth, setAuth, accounts} = useAuth();
  
  const {drinks, categories, foodInOrder, orders, feedbacks} = useDatabase();
  const navigate = useNavigate();

  const onClick = () =>{
    if(auth?.user?.type === 1 ){
      localStorage.setItem('accounts', JSON.stringify(accounts));
      localStorage.setItem('drinks', JSON.stringify(drinks));
      localStorage.setItem('categories', JSON.stringify(categories));
      localStorage.setItem('inorder', JSON.stringify(foodInOrder));
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
    setAuth({});
    navigate("/");
  }

  return (
    <Dropdown className='login-btn d-flex align-items-center' style={{ width: "fit-content" }}>
        <Dropdown.Toggle variant="light">
        <img src={auth?.user?.photo?auth?.user?.photo:"/images/profile_pic.jpg"} alt="" style={{ width: "30px", height:"30px", borderRadius:"60px" }}/> {auth?.user?.email}
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-end">
          <Dropdown.Header>Chào {auth?.user?.type === 1 ? "quản lý": "nhân viên"}</Dropdown.Header>
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
          <Dropdown.Item onClick={onClick}>Đăng xuất</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}

export default DropDownAccount