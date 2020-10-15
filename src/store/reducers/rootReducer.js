import { combineReducers } from 'redux'
import authReducer from './authReducer'
import createReducer from './createReducer'
import quizReducer from './quiz'

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
})
