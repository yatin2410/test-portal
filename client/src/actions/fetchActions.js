import axios from "axios";
import {
  GET_USER,
  GET_USERS,
  GET_GROUPS,
  GET_QUESTIONS,
  GET_QUESTION,
  GET_QUIZ_QUESTIONS,
  GET_QUIZS,
  GET_SHOW_QUESTIONS,
  GET_QUIZ,
  GET_QUIZ_FULL,
  GET_RESULTS,
  GET_QUIZ_RESULTS,
  FLASH_SUCCESS_MSG,
  GET_ADMIN_STATES,
  GET_QUIZ_USER_RESULTS,
  GET_SERVER_TIME
} from "./types";

export const fetchUsers = (page, search) => dispatch => {
  axios
    .get("/api/users/?page=" + page + "&search=" + search)
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
      dispatch({
        type: GET_GROUPS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchQuestions = (page, search) => dispatch => {
  axios
    .get("/api/questions/?page=" + page + "&search=" + search)
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

export const fetchQuizs = () => dispatch => {
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

export const fetchQuestion = id => dispatch => {
  axios
    .get("/api/questions/" + id)
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

export const getQuizQuestions = id => dispatch => {
  axios
    .get("/api/quiz/showquestions/" + id)
    .then(res => {
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

export const fetchShowQuestions = id => dispatch => {
  axios
    .get("/api/quiz/showquestions/" + id)
    .then(res => {
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

export const fetchQuiz = id => dispatch => {
  axios
    .get("/api/quiz/" + id)
    .then(res => {
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

export const fetchUserQuizs = group => dispatch => {
  axios
    .get("/api/quiz/user/" + group)
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

export const SaveAndfetchUserQuizFull = (qid, uid) => dispatch => {
  axios
    .get("/api/quiz/user/quiz/" + qid + "/" + uid)
    .then(res => {
      dispatch({
        type: GET_QUIZ_FULL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching qustions");
      console.log(err);
    });
};

export const fetchUserQuizResult = (qid, uid, history) => dispatch => {
  axios
    .get("/api/quiz/user/result/" + qid + "/" + uid)
    .then(res => {
      dispatch({
        type: GET_QUIZ_FULL,
        payload: res.data
      });
    })
    .catch(err => {
      history.push("/dashboard/quiz");
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload: { msg: "Quiz has not ended yet!", type: "alert-danger" }
      });
    });
};

export const fetchUser = id => dispatch => {
  axios
    .get("/api/users/" + id)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching user");
      console.log(err);
    });
};

export const fetchUserResults = id => dispatch => {
  axios
    .get("/api/users/results/" + id)
    .then(res => {
      dispatch({
        type: GET_RESULTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching results");
      console.log(err);
    });
};

export const fetchQuizResults = () => dispatch => {
  axios
    .get("/api/quiz/results/all")
    .then(res => {
      dispatch({
        type: GET_QUIZ_RESULTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching results");
      console.log(err);
    });
};

export const fetchQuizUserResults = id => dispatch => {
  axios
    .get("/api/quiz/results/" + id)
    .then(res => {
      dispatch({
        type: GET_QUIZ_USER_RESULTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching results");
      console.log(err);
    });
};

export const fetchAdminStates = () => dispatch => {
  axios
    .get("/api/quiz/admin/states")
    .then(res => {
      dispatch({
        type: GET_ADMIN_STATES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching admin states");
      console.log(err);
    });
};

export const fetchServerTime = () => dispatch => {
  axios
    .get("/api/groups/getTime")
    .then(res => {
      dispatch({
        type: GET_SERVER_TIME,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("error in fetching server time");
      console.log(err);
    });
};
