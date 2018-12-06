import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";

class Question extends Component {
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
      responseText: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newResponse = {
      id: this.state.response.id,
      applicationIdentifier: this.state.response.applicationIdentifier,
      questionSequence: this.state.response.questionSequence,
      usFormNumber: this.state.response.usFormNumber,
      responseText: this.state.responseText,
      submissionIdentifier: this.state.response.submissionIdentifier,
      xPlacement: this.state.question.xPlacement,
      yPlacement: this.state.question.yPlacement,
      pageOnForm: this.state.question.pageOnForm,
      partOfForm: this.state.question.partOfForm,
      questionNumber: this.state.question.questionNumber,
      questionNumberPart: this.state.question.questionNumberPart
    };
    console.log(newResponse);
    // this.props.createResponse(newResponse, this.props.history);
  }
  // static propTypes = {
  //   prop: PropTypes
  // };

  render() {
    const responseText = this.state.responseText;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                {this.state.question.questionText}
              </h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg "
                    placeholder="Your response"
                    name="responseText"
                    value={responseText}
                    onChange={this.onChange}
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
// get user and send with response

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Question);

export default Question;
