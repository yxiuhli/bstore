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

const CategoryPage = () => {

  const {categories}  = useDatabase()

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
        <Row className="my-auto ms-5">
          <p id="p1">Đầy đủ các danh mục</p>
          <p id="p2">cho bạn lựa chọn</p>
          <p id="p3">
            Mỗi một loại thức uống sẽ cho bạn những trải nghiệm mới mẻ khác
            nhau.
          </p>
          <Col>
            <Link to="category-section" spy={true} smooth={true} duration={200}>
              <Button Button className="btn-default get">
                Xem ngay <i class="fas fa-long-arrow-down" id="arrowGet"></i>
              </Button>
            </Link>
            
          </Col>
        </Row>
      </Container>
      
      <Container className="mt-4 mb-5">
      <p
        id="p4"
      >
        Danh mục thức uống
      </p>
        <Row className="mt-3 justify-content-around" name="category-section">
          {
            categories.map((category)=><Col xs={5} md={5} lg={4} xl={3} className="m-2 m-sm-1" key={category.id}>
            <CategoryItem id={category.id} src={category.photo} text={category.name}/>
          </Col>)
          }
          {/* <Col className="col-md-3">
            <CategoryItem src={s1} alt="s1" text="Coffee" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s2} alt="s1" text="Tea" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s3} alt="s1" text="Ice Blended" />
          </Col> */}
        </Row>

        {/* <Row className="mt-3 justify-content-md-around">
          <Col className="col-md-3">
            <CategoryItem src={s4} alt="s1" text="Chocolate" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s5} alt="s1" text="Fruit Juice" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s6} alt="s1" text="Milk Tea" />
          </Col>
        </Row>

        <Row className="mt-3 justify-content-md-around">
          <Col className="col-md-3">
            <CategoryItem src={s7} alt="s1" text="Cocktail" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s8} alt="s1" text="Shakes" />
          </Col>
          <Col className="col-md-3">
            <CategoryItem src={s9} alt="s1" text="Soft Drink" />
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default CategoryPage;
