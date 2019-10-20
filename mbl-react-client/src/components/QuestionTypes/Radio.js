import React, { Component } from "react";

export default class Radio extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  }
  render() {
    return (
      <div>
        {this.props.radios.map(radio => {
          return (
            <div className="form-group text-left form-check" key={radio.value}>
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name={radio.groupname}
                  value={radio.value}
                  selected={radio.selected}
                  onChange={() => {
                    this.props.onChange(radio);
                  }}
                />
                {radio.label}
              </label>
            </div>
          );
        })}
        {/*
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios2"
            value="option2"
          />
          <label className="form-check-label" for="exampleRadios2">
            Second default radio
          </label>
        </div>
        <div className="form-check disabled">
          <input
            className="form-check-input"
            type="radio"
            name="exampleRadios"
            id="exampleRadios3"
            value="option3"
            disabled
          />
          <label className="form-check-label" for="exampleRadios3">
            Disabled radio
          </label>
        </div>
        */}
      </div>
    );
  }
}
