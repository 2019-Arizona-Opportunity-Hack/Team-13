import { GET_MY_FORM } from "./../actions/types";

const initialState = {
  myForm: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MY_FORM:
      return {
        ...state,
        myForm: action.payload
      };

    default:
      return state;
  }
}
