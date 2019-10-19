import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import formReducer from "./formReducer";
import securityReducer from "./securityReducer";
import questionReducer from "./questionReducer";

export default combineReducers({
  errors: errorReducer,
  forms: formReducer,
  security: securityReducer,
  questions: questionReducer
});
