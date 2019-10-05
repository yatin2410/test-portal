import { GET_USERS, GET_GROUPS } from "../actions/types";

const initialState = {
    users: [],
    groups: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users : action.payload
      };
      case GET_GROUPS:
        return{
          ...state,
          groups: action.payload
        }
    default:
      return state;
  }
}
