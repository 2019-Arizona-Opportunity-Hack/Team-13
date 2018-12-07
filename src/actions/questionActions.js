import axios from "axios";
import { GET_ERRORS } from "./types";

export const createQuestion = (
  usFormNumber,
  question,
  history
) => async dispatch => {
  try {
    const res = await axios.post(`/question-list/${usFormNumber}`, question);
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
