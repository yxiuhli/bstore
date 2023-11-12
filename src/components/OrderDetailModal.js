import React, { useEffect, useState } from 'react'
import { Badge, Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import useDatabase from '../hooks/useDatabase'
import PaymentItem from './PaymentItem'

const OrderDetailModal = (props) => {
  const { foodInOrder, setOrders, orders} = useDatabase()
  const [method, setMethod] = useState("COD")
  const [myFood, setMyFood] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  useEffect(()=>{
    setMyFood(
      foodInOrder.filter((f)=>f.order === props.item?.id)
    )
    console.log(props.item)
    setName(props.item?.name)
    setPhone(props.item?.phone)
    setAddress(props.item?.address)
    setMethod(props.item?.method)

  }, [foodInOrder, props])

  const onSubmit = (e) =>{
    e.preventDefault()

    const o = orders.find(c=>c.id === props.item?.id)
    o.name = name
    o.phone = phone
    o.address = address
    o.method = method


    setOrders(orders.map((order)=>order.id===o.id?o:order))

    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    }).fire({
      icon: "success",
      title: "Cập nhật thành công"
    })

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
          {
            (props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận") ? "Cập nhật đơn hàng" : "Chi tiết đơn hàng"
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {
        (<div class="row g-5">
        <div class="col-md-5 col-lg-4 order-md-last">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span>Giỏ hàng của bạn</span>
            <Badge bg="secondary" className="rounded-pill">{myFood.length}</Badge>
          </h4>
          <ul class="list-group mb-3">
            {
              myFood.map((c)=><PaymentItem item={c}/>)
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
                  <small class="text-muted">Dùng {props.item?.discount||0} tích điểm </small>
                </div>
                <div className='row text-end'>
                  <small class="text-muted">- {(props.item?.discount||0)?.toLocaleString()}đ </small>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between" style={{ backgroundColor: "#DFD3C3" }}>
                <span><strong>Tổng cộng (VND)</strong></span>
                <h5 style={{ color: "#7D6E83" }}><strong>{props.item?.total?.toLocaleString()}đ</strong></h5>
              </li>
            </div>
            {
              props.item?.reason?<p id="TIPS" className='mt-3'>
              <b>Lý do hủy đơn:</b> {props.item?.reason}
            </p>: <></>
            }
          </ul>
        </div>
        <div class="col-md-7 col-lg-8">
          <h4 class="mb-3">Thông tin nhận hàng</h4>
            <div class="row g-3">
              <div class="col-sm-6">
                <label for="Name" class="form-label">Họ và tên</label>
                <input type="text" class="form-control" id="Name" value={name} onChange={(e)=>setName(e.target.value)} required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập họ và tên.
                </div>
              </div>
  
              <div class="col-sm-6">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input type="tel" class="form-control" id="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập số điện thoại
                </div>
              </div>
  
              <div class="col-12">
                <label for="address" class="form-label">Địa chỉ</label>
                <input type="text" class="form-control" id="address" value={address} onChange={(e)=>setAddress(e.target.value)}required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập địa chỉ nhận hàng.
                </div>
              </div>
            </div>
            <hr class="my-4"/>
            <h4 class="mb-3">Thông tin thanh toán</h4>
            <div class="my-3">
              <div class="form-check">
                <input id="cod" name="paymentMethod" value="COD" checked={method==="COD"} onChange={()=>setMethod("COD")} type="radio" class="form-check-input" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <label class="form-check-label" for="credit">Thanh toán khi nhận hàng</label>
              </div>
              <div class="form-check">
                <input id="credit" name="paymentMethod" value="Credit" checked={method==="Credit"}  onChange={()=>setMethod("Credit")}type="radio" class="form-check-input" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <label class="form-check-label" for="credit">Thẻ tín dụng</label>
              </div>
              <div class="form-check">
                <input id="debit" name="paymentMethod" value="Debit" checked={method==="Debit"}  onChange={()=>setMethod("Debit")}type="radio" class="form-check-input" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <label class="form-check-label" for="debit">Thẻ ghi nợ</label>
              </div>
              <div class="form-check">
                <input id="paypal" name="paymentMethod" value="Paypal" checked={method==="Paypal"} onChange={()=>setMethod("Paypal")}type="radio" class="form-check-input" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <label class="form-check-label" for="paypal">PayPal</label>
              </div>
            </div>
            {
              method === "COD" ? <></>:
              <div class="row gy-3">
              <div class="col-md-6">
                <label for="cc-name" class="form-label">Tên trên thẻ</label>
                <input type="text" class="form-control" id="cc-name" placeholder="" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <small class="text-muted">Tên đầy đủ được ghi trên thẻ</small>
                <div class="invalid-feedback">
                  Vui lòng nhập tên trên thẻ
                </div>
              </div>
  
              <div class="col-md-6">
                <label for="cc-number" class="form-label">Số thẻ tín dụng</label>
                <input type="number" class="form-control" id="cc-number" placeholder="" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập số thẻ tín dụng
                </div>
              </div>
  
              <div class="col-md-6">
                <label for="cc-expiration" class="form-label">Ngày hết hạn</label>
                <input type="date" class="form-control" id="cc-expiration" placeholder="" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập ngày hết hạn
                </div>
              </div>
              <div class="col-md-6">
                <label for="cc-cvv" class="form-label">CVC/CVV</label>
                <input type="number" class="form-control" id="cc-cvv" placeholder="" required disabled={!(props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận")}/>
                <div class="invalid-feedback">
                  Vui lòng nhập mã bảo mật
                </div>
              </div>
            </div>
            }
            
        </div>
      </div>)
      }
      
      </Modal.Body>
        <Modal.Footer>
          {
            (props.item?.status === "Đang pha chế" || props.item?.status === "Chờ xác nhận") ? <Button variant="primary" type="submit" className="w-100">Cập nhật</Button> : <></>
          }
          
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default OrderDetailModal