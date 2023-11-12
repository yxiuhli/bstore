import React, { useEffect, useState } from 'react'
import useDatabase from '../../hooks/useDatabase'

const FoodInOrderItem = ({item}) => {
  const {drinks} = useDatabase()
  const [drink, setDrink] = useState({})

  useEffect(()=>{
    drinks.map((d)=>d.id === item.drink?setDrink(d):<></>)
  }, [drinks, item])

  return (
    <tr>
      <td>{drink.name}</td>
      <td className='text-center'>{item.quantity}</td>
      <td>{drink.price?.toLocaleString()} đ</td>
      <td>{(drink.price * item.quantity)?.toLocaleString()} đ</td>
      <td>{item.note}</td>
    </tr>
  )
}

export default FoodInOrderItem