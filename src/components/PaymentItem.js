import React, { useEffect, useState } from 'react'
import useDatabase from '../hooks/useDatabase'

const PaymentItem = ({item}) => {
  const {drinks} = useDatabase()
  const [drink, setDrink] = useState({})

  useEffect(()=>{
    drinks.map((d)=>d.id === item.drink?setDrink(d):<></>)
  }, [drinks, item])

  return (
    <li class="list-group-item d-flex justify-content-between lh-sm" style={{ backgroundColor: "#DFD3C3" }}>
      <div>
        <h6 class="my-0">{drink.name} x {item.quantity}</h6>
        <small class="text-muted">{item.note===""?"Không":item.note}</small>
      </div>
      <span>{(drink.price * item.quantity).toLocaleString()}đ</span>
    </li>
  )
}

export default PaymentItem