/* global fetch */

export const WAITING = 'Main/data/auth/WAITING';
export const SUCCESS = 'Main/data/auth/SUCCESS';
export const FAILURE = 'Main/data/auth/FAILURE';
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
export const request = () => {
  return (dispatch, getState) => {
    dispatch(waiting());
    return new Promise((resolve, reject) => {
      const { person } = localStorage;
      if (person) {
        resolve(person);
      } else {
        reject();
      }
    })
      .then((data) => {
        dispatch(success(data));
      })
      .catch(e => dispatch(failure(e)));
  };
};
