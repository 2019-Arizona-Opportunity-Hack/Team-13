import React, { Component } from "react";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.onChange.bind(this);
  }
  onChange(e) {
    const val = e.target.value;
    const dropdown = this.props.dropdowns.find(d => d.value === val);
    this.props.onChange(dropdown);
  }
  render() {
    return (
      <div>
        <div className="form-group text-left form-check">
          <label className="form-check-label">
            <select className="form-check-input" onChange={this.onChange}>
              {this.props.dropdowns.map(dropdown => {
                return (
                  <option
                    key={dropdown.value}
                    value={dropdown.value}
                    selected={dropdown.selected}
                  >
                    {dropdown.label}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      </div>
    );
  }
}
