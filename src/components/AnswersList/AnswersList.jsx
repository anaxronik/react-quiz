import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'

import './AnswersList.css'

export default (props) => {
  return (
    <ul className="AnswersList">
      {props.answers.map((answer, index) => (
        <AnswerItem
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[answer.id] : null}
        />
      ))}
    </ul>
  )
}
