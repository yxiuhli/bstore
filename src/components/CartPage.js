import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { animateScroll as scroll } from 'react-scroll';
import useDatabase from "../hooks/useDatabase";
import background from "../img/ContactPage/backgroudContact.png";
import CartItem from "./CartItem";
import Payment from "./Payment";

const CartPage = () => {
  const {cart, drinks} = useDatabase()
  const [paymentModal, setShowPaymentModal] = useState(false);
  const [sum, setSum] = useState(0)
  const s = useRef(0)
  const navigate = useNavigate()


  useEffect(()=>{
    s.current = 0
    cart.map((c)=>drinks.map((drink)=>drink.id === c.drink?s.current+=c.quantity*drink.price:<></>))
    setSum(s.current)
  }, [cart, drinks])


  return (
    <div>
      <Container fluid
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: "100vh",
          backgroundSize:"100% 100%",
          display: "flex"
        }}> {/* <!------Introducer --> */}
          <Row className='my-auto ms-5'>
            <p id="p1">Thưởng thức hương vị</p> 
            <p id="p2">nguyên chất</p>
            <p id="p3">Sự hài lòng của bạn là niềm động lực của chúng tôi !</p>
            </Row>

        </Container> {/* <!-----End Introducer--> */}

        <Container className='mt-4'> {/* <!----Body Part--> */}
          <span id="p2">Giỏ hàng</span>
          {
            cart.length > 0 ? <Table responsive className='mt-3' >
            <thead className='border bg-white'>
              <tr style={{ verticalAlign:"middle", alignItems: "center" }}>
                <th colSpan={2}>Sản phẩm</th>
                <th className='text-center'>Đơn giá</th>
                <th className='text-center'>Số lượng</th>
                <th className='text-center'>Số tiền</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {
                cart.map((c)=><CartItem c={c}/>)
              }
              <tr className="border-white" style={{ verticalAlign:"middle" }}>
                <td></td>
                <td></td>
                <td></td>
                <td className='ms-3 text-center'><h4><strong>Tổng cộng:</strong></h4></td>
                <td className='ms-3 text-center' style={{ color: "#7d6e53" }}><h5><strong>{sum.toLocaleString()} đ</strong></h5></td>
                <td><Button className="w-100" variant="primary" onClick={()=>setShowPaymentModal(true)}>Thanh toán</Button></td>

              </tr>
            </tbody>
          </Table> : <div className='text-center justify-content-center align-items-center d-flex flex-column' style={{ height: "500px" }}><h3>Giỏ hàng trống</h3><p>Hãy thêm thức uống vào giỏ hàng của bạn nào</p>
          <Button variant="primary" onClick={()=>{
            scroll.scrollToTop({
              duration: 100,
              delay: 0,
            })
            navigate("/menu")

          }}>Thêm ngay</Button></div>
          }
        </Container>
    <Payment show={paymentModal} onHide={()=>setShowPaymentModal(false)} total={sum}/>
    </div>
  );
}
export default CartPage

//====================================================================
// const CartPage = () => {
//   return (
//     <div>CartPage</div>
//   )
// }

// export default CartPage