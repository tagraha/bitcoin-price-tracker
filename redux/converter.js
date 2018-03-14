import "isomorphic-fetch";

// Actions
const HANDLE_CHANGE = "HANDLE_CHANGE";
const CONVERT_BTC_USD = "CONVERT_BTC_USD";

const initialObj = {
  inputText: ''
}

// Reducer
export default function reducer(state = initialObj, action) {
  switch (action.type) {
    case HANDLE_CHANGE: {
      return { ...state, inputText: action.payload };
    }

    case CONVERT_BTC_USD: {
      return {
        ...state
      }
    }

    default: {
      return state;
    }
  }
}

// Action Creators
const updateBtc = (text) => ({ type: HANDLE_CHANGE, payload: text });
const convertBTC = (text) => ({ type: HANDLE_CHANGE, payload: text });

export const handleInputChange = (text) => (dispatch, getState) => {
  return dispatch(updateBtc(text));
};

export const convert = (btc) => (dispatch, getState) {
  return dispatch(convertBTC(btc));
}
