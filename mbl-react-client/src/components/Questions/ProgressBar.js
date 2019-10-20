import React, { Component } from "react";

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    var progressCurrent = 0;
    var progressTotal = 100;
    if(props.total !== 0)
    {
      progressCurrent = props.current;
      progressTotal = props.progressTotal;
    }
    this.state = {
      progress: (progressCurrent / progressTotal) * 100
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      progress: (nextProps.current / nextProps.total) * 100
    });
    if (nextProps.errors) {
      console.log(`error getting nextProps: ${nextProps.errors}`);
    }
  }
  render() {
    const progressBarStyle = {
      width: `${this.state.progress}%`
    };
    return (
      <div>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={progressBarStyle}
            aria-valuenow={Math.round(this.state.progress)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(this.state.progress)}%
          </div>
        </div>
      </div>
    );
  }
}
