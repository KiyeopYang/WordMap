import { combineReducers } from 'redux';

import exam from './exam/reducer';
import fault from './fault/reducer';

export default combineReducers({
  exam,
  fault,
});
