// src/store.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
const reducer = combineReducers({
	...reducers,
	router: routerReducer,
});

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;

export const history = createBrowserHistory();

const middleware = [routerMiddleware(history), ReduxThunk];

const enhancer = compose(applyMiddleware(...middleware), devTools);

const store = createStore(reducer, enhancer);

export default store;
