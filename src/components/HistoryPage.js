import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { animateScroll as scroll } from 'react-scroll';
import useAuth from "../hooks/useAuth";
import useDatabase from '../hooks/useDatabase';
import background from "../img/ContactPage/backgroudContact.png";
import DetailButton from './admin/DetailButton';
import OrderHistoryItem from './OrderHistoryItem';

const HistoryPage = () => {
  const {orders, foodInOrder} = useDatabase()
  const {auth} = useAuth()
  const navigate = useNavigate()

  const [myOrder, setMyOrder] = useState([])

  useEffect(()=>{
    setMyOrder(
      orders.filter((o)=>o.user === auth?.user?.id)
    )
  }, [orders, auth])

  return (
    <div className='mb-5'>
        <Container fluid 
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: "100vh",
          backgroundSize:"100% 100%",
          display: "flex"
        }}> {/* <!------Introducer--> */}
            <Row className='my-auto ms-5'>
            <p id="p1">Lời cảm ơn từ IROSAS</p>
            <p id="p2">Chân thành cảm ơn quý khách</p>
            <p id="p3">IROSAS xin chúc quý khách một ngày tốt lành nhất.</p>
            </Row>  
            
        </Container> {/* <!-----End Introducer--> */}

        <Container className="mt-4" > {/* <!-------Body--> */}
          <p
            id="p4"
          >
            Lịch sử mua hàng
          </p>

      {
        myOrder.length > 0 ? <Table responsive="lg" className='mt-3'>
        <thead>
          <tr className='bg-white' style={{ verticalAlign:"middle" }}>
            <th>#</th>
            <th>Số lượng sản phẩm</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {
            myOrder.map((order)=><OrderHistoryItem item={order}/>)
          }
        </tbody>
      </Table> : <div className='text-center justify-content-center align-items-center d-flex flex-column' style={{ height: "500px" }}><h3>Không có lịch sử mua hàng</h3><span>Bạn là khách hàng mới sao ?</span> <p>Hãy đặt hàng ngay nào!</p>
      <Button variant="primary" onClick={()=>{
        scroll.scrollToTop({
          duration: 100,
          delay: 0,
        })
        navigate("/menu")

      }}>Đặt ngay</Button></div>
      }
      
  </Container>
    </div>
  )
}

export default HistoryPage