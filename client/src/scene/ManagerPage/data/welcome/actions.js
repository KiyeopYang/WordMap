/* global fetch */
import config from '../../../../config';

export const RETRIEVE_ONE_WAITING = 'ManagerPage/data/welcome/RETRIEVE_ONE_WAITING';
export const RETRIEVE_ONE_SUCCESS = 'ManagerPage/data/welcome/RETRIEVE_ONE_SUCCESS';
export const RETRIEVE_ONE_FAILURE = 'ManagerPage/data/welcome/RETRIEVE_ONE_FAILURE';
export const SAVE_ONE_WAITING = 'ManagerPage/data/welcome/SAVE_ONE_WAITING';
export const SAVE_ONE_SUCCESS = 'ManagerPage/data/welcome/SAVE_ONE_SUCCESS';
export const SAVE_ONE_FAILURE = 'ManagerPage/data/welcome/SAVE_ONE_FAILURE';
export const REMOVE_ONE_WAITING = 'ManagerPage/data/welcome/REMOVE_ONE_WAITING';
export const REMOVE_ONE_SUCCESS = 'ManagerPage/data/welcome/REMOVE_ONE_SUCCESS';
export const REMOVE_ONE_FAILURE = 'ManagerPage/data/welcome/REMOVE_ONE_FAILURE';


const retrieveOneWaiting = () => {
  return {
    type: RETRIEVE_ONE_WAITING,
  };
};
const retrieveOneSuccess = (welcome) => {
  return {
    type: RETRIEVE_ONE_SUCCESS,
    welcome,
  };
};
const retrieveOneFailure = (error) => {
  return {
    type: RETRIEVE_ONE_FAILURE,
    error,
  };
};
export const retrieveOneRequest = (websiteId) => {
  return (dispatch) => {
    dispatch(retrieveOneWaiting());
    return fetch(`${config.HOST}/api/webpush/welcome/load`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        websiteId,
      }),
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(retrieveOneSuccess(data));
        }
        return dispatch(retrieveOneFailure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(retrieveOneFailure(e)));
  };
};
const saveOneWaiting = () => {
  return {
    type: SAVE_ONE_WAITING,
  };
};
const saveOneSuccess = () => {
  return {
    type: SAVE_ONE_SUCCESS,
  };
};
const saveOneFailure = (error) => {
  return {
    type: SAVE_ONE_FAILURE,
    error,
  };
};
export const saveOneRequest = (
  websiteId, dataForPush, icon) => {
  return (dispatch) => {
    dispatch(saveOneWaiting());
    const data = new FormData();
    if (icon) {
      const { iconBlob, name } = icon;
      data.append(
        'icon',
        iconBlob,
        name
      );
    }
    data.append('data', JSON.stringify({
      websiteId,
      dataForPush,
    }));
    return fetch(`${config.HOST}/api/webpush/welcome/save`, {
      method: 'POST',
      body: data,
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return res.json().then((error) => {
          throw error;
        });
      })
      .then((data) => {
        if (data) {
          return dispatch(saveOneSuccess(data));
        }
        return dispatch(saveOneFailure({
          message: 'response에 data가 없습니다.'
        }));
      })
      .catch(e => dispatch(saveOneFailure(e)));
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
export const removeOneRequest = (websiteId) => {
  return (dispatch) => {
    dispatch(removeOneWaiting());
    return fetch(`${config.HOST}/api/webpush/welcome/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        websiteId,
      }),
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
