import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'

const EditAccountModal = (props) => {
  const [email, setEmail] = useState(props.account.email)
  const [name, setName] = useState(props.account.name)
  const [phone, setPhone] = useState(props.account.phone)
  const [address, setAddress] = useState(props.account.address)

  const onSubmit = (e)=>{
    e.preventDefault()

    if(!email){
      Swal.fire(
        {
          icon: "error",
          title: "Cập nhật tài khoản thất bại",
          text: "Không được bỏ trống email",
        }
      )
      return
    }
    if(!name){
      Swal.fire(
        {
          icon: "error",
          title: "Cập nhật tài khoản thất bại",
          text: "Không được bỏ trống tên",
        }
      )
      return
    }
    console.log({...props.account, email: email, name: name, phone: phone, address: address})
    props.editAccount({...props.account, email: email, name: name, phone: phone, address: address})

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
        text: "Cập nhật tài khoản thành công",
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
      <Form style={{ backgroundColor:"#DFD3C3", borderRadius: ".5rem" }} onSubmit={onSubmit}>

      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="w-100 text-center">
          Chỉnh sửa tài khoản
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên" value={name} onChange={(e)=>setName(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="tel" placeholder="Nhập số điện thoại" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Nhập địa chỉ" value={address} onChange={(e)=>setAddress(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="px-4" variant='outline-primary' onClick={props.onHide}>Hủy</Button>
        <Button className="px-4" variant='primary' type="submit">Lưu</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditAccountModal