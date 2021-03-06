import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import fetchReducer from "./fetchReducer";
import putReducer from "./putReducer";
import FlashReducer from "./flashReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  data: fetchReducer,
  putResponse: putReducer,
  flashMsg: FlashReducer
});
