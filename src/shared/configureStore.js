import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Logger with default options
import logger from 'redux-logger';

import repos from './../../redux/repos';
import ticker from './../../redux/ticker';

const reducer = combineReducers({
  repos,
  ticker
})

const configureStore = preloadedState =>
  createStore(reducer, preloadedState, applyMiddleware(
    logger,
    thunk,
  ));

export default configureStore;
