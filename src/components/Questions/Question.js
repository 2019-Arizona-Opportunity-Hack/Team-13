import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";

export class Question extends Component {
  constructor() {
    super();
    this.state = {
      question: {
        id: 1,
        questionText: "USCIS Online Account Number (if any)",
        questionInfo: "information about you",
        xPlacement: 2,
        yPlacement: 3,
        pageOnForm: 1,
        partOfForm: "1",
        questionNumber: "1",
        questionNumberPart: "1",
        questionSequence: "I-90-1-1",
        usFormNumber: "I-90"
      },
      response: {
        id: "",
        applicationIdentifier: "20-I-90",
        questionSequence: "I-90-1-1",
        usFormNumber: "I-90",
        responseText: "true",
        submissionIdentifier: "submissionIdentifier"
      },
      errors: {}
    };
  }
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Question Text</h5>
              <hr />
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Project Name"
                    name="responseText"
                    value={this.state.response.responseText}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Question);

export default Question;
