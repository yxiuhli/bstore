import React, { useEffect, useMemo, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import AccountItem from './AccountItem'
import AddAccountModal from './AddAccountModal'
import AdminPagination from './AdminPagination'
import DropDownButton from './DropDownButton'

let PageSize = 10;

const AccountTable = () => {
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showManagerModal, setShowManagerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {accounts, setAccounts} = useAuth();
  const [accountsData, setAccountsData] = useState([])
  useEffect(()=>{
    setAccountsData(accounts.filter((account)=> account.type !== 3))
  }, [accounts])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return accountsData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, accountsData]);

  const handleAddAccount = (newAccount) =>{
    setAccounts([...accounts, newAccount])
  }

  const handleEditAccount = (newAccount)=>{
    setAccounts(
      accounts.map((acc)=>
        acc.id === newAccount.id ? newAccount: acc
      )
    )

  }

  const handleDeleteAccount = (id)=>{
    setAccounts(
      accounts.filter((acc) => acc.id !== id)
    )
  }


  const openStaffModal = () =>{
    setShowStaffModal(true)
  }

  const openManagerModal = () =>{
    setShowManagerModal(true)
  }



  return (
    <Container className='mt-5 d-flex flex-column' fluid>
      <DropDownButton openStaffModal={openStaffModal} openManagerModal={openManagerModal} startLogo={<AiOutlinePlus className='me-2'/>} text="Thêm tài khoản" className="d-flex ms-auto me-2"/>
      <Table responsive="lg" className='mt-3'>
      <thead>
        <tr className='bg-white' style={{ verticalAlign:"middle" }}>
          <th>Tên</th>
          <th>Email</th>
          <th>Địa chỉ</th>
          <th>Chức vụ</th>
          <th>Số điện thoại</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      {accountsData.length > 0 ?

      <tbody>
        <>
          {currentTableData.map((acc)=>(
            <AccountItem key={acc.id} account={acc} editAccount={handleEditAccount} deleteAccount={handleDeleteAccount}/>
          ))}
        </>
      </tbody> : <h2>No Account to show</h2>
    } 
    </Table>
    <AdminPagination className="d-flex ms-auto me-2  mt-5"
      currentPage={currentPage}
      totalCount={accountsData.length}
      pageSize={PageSize}
      onPageChange={page=>setCurrentPage(page)}/>
    <AddAccountModal show={showStaffModal} onHide={()=>setShowStaffModal(false)} addAccount={handleAddAccount} type={2}/>
    <AddAccountModal show={showManagerModal} onHide={()=>setShowManagerModal(false)} addAccount={handleAddAccount} type={1}/>
  </Container>
  )
}

export default AccountTable