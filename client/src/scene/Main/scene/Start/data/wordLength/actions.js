/* global fetch */

export const WAITING = 'Main/Start/data/wordLength/WAITING';
export const SUCCESS = 'Main/Start/data/wordLength/SUCCESS';
export const FAILURE = 'Main/Start/data/wordLength/FAILURE';
const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (length) => {
  return {
    type: SUCCESS,
    length,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = () => {
  return (dispatch, getState) => {
    dispatch(waiting());
    return new Promise((resolve, reject) => {
      return fetch(`/api/word/length`, {
        method: 'GET',
      })
        .then((res) => {
          if (res.ok) { return res.json(); }
          else {
            return res.json().then((error) => {
              throw error;
            });
          }
        })
        .then((data) => {
          if (data) {
            resolve(data);
          } else {
            reject({
              message: '서버 통신 에러'
            });
          }
        })
        .catch(reject);
    })
      .then((data) => {
        dispatch(success(data));
      })
      .catch(e => dispatch(failure(e)));
  };
};
