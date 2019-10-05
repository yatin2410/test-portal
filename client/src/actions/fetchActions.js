import axios from "axios";
import {GET_USERS,GET_GROUPS} from "./types";

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