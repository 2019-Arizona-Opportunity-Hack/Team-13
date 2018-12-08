import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import questionReducer from "./questionReducer";
import responseReducer from "./responseReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  questions: questionReducer,
  responses: responseReducer
});
