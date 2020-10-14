import { combineReducers } from 'redux'
import createReducer from './createReducer'
import quizReducer from './quiz'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
})
