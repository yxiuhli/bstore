import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormControl, Row } from 'react-bootstrap'
import { AiOutlineMinus, AiOutlineMinusCircle, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import useDatabase from '../hooks/useDatabase'


const CartItem = ({c}) => {
  const {cart, setCart, drinks} = useDatabase()
  const [drink, setDrink] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
    drinks.map((d)=>d.id === c.drink ? setDrink(d): <></>)
  }, [drinks, c])

  const plusItem = () =>{
    c.quantity++
    setCart(
      cart.map((ct)=>ct.id === c.id? c : ct)
    )
  }

  const minusItem = () =>{
    if(c.quantity === 1)
      return
    c.quantity--
    setCart(
      cart.map((ct)=>ct.id === c.id? c : ct)
    )
  }

  const deleteItem = () =>{
    setCart(
      cart.filter((ct)=>ct.id !== c.id)
    )
  }

  const handleChangeItem = (e) =>{
    if(+e.target.value <= 1)
      c.quantity = 1
    else
      c.quantity = +e.target.value
    setCart(
      cart.map((ct)=>ct.id === c.id? c : ct)
    )
  }

  const handleNoteChange = (e) =>{
    c.note = e.target.value
    setCart(
      cart.map((ct)=>ct.id === c.id? c : ct)
    )
  }

  return (
    <tr style={{ backgroundColor: "white", verticalAlign:"middle" }}>
      <td colSpan={2}>
        <div className='d-flex flex-row align-items-center'>
          <img className='img-cart ' src={drink?.photo} alt="" style={{ cursor: "pointer" }} onClick={()=>navigate(`/drinks/${drink.id}`)}/>
          <div className='ms-5 me-auto' style={{ height: "fit-content" }}>
            <h5 id="p3" className="" style={{ display: "inline-block", cursor: "pointer" }} onClick={()=>navigate(`/drinks/${drink.id}`)}>{drink?.name}</h5>
            <Form.Group className="mb-3" controlId="formBasicDesc" >
              <Form.Label>Ghi chú</Form.Label>
              <Form.Control type="text" as="textarea"value={c.note} onChange={handleNoteChange}/>
            </Form.Group>
          </div>
        </div>
      </td>
      <td className='text-center'>
          <span>{drink?.price?.toLocaleString()} đ</span>
      </td>
      <td>
        <Col className='text-center justify-content-center align-items-center d-flex'>
          <Button variant="outline-secondary border-end-0" onClick={minusItem} style={{ borderRadius: "0.3rem 0 0 0.3rem", border: "1px solid #ced4da" }}><AiOutlineMinus/></Button>
          <Form.Control min={1} className='text-center align-self-center' type='number' value={c.quantity} style={{ width: "50px", borderRadius: "0px"}} onChange={handleChangeItem}/>
          <Button variant="outline-secondary border-start-0" onClick={plusItem} style={{ borderRadius: "0 0.3rem 0.3rem 0", border: "1px solid #ced4da" }}><AiOutlinePlus/></Button>
        </Col>
      </td>
      <td className='text-center'>
        <span>{(drink?.price * c?.quantity).toLocaleString()} đ</span>
      </td>
      <td>
          <Button variant="outline-danger" onClick={deleteItem}>
            <RiDeleteBinLine/>
          </Button>
      </td>
    </tr>
  )
}

export default CartItem