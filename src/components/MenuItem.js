import React from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'
import useDatabase from '../hooks/useDatabase'

const MenuItem = ({id, img, name, price}) => {
  const navigate = useNavigate()
  const {cart, setCart} = useDatabase()

  const navigateToDetail = () =>{
    navigate(`/drinks/${id}`)
  }

  const handleAddToCart = () =>{
    var hasDrink = false
    setCart(
      cart.map((c)=>c.drink=== id?hasDrink=true: <></>)
    )
    if(hasDrink){
      const cartItem = cart.find(c=>c.drink===id)
      cartItem.quantity++
      setCart(
        cart.map((c)=>c.drink=== cartItem?cartItem:c)
      )
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: "true",
      }).fire(
        {
          icon: "success",
          text: "Đã có trong giỏ hàng của bạn, số lượng tăng thêm 1"
        }
      )
    }
    else{
      setCart([
        ...cart,
        {
          id: v4(),
          drink: id,
          quantity: 1,
          note: ""
        }
      ]
      )
      console.log(cart)
      Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: "true",
      }).fire(
        {
          icon: "success",
          text: "Thêm vào giỏ hàng thành công"
        }
      )
    }
  }

  return (
    <Card style={{ borderRadius: ".5rem" }} className="my-2">
      <Card.Body className='px-0 pt-0 pb-2'>
      <img class="img-bestSeller" src={img} alt=""  onClick={navigateToDetail} style={{ cursor: "pointer" }} />
      <h5 className="product-name ms-2 mt-2">{name}</h5>
      <Col className="d-flex">
          <span className="ms-2 product-price">{price.toLocaleString()}</span>
          <Button  className="ms-auto me-2 d-flex" variant="outline-primary" onClick={handleAddToCart}>
            <div id="shopping-text" className='me-1'>Thêm vào giỏ</div>
            <i className="fa-solid fa-cart-shopping" id="shopping-cart-icon"></i>
          </Button>
      </Col>
      </Card.Body>
    </Card>
  )
}

export default MenuItem