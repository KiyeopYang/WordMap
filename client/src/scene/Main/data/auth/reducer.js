import update from 'react-addons-update';
import {
  WAITING,
  SUCCESS,
  FAILURE,
} from './actions';

const initialState = {
  status: 'INIT',
  person: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WAITING:
      return update(state, {
        status: { $set: 'WAITING' },
        error: { $set: null },
      });
    case SUCCESS:
      return update(state, {
        status: { $set: 'SUCCESS' },
        person: { $set: action.person },
      });
    case FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        error: { $set: action.error },
        person: { $set: null },
      });
    default:
      return state;
  }
};
