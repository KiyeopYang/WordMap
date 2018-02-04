import { combineReducers } from 'redux';
import data from './data/reducer';
import login from './scene/Login/reducer';
import start from './scene/Start/reducer';


export default combineReducers({
  data,
  login,
  start,
});
