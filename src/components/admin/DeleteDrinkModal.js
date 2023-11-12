import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'


const DeleteDrinkModal = (props) => {
  const onSubmit = (e) =>{
    e.preventDefault()
    
    props.deleteDrink(props.drink.id)

    props.onHide()
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
        text: "Xóa thức uống thành công",
      }
    )
  }


  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form style={{ backgroundColor:"#DFD3C3", borderRadius: ".5rem" }} onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
          Xóa thức uống
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Bạn có chắc chắn muốn xóa thức uống này?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className="px-4" variant='outline-primary' onClick={props.onHide}>Hủy</Button>
        <Button className="px-4" variant='primary' type="submit">Xóa</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default DeleteDrinkModal