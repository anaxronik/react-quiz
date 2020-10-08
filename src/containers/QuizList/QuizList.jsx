import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axiosQuiz from '../../axios/axios-quiz'
import Loader from '../../components/ui/Loader/Loader'

import classes from './QuizList.module.css'
export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  }

  async componentDidMount() {
    try {
      const response = await axiosQuiz.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        const name = response.data[key][0].question
        quizes.push({ id: key, name: `Тест: ${name}` })
      })
      this.setState({ quizes, loading: false })
    } catch (err) {
      console.log('Error in get response', err)
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {this.state.loading ? (
            <Loader />
          ) : (
            <ul>
              {this.state.quizes.map((quiz, index) => (
                <li key={index}>
                  <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
