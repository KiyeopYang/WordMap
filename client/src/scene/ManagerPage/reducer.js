import _ from 'lodash';

import dataReducer from './data/reducer';

const initialState = {};
export default (state = initialState, action) => {
  const rest = _.omit(state, Object.keys(initialState));
  switch (action.type) {
    default:
      return {
        ...state,
        data: dataReducer(rest.data, action),
      };
  }
};
