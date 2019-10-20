import React, { Component } from "react";
import classnames from "classnames";

export default class Radio extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    const { isValid, responseText, onChange } = this.props;
    return (
      <input
        type="text"
        className={classnames("form-control form-control-lg", {
          "is-invalid": isValid
        })}
        placeholder="Tu respuesta"
        name="responseText"
        value={responseText}
        onChange={onChange}
        required
      />
    );
  }
}
