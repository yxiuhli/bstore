import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import useAuth from '../../hooks/useAuth'
import useDatabase from '../../hooks/useDatabase'
import TopAppBar from '../admin/TopAppBar'
import CancelOrder from './CancelOrder'
import FoodInOrderItem from './FoodInOrderItem'

const OrderDetail = () => {
  const [showModal, setShowModal] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState({})
  const {orders, setOrders, foodInOrder} = useDatabase()
  const {accounts, setAccounts} = useAuth()

  useEffect(()=>{
    if(params && params.id){
      orders.map((ord)=> ord.id == params.id ? 
        setOrder(ord)
      : {})
    }

  }, [orders, params])  


  const openModal = () =>{
    setShowModal(true)
  }

  const handleShipOrder = () =>{
    order.status = "Đang giao hàng"

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )
  }

  const handleConfirmOrder = () =>{
    order.status = "Đang pha chế"

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )
  }

  const handleCancelOrder = (reason) =>{
    order.status = "Đã hủy"
    order.reason = reason

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )

    navigate(-1)
  }

  const handleFinishOrder = () =>{
    order.status = "Đã giao"

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )
    
    const user = accounts.find(acc=>acc.id === order.user)
    user.point += order.total * 0.05

    setAccounts(
      accounts.map(acc=>
        acc.id === user.id ? 
        user: acc  
      )
    )

    navigate(-1)
  }

  return (
    <div style={{ height:"100vh" }}>
      <TopAppBar title="Chi tiết đơn hàng"/>
      <Container fluid className="p-4" >
        <Row>
              <h4> Đơn hàng #{order.id}</h4>
              <p>
                <b className='me-2'>Người đặt:</b> {order.name}
              </p>
              <p>
                <b className='me-2'>Địa chỉ:</b> {order.address}
              </p>
              <p>
                  <b className='me-2'>Số điện thoại:</b> {order.phone}
              </p>
              <p>
                  <b className='me-2'>Ngày đặt:</b> {order.date}
              </p>
              <p style={{ color: order.status === "Chờ xác nhận" ? 'orange' : order.status === "Đã giao" ? 'green' : order.status === "Đã hủy" ? 'red' : order.status === "Đang giao hàng" ? 'gold' : order.status === "Đang pha chế" ? 'burlywood' : ''  }}>
                  <b style={{ color: "black" }} className='me-2'>Tình trạng giao hàng:</b> {order.status}
              </p>
              {
                order.reason?<p>
                <b className='me-2'>Lý do hủy đơn:</b> {order.reason}
            </p>: <></>
              }
              <p><b>Chi tiết thức uống: </b></p>
                <Table>
                      <thead>
                      <tr>
                        <th>Tên món</th>
                        <th className='text-center'>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>Ghi chú</th>
                      </tr>
                      </thead>
                    <tbody>
                      {
                        foodInOrder.map((f)=>f.order==params.id?<FoodInOrderItem item={f}/>:<></>)
                      }
                      <tr>
                        <td></td>
                        <td></td>
                        <td>Phí giao hàng:</td>
                        <td>15,000 đ</td>
                        <td></td>
                      </tr>
                      {
                        order.discount !== 0 ? <tr>
                        <td></td>
                        <td></td>
                        <td>Giảm giá:</td>
                        <td className='text-muted'>- {order.discount?.toLocaleString()} đ</td>
                        <td></td>
                      </tr> : <></>
                      }
                      
                      <tr style={{ border: "0 solid transparent" }}>
                        <td></td>
                        <td></td>
                        <td><h5><strong>Tổng cộng:</strong></h5></td>
                        <td style={{ color: "#7d6e53" }}><h5><strong>{order.total?.toLocaleString()} đ</strong></h5></td>
                        <td></td>
                    </tr>
                    </tbody>
                  </Table>
      {/* <Form id="order-form" onSubmit={onSubmit}> */}
        {/* <Row  style={{ visibility: (order.status !== "Đã hủy" && order.status !== "Đã giao") ? 'visible' : 'hidden' }}>
          <Col className='d-inline-flex' style={{ alignItems:"center" }}>
            Tình trạng đơn hàng: 
            <Form.Group controlId="formStatus">
              <Form.Select aria-label="Default select example" className='ms-4' value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang pha chế">Đang pha chế</option>
                <option value="Đang giao hàng">Đang giao hàng</option>
                <option value="Đã giao">Đã giao</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row> */}
        <div>
          {
            order?.status === "Chờ xác nhận"
              ? (<Col className='float-end'>
                  <Button className="me-2" variant='outline-primary' onClick={()=>navigate(-1)}>Trở về</Button>
                  <Button className="me-2" variant='secondary' onClick={openModal}>Hủy đơn</Button>
                  <Button variant='primary' onClick={handleConfirmOrder}>Xác nhận</Button>
                </Col>)
              : order?.status === "Đang giao hàng"
                ? (
                  <Col className='float-end'>
                    <Button className="me-2" variant='outline-primary' onClick={()=>navigate(-1)}>Trở về</Button>
                    <Button className="me-2" variant='secondary'>In hóa đơn</Button>
                    <Button variant='primary' onClick={handleFinishOrder}>Hoàn tất đơn hàng</Button>
                  </Col>
                )
                : order?.status === "Đang pha chế"
                  ? (
                    <Col className='float-end'>
                      <Button className="me-2" variant='outline-primary' onClick={()=>navigate(-1)}>Trở về</Button>
                      <Button variant='primary' onClick={handleShipOrder}>Xác nhận giao hàng</Button>
                    </Col>
                  )
                  : (<Col className='float-end'>
                      <Button className="me-2" variant='outline-primary' onClick={()=>navigate(-1)}>Trở về</Button>
                    </Col>)
          }
        </div>
      {/* </Form> */}

      </Row>

      </Container>
      <CancelOrder handleCancelOrder={handleCancelOrder} show={showModal} onHide={()=>setShowModal(false)}/>

    </div>
  )
}

export default OrderDetail