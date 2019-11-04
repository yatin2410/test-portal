import axios from "axios";

import { ADD_GROUPS, GET_ERRORS } from "./types";

// Register User
export const registerGroup = (userData, fun) => dispatch => {
  axios
    .post("/api/groups/", userData)
    .then(res => {
      fun();
      dispatch({
        type: ADD_GROUPS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: ADD_GROUPS,
        payload: err.response.data
      })
    );
};

export const addQuestion = (userData, history) => dispatch => {
  axios
    .post("/api/questions", userData)
    .then(res => {
      history.push("/dashboard/qbank");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const putQuestion = (userData, history) => dispatch => {
  axios
    .put("/api/questions/", userData)
    .then(res => {
      history.push("/dashboard/qbank");
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addQuiz = (userData, history) => dispatch => {
  axios
    .post("/api/quiz/", userData)
    .then(res => {
      history.push("/dashboard/addquiz/questions/" + res.data.quiz._id);
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addQuizQuestions = (userData, history) => dispatch => {
  axios
    .put("/api/quiz/questions", userData)
    .then(res => {
      history.push("/dashboard/quiz/");
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const editQuiz = (userData, history) => dispatch => {
  axios
    .put("/api/quiz/", userData)
    .then(res => {
      history.push("/dashboard/quiz/");
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
