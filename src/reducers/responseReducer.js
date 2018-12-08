import { GET_RESPONSE, GET_RESPONSES } from "./../actions/types";
const initialState = {
  responses: [],
  response: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
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
