import React, { useMemo, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import useDatabase from '../../hooks/useDatabase'
import AddButton from './AddButton'
import AddCategoryModal from './AddCategoryModal'
import AdminPagination from './AdminPagination'
import CategoryItem from './CategoryItem'

let PageSize = 5;


const CategoryTable = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const {categories, setCategories} = useDatabase()
  
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return categories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, categories]);


  const openCategoryModal = () =>{
    setShowCategoryModal(true)
  }

  const handleAddCategory = (category) =>{
    setCategories([...categories, category])
  }

  const handleEditCategory = (newCategory)=>{
    setCategories(
      categories.map((category)=> category.id === newCategory.id ? newCategory : category)
    )
  }

  const handleDeleteCategory = (id) =>{
    setCategories(
      categories.filter((category)=> id !== category.id)
    )
  }

  
  return (
    <Container className='mt-5 d-flex flex-column' fluid>
      <AddButton onClick={openCategoryModal} text="Thêm danh mục" className="d-flex ms-auto me-2" showDropdown={false}/>
      <Table responsive="lg" className='mt-3'>
      <thead>
        <tr className='bg-white' style={{ verticalAlign:"middle" }}>
          <th>Tên</th>
          <th>Hình ảnh</th>
          <th>Số lượng</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {
          categories.length > 0 ? 
            currentTableData.map((category)=> <CategoryItem key={category.id} category={category} editCategory={handleEditCategory} deleteCategory={handleDeleteCategory}/>)
          : <h4>No Category to show</h4>
        }
      </tbody>
    </Table>
    <AdminPagination className="d-flex ms-auto me-2 mt-5"
          currentPage={currentPage}
          totalCount={categories.length}
          pageSize={PageSize}
          onPageChange={page=>setCurrentPage(page)}/>
    <AddCategoryModal addCategory={handleAddCategory} show={showCategoryModal} onHide={()=>setShowCategoryModal(false)}/>
    </Container>
  )
}

export default CategoryTable