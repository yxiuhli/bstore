import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'
import useAuth from '../hooks/useAuth'
import useDatabase from '../hooks/useDatabase'
import RatingStar from './admin/RatingStar'

const FeedbackModal = (props) => {
  const [rating, setRating] = useState(1)
  const [comment, setComment] = useState("")
  const { auth } = useAuth()
  const {feedbacks, setFeedbacks, foodInOrder, orders, setOrders} = useDatabase()

  const onSubmit = (e) =>{
    e.preventDefault()

    var fbs = feedbacks

    foodInOrder.map((f)=>
      f.order === props.item?.id ?
      fbs = [...fbs,{
        id: v4(),
        user: auth?.user?.id,
        drink: f.drink,
        comment: comment,
        rating: rating
      }] : <></>
    )

    console.log(fbs)

    setFeedbacks([
      ...fbs
    ])


    const order = orders.find(ord=>ord.id === props?.item?.id)
    order.feedback = true
    
    setOrders(
      orders.map(ord=>
        ord.id === order.id ?
        order: ord
      )
    )

    Swal.mixin(
      {
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }
    ).fire(
      {
        icon: "success",
        title: "Gửi feedback thành công"
      }
    )

    props.onHide()
  }

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form style={{ backgroundColor:"#DFD3C3", borderRadius: ".5rem" }}  onSubmit={onSubmit}>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
          Đánh giá đơn hàng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Điểm đánh giá - {rating} sao</Form.Label>
          <RatingStar onRating={(idx)=>setRating(idx)} rating={rating}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Đánh giá</Form.Label>
          <Form.Control required as="textarea" rows={5} value={comment} onChange={(e)=>setComment(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="px-4" variant='outline-primary' onClick={props.onHide}>Hủy</Button>
        <Button className="px-4" variant='primary' type="submit">Đánh giá</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FeedbackModal