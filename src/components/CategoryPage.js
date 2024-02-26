import React from "react";
import s1 from "../img/CategoryPage/1.jpg";
import s2 from "../img/CategoryPage/2.jpg";
import s3 from "../img/CategoryPage/3.jpg";
import s4 from "../img/CategoryPage/4.jpg";
import s5 from "../img/CategoryPage/5.jpg";
import s6 from "../img/CategoryPage/6.jpg";
import s7 from "../img/CategoryPage/7.jpg";
import s8 from "../img/CategoryPage/8.jpg";
import s9 from "../img/CategoryPage/9.jpg";
import slider from "../img/CategoryPage/slider.jpg";
import silderdanhmuc from "../img/CategoryPage/sliderdanhmuc.jpg";
import background from "../img/ContactPage/backgroudContact.png";
import MyNav from "./MyNav";

import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-scroll";
import useDatabase from "../hooks/useDatabase";
import CategoryItem from "./CategoryItem";
import Footer from "./Footer";
import { useCategory } from "../context/CategoryContext";
import Spinner from "./Spinner";

const CategoryPage = () => {

  const {categories}  = useDatabase()

  if (!categories) {
    return (
      <>
          <Spinner size={100} loading />
      </>
    );
  }
  return (
    <div>
      <Container
        fluid
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: "100vh",
          backgroundSize:"100% 100%",
          display: "flex"
        }}
      >
        <Row className='my-auto ms-5 max-w-1/2 w-fit'>
            
            
            <Col>
            <div className='intro'>
            <p id="p2">DANH MỤC SẢN PHẨM</p>
            </div>
            </Col>
            </Row>
      </Container>
      
      <Container className="mt-4 mb-5">
      <p
        id="p4"
      >
        Danh mục
      </p>
        <Row className="mt-3 justify-content-around" name="category-section">
          {
            categories.map((category)=><Col xs={5} md={5} lg={4} xl={3} className="m-2 m-sm-1 " key={category.id}>
            <CategoryItem id={category.id} src={category.photo} text={category.name}/>
          </Col>)
          }
          
        </Row> 
      </Container>
    </div>
  );
};

export default CategoryPage;
