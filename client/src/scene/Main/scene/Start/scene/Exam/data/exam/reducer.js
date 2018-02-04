import update from 'react-addons-update';
import {
  WAITING,
  SUCCESS,
  FAILURE,
} from './actions';

const initialState = {
  status: 'INIT',
  list: [],
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
        list: { $set: action.list },
      });
    case FAILURE:
      return update(state, {
        status: { $set: 'FAILURE' },
        list: { $set: [] },
        error: { $set: action.error },
      });
    default:
      return state;
  }
};
