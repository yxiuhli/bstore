import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import useDatabase from "../hooks/useDatabase";
import background from "../img/ContactPage/backgroudContact.png";
import MenuItem from './MenuItem';
import RecommendCategory from './RecommendCategory';


const HomePage = () => {
  const {drinks, categories} = useDatabase()
  const navigate = useNavigate()
  const reversed = [...drinks].reverse();


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
        }}> {/* <!------Introducer --> */}
          <Row className='my-auto ms-5'>
            <p id="p1">Thưởng thức hương vị</p>
            <p id="p2">nguyên chất</p>
            <p id="p3">"Tràn đầy năng lượng mỗi ngày cùng thức uống tuyệt vời"</p>
            <Col>
              <Button Button className="btn-default get" onClick={()=>navigate("/menu")}> Đặt ngay <i class="fas fa-long-arrow-right" id="arrowGet"></i></Button>
            </Col>
            </Row>

        </Container> {/* <!-----End Introducer--> */}

        <Container className='mt-4'> {/* <!----Body Part--> */}
            <Col className="d-flex align-items-center">  {/* <!-----headline-feature-product--> */}
                <span id="p4">Bán chạy nhất</span>
                <Button variant='outline-light' className="view ms-auto" onClick={()=>navigate("/menu")}>Xem thực đơn
                    <FaLongArrowAltRight className='me-2 ms-2'/>
                </Button> {/* <!-----End headline-feature-product--> */}
            </Col>
            
            <Row className='mt-3' style={{ justifyContent: "space-around"}}> {/* <!------Feature Product--> */}
                {
                  drinks.map((drink, idx)=>idx < 6? <Col md={5} lg={4} xl={3} xs={5}  className="m-2 m-sm-1" key={drink.id}>
                  <MenuItem id={drink.id} img={drink.photo} name={drink.name} price={drink.price}/>
                </Col>  : <></>)
                }
                {/* <Col className="col-3">
                  <MenuItem img="assets/image/blackcoffee.png" name="Black Coffee" price ="15.000đ" />
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/thaitea.png" name="Thai Tea" price="25.000đ"/>
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/strawberry.png" name="Strawberry Cocktail" price="39.000đ"/>
                </Col>  */}
            </Row>
            {/* <!------Feature Product--> */}
            {/* <Row className='mt-3' style={{ justifyContent: "space-around"}}> 
                <Col className="col-3">
                  <MenuItem img="assets/image/americano.png" name="Americano" price ="20.000đ" />
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/capuchino.png" name="Capuchino" price="22.000đ"/>
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/latte.png" name="Latte" price="19.000đ"/>
                </Col> 
            </Row> */}
             {/* <!-------End Feature--> */}

            <div className="mt-4">
                <span id="p4">Thức uống mới</span>
            </div>

            <Row  className='mt-3' style={{ justifyContent: "space-around"}}>
              {
                reversed.map((drink, idx) => idx < 6 ? <Col md={5} lg={4} xl={3} xs={5} className="m-2 m-sm-1" key={drink.id}>
                <MenuItem id={drink.id} img={drink.photo} name={drink.name} price={drink.price}/>
              </Col> : <></> )
              }
                {/* <Col className="col-3">
                  <MenuItem img="assets/image/icecoffee.png" name="Iced Milk Coffee" price ="15.000đ" />
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/gingerjuice.png" name="Hot ginger juice" price="29.000đ"/>
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/chocolate.png" name="Hot Chocolate" price="27.000đ"/>
                </Col>  */}
            </Row>
            {/* <!------New Product--> */}
            {/* <Row className='mt-3' style={{ justifyContent: "space-around"}}>           
                /* <Col className="col-3">
                  <MenuItem img="assets/image/orangejuice.png" name="Honey Orange Juice" price ="35.000đ" />
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/freshtea.png" name="Hot Fresh Tea" price="17.000đ"/>
                </Col>
                <Col className="col-3">
                  <MenuItem img="assets/image/matcha.png" name="Matcha Ice Blended" price="39.000đ"/>
                </Col> 
            </Row> */}
            {/* <!-------End New Product--> */}
            <Container fluid id="container-rcmd-cate">  {/* <!---Recommended Category--> */}
                <Col className="d-flex mt-4 align-items-center">  {/* <!-----headline-feature-product--> */}
                    <span id="p4">Danh mục thức uống</span>
                    <Button variant="outline-light" className='view-cate ms-auto ' onClick={()=>navigate("/category")}>Xem tất cả danh mục
                        <FaLongArrowAltRight />
                    </Button> {/* <!-----End headline-feature-product--> */}
                </Col>
                <hr class="hor-solid" />
                <Row className='mt-5' style={{ justifyContent: "space-around"}}>
                  {
                    categories.map((cate, idx)=>idx < 4 ? 
                    <Col key={cate.id} xs={4} sm={5} md={5} lg={4} xl={2} className="text-center m-2">
                      <RecommendCategory id={cate.id} image={cate.photo} name={cate.name}/>
                    </Col>  : <></> )
                  }
                  {/* <RecommendCategory image="assets/image/category/coffee.png" name="Coffee"/>
                  <RecommendCategory image="assets/image/category/tea.png" name="Tea"/>
                  <RecommendCategory image="assets/image/category/fruitjuice.png" name="Fruit Juice"/>
                  <RecommendCategory image="assets/image/category/cocktail.png" name="Cocktail"/> */}
                </Row>
            </Container>  {/* <!---------End Recommended Category--> */}
        </Container> {/* <!-----End Body Part--> */}
      </div>
  )
}

export default HomePage