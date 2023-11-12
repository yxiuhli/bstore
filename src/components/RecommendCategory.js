import React from 'react'
import { useNavigate } from 'react-router'

const RecommendCategory = ({id, image, name}) => {
  const navigate = useNavigate()

  const navigateToMenu = () =>{      
      navigate(`/menu?category=${id}`)
  }
  return (
    <div className='my-2' style={{ position: "relative", cursor: "pointer" }} onClick={navigateToMenu}>
      <img className="img-rcmCate" src={image} alt="" />
      <div id="shape"></div>
      <h5>{name}</h5>
    </div>
  )
}

export default RecommendCategory