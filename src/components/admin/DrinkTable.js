import React, { useMemo, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import useDatabase from '../../hooks/useDatabase'
import AddButton from './AddButton'
import AddDrinkModal from './AddDrinkModal'
import AdminPagination from './AdminPagination'
import DrinkItem from './DrinkItem'

let PageSize = 5;

const DrinkTable = () => {
  const [showDrinkModal, setShowDrinkModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {drinks, setDrinks} = useDatabase();

  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return drinks.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, drinks]);

  const openDrinkModal = () =>{
    setShowDrinkModal(true)
  }

  const handleAddDrink = (drink) =>{
    setDrinks([...drinks, drink])
  }

  const handleEditDrink = (newDrink)=>{
    console.log(newDrink)
    setDrinks(
      drinks.map((drink) => drink.id === newDrink.id ? newDrink : drink)
    )
    console.log(drinks)

  }

  const handleDeleteDrink = (id)=>{
    setDrinks(
      drinks.filter((drink) => id !== drink.id)
    )
  }

  return (
    <Container className='mt-5 d-flex flex-column' fluid>
      <AddButton onClick={openDrinkModal} text="Thêm thức uống" className="d-flex ms-auto me-2" showDropdown={false}/>
      <Table responsive="lg" className='mt-3'>
        <thead>
          <tr className='bg-white' style={{ verticalAlign:"middle" }}>
            <th>Tên</th>
            <th>Hình ảnh</th>
            <th style={{ width: "50%" }}>Giới thiệu</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {
            drinks.length > 0 ? currentTableData.map((drink)=>
            <DrinkItem key={drink.id} drink={drink} editDrink={handleEditDrink} deleteDrink={handleDeleteDrink}/>
          ) : <h4>No Drink to show</h4>
          }
        </tbody>
      </Table>
      <AdminPagination className="d-flex ms-auto me-2  mt-5"
      currentPage={currentPage}
      totalCount={drinks.length}
      pageSize={PageSize}
      onPageChange={page=>setCurrentPage(page)}/>
      <AddDrinkModal show={showDrinkModal} onHide={()=>setShowDrinkModal(false)}  addDrink={handleAddDrink}/>
    </Container>
  )
}

export default DrinkTable