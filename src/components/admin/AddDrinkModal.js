import React, { useRef, useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { BsCameraFill } from 'react-icons/bs'
import Swal from 'sweetalert2'
import { v4 } from 'uuid'
import useDatabase from '../../hooks/useDatabase'


const AddDrinkModal = (props) => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState(1)
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState(1000)
  const [photo, setPhoto] = useState(null)
  const imageFormControl = useRef()
  const { categories } = useDatabase()

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

  const onSubmit = (e)=>{
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
    const id = v4()
    props.addDrink({id, name, category: +category, price: +price, photo, description: desc})
    console.log({id, name, category: +category, price: +price, photo, description: desc})

    setName("")
    setCategory(1)
    setPrice(1000)
    setDesc("")
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
        text: "Tạo thức uống thành công",
      }
    )
  }

  const openFileDialog = (e) =>{
    e.preventDefault()
    imageFormControl.current.click()
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
          Thêm thức uống
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} />
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
        <Form.Group className="mb-3" controlId="formBasicPrice" >
          <Form.Label>Giá</Form.Label>
          <Form.Control min={1000} type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDesc" >
          <Form.Label>Giới thiệu sản phẩm</Form.Label>
          <Form.Control type="text" as="textarea" rows={5} value={desc} onChange={(e)=>setDesc(e.target.value)}/>
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

export default AddDrinkModal