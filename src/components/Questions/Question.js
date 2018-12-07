import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createResponse } from "./../../actions/responseActions";
import classnames from "classnames";

class Question extends Component {
  constructor() {
    super();
    console.log();
    this.state = {
      question: {
        id: 1,
        questionText: "Alien Registration Number (A-Number)",
        spanishText: "Número de Registración - Alíen (Número A)",
        questionInfo: "information about you",
        xPlacement: 165,
        yPlacement: 485,
        pageOnForm: 0,
        partOfForm: "1",
        questionNumber: "1",
        questionNumberPart: "1",
        questionSequence: "I-90-1-1",
        usFormNumber: "I-90"
      },
      response: {
        applicationIdentifier: "20-I-90",
        questionSequence: "I-90-1-1",
        usFormNumber: "I-90",
        responseText: "",
        submissionIdentifier: "submissionIdentifier"
      },
      responseText: "",
      user: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userId = this.state.user.id;
    const usFormNumber = this.state.response.usFormNumber;
    const newResponse = {
      // id: this.state.response.id,
      // applicationIdentifier: this.state.response.applicationIdentifier,
      // questionSequence: this.state.response.questionSequence,
      // usFormNumber: this.state.response.usFormNumber,
      // responseText: this.state.responseText,
      // submissionIdentifier: this.state.response.submissionIdentifier,
      // xPlacement: this.state.question.xPlacement,
      // yPlacement: this.state.question.yPlacement,
      // pageOnForm: this.state.question.pageOnForm,
      // partOfForm: this.state.question.partOfForm,
      // questionNumber: this.state.question.questionNumber,
      // questionNumberPart: this.state.question.questionNumberPart
      // project below
      // projectName: "test",
      // projectIdentifier: "IDTE",
      // description: "describe the new project"
    };
    console.log(newResponse);
    this.props.createResponse(
      newResponse,
      // userId,
      // usFormNumber,
      this.props.history
    );
  }
  // static propTypes = {
  //   createResponse: PropTypes.func.isRequired,
  //   errors: PropTypes.object.isRequired,
  //   question: PropTypes.object.isRequired,
  //   response: PropTypes.object.isRequired,
  //   responseText: PropTypes.string.isRequired,
  //   user: PropTypes.object.isRequired
  // };

  render() {
    const responseText = this.state.responseText;
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                {this.state.question.spanishText}
              </h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.username
                    })}
                    placeholder="Tu respuesta"
                    name="responseText"
                    value={responseText}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
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
Question.propTypes = {
  createResponse: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
  // question: PropTypes.object.isRequired,
  // response: PropTypes.object.isRequired,
  // responseText: PropTypes.string.isRequired,
  // user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

// const mapDispatchToProps = {
//   createResponse: props.createResponse
// };

export default connect(
  mapStateToProps,
  { createResponse }
)(Question);
