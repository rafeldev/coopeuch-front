import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


if(process.env.REACT_APP_NODE_ENV === "development"){
  middleWare.push(logger)
}

const store = createStore(rootReducer,
   composeEnhancers(applyMiddleware(...middleWare)))

export default store;