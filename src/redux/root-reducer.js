import {combineReducers} from 'redux';
import usersReducer from './reducer';

const rootReducer = combineReducers({
  user: usersReducer
})

export default rootReducer;