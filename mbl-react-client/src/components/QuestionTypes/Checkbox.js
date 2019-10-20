import React, { Component } from "react";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    return (
      <div>
        {this.props.checkboxes.map(checkbox => {
          return (
            <div
              className="form-group text-left form-check"
              key={checkbox.value}
            >
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={checkbox.groupname}
                  value={checkbox.value}
                  selected={checkbox.selected}
                  onChange={() => {
                    this.props.onChange(checkbox);
                  }}
                />
                {checkbox.label}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
