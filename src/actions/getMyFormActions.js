import axios from "axios";
import { GET_MY_FORM, GET_ERRORS } from "./types";

export const getMyForms = () => async dispatch => {
  try {
    const res = await axios.get(
      `https://mbl-java-api.herokuapp.com/api/ver0001/1/my-form`
    );
    // console.log(res);
    // console.log(res.config);
    // console.log(res.status);
    // console.log(res);
    // console.log(res.headers);
    // console.log(res.data);
    // const filename = res.headers.get("Content-Disposition").split("filename=");
    const filename = res.data;
    // res.blob().then(data => {
    //   let url = window.URL.createObjectURL(data);
    //   let a = document.createElement("a");
    //   a.href = url;
    //   a.download = filename;
    //   a.click();
    // });
    dispatch({
      type: GET_MY_FORM,
      payload: res
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.data
    });
  }
};
