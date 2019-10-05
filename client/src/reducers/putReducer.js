
import { ADD_GROUPS } from "../actions/types";

const initialState = {
    errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUPS:
      return {
        ...state,
        errors : action.payload
      };
    default:
      return state;
  }
}
