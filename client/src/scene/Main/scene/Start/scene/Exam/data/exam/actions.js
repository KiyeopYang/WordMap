/* global fetch */

export const WAITING = 'Main/Start/Exam/data/exam/WAITING';
export const SUCCESS = 'Main/Start/Exam/data/exam/SUCCESS';
export const FAILURE = 'Main/Start/Exam/data/exam/FAILURE';
const waiting = () => {
  return {
    type: WAITING,
  };
};
const success = (list) => {
  return {
    type: SUCCESS,
    list,
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
      const personId = JSON.parse(localStorage.person)._id;
      return fetch(`/api/game`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${personId}`
        },
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
