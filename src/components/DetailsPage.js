import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiOutlineMinus, AiOutlineMinusCircle, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { v4 } from 'uuid';
import useDatabase from "../hooks/useDatabase";
import background from "../img/ContactPage/backgroudContact.png";
import RatingStar from './admin/RatingStar';
import DrinkFeedback from './DrinkFeedback';


const DetailsPage = () => {
  const params = useParams()
  const {drinks, feedbacks, cart, setCart} = useDatabase()
  const [drink, setDrink] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [fbs, setFbs] = useState([])
  const [showMore, setShowMore] = useState(false)
  const [note, setNote] = useState("")

  useEffect(()=>{
    setFbs(feedbacks.filter((fb)=>fb.drink==params.id))
  }, [feedbacks, params.id])

  useEffect(()=>{
    drinks.map((d)=>d.id==params.id?setDrink(d):<></>)
  }, [drinks, params.id])

  const buttonClick = () =>{
    setShowMore(!showMore)
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    var hasDrink = false
    setCart(
      cart.map((c)=>c.drink=== drink.id?hasDrink=true: <></>)
    )
    if(hasDrink){
      const cartItem = cart.find(c=>c.drink===drink.id)
      cartItem.quantity += +quantity
      if(note !== ""){
        cartItem.note = note
      }
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
          text: "Đã có trong giỏ hàng của bạn, số lượng tăng thêm"
        }
      )
    }
    else{
      setCart([
        ...cart,
        {
          id: v4(),
          drink: drink.id,
          quantity: +quantity,
          note: note
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
    setQuantity(1)
    setNote("")
  }


  return (
    <div className='my-5 mx-3'>
      <Form onSubmit={onSubmit}>
        <Container fluid> {/* <!------Introducer--> */}
            <Row>
              <Col sm={4}><img src={drink.photo} style={{ width: "100%" }} alt="" /></Col>
              <Col className='ms-3 my-auto'>
                <Row className='d-flex'>
                  <h3>{drink.name}</h3>
                  <h5>{drink.price && drink.price.toLocaleString()}đ</h5>
                  {/* <Col className='d-flex align-items-center'>
                    <AiOutlineMinusCircle  style={{ width: "32px", height: "32px", cursor: "pointer" }}/>
                    <Form.Control min={1} className='ms-3 text-center' type='number' value={quantity} onChange={(e)=>setQuantity(e.target.value)} style={{ width: "100px", backgroundColor:"#DFD3C3"}}/> 
                    <AiOutlinePlusCircle className='ms-3 me-auto' style={{ width: "32px", height: "32px", cursor: "pointer" }}/>
                  </Col> */}
                  <Col className='align-items-center d-flex'>
                    <Button variant="outline-secondary border-end-0" onClick={()=>quantity>1?setQuantity(quantity-1):<></>} style={{ borderRadius: "0.3rem 0 0 0.3rem", border: "1px solid #ced4da" }}><AiOutlineMinus/></Button>
                    <Form.Control min={1} className='text-center align-self-center' type='number' value={quantity} style={{ width: "50px", borderRadius: "0px"}} onChange={(e)=>setQuantity(e.target.value)}/>
                    <Button variant="outline-secondary border-start-0" onClick={()=>setQuantity(quantity+1)} style={{ borderRadius: "0 0.3rem 0.3rem 0", border: "1px solid #ced4da" }}><AiOutlinePlus/></Button>
                  </Col>
                  <p className='mt-3'>Ghi chú</p>
                  <Form.Control as="textarea" className='w-75' rows={7} value={note} onChange={(e)=>setNote(e.target.value)}/>
                  <Button type="submit" className='w-75 mt-4' variant="primary"><h5 className='m-1'>Thêm vào giỏ hàng</h5></Button>
                </Row>
              </Col>
            </Row>  
            <Row className="mt-3">
              <h4>Thông tin sản phẩm</h4>
              <p>{drink.description}</p>
            </Row>
            {
              fbs.length > 0 ? <><h4>Đánh giá của người dùng khác</h4>
              <Container fluid className='p-3' style={{ backgroundColor: "#D9D9D9" }}>
                {
                  fbs.map((fb, index)=>(index >=2 && !showMore) ? <></> :<DrinkFeedback feedback={fb}/>)
                }
              
                {/* <Row className='m-3 p-2' style={{ backgroundColor: "white" }}>
                  <Col className="d-flex align-items-center">
                    <img src="/images/profile_pic.jpg" alt="userprofile" className='user-nav me-2'/>
                    <h5 className='my-0 ms-2 p-0'>Lộc Minh Hiếu</h5>
                  </Col>
                  <RatingStar className="mt-2 mb-2" onRating={()=><></>} rating={5} disabled/>
                  <span>Cà phê ngon, giúp tỉnh táo rất nhanh. Sản phẩm chất lượng, lần tới sẽ ủng hộ tiếp.</span>
                </Row>
  
                <Row className='m-3' style={{ backgroundColor: "white" }}>
                  <Col className="d-flex align-items-center">
                    <img src="/images/profile_pic.jpg" alt="userprofile" className='user-nav me-2'/>
                    <h5 className='my-0 ms-2 p-0'>Lộc Minh Hiếu</h5>
                  </Col>
                  <RatingStar className="mt-2 mb-2" onRating={()=><></>} rating={4} disabled/>
                  <span>Cà phê ngon, giúp tỉnh táo rất nhanh. Sản phẩm chất lượng, lần tới sẽ ủng hộ tiếp.</span>
                </Row> */}
                {
                  fbs.length > 2 ?<Button variant="secondary" onClick={buttonClick}>{showMore?"Thu gọn":"Xem thêm feedback khác"}</Button>
                  : <></>
                }
              </Container></> : <></>
            }
        </Container> {/* <!-----End Introducer--> */}
      </Form>

    </div>
  )
}

export default DetailsPage