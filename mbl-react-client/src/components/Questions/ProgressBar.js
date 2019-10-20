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
        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style={progressBarStyle}
            aria-valuenow={Math.round(this.state.progress)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(this.state.progress)}%
          </div>
        </div>
        {/* {this.props.radios.map(radio => {
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
        })} */}
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
