import { FILTER_QUESTIONS, GET_ERRORS } from "./types";

export const filterQuestions = (questions, responses, history) => dispatch => {
  // console.log(questions, responses);
  try {
    let arr = [];
    let filteredQuestions = [];
    for (let i = 0; i < responses.length; i++) {
      // console.log(responses[i]);
      arr.push(responses[i].questionSequence);
      console.log(arr);
    }
    console.log(arr);
    for (let j = 0; j < questions.length; j++) {
      if (arr.indexOf(questions[j].questionSequence) === -1) {
        // console.log(questions[j].questionSequence);
        filteredQuestions.push(questions[j]);
      }
    }
    console.log(filteredQuestions);
    history.push(`/question/${filteredQuestions[0].questionSequence}`);
    dispatch({
      type: FILTER_QUESTIONS,
      payload: filteredQuestions
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS
      // payload: err.response.data
    });
  }
};
