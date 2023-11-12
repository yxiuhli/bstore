import React, { useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import PrimaryButton from './../PrimaryButton'

const ProfilePage = (props) => {
  const {auth, setAuth, accounts, setAccounts} = useAuth();
  const navigate = useNavigate()
  const email = auth?.user?.email || ""
  const [name, setName] = useState(auth?.user?.name || "")
  const [phone, setPhone] = useState(auth?.user?.phone || "")
  const [address, setAddress] = useState(auth?.user?.address || "")
  const [photo, setPhoto] = useState(auth?.user?.photo || null)
  const imageFormControl = useRef();


  const onSubmit = (e) =>{
    e.preventDefault()

    setAuth({ user: {...auth?.user, name: name, phone: phone, address: address, photo: photo}})
    setAccounts(
      accounts.map((acc)=>acc.id === auth?.user?.id ? auth?.user : acc)
    )

    Swal.mixin(
      {
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }
    ).fire({
      icon: "success",
      text: "Cập nhật thông tin thành công"
    })

    navigate(-1)
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

  const openFileDialog = (e) =>{
    e.preventDefault()
    imageFormControl.current.click()
  }

  return (
    <div className='full-height' style={{ backgroundImage: `url(/images/profile.jpg)`, backgroundSize:"cover" }}>
      <div className='profile-title ms-auto me-auto d-flex'>
        Thông tin cá nhân
      </div>
      <Container style={{ marginTop:"50px" }}>
        <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <Row className="justify-content-center">
            <img className="profile-pic p-0" src={photo?photo:"images/profile_pic.jpg"}  onClick={openFileDialog} alt=""/>
              <PrimaryButton style={{ width:"350px", marginTop:"20px", padding:"10px 15px" }} text="Chỉnh sửa ảnh đại diện" onClick={openFileDialog}/>
              <Form className='image-form form-control'  style={{ display: "none" }} >
                <input ref={imageFormControl} type="file" className='image-form--input' onChange={changeHandler}/>
              </Form>
            </Row>
          </Col>
          <Col>
            <Row className="justify-content-center">
              <Card className='h-100 profile-card'>
                <Card.Body>
                  <Row className='gutters'>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 class="mb-3">Thông tin cá nhân</h4>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group mb-3">
                      <label for="fullName">Họ và tên</label>
                      <input type="text" class="form-control" name="fullName" id="fullName" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group mb-3">
                      <label for="eMail">Email</label>
                      <input type="email" class="form-control" name="email" id="eMail" disabled value={email}/>
                    </div>
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group">
                      <label for="phone">Số điện thoại</label>
                      <input type="tel" class="form-control" name="phone" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    </div>
                  </div>
                  {/* <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="username">Tên tài khoản</label>
                      <input type="text" class="form-control" name="username" id="username" value=""/>
                    </div>
                  </div> */}
                  </Row>
                  <Row className="gutters">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <h4 className='mt-3'>Địa chỉ</h4>
                    </div>
                    <Form.Control as="textarea" rows={5} name="address" placeholder="Nhập địa chỉ" value={address} onChange={(e)=>setAddress(e.target.value)} />
                  </Row>
                  <Row className='gutters' style={{ marginTop:"20px" }}>
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="d-flex">
                      <Button variant='secondary' className='ms-auto me-2' onClick={()=>{
                        navigate(-1)
                      }}>Cancel</Button>
                      <Button variant='primary' type="submit">Update</Button>
                    </div>
                  </div>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
        </Form>
      </Container>
    </div>
  )
}

export default ProfilePage