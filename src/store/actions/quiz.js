import axiosQuiz from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZE_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ,
} from './actionTypes'

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart)
    try {
      const response = await axiosQuiz.get('/quizes.json')
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        const name = response.data[key][0].question
        quizes.push({ id: key, name: `Тест: ${name}` })
      })
      //   this.setState({ quizes, loading: false })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (err) {
      console.log('Error in get response', err)
      dispatch(fetchQuizesError)
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  }
}

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())

    try {
      const response = await axiosQuiz.get(`/quizes/${quizId}.json`)
      let quiz = response.data
      dispatch(fetchQuizSuccess(quiz))
    } catch (err) {
      dispatch(fetchQuizesError(err))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZE_SUCCESS,
    quiz,
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  }
}

export function quizAnswerClick(answerID) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'succes') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerID) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      dispatch(quizSetState({ [answerID]: 'success' }, results))

      const timeout = window.setTimeout(() => {
        if (state.activeQuestion + 1 === state.quiz.length) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({ [answerID]: 'error' }, results))
    }
  }
}
