import axios from "axios";
import {
  GET_ERRORS,
  GET_RESPONSE,
  GET_RESPONSES,
  GET_QUESTIONS
} from "./types";

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

export const getResponse = (
  usFormNumber,
  responseId,
  userId
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses/${responseId}`
    );
    dispatch({
      type: GET_RESPONSE,
      payload: res.data
    });
  } catch (err) {
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
    const res = await axios.get(
      `http://localhost:8080/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses`
    );
    history.push("/dashboard");
    console.log(res);
    dispatch({
      type: GET_RESPONSES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
