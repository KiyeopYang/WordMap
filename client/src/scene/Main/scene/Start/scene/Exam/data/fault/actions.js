/* global fetch */

export const WAITING = 'Main/Start/Exam/data/fault/WAITING';
export const SUCCESS = 'Main/Start/Exam/data/fault/SUCCESS';
export const FAILURE = 'Main/Start/Exam/data/fault/FAILURE';
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
export const request = (faults) => {
  return (dispatch, getState) => {
    dispatch(waiting());
    return new Promise((resolve, reject) => {
      const personId = JSON.parse(localStorage.person)._id;
      return fetch(`/api/fault`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${personId}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faults }),
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
