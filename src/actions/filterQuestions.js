import { FILTER_QUESTIONS, GET_ERRORS } from "./types";

export const filterQuestions = (questions, responses) => dispatch => {
  try {
    let obj0 = {};
    let filteredQuestions = [];
    for (let i = 0; i < responses.length; i++) {
      if (!obj0.hasOwnProperty(`responses[i].questionSequence`)) {
        obj0[responses[i].questionSequence] = 1;
      }
    }
    for (let j = 0; j < questions.length; j++) {
      if (obj0.hasOwnProperty(`questions[i].questionSequence`)) {
        filteredQuestions.push(questions[j]);
      }
    }
    dispatch({
      type: FILTER_QUESTIONS,
      payload: filteredQuestions
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
