import { GET_QUESTION, GET_QUESTIONS, LOAD_QUESTION } from "./../actions/types";

const initialState = {
  questions: [],
  question: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      };
    case GET_QUESTION:
      return {
        ...state,
        question: action.payload
      };
    case LOAD_QUESTION:
      return {
        ...state,
        question: state.questions[0]
      };

    default:
      return state;
  }
}
