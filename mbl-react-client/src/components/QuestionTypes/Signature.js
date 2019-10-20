import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

export default class Signature extends Component {
  render() {
    return (
      <div>
        <CanvasDraw loadTimeOffset={10} />
      </div>
    );
  }
}
