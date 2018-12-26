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
      `https://mbl-java-api.herokuapp.com/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses/`,
      newResponse
    );
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

export const getResponses = (userId, usFormNumber) => async dispatch => {
  try {
    const res = await axios.get(
      `https://mbl-java-api.herokuapp.com/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses`
    );
    // console.log(res);
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
