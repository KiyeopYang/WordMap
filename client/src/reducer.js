import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from './data/reducer';
import managerPage from './scene/ManagerPage/reducer';

export default combineReducers({
  routing: routerReducer,
  data,
  managerPage,
});
