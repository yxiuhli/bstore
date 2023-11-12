import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useDatabase from '../../hooks/useDatabase'
import DetailButton from '../admin/DetailButton'
import CancelButton from './CancelButton'
import CancelOrder from './CancelOrder'
import CheckButton from './CheckButton'

const OrderItem = ({order}) => {
  const [showModal, setShowModal] = useState(false)
  const {orders, setOrders} = useDatabase()
  const {accounts, setAccounts} = useAuth()

  const handleCancelOrder = (reason) =>{
    order.status = "Đã hủy"
    order.reason = reason

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )
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
        acc.id === user.id?
        user : acc
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

  const handleShipOrder = () =>{
    order.status = "Đang giao hàng"

    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order : ord
      ) 
    )
  }

  return (
    <>
      <tr style={{ verticalAlign:"middle", backgroundColor: "white" }}>
        <td>{order.id}</td>
        <td>{order.name}</td>
        <td>{order.address}</td>
        <td style={{ color: order.status === "Chờ xác nhận" ? 'orange' : order.status === "Đã giao" ? 'green' : order.status === "Đã hủy" ? 'red' : order.status === "Đang giao hàng" ? 'gold' : order.status === "Đang pha chế"? "burlywood": ""  }}>{order.status}</td>
        <td>{order.date}</td>
        <td>{order.total?.toLocaleString()} đ</td>
        <td>
            <DetailButton href={`order/${order.id}`} />
            {
              order.status === "Chờ xác nhận" ? <><CheckButton onClick={handleConfirmOrder}/><CancelButton onClick={()=>setShowModal(true)}/></> : order.status === "Đã giao" ? <></> : order.status === "Đã hủy" ? <></> : order.status === "Đang pha chế" ? <CheckButton onClick={handleShipOrder}/> : <CheckButton onClick={handleFinishOrder}/>
            }
        </td>
      </tr>
      <CancelOrder handleCancelOrder={handleCancelOrder} show={showModal} onHide={()=>setShowModal(false)}/>
    </>
  )
}

export default OrderItem