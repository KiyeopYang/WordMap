/* global fetch */

export const WAITING = 'Main/Start/WordList/data/wordList/WAITING';
export const SUCCESS = 'Main/Start/WordList/data/wordList/SUCCESS';
export const FAILURE = 'Main/Start/WordList/data/wordList/FAILURE';
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
export const request = (words) => {
  return (dispatch, getState) => {
    dispatch(waiting());
    return new Promise((resolve, reject) => {
      return fetch(`/api/word`, {
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
