import React, { useRef, useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { BsCameraFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import useDatabase from '../../hooks/useDatabase'


const EditDrinkModal = (props) => {
  const [name, setName] = useState(props.drink.name)
  const [category, setCategory] = useState(props.drink.category)
  const [price, setPrice] = useState(props.drink.price)
  const [desc, setDesc] = useState(props.drink.description)
  const [photo, setPhoto] = useState(props.drink.photo)
  const imageFormControl = useRef()
  const {categories} = useDatabase()

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

  const openFileDialog = (e) =>{
    e.preventDefault()
    imageFormControl.current.click()
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    if(!name){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo thức uống thất bại",
          text: "Không được bỏ trống tên",
        }
      )
      return
    }
    if(!category){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo thức uống thất bại",
          text: "Vui lòng chọn danh mục",
        }
      )
      return
    }
    if(!price){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo thức uống thất bại",
          text: "Không được bỏ trống giá tiền",
        }
      )
      return
    }
    if(!desc){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo thức uống thất bại",
          text: "Không được bỏ trống giới thiệu",
        }
      )
      return
    }
    if(!photo){
      Swal.fire(
        {
          icon: "error",
          title: "Tạo thức uống thất bại",
          text: "Vui lòng chọn ảnh thức uống",
        }
      )
      return
    }

    console.log({...props.drink, name: name, category: +category, price: +price, photo: photo, description: desc})
    props.editDrink({...props.drink, name: name, category: +category, price: +price, photo: photo, description: desc})

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
        text: "Cập nhật thức uống thành công",
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
          Chỉnh sửa thức uống
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên" value={name} onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Danh mục</Form.Label>
          <Form.Select aria-label="Default select example" value={category} onChange={(e)=>setCategory(e.target.value)}>
            {
              categories.map((category)=> <option key={category.id} value={category.id}>{category.name}</option>)
            }
            {/* <option value="Coffee">Coffee</option>
            <option value="Tea">Tea</option>
            <option value="Milk Tea">Milk Tea</option>
            <option value="Ice Blended">Ice Blended</option>
            <option value="SoftDrink">SoftDrink</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Giá</Form.Label>
          <Form.Control min={1000} type="number" placeholder="Nhập giá" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Giới thiệu sản phẩm</Form.Label>
          <Form.Control type="text" as="textarea" rows={5} value={desc} onChange={(e)=>setDesc(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Hình ảnh</Form.Label>
          <>
            <img className='image-form form-control' src={photo} onClick={openFileDialog} style={{padding: "0"}}/> 
            <Form className='image-form form-control'  style={{ display: "none" }} >
              <input ref={imageFormControl} type="file" className='image-form--input' onChange={changeHandler}/>
            </Form>
          </>
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

export default EditDrinkModal