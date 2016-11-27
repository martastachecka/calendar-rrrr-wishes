import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import dashboardReducer from './dashboard/reducer';

const reducer = combineReducers({
  dashboard: dashboardReducer,
});

const enhancer = compose(
  applyMiddleware(thunkMiddleware),
  persistState([
    'dashboard',
  ]),
);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
);

export default store;
