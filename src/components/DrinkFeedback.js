import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'
import RatingStar from './admin/RatingStar'

const DrinkFeedback = ({feedback}) => {
  const {accounts} = useAuth()

  const [user, setUser] = useState({})
  
  useEffect(()=>{
    accounts.map((acc)=>acc.id ===feedback.user? setUser(acc):<></>)
  }, [accounts, feedback])

  return (
    <Row className='m-3 p-2' style={{ backgroundColor: "white" }}>
      <Col className="d-flex align-items-center">
        <img src={user.photo?user.photo:"/images/profile_pic.jpg"} alt="userprofile" style={{ cursor: "auto" }} className='user-nav me-2'/>
        <h5 className='my-0 ms-2 p-0'>{user.name?user.name:""}</h5>
      </Col>
      <RatingStar className="mt-2 mb-2" onRating={()=><></>} rating={feedback.rating} disabled/>
      <span>{feedback.comment}</span>
    </Row>
  )
}

export default DrinkFeedback