import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import {
  FaMapMarkerAlt, FaPhone, FaRegEnvelope
} from 'react-icons/fa';
import background from "../img/ContactPage/backgroudContact.png";
import '../index.css';
export default function ContactsPage() {
  return (<Container fluid style={
      {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:"100% 100%",
        width: '100%',
        height: '100vh',
        display: "flex"
      }} >

<Row className='my-auto ms-5 w-3/5'>
            
            
            <Col>
            <div className='intro'>
            <p id="p2">ABOUT US</p>
            <p id="p3"> 
            Bạn là bàn đạp để chúng tôi phát triển. Với mục tiêu đem lại trải nghiệm tốt nhất cho khách hàng, B-Store luôn sẵn sàng phục vụ những sản phẩm tốt nhất cho mọi người!!
            <hr/><br/>Thông tin liên hệ:
            <ul>
              <li>Email: admin@gmail.com</li>
              <li>SDT: (917) 112-245</li>
              <li>Địa chỉ: Quận 1, TP. HCM</li>
            </ul>
            
            
            
          </p>
          <p id="p3"> 
          
          </p>
            </div>
            </Col>
            </Row>
    
  </Container>
  );
}