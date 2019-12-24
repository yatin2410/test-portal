import { FLASH_SUCCESS_MSG } from "../actions/types";

const initialState = {
  msg: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FLASH_SUCCESS_MSG:
      return {
        ...state,
        msg: action.payload
      };
    default:
      return state;
  }
}
