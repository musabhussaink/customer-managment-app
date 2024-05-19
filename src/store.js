// store.js
import { createStore , applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import customerReducer from './reducers/customerReducer';

const rootReducer = combineReducers({
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;