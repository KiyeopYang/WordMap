import update from 'react-addons-update';
import {
  RETRIEVE_ONE_WAITING,
  RETRIEVE_ONE_SUCCESS,
  RETRIEVE_ONE_FAILURE,
  RETRIEVE_MANY_WAITING,
  RETRIEVE_MANY_SUCCESS,
  RETRIEVE_MANY_FAILURE,
  REMOVE_ONE_WAITING,
  REMOVE_ONE_SUCCESS,
  REMOVE_ONE_FAILURE,
} from './actions';

const initialState = {
  retrieveOne: {
    status: 'INIT',
    reserved: null,
    error: null,
  },
  retrieveMany: {
    status: 'INIT',
    reserveds: [],
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
          reserved: { $set: action.reserved },
          error: { $set: null },
        },
      });
    case RETRIEVE_ONE_FAILURE:
      return update(state, {
        retrieveOne: {
          status: { $set: 'FAILURE' },
          reserved: { $set: null },
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
          reserveds: { $set: action.reserveds },
          error: { $set: null },
        },
      });
    case RETRIEVE_MANY_FAILURE:
      return update(state, {
        retrieveMany: {
          status: { $set: 'FAILURE' },
          reserveds: { $set: [] },
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
