import {combineReducers} from 'redux';
import tasksReducer from './reducer';

const rootReducer = combineReducers({
  data: tasksReducer
})

export default rootReducer;