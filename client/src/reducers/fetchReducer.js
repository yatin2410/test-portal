import { GET_USERS, GET_GROUPS, GET_QUESTIONS, GET_QUESTION,GET_QUIZ_QUESTIONS, GET_QUIZS, GET_SHOW_QUESTIONS,GET_QUIZ} from "../actions/types";

const initialState = {
  users: [],
  groups: [],
  questions: [],
  question: {},
  addedQuestions: [],
  quizs: [],
  showQuestions: [],
  quiz:{},
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
    case GET_QUIZ_QUESTIONS:
      return {
        ...state,
        addedQuestions : action.payload
      };
    case  GET_QUIZS:
      return {
        ...state,
        quizs: action.payload
      }
    case GET_SHOW_QUESTIONS:
      return {
        ...state,
        showQuestions: action.payload
      }
      case GET_QUIZ:
        return{
          ...state,
          quiz: action.payload
        }
    default:
      return state;
  }
}
