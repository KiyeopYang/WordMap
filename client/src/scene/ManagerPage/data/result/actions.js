/* global fetch */
import modifier from './modifier';
import config from '../../../../config';

export const RETRIEVE_ONE_WAITING = 'ManagerPage/data/result/RETRIEVE_ONE_WAITING';
export const RETRIEVE_ONE_SUCCESS = 'ManagerPage/data/result/RETRIEVE_ONE_SUCCESS';
export const RETRIEVE_ONE_FAILURE = 'ManagerPage/data/result/RETRIEVE_ONE_FAILURE';
export const RETRIEVE_MANY_WAITING = 'ManagerPage/data/result/RETRIEVE_MANY_WAITING';
export const RETRIEVE_MANY_SUCCESS = 'ManagerPage/data/result/RETRIEVE_MANY_SUCCESS';
export const RETRIEVE_MANY_FAILURE = 'ManagerPage/data/result/RETRIEVE_MANY_FAILURE';

const retrieveOneWaiting = () => {
  return {
    type: RETRIEVE_ONE_WAITING,
  };
};
const retrieveOneSuccess = (result) => {
  return {
    type: RETRIEVE_ONE_SUCCESS,
    result,
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
    return fetch(`${config.HOST}/api/result/${id}`, {
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
const retrieveManySuccess = (results) => {
  return {
    type: RETRIEVE_MANY_SUCCESS,
    results,
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
    return fetch(`${config.HOST}/api/result`, {
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
