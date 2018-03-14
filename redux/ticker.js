import "isomorphic-fetch";
import get from 'lodash/get';

// Actions
const UPDATE_TICKER = "UPDATE_TICKER";

const initial = {
  buy: 0,
  sell: 0,
  change: 0,
  close: 0,
  high: 0,
  low: 0,
  open: 0,
  close: 0,
}

// Reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_TICKER: {
      if (get(action.payload[0], 'data.buy')) {
        return {
          ...state,
          buy: get(action.payload[0], 'data.buy'),
          sell: get(action.payload[0], 'data.sell'),
          change: get(action.payload[0], 'data.change'),
          close: get(action.payload[0], 'data.close'),
          high: get(action.payload[0], 'data.high'),
          low: get(action.payload[0], 'data.low'),
          open: get(action.payload[0], 'data.open'),
          close: get(action.payload[0], 'data.close'),
        }
      }
      return { ...state };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
const updateTicker = (socketData) => ({ type: UPDATE_TICKER, payload: socketData });

export const tickerUpdate = (socketData) => (dispatch, getState) => {
  return dispatch(updateTicker(socketData));
};