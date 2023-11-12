import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Link, scroller } from 'react-scroll';
import useDatabase from '../hooks/useDatabase';
import useQuery from '../hooks/useQuery';
import background from "../img/ContactPage/backgroudContact.png";
import AdminPagination from './admin/AdminPagination';
import MenuItem from './MenuItem';
import SearchBox from './SearchBox';

const PageSize = 12;

const MenuPage = () => {
  const query = useQuery()
  const navigate = useNavigate()
  const {categories, drinks} = useDatabase()
  const [filterData, setFilterData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(()=>{
    const q = query.get("q") || ""
    const category = +query.get("category") || 0
    category === 0 || category === null ?
    setFilterData(
      drinks.filter((drink)=> drink.name.toLowerCase().includes(q))
    )
    :
    setFilterData(
      drinks.filter((drink)=> drink.name.toLowerCase().includes(q) && drink.category === category )
    ) 
    
    q && q !== "" ?
      scroller.scrollTo('menu-section', {
        duration: 200,
        smooth: true,
        spy: true
      })
      : <></>
    category && category !== 0 ?
      scroller.scrollTo('menu-section', {
        duration: 200,
        smooth: true,
        spy: true
      })
      : <></>
  }, [query, drinks])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filterData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filterData]);



  useEffect(()=>{
    console.log(filterData)
  }, [filterData])

  const handleCategoryChange = (e) =>{
    console.log(e.target.value)
    console.log(query.get("category"))
    e.target.value === query.get("category")? <></> : e.target.value=== 0? <></> :
    navigate(`/menu?q=${query.get("q")||""}&category=${e.target.value}`)
  }


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
            <p id="p1">Thưởng thức hương vị</p>
            <p id="p2">nguyên chất</p>
            <p id="p3">"Tràn đầy năng lượng mỗi ngày cùng thức uống tuyệt vời"</p>
            <Col>
              <Link to='menu-section' spy={true} smooth={true} duration={200}><Button className="btn-default get"> Xem ngay <i class="fas fa-long-arrow-down" id="arrowGet"></i></Button></Link> 
            </Col>
            </Row>  
            
        </Container> {/* <!-----End Introducer--> */}

        <Container className="mt-4"> {/* <!-------Body--> */}
                <Col className="d-flex align-items-center">  {/* <!-----headline-menu-product--> */}
                    <span id="p4">Thực đơn</span>
                    <SearchBox prevSearch={query.get("q") || ""}/>
                    <div className="btn-group align-items-center d-flex">
                      <span className='p-0'>Danh mục:</span>
                      <Form.Group controlId="formStatus">
                      <Form.Select aria-label="Default select example" className='ms-4' value={+query.get("category")} onChange={handleCategoryChange}>
                          <option value={0}>Tất cả</option>
                          {
                            categories.map((cate)=><option key={cate.id} value={cate.id}>{cate.name}</option>)
                          }
                        </Form.Select>
                      </Form.Group>
                    </div>  {/* <!-----End headline-menu-product--> */}
                </Col>
                <Row name="menu-section" className="mt-3" style={{ justifyContent: "space-around" }}> 
                {/* <!------Menu Product--> */}
                    {
                      currentTableData.length > 0 ? 
                      currentTableData.map((drink)=>(
                        <Col md={5} lg={4} xl={3} xs={5}  className="m-2" key={drink.id}>
                        <MenuItem id={drink.id} img={drink.photo} name={drink.name} price={drink.price}/>
                      </Col> 
                      )) : <div className='text-center justify-content-center align-items-center d-flex flex-column' style={{ height: "500px" }}> <h2 className='text-center mt-5'>Không sản phầm nào phù hợp với yêu cầu của bạn</h2></div>
                    }
                </Row>
                <Container className='d-flex'>
                  <AdminPagination className="d-flex ms-auto me-2 mt-5"
                    currentPage={currentPage}
                    totalCount={filterData.length}
                    pageSize={PageSize}
                    onPageChange={page=>setCurrentPage(page)}/>
                </Container>
                {/* <!-------End Menu Product--> */}
        </Container> {/* <!------End Body--> */}
        
            </div>
  )
}

export default MenuPage