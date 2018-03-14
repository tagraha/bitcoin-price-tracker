import "isomorphic-fetch";
import get from 'lodash/get';

// Actions
const HANDLE_CHANGE = "HANDLE_CHANGE";
const CONVERT_BTC_USD = "CONVERT_BTC_USD";

const initialObj = {
  inputText: '',
  validInput: 0,
  buyPrice: 0,
  userMoney: 0
}

// Reducer
export default function reducer(state = initialObj, action) {
  switch (action.type) {
    case HANDLE_CHANGE: {
      return { ...state, inputText: action.payload };
    }

    case CONVERT_BTC_USD: {
      const inputNumber = parseFloat(get(action, 'payload'));
      const price = parseFloat(get(action, 'price'));
      const dollar = parseFloat(inputNumber * price);
      return {
        ...state,
        validInput: inputNumber,
        buyPrice: price,
        userMoney: precisionRound(dollar, 5)
      }
    }

    default: {
      return state;
    }
  }
}

// Action Creators
const updateBtc = (text) => ({ type: HANDLE_CHANGE, payload: text });
const convertBTC = (input, price) => ({ type: CONVERT_BTC_USD, payload: input, price });


// Exported Action
export const handleInputChange = (text) => (dispatch, getState) => {
  return dispatch(updateBtc(text));
};

export const convertBtc = (btc, buyPrice) => (dispatch, getState) => {
  return dispatch(convertBTC(btc, buyPrice));
}

// perks
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
