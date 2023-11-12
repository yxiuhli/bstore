import React, { useRef, useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { BsCameraFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'

const AddCategoryModal = (props) => {

  const [name, setName] = useState("")
  const [photo, setPhoto] = useState(null)
  const imageFormControl = useRef()

  const onSubmit = (e) =>{
    e.preventDefault()

    if(!name){
      Swal.fire(
        {
          icon: "error",
          title: "Thêm danh mục thất bại",
          text: "Không được bỏ trống tên",
        }
      )
      return
    }
    if(!photo){
      Swal.fire(
        {
          icon: "error",
          title: "Thêm danh mục thất bại",
          text: "Vui lòng chọn ảnh cho danh mục",
        }
      )
      return
    }
    const id = v4()
    props.addCategory({id, name, photo})
    console.log({id, name, photo})

    setName("")
    setPhoto(null)

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
        text: "Thêm danh mục thành công",
      }
    )
  }

  const openFileDialog = (e) =>{
    e.preventDefault()
    imageFormControl.current.click()
  }

  const changeHandler = (e) =>{
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const reader = new FileReader()
    const limit = 1024 * 1024 * 2
    if(file['size'] > limit){
      alert("Vui lòng chọn file có kích thước nhỏ hơn")
    }
    reader.onloadend = (file)=>{
      setPhoto(reader.result)
    }
    reader.readAsDataURL(file)
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
          Thêm danh mục
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicName" value={name} onChange={(e)=>setName(e.target.value)}>
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Hình ảnh</Form.Label>
          {photo !== null? 
          <>
            <img className='image-form form-control' src={photo} onClick={openFileDialog} style={{padding: "0"}}/> 
            <Form className='image-form form-control'  style={{ display: "none" }} >
              <input ref={imageFormControl} type="file" className='image-form--input' onChange={changeHandler}/>
            </Form>
          </>: 
          
          <Form className='image-form form-control'>
            <label className='image-form--label'>
              <Row>
                <BsCameraFill/>
                <p className='mt-2'>Thêm hình ảnh</p>
              </Row>
            </label>
            <input type="file" className='image-form--input' onChange={changeHandler}/>
          </Form>}
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

export default AddCategoryModal