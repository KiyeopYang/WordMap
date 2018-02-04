import update from 'react-addons-update';
import {
  RETRIEVE_ONE_WAITING,
  RETRIEVE_ONE_SUCCESS,
  RETRIEVE_ONE_FAILURE,
  SAVE_ONE_WAITING,
  SAVE_ONE_SUCCESS,
  SAVE_ONE_FAILURE,
  REMOVE_ONE_WAITING,
  REMOVE_ONE_SUCCESS,
  REMOVE_ONE_FAILURE,
} from './actions';

const initialState = {
  retrieveOne: {
    status: 'INIT',
    welcome: null,
    error: null,
  },
  saveOne: {
    status: 'INIT',
    error: null,
  },
  removeOne: {
    status: 'INIT',
    error: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVE_ONE_WAITING:
      return update(state, {
        retrieveOne: {
          status: { $set: 'WAITING' },
          error: { $set: null },
        },
      });
    case RETRIEVE_ONE_SUCCESS:
      return update(state, {
        retrieveOne: {
          status: { $set: 'SUCCESS' },
          welcome: { $set: action.welcome },
          error: { $set: null },
        },
      });
    case RETRIEVE_ONE_FAILURE:
      return update(state, {
        retrieveOne: {
          status: { $set: 'FAILURE' },
          welcome: { $set: null },
          error: { $set: action.error },
        },
      });
    case SAVE_ONE_WAITING:
      return update(state, {
        saveOne: {
          status: { $set: 'WAITING' },
          error: { $set: null },
        },
      });
    case SAVE_ONE_SUCCESS:
      return update(state, {
        saveOne: {
          status: { $set: 'SUCCESS' },
          error: { $set: null },
        },
      });
    case SAVE_ONE_FAILURE:
      return update(state, {
        saveOne: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    case REMOVE_ONE_WAITING:
      return update(state, {
        removeOne: {
          status: { $set: 'WAITING' },
          error: { $set: null },
        },
      });
    case REMOVE_ONE_SUCCESS:
      return update(state, {
        removeOne: {
          status: { $set: 'SUCCESS' },
          error: { $set: null },
        },
      });
    case REMOVE_ONE_FAILURE:
      return update(state, {
        removeOne: {
          status: { $set: 'FAILURE' },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
};
