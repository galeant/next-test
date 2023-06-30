import { combineReducers } from 'redux';
import breed from './breedReducer'
import auth from './authReducer'

const rootReducer = combineReducers({
  breed,
  auth,
});

export default rootReducer;
