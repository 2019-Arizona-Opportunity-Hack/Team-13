import axios from "axios";
import { FILTER_QUESTIONS, GET_ERRORS } from "./types";

export const filterQuestions = (
  userId,
  usFormNumber,
  history
) => async dispatch => {
  try {
    const resQuestions = await axios.get(
      `https://mbl-java-api.herokuapp.com/api/ver0001/question-list/${usFormNumber}`
    );
    const resResponses = await axios.get(
      `https://mbl-java-api.herokuapp.com/api/ver0001/${userId}/us-form-number/${usFormNumber}/responses`
    );
    // console.log(resQuestions, resResponses);
    let questions = resQuestions.data;
    let responses = resResponses.data;
    let arr = [];
    let filteredQuestions = [];
    for (let i = 0; i < responses.length; i++) {
      arr.push(responses[i].questionSequence);
      // console.log(arr);
    }
    for (let j = 0; j < questions.length; j++) {
      if (arr.indexOf(questions[j].questionSequence) === -1) {
        filteredQuestions.push(questions[j]);
      }
    }
    // console.log(filteredQuestions);
    let currentFormStatus = {
      filteredQuestions,
      questions,
      responses
    };
    // console.log(currentFormStatus);
    dispatch({
      type: FILTER_QUESTIONS,
      payload: currentFormStatus
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
