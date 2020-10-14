import React from 'react'
import './ActiveQuiz.css'
import AnswersList from '../AnswersList/AnswersList'

const ActiveQuiz = (props) => {
  return (
    <div className="ActiveQuiz">
      <p className="Question">
        <strong>{props.answerNumber}. </strong>
        <span>{props.question}</span>
        <small>
          {props.answerNumber} из {props.quizLength}
        </small>
      </p>

      <AnswersList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        state={props.state}
      />
    </div>
  )
}

export default ActiveQuiz
