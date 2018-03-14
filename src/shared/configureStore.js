import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Logger with default options
import logger from 'redux-logger';

import converter from './../../redux/converter';
import ticker from './../../redux/ticker';

const reducer = combineReducers({
  converter,
  ticker
})

const configureStore = preloadedState =>
  createStore(reducer, preloadedState, applyMiddleware(
    logger,
    thunk,
  ));

export default configureStore;
