import React, { useState } from 'react'
import { Badge, Button, Form, Modal } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'
import useAuth from '../hooks/useAuth'
import useDatabase from '../hooks/useDatabase'
import PaymentItem from './PaymentItem'

const Payment = (props) => {
  const {auth, setAuth} = useAuth()
  const [usePoint, setUsePoint] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const {cart, setOrders, orders, setCart, foodInOrder, setFoodInOrder} = useDatabase()
  const location = useLocation()
  const [method, setMethod] = useState("COD")

  const onSubmit = (e) =>{
    e.preventDefault()
    var currentdate = new Date(); 
    var datetime =(currentdate.getMonth()+1) + "/"  
                    + currentdate.getDate() + "/"
                    + currentdate.getFullYear() + " "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes()
    const id = v4()
    var discount = usePoint ? auth?.user?.point : 0
    setOrders(
      [
        ...orders,
        {
          id: id,
          name: name,
          phone: phone,
          address: address,
          date: datetime,
          status: "Chờ xác nhận",
          method: method,
          discount: usePoint?discount:0,
          total: props.total + 15000 - discount,
          user: auth?.user?.id
        }
      ]
    )

    const food = cart.map((c)=>({
      ...c,
      id: v4(),
      order: id
    }))

    setFoodInOrder(
      [
        ...foodInOrder,
        ...food
      ]
    )

    console.log(food)

    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }).fire({
      icon: "success",
      title: "Đặt hàng thành công"
    })


    setCart([])

    if(usePoint){
      setAuth({user: {...auth?.user, point: 0}})
    }

    props.onHide()
  }


  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form style={{ borderRadius: ".5rem" }} onSubmit={onSubmit}>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center" style={{ color: "#7d6e83", fontStyle: "italic", fontSize: "30px" }}>
          Thanh toán
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {
        auth?.user ? 
        (<div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span>Giỏ hàng của bạn</span>
            <Badge bg="secondary" className="rounded-pill">{cart.length}</Badge>
          </h4>
          <ul class="list-group mb-3">
            {
              cart.map((c)=><PaymentItem item={c}/>)
            }
            <div id="TIPS">
              <li class="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#DFD3C3" }}>
                <div>
                  <h6 class="my-0">Phí giao hàng</h6>
                </div>
                <span>
                  15.000đ
                </span>
              </li>
              <li class="list-group-item d-flex flex-row justify-content-between" style={{ backgroundColor: "#DFD3C3" }}>
                <div className='row text-start'>
                  <h6 class="my-0">Tích điểm</h6>
                  <small class="text-muted">Dùng {auth?.user?.point} tích điểm </small>
                </div>
                <div className='row text-end'>
                  <div className='form-check-reversed'>
                    <input id="point" name="usePoint" disabled={auth?.user?.point === 0} value={usePoint} onChange={()=>setUsePoint(!usePoint)} type="checkbox" class="form-check-input" />
                  </div>
                  <small class="text-muted">[-{auth?.user?.point?.toLocaleString()}đ] </small>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#DFD3C3" }}>
                <span><strong>Tổng cộng (VND)</strong></span>
                <h5 style={{ color: "#7D6E83" }}><strong>{usePoint?(props.total+15000-20000)?.toLocaleString(): (props.total+15000)?.toLocaleString()} đ</strong></h5>
              </li>
            </div>
          </ul>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Thông tin nhận hàng</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="firstName" class="form-label">Họ và tên</label>
                <input type="text" class="form-control" id="Name" placeholder="Nguyễn Văn A" value={name} onChange={(e)=>setName(e.target.value)}  required/>
                <div class="invalid-feedback">
                  Vui lòng nhập họ và tên.
                </div>
              </div>
  
              <div class="col-sm-6">
                <label for="lastName" class="form-label">Số điện thoại</label>
                <input type="tel" name="phone" class="form-control" id="lastName" placeholder="085..." value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
                <div class="invalid-feedback">
                  Vui lòng nhập số điện thoại
                </div>
              </div>
  
              <div class="col-12">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" name="address" class="form-control" id="address" placeholder="06 Quang Trung" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                <div class="invalid-feedback">
                  Vui lòng nhập địa chỉ nhận hàng.
                </div>
              </div>
            </div>
  
            <hr class="my-4"/>
  
  
            <h4 class="mb-3">Thông tin thanh toán</h4>
            <div class="my-3">
              <div class="form-check">
                <input id="cod" name="paymentMethod" value="COD" onChange={()=>setMethod("COD")} checked={method==="COD"} type="radio" class="form-check-input" required/>
                <label class="form-check-label" for="credit">Thanh toán khi nhận hàng</label>
              </div>
              <div class="form-check">
                <input id="credit" name="paymentMethod" value="Credit" onChange={()=>setMethod("Credit")} checked={method==="Credit"} type="radio" class="form-check-input" required/>
                <label class="form-check-label" for="credit">Thẻ tín dụng</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" value="Debit" onChange={()=>setMethod("Debit")} checked={method==="Debit"} type="radio" class="form-check-input" required/>
                <label class="form-check-label" for="debit">Thẻ ghi nợ</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="paymentMethod" value="Paypal" onChange={()=>setMethod("Paypal")} checked={method==="Paypal"} type="radio" class="form-check-input" required/>
                <label class="form-check-label" for="paypal">PayPal</label>
              </div>
            </div>
            {
              method === "COD" ? <></>:
              <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Tên trên thẻ</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required/>
                <small class="text-muted">Tên đầy đủ được ghi trên thẻ</small>
                <div class="invalid-feedback">
                  Vui lòng nhập tên trên thẻ
                </div>
              </div>
  
              <div class="col-md-6">
                <label for="cc-number" class="form-label">Số thẻ tín dụng</label>
                <input type="number" class="form-control" id="cc-number" placeholder="" required/>
                <div class="invalid-feedback">
                  Vui lòng nhập số thẻ tín dụng
                </div>
              </div>
  
              <div class="col-md-6">
                <label for="cc-expiration" class="form-label">Ngày hết hạn</label>
                <input type="date" class="form-control" id="cc-expiration" placeholder="" required/>
                <div class="invalid-feedback">
                  Vui lòng nhập ngày hết hạn
                </div>
              </div>
              <div class="col-md-6">
                <label for="cc-cvv" class="form-label">CVC/CVV</label>
                <input type="number" class="form-control" id="cc-cvv" placeholder="" required/>
                <div class="invalid-feedback">
                  Vui lòng nhập mã bảo mật
                </div>
              </div>
            </div>
            }
            
        </div>
      </div>) :
      (<div className='text-center'>
        <h3>Vui lòng đăng nhập để thanh toán</h3>
        <Link to="/login" state={{ from: location }} replace><Button>Đăng nhập</Button></Link>
      </div>)

      }
      
      </Modal.Body>
      {
        auth?.user ?
        <Modal.Footer>
        <Button variant="primary" type="submit" className="w-100">Thanh toán</Button>
      </Modal.Footer> : <></>
      }
      
      </Form>
    </Modal>
  )
}

export default Payment