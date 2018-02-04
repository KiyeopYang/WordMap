/* global fetch */

export const WAITING = 'Main/Login/data/login/WAITING';
export const SUCCESS = 'Main/Login/data/login/SUCCESS';
export const FAILURE = 'Main/Login/data/login/FAILURE';
const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (person,) => {
  return {
    type: SUCCESS,
    person,
  };
};
const failure = (error) => {
  return {
    type: FAILURE,
    error,
  };
};
export const request = (phone) => {
  return (dispatch, getState) => {
    dispatch(waiting());
    return new Promise((resolve, reject) => {
      return fetch(`/api/person`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
        }),
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
