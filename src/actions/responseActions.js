import axios from "axios";
import { GET_ERRORS } from "./types";

export const createResponse = (
  // may need to pass username/email too
  newResponse,
  // userId,
  usFormNumber,
  // project,
  history
) => async dispatch => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Accept: "application/json"
    };
    const res = await axios.post(
      // `/${userId}/us-form-number/${usFormNumber}/responses/`,
      // `http://localhost:8080/20/us-form-number/I-90/responses`,
      "http://localhost:8080/20/us-form-number/I-90/responses",
      newResponse,
      { withCredentials: true },
      headers
      // "http://localhost:8080/api/ver0001/projects",
      // project
    );
    history.push("/dashboard");
    console.log(res);
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
