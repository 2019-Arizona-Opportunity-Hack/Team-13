import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createResponse } from "./../../actions/responseActions";
import { getQuestion } from "./../../actions/questionActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Question extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    const { question } = props;
    const { user } = props.security;
    // console.log(question);
    this.state = {
      question: {
        id: question.id,
        questionText: question.questionText,
        translationText: question.translationText,
        questionInfo: question.questionInfo,
        xPlacement: question.xPlacement,
        yPlacement: question.yPlacement,
        pageOnForm: question.pageOnForm,
        partOfForm: question.partOfForm,
        questionNumber: question.questionNumber,
        questionNumberPart: question.questionNumberPart,
        questionSequence: question.questionSequence,
        usFormNumber: question.usFormNumber
      },
      response: {
        applicationIdentifier: "20-I-90",
        questionSequence: question.questionSequence,
        usFormNumber: question.usFormNumber,
        translationText: question.translationText,
        responseText: "",
        submissionIdentifier: "submissionIdentifier"
      },
      responseText: "",
      user,
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
      applicationIdentifier: this.state.response.applicationIdentifier,
      questionSequence: this.state.response.questionSequence,
      usFormNumber: this.state.response.usFormNumber,
      translationText: this.state.translationText,
      responseText: this.state.responseText,
      submissionIdentifier: this.state.response.submissionIdentifier,
      xPlacement: this.state.question.xPlacement,
      yPlacement: this.state.question.yPlacement,
      pageOnForm: this.state.question.pageOnForm,
      partOfForm: this.state.question.partOfForm,
      questionNumber: this.state.question.questionNumber,
      questionNumberPart: this.state.question.questionNumberPart
    };
    // console.log(newResponse);
    this.props.createResponse(
      newResponse,
      userId,
      usFormNumber,
      this.props.history
    );
  }

  render() {
    const responseText = this.state.responseText;
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">
                <Link to={`/question/${this.state.question.questionSequence}`}>
                  {this.state.question.questionSequence}
                </Link>
                <br />
                {this.state.question.translationText}
              </h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg ", {
                      "is-invalid": errors.responseText
                    })}
                    placeholder="Tu respuesta"
                    name="responseText"
                    value={responseText}
                    onChange={this.onChange}
                  />
                  {errors.responseText && (
                    <div className="invalid-feedback">
                      {errors.responseText}
                    </div>
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
  getQuestion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  questions: state.question,
  security: state.security
});

export default connect(
  mapStateToProps,
  { createResponse, getQuestion }
)(Question);
