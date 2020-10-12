import axiosQuiz from '../../axios/axios-quiz'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
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
