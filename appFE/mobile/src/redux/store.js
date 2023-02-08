import { createStore } from 'redux'
import combineReducer from './reducers/index'

export const store = createStore(combineReducer)

// const initialState = {
//   token: "",
//   articleData: [],
// }