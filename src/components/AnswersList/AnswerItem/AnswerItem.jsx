import React from 'react'

import './AnswerItem.css'

export default (props) => {
  let className = 'AnswerItem'
  if (props.state) {
    className += ` ${props.state}`
  }

  return (
    <li
      className={className}
      onClick={() => {
        props.onAnswerClick(props.answer.id)
      }}
    >
      {props.answer.text}
    </li>
  )
}
