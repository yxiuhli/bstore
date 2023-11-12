import React from 'react'
import { Button } from 'react-bootstrap'
import { AiOutlineClose } from 'react-icons/ai'

const CancelButton = ({onClick}) => {
  return (
      <Button className='py-1 px-2 ms-2' variant='danger' onClick={onClick}>
        <AiOutlineClose/>
      </Button>
  )
}

export default CancelButton