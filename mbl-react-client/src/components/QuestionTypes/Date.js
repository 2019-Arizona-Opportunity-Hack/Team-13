import React, { Component } from "react";
import classnames from "classnames";

export default class Date extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    const { isValid, Date, onChange } = this.props;

    return (
      <div>
        <input
          type="date"
          className={classnames("form-control form-control-lg", {
            "is-invalid": isValid
          })}
          placeholder="Tu respuesta"
          name="responseText"
          value={Date}
          onChange={onChange}
          required
        />
      </div>
    );
  }
}
