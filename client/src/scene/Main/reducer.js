import { combineReducers } from 'redux';
import data from './data/reducer';
import login from './scene/Login/reducer';


export default combineReducers({
  data,
  login,
});
