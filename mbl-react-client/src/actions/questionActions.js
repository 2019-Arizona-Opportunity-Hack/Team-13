import axios from "axios";
import { GET_ERRORS, GET_QUESTIONS, LOAD_QUESTION } from "./types";

export const createQuestion = (
  usFormNumber,
  question,
  history
) => async dispatch => {
  try {
    const res = await axios.post(`/question-list/${usFormNumber}`, question);
    // history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getQuestion = questionSequence => async dispatch => {
  try {
    const res = await axios.get(
      // `https://mbl-java-api.herokuapp.com/api/ver0001/question-list/i-90/${questionSequence}`
      `/question-list/i-90/${questionSequence}`
    );
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getQuestions = () => async dispatch => {
  try {
    const res = await axios.get(
      // "https://mbl-java-api.herokuapp.com/api/ver0001/question-list/i-90"
      "/question-list/i-90"
    );
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loadQuestion = () => dispatch => {
  try {
    dispatch({
      type: LOAD_QUESTION,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
