import { combineReducers } from 'redux';
import breed from './breedReducer'
import auth from './authReducer'
import order from './orderReducer'
import promo from './promoReducer'

const generalState = {
  message: null,
  errCode: null,
  isLoading: false,
}

const general = (state = generalState, { type, error, isLoading }) => {
  switch (type) {
    case 'SET_ERROR':
      return { ...state, ...error };
    case 'SET_LOADING':
      return { ...state, isLoading: isLoading };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  breed,
  auth,
  order,
  promo,
  general,
});

export default rootReducer;
