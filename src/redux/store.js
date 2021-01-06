import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import combineReducers from './reducers/index'

const store = createStore(
  combineReducers,
  compose(applyMiddleware(thunk), composeWithDevTools())
)

export default store
