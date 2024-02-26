import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  FaMapMarkerAlt, FaPhone, FaRegEnvelope
} from 'react-icons/fa'

const Footer = () => {
  return (
    <Container className='footer' fluid>
      
      <Container >
        <Row className='ms-auto ms-sm-2 ms-xs-2'>
          <Col className="d-flex align-items-center text-2xl">
            <h2 style={{ color:"#fff" }}>B-Store</h2>
            <hr className='solid me-2 ml-4'/>
          </Col>
          <Col md={5} sm={12} xs={12} className='d-flex footer-row'>
              <FaRegEnvelope style={{ color:"white", marginRight:"10px" }}/>
              <a href="mailto:admin@gmail.com" className="nav-link d-inline-block text-white">
                admin@gmail.com
              </a>
        </Col>
        <Col md={3} sm={12} xs={12} className='d-flex footer-row'>
          <FaPhone style={{ color:"white", marginRight:"10px" }}/>
          (917) 112-245
        </Col>
        <Col md={4} sm={12} xs={12} className=' d-flex footer-row'>
          <FaMapMarkerAlt style={{ color:"white", marginRight:"10px" }}/>
          Quận 1, TP. HCM
        </Col>
        </Row>
      </Container>
    </Container>
  )
}

// (
//   <Box>
//     <h1 style={{ color: "green", 
//                  textAlign: "center", 
//                  marginTop: "-50px" }}>
//       GeeksforGeeks: A Computer Science Portal for Geeks
//     </h1>
//     <Container>
//       <Row>
//         <Column>
//           <Heading>About Us</Heading>
//           <FooterLink href="#">Aim</FooterLink>
//           <FooterLink href="#">Vision</FooterLink>
//           <FooterLink href="#">Testimonials</FooterLink>
//         </Column>
//         <Column>
//           <Heading>Services</Heading>
//           <FooterLink href="#">Writing</FooterLink>
//           <FooterLink href="#">Internships</FooterLink>
//           <FooterLink href="#">Coding</FooterLink>
//           <FooterLink href="#">Teaching</FooterLink>
//         </Column>
//         <Column>
//           <Heading>Contact Us</Heading>
//           <FooterLink href="#">Uttar Pradesh</FooterLink>
//           <FooterLink href="#">Ahemdabad</FooterLink>
//           <FooterLink href="#">Indore</FooterLink>
//           <FooterLink href="#">Mumbai</FooterLink>
//         </Column>
//         <Column>
//           <Heading>Social Media</Heading>
//           <FooterLink href="#">
//             <i className="fab fa-facebook-f">
//               <span style={{ marginLeft: "10px" }}>
//                 Facebook
//               </span>
//             </i>
//           </FooterLink>
//           <FooterLink href="#">
//             <i className="fab fa-instagram">
//               <span style={{ marginLeft: "10px" }}>
//                 Instagram
//               </span>
//             </i>
//           </FooterLink>
//           <FooterLink href="#">
//             <i className="fab fa-twitter">
//               <span style={{ marginLeft: "10px" }}>
//                 Twitter
//               </span>
//             </i>
//           </FooterLink>
//           <FooterLink href="#">
//             <i className="fab fa-youtube">
//               <span style={{ marginLeft: "10px" }}>
//                 Youtube
//               </span>
//             </i>
//           </FooterLink>
//         </Column>
//       </Row>
//     </Container>
//   </Box>
// );

export default Footer