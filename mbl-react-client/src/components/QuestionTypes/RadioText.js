import React, { Component } from "react";

export default class RadioText extends Component {
  render() {
    return (
      <div>
        <div class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input
                type="radio"
                aria-label="Radio button for following text input"
              />
            </div>
          </div>
          <input
            type="text"
            class="form-control"
            aria-label="Text input with radio button"
          />
        </div>
      </div>
    );
  }
}
