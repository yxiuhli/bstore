import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { AiOutlineEye } from 'react-icons/ai'
import { RiPencilLine } from 'react-icons/ri'
import useDatabase from '../hooks/useDatabase'
import FeedbackModal from './FeedbackModal'
import OrderDetailModal from './OrderDetailModal'
import CancelButton from './staff/CancelButton'
import CancelOrder from "./staff/CancelOrder"


const OrderHistoryItem = ({item}) => {
  const [showModal, setShowModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const { foodInOrder, setOrders, orders} = useDatabase()
  const [myFood, setMyFood] = useState([])

  useEffect(()=>{
    setMyFood(
      foodInOrder.filter((food)=>food.order === item.id)
    )
  }, [foodInOrder, item])

  const handleCancelOrder = () =>{
    item.status = "Đã hủy"

    setOrders(
      orders.map(ord=>
        ord.id === item.id ?
        item : ord
      ) 
    )
  }

  return (
    <>
      <tr style={{ verticalAlign:"middle" }} className="bg-white">
              <td>{item.id}</td>
              <td>{myFood.length}</td>
              <td style={{ color: item.status === "Chờ xác nhận" ? 'orange' : item.status === "Đã giao" ? 'green' : item.status === "Đã hủy" ? 'red' : item.status === "Đang giao hàng" ? 'gold' : item.status === "Đang pha chế" ? 'burlywood' : ''  }}>{item.status}</td>
              <td>{item.date}</td>
              <td>{item.total.toLocaleString()} đ</td>
              <td>
                {
                  (item.status === "Đang pha chế" || item.status === "Chờ xác nhận") ? <Button className='py-1 px-2' variant='dark' onClick={()=>setShowDetailModal(true)}>
                  <RiPencilLine/>
                </Button> : <Button className='py-1 px-2' variant='dark' onClick={()=>setShowDetailModal(true)}>
                  <AiOutlineEye/>
                </Button> 
                }
                {
                  item.status === "Đã giao" ? item?.feedback === true ? <></> : <Button className="ms-2" variant='secondary' onClick={()=>setShowFeedbackModal(true)}>Đánh giá</Button> : item.status === "Đã hủy" ? <></>  : item.status === "Đang giao hàng" ? <></>: <CancelButton onClick={()=>setShowModal(true)}/>
                }
              </td>
      </tr>
      <OrderDetailModal item={item} show={showDetailModal} onHide={()=>setShowDetailModal(false)}/>
      <CancelOrder handleCancelOrder={handleCancelOrder} show={showModal} onHide={()=>setShowModal(false)}/>
      <FeedbackModal item={item} show={showFeedbackModal} onHide={()=>setShowFeedbackModal(false)}/>
    </>
  )
}

export default OrderHistoryItem