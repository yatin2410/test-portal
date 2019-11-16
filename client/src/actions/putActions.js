import axios from "axios";

import { ADD_GROUPS, GET_ERRORS , PUT_SUBMIT_ERROR, FLASH_SUCCESS_MSG} from "./types";

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
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload:{msg:"Group added successfully!",type:"alert-success"},
      })
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
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload:{msg:"Question added successfully!",type:"alert-success"},
      })
    })
    .catch(err => {
      console.log(err);
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
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload:{msg:"Question updated successfully!",type:"alert-primary"},
      })
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

export const addRandom = (userData, history) => dispatch => {
  axios
    .post("/api/quiz/", userData)
    .then(res => {
      history.push("/dashboard/addquiz/random/" + res.data.quiz._id);
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addQRandomly = (userData, history) => dispatch => {
  axios
    .post("/api/quiz/random/"+userData._id, userData)
    .then(res => {
      history.push("/dashboard/quiz/");
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload:{msg:"Quiz added successfully!",type:"alert-success"},
      })
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
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
      dispatch({
        type: FLASH_SUCCESS_MSG,
        payload:{msg:"Quiz updated successfully!",type:"alert-primary"},
      })
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const submitQuiz = (data, history) => dispatch => {
  axios
    .post("/api/quiz/submit", data)
    .then(res => {
      history.push("/dashboard/results");
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: PUT_SUBMIT_ERROR,
        payload: err.response.data
      });
    });
};

export const putFlashMsg = (data) => dispatch => {
  dispatch({
    type: FLASH_SUCCESS_MSG,
    payload: data,
  })
}