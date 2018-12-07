import axios from "axios";
import { GET_ERRORS } from "./types";

export const createResponse = (newResponse, history) => async dispatch => {
  try {
    const res = await axios.post(
      // "http://localhost:8080/20/us-form-number/I-90/responses",
      "http://localhost:8080/api/ver0001/20/us-form-number/I-90/responses/",
      newResponse
    );
    history.push("/dashboard");
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
