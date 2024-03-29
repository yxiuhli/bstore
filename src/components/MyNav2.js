import React, { useRef } from "react";
import { Badge } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useUser } from "../context/UserContext";
import useDatabase from "../hooks/useDatabase";
import OutlineButton from "./OutlineButton";
import SearchBox from "./SearchBox";
import UserProf from "./UserProf";

const MyNav = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userData} = useUser();
  const {auth} = useAuth();
  const toggler = useRef()
  const navbar = useRef()
  const {cart} = useDatabase()


  const onClick = () => {
    navigate("/login");
  };

  const toggleCollapse = () =>{
    !toggler.current.className.includes("collapsed") ? 
    toggler.current.click()
    : <></>
    console.log(toggler)
    // if(toggler.className.contains("collapsed")){
    //   toggler.current.click()
    // }
  }

  return (
    <Navbar sticky="top" expand="xl" bg="white" className="me-2" collapseOnSelect ref={navbar}>
      <Container fluid>
        <Link to="/" className="me-auto nav-brand navbar-brand">
          <h2 style={{ color: "sienna" }}>B-Store</h2>
          
        </Link>
        <img src="/plant.ico" alt="icon" className="mb-2"/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" ref={toggler} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex ms-auto">
            <NavLink end to="/" className='mr-6 menu-item nav-link' onClick={toggleCollapse}>Trang chủ</NavLink>
            <NavLink end to="menu" className='menu-item nav-link' onClick={toggleCollapse}>Sản phẩm</NavLink>
            <NavLink end to="category" className='menu-item nav-link' onClick={toggleCollapse}>Danh mục</NavLink>
            <NavLink end to="contacts" className='menu-item nav-link' onClick={toggleCollapse}>Liên hệ</NavLink>
            <Nav.Item className='menu-item' style={{ alignItems: "center"}}><hr className='solid-vert'/></Nav.Item>
            {
              auth?.user?.type === 1 
                ? (<Link to="/admin" className="menu-item nav-link" onClick={toggleCollapse}>Quản lý</Link>)
                : auth?.user?.type === 2 
                  ? (<Link to="/staff" className="menu-item nav-link" onClick={toggleCollapse}>Nhân viên</Link>)
                  : <NavLink to="cart" className='cart-item nav-link' style={{ position:"relative" }} onClick={toggleCollapse}>
                  <BsCart2 className='cart'/>
                  Giỏ hàng
                  {
                    cart.length > 0 ? <Badge bg="secondary" className="ms-2 cart-badge">
                    {cart.length}
                  </Badge> : <></>
                  }
                </NavLink>
            }
            
          </Nav>
          {
            isLoggedIn? (<UserProf src={userData?.fullname} name={userData?.username}/>)
              : <OutlineButton text="Đăng nhập" className='d-flex login-btn' onClick={onClick}/>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
