import axios from "axios";

import { ADD_GROUPS} from "./types";

// Register User
export const registerGroup = (userData, fun) => dispatch => {
  axios
    .post("/api/groups/", userData)
    .then(res => {
      fun();
      dispatch({
        type: ADD_GROUPS,
        payload: {}
      })
    })
    .catch(err =>
      dispatch({
        type: ADD_GROUPS,
        payload: err.response.data
      })
    );
};

