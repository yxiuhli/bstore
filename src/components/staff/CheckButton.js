import React from 'react'
import { Button } from 'react-bootstrap'
import { AiOutlineCheck } from 'react-icons/ai'

const CheckButton = ({onClick}) => {
  return (
      <Button className='py-1 px-2 ms-2' variant='success' onClick={onClick}>
        <AiOutlineCheck/>
      </Button>
  )
}

export default CheckButton