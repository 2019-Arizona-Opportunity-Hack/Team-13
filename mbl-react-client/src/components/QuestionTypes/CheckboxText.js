import React, { Component } from "react";

export default class CheckboxText extends Component {
  render() {
    return (
      <div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label className="form-check-label" for="defaultCheck1">
            Default checkbox
          </label>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with checkbox"
          />
        </div>
      </div>
    );
  }
}
