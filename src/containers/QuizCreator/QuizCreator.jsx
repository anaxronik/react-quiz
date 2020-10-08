import React, { Component } from 'react'
import axiosQuiz from '../../axios/axios-quiz'

import Button from '../../components/ui/Button/Button'
import Input from '../../components/ui/Input/Input'
import Select from '../../components/ui/Select/Select'
import { createControl, validate, validateForm } from '../../form/formFramework'

import classes from './QuizCreator.module.css'

const createOptionControl = (number) => {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Ответ не может быть пустым',
      id: number,
    },
    { required: true }
  )
}

const createFormControls = () => {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  addQuestionHandler = (event) => {
    event.preventDefault()

    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const { option1, option2, option3, option4 } = this.state.formControls

    const questionItem = {
      question: this.state.formControls.question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  createQuizHandler = async (event) => {
    event.preventDefault()
    try {
      await axiosQuiz.post('/quizes.json', this.state.quiz)
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      })
    } catch (err) {
      console.log('Erorr in post request', err)
    }
  }

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    })
  }

  selectChangeHandler = (event) => {
    this.setState({ rightAnswerId: +event.target.value })
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <React.Fragment key={index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={true}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание нового теста</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault()
            }}
          >
            {this.renderControls()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
              ]}
            />
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}