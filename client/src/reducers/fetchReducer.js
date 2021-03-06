import {
  GET_USERS,
  GET_GROUPS,
  GET_QUESTIONS,
  GET_QUESTION,
  GET_QUIZ_QUESTIONS,
  GET_QUIZS,
  GET_SHOW_QUESTIONS,
  GET_QUIZ,
  GET_QUIZ_FULL,
  GET_USER,
  GET_RESULTS,
  GET_QUIZ_RESULTS,
  GET_ADMIN_STATES,
  GET_QUIZ_USER_RESULTS,
  GET_SERVER_TIME
} from "../actions/types";

const initialState = {
  users: [],
  groups: [],
  questions: [],
  question: {},
  addedQuestions: [],
  quizs: [],
  showQuestions: [],
  quiz: {},
  quizFull: {},
  user: {},
  results: null,
  quizResults: null,
  adminStates: null,
  quizUserResults: null,
  serverTime: null
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
        addedQuestions: action.payload
      };
    case GET_QUIZS:
      return {
        ...state,
        quizs: action.payload
      };
    case GET_SHOW_QUESTIONS:
      return {
        ...state,
        showQuestions: action.payload
      };
    case GET_QUIZ:
      return {
        ...state,
        quiz: action.payload
      };
    case GET_QUIZ_FULL:
      return {
        ...state,
        quizFull: action.payload
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case GET_RESULTS:
      return {
        ...state,
        results: action.payload
      };
    case GET_QUIZ_RESULTS:
      return {
        ...state,
        quizResults: action.payload
      };
    case GET_ADMIN_STATES:
      return {
        ...state,
        adminStates: action.payload
      };
    case GET_QUIZ_USER_RESULTS:
      return {
        ...state,
        quizUserResults: action.payload
      };
    case GET_SERVER_TIME:
      return {
        ...state,
        serverTime: action.payload
      };
    default:
      return state;
  }
}
