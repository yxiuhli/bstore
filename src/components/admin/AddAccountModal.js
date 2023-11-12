import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

const AddAccountModal = (props) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) =>{
    e.preventDefault()

    if(!email){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo tài khoản thất bại",
          text: "Vui lòng nhập email",
        }
      )
      return
    }
    if(!name){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo tài khoản thất bại",
          text: "Không được bỏ trống tên",
        }
      )
      return
    }
    if(!password){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo tài khoản thất bại",
          text: "Không được bỏ trống mật khẩu",
        }
      )
      return
    }
    if(password.length > 32 || password.length < 8)
    {
      Swal.fire(
        {
          icon: "error",
          title: "Tạo tài khoản thất bại",
          text: "Mật khẩu phải từ 8 - 32 ký tự",
        }
      )
      return
    }
    const type = props.type
    const id = uuidv4()
    props.addAccount({id, email, name, password, type})

    setEmail("")
    setName("")
    setPassword("")

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
        text: "Tạo tài khoản thành công",
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
          {props.type === 1 ? "Thêm nhân viên": "Thêm quản lý"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên" value={name} onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button className="px-4" variant='outline-primary' onClick={props.onHide}>Hủy</Button>
        <Button className="px-4" variant='primary' type="submit">Tạo</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddAccountModal