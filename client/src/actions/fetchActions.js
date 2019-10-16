import axios from "axios";
import {GET_USERS,GET_GROUPS,GET_QUESTIONS, GET_QUESTION} from "./types";

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
