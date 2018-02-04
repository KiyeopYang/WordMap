import { combineReducers } from 'redux';
import result from './result/reducer';
import reserved from './reserved/reducer';
import welcome from './welcome/reducer';

export default combineReducers({
  result,
  reserved,
  welcome,
});
