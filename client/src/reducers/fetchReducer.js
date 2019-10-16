import { GET_USERS, GET_GROUPS, GET_QUESTIONS, GET_QUESTION } from "../actions/types";

const initialState = {
  users: [],
  groups: [],
  questions: [],
  question: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload[0]
      };
    default:
      return state;
  }
}
