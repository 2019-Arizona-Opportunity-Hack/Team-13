import React, { Component } from "react";
import CanvasDraw from "react-canvas-draw";

export default class Signature extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.clear = this.clear.bind(this);
  }
  save() {
    if (!this.saveableCanvas) {
      return; // can't save yet
    }
    // ASSUME they signed and it isn't blank
    const signature = this.saveableCanvas.getSaveData();
    debugger;
    this.props.onChange(signature);
  }
  clear() {
    this.saveableCanvas.clear();
  }
  render() {
    return (
      <div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          loadTimeOffset={10}
        />
        <button onClick={this.save}>Save</button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}
