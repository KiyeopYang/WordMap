/* global fetch */

export const WAITING = 'Main/Login/data/login/WAITING';
export const SUCCESS = 'Main/Login/data/login/SUCCESS';
export const FAILURE = 'Main/Login/data/login/FAILURE';
const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = () => {
  return {
    type: SUCCESS,
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
      fetch(`/api/person`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
        }),
      })
        .then((res) => {
          if (res.ok) { res.json(); }
          else {
            res.json().then((error) => {
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
