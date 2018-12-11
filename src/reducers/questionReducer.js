import {
  FILTER_QUESTIONS,
  GET_QUESTION,
  GET_QUESTIONS,
  LOAD_QUESTION,
  NEXT_QUESTION,
  GET_RESPONSE,
  GET_RESPONSES
} from "./../actions/types";

const initialState = {
  filteredQuestions: [],
  questions: [],
  question: {},
  responses: [],
  response: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        question: action.payload[0]
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
    case NEXT_QUESTION:
      return {
        ...state,
        question: state.filteredQuestions[0]
      };
    case FILTER_QUESTIONS:
      console.log(state);
      console.log(action.payload);
      return {
        ...state,
        filteredQuestions: action.payload,
        question: action.payload[0]
      };
    case GET_RESPONSES:
      return {
        ...state,
        responses: action.payload
      };
    case GET_RESPONSE:
      return {
        ...state,
        response: action.payload
      };

    default:
      return state;
  }
}
