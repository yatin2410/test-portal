import axios from "axios";
import {GET_USERS,GET_GROUPS,GET_QUESTIONS, GET_QUESTION, GET_QUIZ_QUESTIONS,GET_QUIZS, GET_SHOW_QUESTIONS,GET_QUIZ} from "./types";

export const fetchUsers  = () => dispatch => {
    axios
    .get("/api/users/")
    .then(res => {
        dispatch({
          type: GET_USERS,
          payload: res.data  
        });
    })
    .catch(err => {
        console.log("error in fetching users");
        console.log(err);
    });
};

export const fetchGroups = () => dispatch => {
    axios
    .get("/api/groups/")
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchQuestions  = () => dispatch => {
  axios
  .get("/api/questions/")
  .then(res => {
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data  
      });
  })
  .catch(err => {
      console.log("error in fetching users");
      console.log(err);
  });
};

export const fetchQuizs  = () => dispatch => {
  axios
  .get("/api/quiz/")
  .then(res => {
      dispatch({
        type: GET_QUIZS,
        payload: res.data  
      });
  })
  .catch(err => {
      console.log("error in fetching users");
      console.log(err);
  });
};

export const fetchQuestion  = (id) => dispatch => {
  axios
  .get("/api/questions/"+id)
  .then(res => {
      dispatch({
        type: GET_QUESTION,
        payload: res.data  
      });
  })
  .catch(err => {
      console.log("error in fetching users");
      console.log(err);
  });
};

export const getQuizQuestions  = (id) => dispatch => {
  console.log("/api/quiz/questions/"+id);
  axios
  .get("/api/quiz/questions/"+id)
  .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_QUIZ_QUESTIONS,
        payload: res.data
      });
  })
  .catch(err => {
      console.log("error in fetching users");
      console.log(err);
  });
};

export const fetchShowQuestions  = (id) => dispatch => {
  axios
  .get("/api/quiz/showquestions/"+id)
  .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_SHOW_QUESTIONS,
        payload: res.data
      });
  })
  .catch(err => {
      console.log("error in fetching qustions");
      console.log(err);
  });
};

export const fetchQuiz  = (id) => dispatch => {
  axios
  .get("/api/quiz/"+id)
  .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_QUIZ,
        payload: res.data
      });
  })
  .catch(err => {
      console.log("error in fetching qustions");
      console.log(err);
  });
};
