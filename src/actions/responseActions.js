import axios from "axios";
import { GET_ERRORS } from "./types";

export const createResponse = (
  // may need to pass username/email too
  response,
  userId,
  usFormNumber,
  history
) => async dispatch => {
  try {
    const res = await axios.post(
      // `/${userId}/us-form-number/${usFormNumber}/responses/`,
      `http://localhost:8080/20/us-form-number/${usFormNumber}/responses/`,
      response
    );
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
