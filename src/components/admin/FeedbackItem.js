import React from 'react'
import useAuth from '../../hooks/useAuth'
import useDatabase from '../../hooks/useDatabase'
import DetailButton from './DetailButton'

const FeedbackItem = ({feedback}) => {
  const {drinks} = useDatabase()
  const { accounts } = useAuth()

  return (
    <tr style={{ verticalAlign:"middle", backgroundColor: "white" }}>
          <td>{
              accounts.map((acc)=>acc.id===feedback.user?acc.name:"")
            }</td>
          <td>{
            drinks.map((drink)=>drink.id ===feedback.drink?drink.name:<></>)
          }</td>
          <td>{feedback.comment}</td>
          <td>{feedback.rating}/5</td>
          <td>
            <DetailButton href={`${feedback.id}`} />
          </td>
    </tr>
  )
}

export default FeedbackItem