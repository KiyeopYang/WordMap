/* global fetch */
import config from '../../../../config';
import modifier from './modifier';

export const RETRIEVE_ONE_WAITING = 'ManagerPage/data/reserved/RETRIEVE_ONE_WAITING';
export const RETRIEVE_ONE_SUCCESS = 'ManagerPage/data/reserved/RETRIEVE_ONE_SUCCESS';
export const RETRIEVE_ONE_FAILURE = 'ManagerPage/data/reserved/RETRIEVE_ONE_FAILURE';
export const RETRIEVE_MANY_WAITING = 'ManagerPage/data/reserved/RETRIEVE_MANY_WAITING';
export const RETRIEVE_MANY_SUCCESS = 'ManagerPage/data/reserved/RETRIEVE_MANY_SUCCESS';
export const RETRIEVE_MANY_FAILURE = 'ManagerPage/data/reserved/RETRIEVE_MANY_FAILURE';
export const REMOVE_ONE_WAITING = 'ManagerPage/data/reserved/REMOVE_ONE_WAITING';
export const REMOVE_ONE_SUCCESS = 'ManagerPage/data/reserved/REMOVE_ONE_SUCCESS';
export const REMOVE_ONE_FAILURE = 'ManagerPage/data/reserved/REMOVE_ONE_FAILURE';

const retrieveOneWaiting = () => {
  return {
    type: RETRIEVE_ONE_WAITING,
  };
};
const retrieveOneSuccess = (reserved) => {
  return {
    type: RETRIEVE_ONE_SUCCESS,
    reserved,
  };
};
const retrieveOneFailure = (error) => {
  return {
    type: RETRIEVE_ONE_FAILURE,
    error,
  };
};
export const retrieveOneRequest = (id) => {
  return (dispatch) => {
    dispatch(retrieveOneWaiting());
    return fetch(`${config.HOST}/api/reserved/${id}`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(retrieveOneSuccess(modifier(data)));
        }
        return dispatch(retrieveOneFailure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(retrieveOneFailure(e)));
  };
};
const retrieveManyWaiting = () => {
  return {
    type: RETRIEVE_MANY_WAITING,
  };
};
const retrieveManySuccess = (reserveds) => {
  return {
    type: RETRIEVE_MANY_SUCCESS,
    reserveds,
  };
};
const retrieveManyFailure = (error) => {
  return {
    type: RETRIEVE_MANY_FAILURE,
    error,
  };
};
export const retrieveManyRequest = () => {
  return (dispatch) => {
    dispatch(retrieveManyWaiting());
    return fetch(`${config.HOST}/api/reserved`, {
      method: 'GET',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(retrieveManySuccess(modifier(data)));
        }
        return dispatch(retrieveManyFailure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(retrieveManyFailure(e)));
  };
};
const removeOneWaiting = () => {
  return {
    type: REMOVE_ONE_WAITING,
  };
};
const removeOneSuccess = () => {
  return {
    type: REMOVE_ONE_SUCCESS,
  };
};
const removeOneFailure = (error) => {
  return {
    type: REMOVE_ONE_FAILURE,
    error,
  };
};
export const removeOneRequest = (id) => {
  return (dispatch) => {
    dispatch(removeOneWaiting());
    return fetch(`${config.HOST}/api/reserved/${id}`, {
      method: 'DELETE',
      headers: {
        'cache-control': 'no-cache',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(removeOneSuccess(data));
        }
        return dispatch(removeOneFailure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(removeOneFailure(e)));
  };
};