import update from 'react-addons-update';
import {
  RETRIEVE_ONE_WAITING,
  RETRIEVE_ONE_SUCCESS,
  RETRIEVE_ONE_FAILURE,
  RETRIEVE_MANY_WAITING,
  RETRIEVE_MANY_SUCCESS,
  RETRIEVE_MANY_FAILURE,
} from './actions';

const initialState = {
  retrieveOne: {
    status: 'INIT',
    result: null,
    error: null,
  },
  retrieveMany: {
    status: 'INIT',
    results: [],
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
          result: { $set: action.result },
          error: { $set: null },
        },
      });
    case RETRIEVE_ONE_FAILURE:
      return update(state, {
        retrieveOne: {
          status: { $set: 'FAILURE' },
          result: { $set: null },
          error: { $set: action.error },
        },
      });
    case RETRIEVE_MANY_WAITING:
      return update(state, {
        retrieveMany: {
          status: { $set: 'WAITING' },
          error: { $set: null },
        },
      });
    case RETRIEVE_MANY_SUCCESS:
      return update(state, {
        retrieveMany: {
          status: { $set: 'SUCCESS' },
          results: { $set: action.results },
          error: { $set: null },
        },
      });
    case RETRIEVE_MANY_FAILURE:
      return update(state, {
        retrieveMany: {
          status: { $set: 'FAILURE' },
          results: { $set: [] },
          error: { $set: action.error },
        },
      });
    default:
      return state;
  }
};
