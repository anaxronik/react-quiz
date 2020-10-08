import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../ui/Button/Button'

import './FinishedQuiz.css'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={'FinishedQuiz'}>
      <ul>
        {props.quiz.map((q, index) => {
          let classNames = [
            'fa',
            props.results[q.id] === 'error'
              ? 'fa-times error'
              : 'fa-check success',
          ]
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {q.question}
              <i className={classNames.join(' ')} />
            </li>
          )
        })}
      </ul>
      <p>
        Правильно {successCount} из {props.quiz.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to="/">
          <Button type="success">перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz
