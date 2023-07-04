import { combineReducers } from 'redux';
import breed from './breedReducer'
import auth from './authReducer'
import order from './orderReducer'

const errorState = {
  message: null,
  errCode: null,
}

const error = (state = errorState, { type, error }) => {
  switch (type) {
    case 'SET_ERROR':
      return { ...state, ...error };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  breed,
  auth,
  order,
  error
});

export default rootReducer;
