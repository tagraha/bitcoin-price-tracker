import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Logger with default options
import logger from 'redux-logger';

import repos from './../../redux/repos';

const configureStore = preloadedState =>
  createStore(repos, preloadedState, applyMiddleware(
    logger,
    thunk,
  ));

export default configureStore;
