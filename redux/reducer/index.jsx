import { combineReducers } from 'redux';
import auth from './authReducer'
import order from './orderReducer'
import promo from './promoReducer'
import article from './articleReducer';

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
  auth,
  order,
  promo,
  general,
  article,
});

export default rootReducer;
