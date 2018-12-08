import axios from "axios";
import { GET_ERRORS } from "./types";

export const createResponse = (
  newResponse,
  userId,
  usFormNumber,
  history
) => async dispatch => {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses/`,
      newResponse
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

export const getResponses = (
  userId,
  usFormNumber,
  history
) => async dispatch => {
  try {
    const res = await axios.post(
      `http://localhost:8080/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses/`
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
